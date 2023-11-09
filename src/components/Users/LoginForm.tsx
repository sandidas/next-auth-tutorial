"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
interface IUserLogin {
  email: string;
  password: string;
}

export default function LoginForm() {
  //
  const router = useRouter(); // to redirect after login
  const searchParams = useSearchParams();
  console.log("searchParams", searchParams);

  // = = = = = = = = = = =
  // REACT HOOK FORM
  // = = = = = = = = = = =
  //
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IUserLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  register("password", {
    required: "Password is required",
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[^ ]+[A-Za-z\d@$!%*?&]*$/,

      // Explanation of the pattern:
      // - (?=.*[A-Za-z]): Requires at least one letter (uppercase or lowercase).
      // - (?=.*\d): Requires at least one number.
      // - (?=.*[@$!%*?&]): Requires at least one special character among @$!%*?&.
      // - [^ ]+: Ensures that there are no spaces in the password.
      // - [A-Za-z\d@$!%*?&]*: Allows characters in the specified set (including spaces) after the first character.
      message: "Password must contain at least one letter, one number, and one special character and should not contain spaces",
    },
  });

  register("email", {
    required: "Email address is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address format",
    },
  });

  const handleSubmitForm = async (data: IUserLogin) => {
    // Loading toaster
    const loadingToast = toast.loading("Waiting...");
    // console.log("Data", data);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      // Redirect to the home/other page
      if (!response?.error) {
        toast.success("Successfully login!");
        // success toaster
        router.push("/");
        router.refresh(); // to clear router cache
      }
    } catch (error: any) {
      // error toaster
      toast.error(error?.message);
      console.log("Register Failed! ", error?.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" {...register("email")} />
            {errors.email && <span className="text-red-400 text-sm">{`${errors.email?.message}`}</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password *" {...register("password")} />
            {errors.password && <span className="text-red-400 text-sm">{`${errors.password?.message}`}</span>}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create account</Button>
        </CardFooter>
      </form>
    </div>
  );
}
