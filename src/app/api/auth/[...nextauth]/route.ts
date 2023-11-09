import bcryptjs from 'bcryptjs';
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongoDbNextAuthProvider';

const accessTokenExpirationInMillis = parseInt(process.env.ACCESS_TOKEN_EXPIRATION || '864000000', 10); // 10 days in milliseconds (default if the environment variable is not set)
const maxAgeInSeconds = Math.floor(accessTokenExpirationInMillis / 1000); // Convert milliseconds to seconds


// Why NextAuthOptions explain here
// https://stackoverflow.com/questions/74244256/type-string-is-not-assignable-to-type-sessionstrategy-undefined
export const authOptions: NextAuthOptions = {
    // https://authjs.dev/reference/adapter/mongodb
    adapter: MongoDBAdapter(clientPromise), // Important for google/github login
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt', // old style :: source: https://next-auth.js.org/getting-started/upgrade-v4#adapters
        //  jwt: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID_LOCAL as string,
            clientSecret: process.env.GITHUB_SECRET_LOCAL as string,
        }),
        GoogleProvider({
            // https://console.cloud.google.com/
            clientId: process.env.GOOGLE_CLIENT_ID_LOCAL as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET_LOCAL as string,
        }),
        // https://www.youtube.com/watch?v=v6TPcU23wP8
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                // console.log("credentials", credentials);

                const formEmail = credentials?.email as string;
                const plainPassword = credentials?.password as string;


                await dbConnect();
                // Validation 1: User exist or not
                const user = await User.findOne({ email: formEmail });
                if (!user) {
                    return null
                }
                // console.log("user", user);
                // Validation 2: Password valid or not
                const isValidPassword =
                    user && typeof user.password === 'string'
                        ? await bcryptjs.compare(plainPassword, user.password)
                        : false;
                // console.log("isValidPassword", isValidPassword);
                if (!isValidPassword) {
                    return null
                }
                // console.log("Successfully logged in");
                // passed and success
                return {
                    id: user?._id,
                    name: user?.name || "Anonymous",
                    email: user?.email,

                }
            }
        })
    ],

    callbacks: {
        // to redirect to callback uri after login
        async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    debug: process.env.NODE_ENV === "development",
}


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }