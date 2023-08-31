"use client";

import BotonBorrar from "@/components/botonBorrar";
import PostForm from "@/components/postForm";
import { notifyInfo } from "@/utils/toast";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const Posts = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchDatos = async () => {
      await peticionGet();
    };
    fetchDatos();
  }, []);

  const peticionGet = async () => {
    const data = await axios.get("http://localhost:3000/api/blog");
    setData(data.data);
  };

  const peticionPut = (index: any, e: any) => {
    notifyInfo(`Disponible en la proxima version...`);
  };

  return (
    <>
      <section>
        <PostForm peticionGet={peticionGet} />
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
                    <BotonBorrar id={e._id} peticionGet={peticionGet} />
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
