import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import BlogPost from "@/models/blogPost";

connectDB();

export const GET = async () => {
  try {
    const posts = await BlogPost.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.log("error", error);
  }
};
