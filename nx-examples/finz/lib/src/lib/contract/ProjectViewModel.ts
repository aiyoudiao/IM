import { UUID } from "crypto";
import { TableViewModel } from "./TableViewModel";

export interface ProjectViewModel {
  id: UUID;
  name: string;
  tables: TableViewModel[];
}