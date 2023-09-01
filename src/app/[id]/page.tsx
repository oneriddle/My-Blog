"use client";

import { notifyError } from "@/utils/toast";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PostDetail = ({ params }: any) => {
  const { id } = params;
  const [data, setData] = useState<any>([]);

  const peticionGet = async () => {
    try {
      const data = await axios.get(`/api/blog/${id}`);
      setData(data.data.OneFound);
    } catch (error) {
      console.log(error);
    }
  };

  const loaded = (img: any) => {
    const previewImage = document.getElementById("loader");
    previewImage?.classList.add("display-none");
    img.classList.remove("display-none");
    img.classList.remove("opacity-0");
  };

  useEffect(
    () => {
      const fetchDatos = async () => {
        await peticionGet();
      };
      fetchDatos();
    },
    [
      /* peticionGet() */
    ]
  );

  return (
    <>
      <div>
        <section>
          <div className="post-detail animate__animated animate__fadeIn">
            {data?.length == 0 ? (
              <div className="cargando-container">
                <p>Cargando...</p>
                <Image
                  src="/images/svg-loaders/three-dots.svg"
                  width={100}
                  height={100}
                  style={{ fill: "red" }}
                  alt="loader"
                />
                <p>Desde mongoDB</p>
              </div>
            ) : (
              <>
                <h2>{data.titulo}</h2>
                <h3>Por: {data.autor}</h3>
                <div>
                  <Image
                    src={data.url}
                    width={600}
                    height={500}
                    className="image-main"
                    alt="Imagen"
                    title="Imagen"
                  />
                </div>

                <p>{data.contenido}</p>

                <p className="fecha">{data.fecha}</p>

                <Link href="/">
                  <Image
                    src={"/images/Icons/arrow-right-rounded.svg"}
                    alt="goBack"
                    className="go-back"
                    title="Ir a Blog"
                    width={60}
                    height={60}
                  />
                </Link>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default PostDetail;
