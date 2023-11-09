"use client";
import React from "react";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
interface IUserRegister {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  //
  // = = = = = = = = = = =
  // REACT HOOK FORM
  // = = = = = = = = = = =
  //
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IUserRegister>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  register("name", { required: "Name is required" });
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

  const handleSubmitForm = async (data: IUserRegister) => {
    // console.log("Data", data);
    const loadingToast = toast.loading("Processing...");
    try {
      // Loading toaster

      const response = await axios.post("/api/users/register", data);
      // Success toaster
      toast.success("Successfully created!");
      // console.log("Register Successful ", response.data);
    } catch (error: any) {
      // Error toaster
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
          <div className="grid gap-2">
            <Label htmlFor="email">Name</Label>
            <Input type="text" placeholder="Name *" {...register("name")} />
            {errors.name && <span className="text-red-400 text-sm">{`${errors.name?.message}`}</span>}
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
          <Button className="w-full" type="submit">
            Register Now
          </Button>
        </CardFooter>
      </form>
    </div>
  );
}
