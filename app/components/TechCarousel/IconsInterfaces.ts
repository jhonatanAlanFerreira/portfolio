import { ReactElement, SVGProps } from "react";

export interface IconInterface {
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  name: string;
  link: string;
}
