import axios from "axios";
import { FormEvent } from "react";

import { notifySuccess } from "@/utils/toast";
import moment from "moment";

const PostForm = () => {
  const date = moment().add(3, "days").calendar();

  const handdleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    notifySuccess("Post creado");

    const postResponse = await axios.post("/api/blog/post", {
      titulo: formData.get("titulo"),
      autor: formData.get("autor"),
      fecha: formData.get("fecha"),
      url: formData.get("url"),
      contenido: formData.get("contenido"),
    });

    if (postResponse?.status) {
      console.log("status", postResponse?.status);
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
                <input type="text" name="titulo" required />
                <div className="underline"></div>
                <label htmlFor="">Titulo</label>
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
                <input type="text" name="url" required />
                <div className="underline"></div>
                <label htmlFor="">Imagen URL</label>
              </div>
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
