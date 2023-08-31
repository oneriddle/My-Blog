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
      const data = await axios.get(`http://localhost:3000/api/blog/${id}`);
      setData(data.data.OneFound);
    } catch (error) {
      console.log(error);
    }
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
          <div className="post-detail">
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
          </div>
        </section>
      </div>
    </>
  );
};

export default PostDetail;
