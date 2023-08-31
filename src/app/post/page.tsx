"use client";

import React, { useEffect, useState } from "react";
import PostForm from "@/components/postForm";
import axios from "axios";
import Image from "next/image";
import { notifyInfo } from "@/utils/toast";

const Posts = () => {
  const [data, setData] = useState([]);

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

  const borrar = () => {
    notifyInfo("Funcion en desarrollo...");
  };
  const editar = () => {
    notifyInfo("Funcion en desarrollo...");
  };

  return (
    <>
      <section>
        <PostForm />
        <h2> Post recientes </h2>
        <table className="post-card">
          <tr>
            <th>Titulo</th>
            <th>Autor</th>
            <th>Fecha</th>
            <th>Contenido</th>
            <th>Acción</th>
          </tr>
          {data.length == 0
            ? "Cargando..."
            : data.map((e: any) => (
                <tr>
                  <td>{e.titulo}</td>
                  <td>{e.autor}</td>
                  <td>{e.fecha}</td>
                  <td>{e.contenido.slice(0, 60)}</td>
                  <td>
                    <div className="action-container">
                      <Image
                        src="https://cdn-icons-png.flaticon.com/512/1522/1522068.png"
                        width={30}
                        height={30}
                        alt="borrar"
                        title="Borrar"
                        onClick={borrar}
                      />
                      <Image
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828270.png"
                        width={30}
                        height={30}
                        alt="editar"
                        title="Editar"
                        onClick={editar}
                      />
                    </div>
                  </td>
                </tr>
              ))}
        </table>
      </section>
    </>
  );
};

export default Posts;
