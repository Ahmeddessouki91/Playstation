import { Cateogry } from './Category';

export interface Game {
    _id: string,
    name: string,
    category: Cateogry,
    avaliable: boolean
}