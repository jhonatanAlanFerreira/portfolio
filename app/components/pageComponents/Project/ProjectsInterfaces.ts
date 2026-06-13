import { IconInterface } from "@/app/components/TechCarousel/IconsInterfaces";

export interface Project {
  name: string;
  language: string;
  gifs: string[];
  sourceCode: string;
  description: string;
  stackIcons: IconInterface[];
  gifAlt: string | null;
  img: string | null;
  imgAlt: string | null;
  type: "youtube" | "local";
  youtubeLink?: string;
  liveDemoUrl?: string;
}
