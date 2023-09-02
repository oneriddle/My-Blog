import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import BlogPost from "@/models/blogPost";

import moment from "moment";
require("moment/locale/es"); // Carga la localización en español
moment.locale("es"); // Establece M

connectDB();

export const GET = async () => {
  try {
    const posts = await BlogPost.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.log("error", error);
  }
};

export const POST = async (request: Request) => {
  const { titulo, autor, fecha, url, contenido } = await request.json();
  try {
    if (!contenido || contenido.lenght < 10)
      return NextResponse.json(
        {
          message: "⚠️ Contenido debe tener al menos 10 caracteres",
        },

        {
          status: 411,
        }
      );

    const tituloEncontrado = await BlogPost.findOne({ titulo });

    if (tituloEncontrado)
      return NextResponse.json(
        {
          message: "Titulo en uso, intruduce uno diferente",
        },
        {
          status: 409,
        }
      );

    const date = moment().add(3, "days").calendar();

    const post = new BlogPost({
      titulo,
      autor,
      fecha: date,
      url,
      contenido,
    });

    console.log("post", post);

    const savedPost = await post.save();

    return NextResponse.json({
      success: {
        titulo: savedPost.titulo,
        autor: savedPost.autor,
        fecha: savedPost.fecha,
        url: savedPost.url,
        contenido: savedPost.contenido,
      },
      status: 201,
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
  return NextResponse.json({ message: "post guardado!" });
};
