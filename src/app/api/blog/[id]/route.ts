import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import BlogPost from "@/models/blogPost";

export const GET = async (req: Request, { params }: any) => {
  try {
    const { id } = params;
    await connectDB();
    const oneFound = await BlogPost.findOne({ _id: id });
    return NextResponse.json({
      status: 200,
      OneFound: oneFound,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: error });
  }
};

export const PUT = async (req: Request, { params }: any) => {
  try {
    const { id } = params;
    const { nuevoTitulo: titulo, nuevaDescripcion: contenido } =
      await req.json();
    await connectDB();
    const oneEdited = await BlogPost.findByIdAndUpdate(id, {
      titulo,
      contenido,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: error });
  }
};

export const DELETE = async (req: Request, { params }: any) => {
  try {
    const { id } = params;
    await connectDB();
    const oneDeleted = await BlogPost.findByIdAndDelete(id);

    return NextResponse.json({
      status: 202,
      message: "Post eliminado!",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: error, message: "Id no encontrado" });
  }
};
