import { UUID } from "crypto";
import { PropertyState, TableState } from "./State";

export interface TableViewModel {
  name: string;
	propertyList: PropertyViewModel[];
	state: TableState;
}

export interface PropertyViewModel {
	id: UUID;
  name: string;
	state: PropertyState;
}