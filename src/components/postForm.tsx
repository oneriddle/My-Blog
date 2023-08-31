"use client";

import axios, { AxiosError } from "axios";
import { FormEvent } from "react";

import { notifySuccess, notifyWarn } from "@/utils/toast";
import moment from "moment";
import { useState } from "react";

const PostForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const date = moment().add(3, "days").calendar();

  const handdleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const postResponse = await axios.post("/api/blog/post", {
        titulo: formData.get("titulo"),
        autor: formData.get("autor"),
        fecha: formData.get("fecha"),
        url: formData.get("url"),
        contenido: formData.get("contenido"),
      });
      notifySuccess("Post creado");
      console.log("postResponse", postResponse);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("====================================");
        console.log("error", error.response?.data.message);
        console.log("====================================");
        notifyWarn(error.response?.data.message);
      }
    }
  };

  const handleFileChange = (event: any) => {
    notifySuccess("Cargando Imagen...");
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("file", file);
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="text">Nuevo Post</div>
          <form onSubmit={handdleSubmit}>
            <div className="form-row">
              <div className="input-data">
                <input type="text" name="titulo" required />
                <div className="underline"></div>
                <label htmlFor="">Título</label>
              </div>
              <div className="input-data">
                <input type="text" name="autor" required />
                <div className="underline"></div>
                <label htmlFor="">Autor</label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data">
                <input
                  type="text"
                  name="fecha"
                  value={date}
                  disabled
                  required
                />
                <div className="underline"></div>
                <label htmlFor=""></label>
              </div>
              <div className="input-data">
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  required
                />
                <div className="underline"></div>
                <label htmlFor=""></label>
              </div>
              {/* <div className="input-data">
                <input type="text" name="url" required />
                <div className="underline"></div>
                <label htmlFor="">Imagen URL</label>
              </div> */}
            </div>
            <div className="form-row">
              <div className="input-data textarea">
                <textarea
                  /*               rows="8"
                  cols="80" */
                  name="contenido"
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
