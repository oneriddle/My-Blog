/* "use client"; */

import React, { useEffect, useState } from "react";
import PostForm from "@/components/postForm";
import axios from "axios";

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

  return (
    <>
      <section>
        <h2>PostsS </h2>
        <PostForm />
        {data.map((e: any) => (
          <div>
            <p>{e.titulo}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default Posts;
