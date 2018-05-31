import { Game } from "./Game";

export interface Time {
    _id: String,
    game: Game,
    isLimited: Boolean,
    isMulti: Boolean,
    startTime: Date,
    isCheckout: Boolean,
    usedTime: Number,
    limitedTime: Number,
    isPause: Boolean,
    isFinish: Boolean
}