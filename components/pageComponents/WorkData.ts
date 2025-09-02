import { formatWorkPeriod } from "@/utils";
import { icons } from "../TechCarousel/Icons";

export const WorkData = [
  {
    company: "Ambra Gaming",
    role: "Full Stack Developer",
    period: formatWorkPeriod("2022-01"),
    location: "Remote",
    responsibilities: [
      "Developed and maintained full-stack applications for gaming solutions",
      "Collaborated with cross-functional teams using Scrum methodologies",
      "Improved system performance and scalability with modern web technologies",
    ],
    stack: [icons.react, icons.node, icons.docker, icons.git],
  },
  {
    company: "Guardiã Digital",
    role: "Full Stack Developer",
    period: formatWorkPeriod("2019-05", "2021-11"),
    location: "São José do Rio Preto, São Paulo, Brazil (On-site)",
    responsibilities: [
      "Built and maintained digital document management systems",
      "Implemented secure storage and retrieval processes",
      "Optimized legacy applications and improved usability",
    ],
    stack: [icons.angular, icons.typescript, icons.mysql, icons.git],
  },
];
