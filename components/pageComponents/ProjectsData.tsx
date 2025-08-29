import { BsRegex } from "react-icons/bs";
import { DiScrum } from "react-icons/di";
import {
  FaReact,
  FaNodeJs,
  FaAngular,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaDocker,
  FaGitAlt,
  FaFigma,
  FaLinux,
  FaPhp,
} from "react-icons/fa";
import { RiRemixRunFill } from "react-icons/ri";
import {
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiLaravel,
  SiNextdotjs,
  SiMysql,
} from "react-icons/si";

export const ProjectsData = [
  {
    name: "Financial Manager",
    language: "English",
    gif: "/financial_manager.gif",
    gifAlt: "Finalcial Manager Screen Recorded",
    img: "/financial_manager.png",
    imgAlt: "Finalcial Manager Screen",
    sourceCode:
      "https://github.com/jhonatanAlanFerreira/financial_manager_remix",
    description: `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis.`,
    stackIcons: [
      {
        icon: <FaReact className="text-sky-400" />,
        name: "React",
        link: "https://react.dev/",
      },
      {
        icon: <FaNodeJs className="text-green-500" />,
        name: "Node.js",
        link: "https://nodejs.org/en/docs",
      },
      {
        icon: <FaHtml5 className="text-orange-400" />,
        name: "HTML5",
        link: "https://developer.mozilla.org/docs/Web/HTML",
      },
      {
        icon: <FaCss3Alt className="text-blue-400" />,
        name: "CSS3",
        link: "https://developer.mozilla.org/docs/Web/CSS",
      },
      {
        icon: <SiTypescript className="text-blue-600" />,
        name: "TypeScript",
        link: "https://www.typescriptlang.org/docs/",
      },
      {
        icon: <SiTailwindcss className="text-sky-500" />,
        name: "Tailwind CSS",
        link: "https://tailwindcss.com/docs",
      },
      {
        icon: <SiMongodb className="text-green-600" />,
        name: "MongoDB",
        link: "https://www.mongodb.com/docs/",
      },
      {
        icon: <SiGraphql className="text-pink-500" />,
        name: "GraphQL",
        link: "https://graphql.org/learn/",
      },
      {
        icon: <RiRemixRunFill className="text-purple-500" />,
        name: "Remix",
        link: "https://remix.run/docs",
      },
      {
        icon: <FaDocker className="text-blue-400" />,
        name: "Docker",
        link: "https://docs.docker.com/",
      },
      {
        icon: <FaGitAlt className="text-orange-500" />,
        name: "Git",
        link: "https://git-scm.com/doc",
      },
    ],
  },
];
