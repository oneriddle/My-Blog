"use client";

import BotonBorrar from "@/components/botonBorrar";
import PostForm from "@/components/postForm";
import { notifyError, notifyInfo } from "@/utils/toast";
import axios from "axios";
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
    try {
      const response = await axios.get("/api/blog");
      const responseData = response?.data;
      setData(responseData.reverse());
      
    } catch (error) {
      notifyError("No hay conexión");
      
    }
  };
  

  const peticionPut = (index: any, e: any) => {
    notifyInfo(`Disponible en la proxima versión...`);
  };

  return (
    <>
      <section className="animate__animated animate__fadeIn">
        <PostForm peticionGet={peticionGet} />
        <h2> Post recientes </h2>
        <table className="post-card animate__animated animate__fadeIn">
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
            {data?.length == 0 ? (
              <tr>
                <td className="cargando" colSpan={5}>
                  Cargando...
                </td>
              </tr>
            ) : (
              data.map((e: any, index: any) => (
                <tr key={index}>
                  <td>{e.titulo}</td>
                  <td>{e.autor}</td>
                  <td>{e.fecha}</td>
                  <td>{e.contenido.slice(0, 60).concat("...")}</td>
                  <td>
                    <div className="action-container">
                      <BotonBorrar id={e._id} peticionGet={peticionGet} />
                      {/* <Image
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828270.png"
                      width={30}
                      height={30}
                      alt="editar"
                      title="Editar"
                      onClick={(e) => peticionPut(index, e)}
                    /> */}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Posts;
