import project1Image from "@/assets/images/projects/project1.png";
import project2Image from "@/assets/images/projects/project2.png";
import project3Image from "@/assets/images/projects/project3.png";
import project4Image from "@/assets/images/projects/project4.jpg";
import { StaticImageData } from "next/image";

export type Project = {
  id: number;
  title: string;
  place: string;
  image: StaticImageData;
  alt: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Clôture et portail résidentiel",
    place: "Rouen",
    image: project1Image,
    alt: "Clôture et portail résidentiel",
  },
  {
    id: 2,
    title: "Pose de clôture",
    place: "Buchy",
    image: project2Image,
    alt: "Pose de clôture",
  },
  {
    id: 3,
    title: "Pose de portail",
    place: "Ry",
    image: project3Image,
    alt: "Pose de portail",
  },
  {
    id: 4,
    title: "Pose de clôture",
    place: "Isneauville",
    image: project4Image,
    alt: "Pose de clôture",
  },
];
