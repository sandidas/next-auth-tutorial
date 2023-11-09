import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/dbConfig/dbConfig";
export async function POST(req: NextRequest) {

    try {
        // DB Connection
        await dbConnect();

        const reqBody = await req.json();
        // console.log("POST request", reqBody);

        const { name, email, password } = reqBody;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing Fields" }, { status: 400 })
        }
        // check if user already exists
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            console.log("Exist:", isUserExist);
            return NextResponse.json({ error: "User already exist" }, { status: 400 })
        }

        // hash the password
        const salt = await bcryptjs.genSalt(10); // generate salt
        const hashedPassword = await bcryptjs.hash(password, salt); // hash password

        // save password to database
        const savedUser = await new User({ name, email, password: hashedPassword }).save();

        console.log("savedUser", savedUser);

        // return response
        return NextResponse.json({ message: "User created successfully", success: true, savedUser })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }

}