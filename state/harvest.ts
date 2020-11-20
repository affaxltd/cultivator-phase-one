import { createContext } from "react";
import { Pool } from "../types/harvest";

export interface HarvestState {
	loaded: boolean;
	pools: Pool[];
}

export const HarvestContext = createContext<HarvestState>({
	loaded: false,
	pools: [],
});
