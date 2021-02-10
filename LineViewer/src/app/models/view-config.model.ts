import { LineTypeEnum } from "./lineType.enum";
import { ViewTypeEnum } from "./viewType.enum";

export interface ViewConfig {
    viewType: ViewTypeEnum,
    lineType: LineTypeEnum,
    time: string,
}