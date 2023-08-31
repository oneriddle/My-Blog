import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(skills);
}

const skills = [
  {
    id: 0,
    name: "HTML5",
    imageSrc: "https://cdn-icons-png.flaticon.com/512/1051/1051277.png",
    experience: 5,
    unite: "Years",
    progress: 85,
  },
  {
    id: 1,
    name: "CSS3",
    imageSrc: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
    experience: 5,
    unite: "Years",
    progress: 85,
  },
  {
    id: 2,
    name: "JavaScript",
    imageSrc: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    experience: 4,
    unite: "Years",
    progress: 60,
  },
  {
    id: 3,
    name: "TypeScript",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png",
    experience: 4,
    unite: "Years",
    progress: 60,
  },
  {
    id: 4,
    name: "React",
    imageSrc: "https://i.ibb.co/KNdfSTf/Ico-react.webp",
    experience: 2,
    unite: "Years",
    progress: 65,
  },
  {
    id: 5,
    name: "Next.js",
    imageSrc: "https://i.ibb.co/7Q5cn92/Ico-next.webp",
    experience: 2,
    unite: "Years",
    progress: 65,
  },
  {
    id: 6,
    name: "Node.js",
    imageSrc: "https://i.ibb.co/yXMPR8H/Ico-nodejs.webp",
    experience: 2,
    unite: "Years",
    progress: 65,
  },
  {
    id: 7,
    name: "Nest.js",
    imageSrc:
      "https://d33wubrfki0l68.cloudfront.net/49c2be6f2607b5c12dd27f8ecc8521723447975d/f05c5/logo-small.cbbeba89.svg",
    experience: 2,
    unite: "Years",
    progress: 65,
  },
  {
    id: 8,
    name: "React Native",
    imageSrc: "https://i.ibb.co/KNdfSTf/Ico-react.webp",
    experience: 1,
    unite: "Years",
    progress: 40,
  },
  {
    id: 9,
    name: "Bootstrap",
    imageSrc: "https://i.ibb.co/ccgvtwm/Ico-bootstrap.webp",
    experience: 2,
    unite: "Years",
    progress: 65,
  },
  {
    id: 10,
    name: "Redux",
    imageSrc: "https://i.ibb.co/WtSQCgn/Ico-Redux.webp",
    experience: 1,
    unite: "Year",
    progress: 50,
  },
  {
    id: 11,
    name: "Sass",
    imageSrc: "https://i.ibb.co/m4tMJmK/Ico-sass.webp",
    experience: 3,
    unite: "Years",
    progress: 90,
  },
  {
    id: 12,
    name: "Material UI",
    imageSrc: "https://i.ibb.co/3RfrK69/Ico-MUI.webp",
    experience: 3,
    unite: "Years",
    progress: 90,
  },
];
