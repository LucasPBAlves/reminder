export enum CollectionColors {
    Orange = "bg-gradient-to-r from-orange-600 to-orange-500",
    Red = "bg-gradient-to-r from-red-600 to-red-500",
    Purple = "bg-gradient-to-r from-violet-500 to-purple-500",
    Blue = "bg-gradient-to-r from-indigo-400 to-cyan-400",
    Yellow = "bg-gradient-to-r from-yellow-500 to-yellow-400",
    Green = "bg-gradient-to-r from-emerald-600 to-emerald-500",
    Gray = "bg-gradient-to-r from-slate-700 to-slate-600",
}

export type CollectionColor = keyof typeof CollectionColors;