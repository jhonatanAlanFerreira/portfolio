import {
  developer_manager_icons,
  financial_manager_icons,
  git_search_icons,
  portfolio,
  react_native_simple_todo_icons,
} from "./ProjectsIcons";

export const ProjectsData = [
  {
    name: "Financial Manager (2025)",
    language: "English",
    gifs: [
      "/screenshots/financialManager/financial_manager.webp",
      "/screenshots/financialManager/financial_manager_login.webp",
    ],
    gifAlt: "Finalcial Manager Screen Recorded",
    img: "/screenshots/financialManager/financial_manager.png",
    imgAlt: "Finalcial Manager Screenshot",
    sourceCode:
      "https://github.com/jhonatanAlanFerreira/financial_manager_remix",
    description: `A personal financial manager built with Remix and React. It allows users to manage expenses, income, transactions, and balances in a simple and organized way.`,
    stackIcons: financial_manager_icons,
  },
  {
    name: "React Native Simple Todo (2025)",
    language: "English",
    gifs: [
      "/screenshots/todoApp/todo-app.webp",
      "/screenshots/todoApp/todo-app-scrolling.webp",
    ],
    gifAlt: "",
    img: "/screenshots/todoApp/todo-app.png",
    imgAlt: "Todo App Screenshot",
    sourceCode:
      "https://github.com/jhonatanAlanFerreira/react-native-simple-to-do",
    description: `A Todo app built with React Native that supports multiple lists. It allows users to create, update, and organize tasks across different lists, with persistent storage powered by SQLite for offline access.`,
    stackIcons: react_native_simple_todo_icons,
  },
  {
    name: "Git Search (2022)",
    language: "Portuguese",
    gifs: ["/screenshots/gitSearch/git_search.webp"],
    gifAlt: "Git Search Screen",
    img: "/screenshots/gitSearch/git_search.png",
    imgAlt: "Git Search Screenshot",
    sourceCode: "https://github.com/jhonatanAlanFerreira/Git-Search",
    description: `A GitHub search app built with React that allows users to find repositories and developers through GitHub API integration.`,
    stackIcons: git_search_icons,
  },
  {
    name: "Developer Manager (2022)",
    language: "Portuguese",
    gifs: [
      "/screenshots/developerManager/developer_manager.webp",
      "/screenshots/developerManager/developer_manager_show_list.webp",
    ],
    gifAlt: "Developer Manager Screenshot",
    img: "/screenshots/developerManager/developer_manager.png",
    imgAlt: "Developer Manager Screen",
    sourceCode: "https://github.com/jhonatanAlanFerreira/Developer-Manager",
    description: `A Developer Manager app built with Angular and Node.js as part of a company assessment. It demonstrates handling CRUD operations, structured data management, and front-end/back-end integration.`,
    stackIcons: developer_manager_icons,
  },
  {
    name: "Portfolio (2025)",
    language: "English",
    gifs: [],
    gifAlt: null,
    img: null,
    imgAlt: null,
    sourceCode: "https://github.com/jhonatanAlanFerreira/portfolio",
    description: `This portfolio, built with React, showcases my projects and highlights my full-stack development experience.`,
    stackIcons: portfolio,
  },
];
