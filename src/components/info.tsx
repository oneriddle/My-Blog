import { alertInfo } from "@/utils/alerts";
import Image from "next/image";

const Info = () => {
  return (
    <>
      <Image
        src={"/images/Icons/informacion.png"}
        alt={"info"}
        width={60}
        height={60}
        /* style={{ objectFit: "contain" }} */
        className="info_icon"
        title="Site info"
        onClick={() => alertInfo("info")}
      ></Image>
    </>
  );
};

export default Info;
