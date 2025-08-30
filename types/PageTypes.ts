export type PageSections = "PROJECTS" | "WORK" | "CONTACT" | "WIDGETS";

export type SectionFragments = {
  [key in PageSections]: React.RefObject<HTMLDivElement | null>;
};
