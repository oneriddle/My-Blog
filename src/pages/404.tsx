import Link from "next/link";

import "@/styles/css/styles.css";
import Image from "next/image";

export default function Custom404() {
  return (
    <>
      <section>
        <div className="generic_container">
          <h2>Error 404</h2>
          <p>Page not found</p>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/4826/4826313.png"
            width={100}
            height={100}
            alt={"image"}
            style={{ margin: "20px" }}
          />
          <Link className="button-generic" href="/">
            Back Home
          </Link>
        </div>
      </section>
    </>
  );
}
