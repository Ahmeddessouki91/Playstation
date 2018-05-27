import { Game } from "./Game";

export interface Time {
    _id: String,
    game: Game,
    isLimited: Boolean,
    isMulti: Boolean,
    startTime: Date,
    endTime: Date,
    isCheckout: Date
}