export const layerKeys = ["up", "right", "down", "left"] as const;
export type LayerKey = typeof layerKeys[number];
