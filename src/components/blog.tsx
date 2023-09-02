"use client";

import { notifyError } from "@/utils/toast";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";

const Blog = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("titulo");
  const [online, setOnline] = useState(true);
  const router = useRouter();

  const peticionGet = async () => {
    try {
      if (navigator.onLine) {
 
        // Si hay conexión, realizar la petición Axios
        const response = await axios.get("/api/blog");
        const Posts = response?.data;
  
        // Actualizar el estado con los datos obtenidos
        setData(Posts.reverse());
  
        // Guardar los datos en localStorage para futuras cargas
        localStorage.setItem("blogData", JSON.stringify(Posts));
      } else {
        
        // No hay conexión, verificar si hay datos en localStorage
        const localStorageData = localStorage.getItem("blogData");
  
        if (localStorageData) {
          // Si hay datos en localStorage, cargarlos en el estado
          setData(JSON.parse(localStorageData));
        } else {
          // No hay conexión ni datos en localStorage
          notifyError("No hay conexión ni datos almacenados localmente.");
          setOnline(false);
        }
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
    }
  };

  useEffect(() => {
    const fetchDatos = async () => {
      await peticionGet();
    };
    fetchDatos();
  }, []);
  
  

  const options = [
    {
      label: "Título",
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
          defaultValue={{ label: "Título", value: selectedSupplier }}
          options={options}
          onChange={handleSelectChange}
          className="select-box"
          isSearchable={false}
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
          <div className="cargando-container">
            

            {
              online ? 
              (
                <>
                <Image
            src="/images/svg-loaders/three-dots.svg"
            width={100}
            height={100}
            style={{ fill: "red" }}
            alt="loader"
          />
                <p>Cargando...</p>
                </>
              ):

              (
                <>
                <p>😔</p>
                <p>No hay conexión ni datos offline</p>
                </>
              )

              
            }
        </div>
        ) : data?.filter((val: any) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val[selectedSupplier]
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          }).length === 0 ? (
          <p>No hay resultados. Use otra búsqueda.</p>
        ) : (
          data
            ?.filter((val: any) => {
              if (searchTerm === "") {
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
                key={`${e.titulo}-${e.autor}`}
                className="post-card"
                onClick={() => {
                  router.push(`/${e._id}`);
                }}
              >
                <div className="card-header">
                  <h4>{e.titulo}</h4>

                  <p>Por: {e.autor}</p>
                </div>
                <Image
                  src={e?.url == null ? "" : e?.url}
                  width={300}
                  height={250}
                  alt="Imagen"
                  title="Imagen"
                />
                <div className="card-footer">
                  <p className="contenido">
                    {e.contenido.slice(0, 60).concat("...")}
                  </p>
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
