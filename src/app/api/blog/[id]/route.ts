import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import BlogPost from "@/models/blogPost";

connectDB();

export const GET = async (req: Request) => {
  try {
    const id = req.url.split("api/blog/get/")[1];
    NextResponse.json({ id: id });
    console.log("Get By ID" + id);
  } catch (error) {
    console.log("error", error);
  }
};
/* export const PUT = async (req: Request) => {
  try {
    const id = req.url;
    NextResponse.json({ id: id });
    console.log("Put By ID" + id);
  } catch (error) {
    console.log("error", error);
  }
}; */
/* export const DELETE = async (req: Request) => {
  try {
    const id = req.url;
    NextResponse.json({ id: id });
    console.log("Delete By ID" + id);
  } catch (error) {
    console.log("error", error);
  }
};
 */
