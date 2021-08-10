import { buttons, Button } from "../types/button";
import { LayerKey } from "../types/layer_key";
import { Layers, Flip, Remap, Macro, StructMacro } from "../types/buttons_setting_type";

export const disableFlipType = Symbol('disableFlip');
export const alwaysFlipType = Symbol('alwaysFlip');
export const flipIfPressedSelfType = Symbol('flipIfPressedSelf');
export const flipIfPressedSomeButtonsType = Symbol('flipIfPressedSomeButtons');
export const ignoreButtonsInFlipingType = Symbol('ignoreButtonsInFliping');
export const remapType = Symbol('remap');
export const openMenuType = Symbol('openMenu');
export const closeMenuType = Symbol('closeMenu');
export const applyMacroType = Symbol('applyMacro');
export const registerInstalledMacroType = Symbol('installedMacro');
export const unregisterInstalledMacroType = Symbol('uninstalledMacro');

type ACTION_TYPE =
    | { type: typeof disableFlipType, payload: { layerKey: LayerKey, button: Button } }
    | { type: typeof alwaysFlipType, payload: { layerKey: LayerKey, button: Button } }
    | { type: typeof flipIfPressedSelfType, payload: { layerKey: LayerKey, button: Button } }
    | { type: typeof flipIfPressedSomeButtonsType, payload: { layerKey: LayerKey, button: Button, targetButtons: Array<Button> } }
    | { type: typeof ignoreButtonsInFlipingType, payload: { layerKey: LayerKey, button: Button, targetButtons: Array<Button> } }
    | { type: typeof remapType, payload: { layerKey: LayerKey, button: Button, targetButtons: Array<Button> } }
    | { type: typeof openMenuType, payload: { layerKey: LayerKey, button: Button } }
    | { type: typeof closeMenuType, payload: { layerKey: LayerKey, button: Button } }
    | { type: typeof applyMacroType, payload: { layerKey: LayerKey, button: Button | undefined, macro: StructMacro } }
    | { type: typeof registerInstalledMacroType, payload: { layerKey: (LayerKey | undefined), button: (Button | undefined), installed_macro: string } }
    | { type: typeof unregisterInstalledMacroType, payload: { layerKey: (LayerKey | undefined), button: (Button | undefined), installed_macro: string } }

export const LayerReducer = (layers: Layers, action: ACTION_TYPE) => {
  const layerKey = action.payload.layerKey as LayerKey;
  const button = action.payload.button as Button;

  const flip = layerKey && button && layers[layerKey][button]?.flip || {} as Flip
  const remap = layerKey && button && layers[layerKey][button]?.remap || {} as Remap

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
    case applyMacroType:
      const structMacro = action.payload.macro
      if(!structMacro) { return { ...layers } };
      const macroTable = layers[layerKey].macro as Macro || {} as Macro
      macroTable[structMacro.name] = structMacro.if_pressed.sort()
      layers[layerKey].macro = macroTable
      return { ...layers };
    case registerInstalledMacroType:
      const installedMacro = action.payload.installed_macro
      const h = { ...layers }
      if(installedMacro) {
        h.installed_macros ||= {}
        h.installed_macros[installedMacro] = true
      }
      return h;
    case unregisterInstalledMacroType:
      const unregisterInstalledMacro = action.payload.installed_macro
      const hh = { ...layers }
      if(unregisterInstalledMacro) {
        hh.installed_macros ||= {}
        hh.installed_macros[unregisterInstalledMacro] = false
      }
      return hh;
    default:
      console.log("一致しないaction typeです")
      return { ...layers };
  }
};
