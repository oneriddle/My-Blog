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
      if (navigator.onLine) {
        const response = await axios.get(`/api/blog/${id}`);
        const serverData = response?.data?.OneFound;

        setData(serverData);
        localStorage.setItem(`/api/blog/${id}`, JSON.stringify(serverData));
      } else {
        console.log('navegador online', navigator.onLine);
  
        const localStorageData = localStorage.getItem(`/api/blog/${id}`);
  
        if (localStorageData) {

          setData(JSON.parse(localStorageData));
        } else {
          notifyError("No hay conexión ni datos almacenados.");
        }
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
    }
  };
  

  const loaded = (img: any) => {
    const previewImage = document.getElementById("loader");
    previewImage?.classList.add("display-none");
    img.classList.remove("display-none");
    img.classList.remove("opacity-0");
  };

  useEffect(() => {
    const fetchDatos = async () => {
      await peticionGet();
    };
    fetchDatos();
  }, []);

  return (
    <>
      <div>
        <section>
          <div className="post-detail animate__animated animate__fadeIn">
            {data?.length == 0 ? (
              <div className="cargando-container">
                <p>{!navigator.onLine ? "No hay conexión ni datos offline" : "Cargando..."}</p>
                {!navigator.onLine ? "😔" : <Image
                  src="/images/svg-loaders/three-dots.svg"
                  width={100}
                  height={100}
                  style={{ fill: "red" }}
                  alt="loader"
                />}
                
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
