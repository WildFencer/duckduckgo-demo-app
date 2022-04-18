import { ILink } from "./link.interface";

export interface IDuckDuckListAndHistory {
    links: Array<ILink>,
    queries: Array<string>
}