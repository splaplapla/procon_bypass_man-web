import { buttons, Button } from "../types/button";
import { LayerKey } from "../types/layer_key";
import { Layers, Flip, Remap } from "../types/buttons_setting_type";

export const disableFlipType = Symbol('disableFlip');
export const alwaysFlipType = Symbol('alwaysFlip');
export const flipIfPressedSelfType = Symbol('flipIfPressedSelf');
export const flipIfPressedSomeButtonsType = Symbol('flipIfPressedSomeButtons');
export const ignoreButtonsInFlipingType = Symbol('ignoreButtonsInFliping');
export const remapType = Symbol('remap');
export const openMenuType = Symbol('openMenu');
export const closeMenuType = Symbol('closeMenu');

type ACTION_TYPE =
    | { type: typeof disableFlipType, payload: { layerKey: LayerKey, button: Button } }
    | { type: "alwaysFlip", payload: { layerKey: LayerKey, button: Button } }
    | { type: "flipIfPressedSelf", payload: { layerKey: LayerKey, button: Button } }
    | { type: "flipIfPressedSomeButtons", payload: { layerKey: LayerKey, button: Button, targetButtons: Array<Button> } }
    | { type: "ignoreButtonsInFliping", payload: { layerKey: LayerKey, button: Button, targetButtons: Array<Button> } }
    | { type: "remap", payload: { layerKey: LayerKey, button: Button, targetButtons: Array<Button> } }
    | { type: "openMenu", payload: { layerKey: LayerKey, button: Button } }
    | { type: "closeMenu", payload: { layerKey: LayerKey, button: Button } }

export const LayerReducer = (layers: Layers, action: ACTION_TYPE) => {
  const layerKey = action.payload.layerKey;
  const button = action.payload.button;
  const flip = layers[layerKey][button].flip || {} as Flip
  const remap = layers[layerKey][button].remap || {} as Remap

  switch (action.type) {
    case disableFlipType:
      flip.enable = false;
      layers[layerKey][button] = { flip: flip, open: true }
      return { ...layers };
    case "alwaysFlip":
      flip.if_pressed = [];
      flip.enable = true;
      layers[layerKey][button] = { flip: flip, open: true }
      return { ...layers };
    case "flipIfPressedSelf":
      flip.if_pressed = [button];
      flip.enable = true;
      layers[layerKey][button] = { flip: flip, open: true }
      return { ...layers };
    case "flipIfPressedSomeButtons":
      flip.if_pressed = action.payload.targetButtons;
      flip.enable = true;
      layers[layerKey][button] = { flip: flip, open: true }
      return { ...layers };
    case "ignoreButtonsInFliping":
      flip.force_neutral = action.payload.targetButtons;
      layers[layerKey][button] = { flip: flip, open: true }
      return { ...layers };
    case "remap":
      flip.enable = false;
      remap.to = action.payload.targetButtons;
      layers[layerKey][button] = { flip: flip, remap: remap, open: true }
      return { ...layers };
    case "openMenu":
      flip.enable = false;
      layers[layerKey][button] = { flip: flip, open: true };
      return { ...layers };
    case "closeMenu":
      flip.enable = false;
      layers[layerKey][button] = { flip: flip, open: false }
      return { ...layers };
    default:
      return { ...layers };
  }
};
