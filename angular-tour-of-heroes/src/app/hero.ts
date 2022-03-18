import { Poderes } from "./poderes";

export interface Hero {
  id: number;
  name: string;
  poder: Poderes[];
}
