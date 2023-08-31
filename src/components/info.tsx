import { alertInfo } from "@/utils/alerts";
import Image from "next/image";

const Info = () => {
  return (
    <>
      <Image
        src={"/images/Icons/Info.webp"}
        alt={"info"}
        width={30}
        height={30}
        style={{ objectFit: "contain" }}
        className="info_icon"
        title="Site info"
        onClick={() => alertInfo("info")}
      ></Image>
    </>
  );
};

export default Info;
