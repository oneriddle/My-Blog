import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { notifySuccess, notifyWarn } from "@/utils/toast";
import moment from "moment";
import Posts from "@/app/post/page";
import Image from "next/image";

const PostForm = ({ peticionGet }: any) => {
  const [file, setFile] = useState<File>();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [contenido, setContenido] = useState("");

  const date = moment().add(3, "days").calendar();

  const handdleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!file) return;

      const formData = new FormData(e.currentTarget);

      const data = new FormData(e.currentTarget);
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        const imageURL = await res.text();
        console.log("Se subió la imagen" + imageURL);
      }

      const postResponse = await axios.post("/api/blog", {
        titulo: formData.get("titulo"),
        autor: formData.get("autor"),
        fecha: formData.get("fecha"),
        url: `/images/upload/${file.name}`,
        contenido: formData.get("contenido"),
      });

      setTitulo("");
      setAutor("");
      setContenido("");
      setFile(undefined);

      notifySuccess("Post creado");
      peticionGet();
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyWarn(error.response?.data.message);
      }
      console.error(error);
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="text">Nuevo Post</div>
          <form onSubmit={handdleSubmit}>
            <div className="form-row">
              <div className="input-data">
                <input
                  type="text"
                  name="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
                <div className="underline"></div>
                <label htmlFor="">Título</label>
              </div>
              <div className="input-data">
                <input
                  type="text"
                  name="autor"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  required
                />
                <div className="underline"></div>
                <label htmlFor="">Autor</label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data">
                <input
                  type="file"
                  name="file"
                  onChange={(event) => setFile(event.target.files?.[0])}
                  required
                />
                <div className="underline"></div>
                <label htmlFor=""></label>
              </div>
              {file && (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="MiImagen"
                  width={100}
                  style={{ objectFit: "contain" }}
                  height={100}
                />
              )}
            </div>
            <div className="form-row">
              <div className="input-data textarea">
                <textarea
                  name="contenido"
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  required
                ></textarea>
                <br />
                <div className="underline"></div>
                <label htmlFor="">Contenido</label>
              </div>
            </div>
            <div className="form-row submit-btn">
              <div className="input-data">
                <div className="inner"></div>
                <input type="submit" value="Postear" />
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default PostForm;
