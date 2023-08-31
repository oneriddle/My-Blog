"use client";

import React, { useEffect, useState } from "react";
import PostForm from "@/components/postForm";
import axios from "axios";
import Image from "next/image";
import { notifyInfo } from "@/utils/toast";

const Posts = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchDatos = async () => {
      await peticionGet();
    };
    fetchDatos();
  }, []);

  const peticionGet = async () => {
    const data = await axios.get("http://localhost:3000/api/blog/get");
    setData(data.data);
  };

  const peticionDelete = (index: any, e: any) => {
    console.log("====================================");
    console.log(e);
    console.log("====================================");
    notifyInfo(`Funcion borrar en desarrollo id:${index}`);
  };
  const peticionPut = (index: any) => {
    notifyInfo(`Funcion editar en desarrollo id:${index}`);
  };

  return (
    <>
      <section>
        <PostForm />
        <h2> Post recientes </h2>
        <table className="post-card">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Fecha</th>
              <th>Contenido</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e: any, index: any) => (
              <tr key={index}>
                <td>{e.titulo}</td>
                <td>{e.autor}</td>
                <td>{e.fecha}</td>
                <td>{e.contenido.slice(0, 100)}</td>
                <td>
                  <div className="action-container">
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/1522/1522068.png"
                      width={30}
                      height={30}
                      alt="borrar"
                      title="Borrar"
                      onClick={(e) => peticionDelete(index, e)}
                    />
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828270.png"
                      width={30}
                      height={30}
                      alt="editar"
                      title="Editar"
                      onClick={(e) => peticionPut(index, e)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Posts;
