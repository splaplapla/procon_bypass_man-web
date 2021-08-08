import { buttons, Button } from "../types/button";
import { LayerKey } from "../types/layer_key";
import { Layers, Flip, Remap, Macro } from "../types/buttons_setting_type";

export const disableFlipType = Symbol('disableFlip');
export const alwaysFlipType = Symbol('alwaysFlip');
export const flipIfPressedSelfType = Symbol('flipIfPressedSelf');
export const flipIfPressedSomeButtonsType = Symbol('flipIfPressedSomeButtons');
export const ignoreButtonsInFlipingType = Symbol('ignoreButtonsInFliping');
export const remapType = Symbol('remap');
export const openMenuType = Symbol('openMenu');
export const closeMenuType = Symbol('closeMenu');
export const applyMacrosType = Symbol('applyMacros');

type ACTION_TYPE =
    | { type: typeof disableFlipType, payload: { layerKey: LayerKey, button: Button } }
    | { type: typeof alwaysFlipType, payload: { layerKey: LayerKey, button: Button } }
    | { type: typeof flipIfPressedSelfType, payload: { layerKey: LayerKey, button: Button } }
    | { type: typeof flipIfPressedSomeButtonsType, payload: { layerKey: LayerKey, button: Button, targetButtons: Array<Button> } }
    | { type: typeof ignoreButtonsInFlipingType, payload: { layerKey: LayerKey, button: Button, targetButtons: Array<Button> } }
    | { type: typeof remapType, payload: { layerKey: LayerKey, button: Button, targetButtons: Array<Button> } }
    | { type: typeof openMenuType, payload: { layerKey: LayerKey, button: Button } }
    | { type: typeof closeMenuType, payload: { layerKey: LayerKey, button: Button } }
    | { type: typeof applyMacrosType, payload: { layerKey: LayerKey, button: Button | undefined, macros: Array<Macro> } }

export const LayerReducer = (layers: Layers, action: ACTION_TYPE) => {
  const layerKey = action.payload.layerKey;
  const button = action.payload.button as Button;
  let flip =  {} as Flip
  let remap = {} as Remap
  if(button) {
    flip = layers[layerKey][button].flip || {} as Flip
    remap = layers[layerKey][button].remap || {} as Remap
  }
  const macros = layers[layerKey].macro  || []

  switch (action.type) {
    case disableFlipType:
      flip.enable = false;
      layers[layerKey][button] = { flip: flip, open: true }
      return { ...layers };
    case alwaysFlipType:
      flip.if_pressed = [];
      flip.enable = true;
      layers[layerKey][button] = { flip: flip, open: true }
      return { ...layers };
    case flipIfPressedSelfType:
      flip.if_pressed = [button];
      flip.enable = true;
      layers[layerKey][button] = { flip: flip, open: true }
      return { ...layers };
    case flipIfPressedSomeButtonsType:
      flip.if_pressed = action.payload.targetButtons;
      flip.enable = true;
      layers[layerKey][button] = { flip: flip, open: true }
      return { ...layers };
    case ignoreButtonsInFlipingType:
      flip.force_neutral = action.payload.targetButtons;
      layers[layerKey][button] = { flip: flip, open: true }
      return { ...layers };
    case remapType:
      flip.enable = false;
      remap.to = action.payload.targetButtons;
      layers[layerKey][button] = { flip: flip, remap: remap, open: true }
      return { ...layers };
    case openMenuType:
      flip.enable = false;
      layers[layerKey][button] = { flip: flip, open: true };
      return { ...layers };
    case closeMenuType:
      flip.enable = false;
      layers[layerKey][button] = { flip: flip, open: false }
      return { ...layers };
    case applyMacrosType:
      flip.enable = false;
      // TODO add payload
      layers[layerKey]["macro"] = []
      return { ...layers };
    default:
      console.log("一致しないaction typeです")
      return { ...layers };
  }
};
