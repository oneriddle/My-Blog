import Blog from "@/components/blog";

const IndexPage = async () => {
  return (
    <>
      <section id="index">
        <div className="mainPage-container animate__animated animate__fadeIn">
          <h1 className="color_title rainbow_bg">Mi BLOG</h1>
          <p>Elige el Post de tu preferencia</p>
          <Blog />
        </div>
      </section>
    </>
  );
};

export default IndexPage;
