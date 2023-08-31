import { Schema, model, models } from "mongoose";

const blogPostSchema = new Schema({
  titulo: {
    type: String,
    unique: true,
    required: [true, "Titulo requerido"],
  },
  autor: {
    type: String,

    required: [true, "Autor requerido"],
  },
  fecha: {
    type: String,

    required: [true, "Fecha requerida"],
  },
  url: {
    type: String,

    required: [false, "URL optional"],
  },
  contenido: {
    type: String,

    required: [true, "Contenido requerido"],
    minLength: [10, "Fullname must be at least 10 characters"],
    maxLength: [500, "Fullname must be at most 500 characters"],
  },
});

const BlogPost = models?.BlogPost || model("BlogPost", blogPostSchema);

export default BlogPost;
