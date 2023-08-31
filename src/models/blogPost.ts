import { Schema, model, models } from "mongoose";

const blogPostSchema = new Schema({
  titulo: {
    type: String,
    unique: true,
    required: [true, "Título requerido"],
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
    minLength: [10, "Ingresa al menos 10 caracteres"],
  },
});

const BlogPost = models?.BlogPost || model("BlogPost", blogPostSchema);

export default BlogPost;
