const Colors = ["primary", "secondary", "accent", "info", "error", "success", "warning"] as const

export type Color = typeof Colors[number]
