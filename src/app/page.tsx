import Blog from "@/components/blog";
import Link from "next/link";

const IndexPage = async () => {
  return (
    <>
      <section id="index">
        <div className="mainPage-container animate__animated animate__fadeIn">
          <h1 className="color_title rainbow_bg">Mi BLOG</h1>
          <p className="title_description">
            Hola, soy ingeniero de software senior en la empresa. Disfruto
            trabajando con Next.js y creando hermosas experiencias de front-end.
          </p>
          <p>Elige el Post de tu preferencia</p>
          <Blog />
        </div>
      </section>
    </>
  );
};

export default IndexPage;
