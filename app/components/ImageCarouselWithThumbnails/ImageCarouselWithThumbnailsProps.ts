import { Project } from "../pageComponents/Project/ProjectsInterfaces";

export interface ImageCarouselWithThumbnailsProps {
  project: Project;
  onFullScreen: (project: Project) => void;
}
