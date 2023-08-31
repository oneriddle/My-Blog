"use client";

import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Select from "react-select";
import Image from "next/image";

const Blog = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("titulo");
  const router = useRouter();

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

  const options = [
    {
      label: "Titulo",
      value: "titulo",
    },
    {
      label: "Autor",
      value: "autor",
    },
    {
      label: "Fecha",
      value: "fecha",
    },
    {
      label: "Contenido",
      value: "contenido",
    },
  ];

  const handleSelectChange = ({ value }: any) => {
    setSelectedSupplier(value);
  };

  return (
    <>
      <div className="search-box">
        <Select
          defaultValue={{ label: "Titulo", value: selectedSupplier }}
          options={options}
          onChange={handleSelectChange}
          className="select-box"
        />
        <input
          name={"buscar"}
          placeholder={`Buscar ${selectedSupplier}`}
          type="text"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>

      <div className="blog-container">
        {data?.length == 0 ? (
          <Image
            src="/images/svg-loaders/three-dots.svg"
            width={200}
            height={200}
            style={{ fill: "red" }}
            alt="loader"
          />
        ) : (
          data
            ?.filter((val: any) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val[selectedSupplier]
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((e: any) => (
              <div
                className="post-card"
                onClick={() => {
                  router.push(`/${e._id}`);
                }}
              >
                <div className="card-header">
                  <h4>{e.titulo}</h4>

                  <p>By: {e.autor}</p>
                </div>
                <Image
                  src={e.url}
                  width={300}
                  height={250}
                  alt="Imagen"
                  title="Imagen"
                />
                <div className="card-footer">
                  <p className="contenido">{e.contenido.slice(0, 60)}</p>
                </div>
                <p className="fecha">{e.fecha}</p>
              </div>
            ))
        )}
      </div>
    </>
  );
};

export default Blog;
