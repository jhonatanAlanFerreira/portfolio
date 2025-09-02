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
  SiBootstrap,
  SiExpress,
  SiPrisma,
  SiSqlite,
  SiReact,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";

export const icons = {
  react: {
    icon: <FaReact className="text-sky-400" />,
    name: "React",
    link: "https://react.dev/",
  },

  node: {
    icon: <FaNodeJs className="text-green-500" />,
    name: "Node.js",
    link: "https://nodejs.org/en/docs",
  },

  angular: {
    icon: <FaAngular className="text-red-500" />,
    name: "Angular",
    link: "https://angular.io/docs",
  },

  html: {
    icon: <FaHtml5 className="text-orange-400" />,
    name: "HTML5",
    link: "https://developer.mozilla.org/docs/Web/HTML",
  },

  css: {
    icon: <FaCss3Alt className="text-blue-400" />,
    name: "CSS3",
    link: "https://developer.mozilla.org/docs/Web/CSS",
  },

  javascript: {
    icon: <FaJsSquare className="text-yellow-400" />,
    name: "JavaScript",
    link: "https://developer.mozilla.org/docs/Web/JavaScript",
  },

  typescript: {
    icon: <SiTypescript className="text-blue-600" />,
    name: "TypeScript",
    link: "https://www.typescriptlang.org/docs/",
  },

  tailwind: {
    icon: <SiTailwindcss className="text-sky-500" />,
    name: "Tailwind CSS",
    link: "https://tailwindcss.com/docs",
  },

  mongodb: {
    icon: <SiMongodb className="text-green-600" />,
    name: "MongoDB",
    link: "https://www.mongodb.com/docs/",
  },

  postgresql: {
    icon: <SiPostgresql className="text-blue-700" />,
    name: "PostgreSQL",
    link: "https://www.postgresql.org/docs/",
  },

  graphql: {
    icon: <SiGraphql className="text-pink-500" />,
    name: "GraphQL",
    link: "https://graphql.org/learn/",
  },

  php: {
    icon: <FaPhp className="text-indigo-500" />,
    name: "PHP",
    link: "https://www.php.net/docs.php",
  },

  laravel: {
    icon: <SiLaravel className="text-red-600" />,
    name: "Laravel",
    link: "https://laravel.com/docs",
  },

  nextjs: {
    icon: <SiNextdotjs className="text-sky-300" />,
    name: "Next.js",
    link: "https://nextjs.org/docs",
  },

  remix: {
    icon: <RiRemixRunFill className="text-purple-500" />,
    name: "Remix",
    link: "https://remix.run/docs",
  },

  docker: {
    icon: <FaDocker className="text-blue-400" />,
    name: "Docker",
    link: "https://docs.docker.com/",
  },

  git: {
    icon: <FaGitAlt className="text-orange-500" />,
    name: "Git",
    link: "https://git-scm.com/doc",
  },

  linux: {
    icon: <FaLinux className="text-gray-400" />,
    name: "Linux",
    link: "https://www.kernel.org/doc/html/latest/",
  },

  figma: {
    icon: <FaFigma className="text-pink-500" />,
    name: "Figma",
    link: "https://help.figma.com/hc/en-us",
  },

  scrum: {
    icon: <DiScrum className="text-yellow-400" />,
    name: "Agile / Scrum",
    link: "https://www.scrum.org/resources/scrum-guide",
  },

  regex: {
    icon: <BsRegex className="text-teal-400" />,
    name: "Regex",
    link: "https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_expressions",
  },

  mysql: {
    icon: <SiMysql className="text-blue-500" />,
    name: "MySQL",
    link: "https://dev.mysql.com/doc/",
  },

  bootstrap: {
    icon: <SiBootstrap className="text-purple-600" />,
    name: "Bootstrap",
    link: "https://getbootstrap.com/docs/",
  },

  express: {
    icon: <SiExpress className="text-gray-800" />,
    name: "Express",
    link: "https://expressjs.com/",
  },

  prisma: {
    icon: <SiPrisma className="text-cyan-600" />,
    name: "Prisma",
    link: "https://www.prisma.io/docs",
  },

  sql: {
    icon: <TbSql className="text-blue-600" />,
    name: "SQL",
    link: "https://www.w3schools.com/sql/",
  },
};

export const reactNativeIcons = {
  sqlite: {
    icon: <SiSqlite className="text-blue-500" />,
    name: "SQLite",
    link: "https://www.sqlite.org/docs.html",
  },
  nativewind: {
    icon: <SiTailwindcss className="text-sky-500" />,
    name: "NativeWind",
    link: "https://www.nativewind.dev/",
  },
  react_native: {
    icon: <SiReact className="text-cyan-400" />,
    name: "React Native",
    link: "https://reactnative.dev/docs/getting-started",
  },
};
