import { NextResponse } from "next/server";

import User from "@/models/user";

import bcrypt from "bcryptjs";

import { connectDB } from "@/libs/mongodb";

export const GET = () => {
  return NextResponse.json({ message: "Hello World!" });
};
export const POST = async (request: Request) => {
  const { fullName, email, password } = await request.json();
  try {
    await connectDB();
    if (!password || password.lenght < 6)
      return NextResponse.json(
        {
          message: "⚠️ Password must be at least 6 characters",
        },

        {
          status: 411,
        }
      );

    const userFound = await User.findOne({ email });

    if (userFound)
      return NextResponse.json(
        {
          message: "Email already exist",
        },
        {
          status: 409,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      fullName,
      password: hashedPassword,
    });
    const savedUser = await user.save();

    return NextResponse.json({
      email: savedUser.email,
      fullName: savedUser.fullName,
      id: savedUser.email,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }
  return NextResponse.json({ message: "signup" });
};
