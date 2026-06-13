import { financial_manager_icons, flowboard_icons } from "./ProjectsIcons";
import { Project } from "./ProjectsInterfaces";

export const ProjectsData: Project[] = [
  {
    name: "Flowboard — AI-Powered Task Management App (2026)",
    language: "English",
    gifs: [],
    gifAlt: null,
    img: null,
    imgAlt: null,
    sourceCode: "https://github.com/jhonatanAlanFerreira/flowboard",
    description: `AI-powered task management platform with drag-and-drop workflows, semantic tagging, and LLM-based content generation.
    Built with Angular, Laravel, and Python, featuring RAG-based context retrieval and Dockerized infrastructure for scalable development.`,
    stackIcons: flowboard_icons,
    type: "youtube",
    youtubeLink: "https://www.youtube.com/embed/ceiE2m6qCUk?si=lVK_UQka0FfQVxRV",
  },
  {
    name: "Financial Manager (2025)",
    language: "English",
    gifs: [
      "/screenshots/financialManager/financial_manager.mp4",
      "/screenshots/financialManager/financial_manager_login.mp4",
    ],
    gifAlt: "Finalcial Manager Screen Recorded",
    img: "/screenshots/financialManager/financial_manager.png",
    imgAlt: "Finalcial Manager Screenshot",
    sourceCode:
      "https://github.com/jhonatanAlanFerreira/financial_manager_remix",
    description: `Financial management app with transaction tracking, analytics visualization, and CSV export for reporting. Built with Remix and React, focusing on performance and clean UI architecture.`,
    stackIcons: financial_manager_icons,
    type: "local",
    liveDemoUrl: "https://financial-manager.jhonatanferreira.dev"
  },
];
