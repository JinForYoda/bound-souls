import { rawLevels } from "./definitions";
import { parseLevel } from "./parseLevel";

export const levels = rawLevels.map(parseLevel);
