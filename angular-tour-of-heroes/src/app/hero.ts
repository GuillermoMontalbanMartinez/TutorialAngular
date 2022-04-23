import { Poderes } from "./poderes";

export interface Hero {
  id: number;
  name: string;
  image: string;
  poder: Poderes[];
}
