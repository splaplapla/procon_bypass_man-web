import { buttons, Button } from "../types/button";
import { LayerKey } from "../types/layer_key";
import {
  Layers,
  Flip,
  Remap,
  Macro,
  StructMacro,
  ModeTable,
  StructMode,
} from "../types/buttons_setting_type";

export const disableFlipType = Symbol("disableFlip");
export const alwaysFlipType = Symbol("alwaysFlip");
export const flipIfPressedSelfType = Symbol("flipIfPressedSelf");
export const flipIfPressedSomeButtonsType = Symbol("flipIfPressedSomeButtons");
export const ignoreButtonsInFlipingType = Symbol("ignoreButtonsInFliping");
export const remapType = Symbol("remap");
export const openMenuType = Symbol("openMenu");
export const closeMenuType = Symbol("closeMenu");
export const applyMacroType = Symbol("applyMacro");
export const installMacroType = Symbol("installedMacro");
export const uninstallMacroType = Symbol("uninstalledMacro");
export const installModeType = Symbol("uninstalledMacro");
export const uninstallModeType = Symbol("a");
export const applyModeType = Symbol("b");

type ACTION_TYPE =
  | {
      type: typeof disableFlipType;
      payload: { layerKey: LayerKey; button: Button };
    }
  | {
      type: typeof alwaysFlipType;
      payload: { layerKey: LayerKey; button: Button };
    }
  | {
      type: typeof flipIfPressedSelfType;
      payload: { layerKey: LayerKey; button: Button };
    }
  | {
      type: typeof flipIfPressedSomeButtonsType;
      payload: {
        layerKey: LayerKey;
        button: Button;
        targetButtons: Array<Button>;
      };
    }
  | {
      type: typeof ignoreButtonsInFlipingType;
      payload: {
        layerKey: LayerKey;
        button: Button;
        targetButtons: Array<Button>;
      };
    }
  | {
      type: typeof remapType;
      payload: {
        layerKey: LayerKey;
        button: Button;
        targetButtons: Array<Button>;
      };
    }
  | {
      type: typeof openMenuType;
      payload: { layerKey: LayerKey; button: Button };
    }
  | {
      type: typeof closeMenuType;
      payload: { layerKey: LayerKey; button: Button };
    }
  | {
      type: typeof applyMacroType;
      payload: {
        layerKey: LayerKey;
        button: Button | undefined;
        macro: StructMacro;
      };
    }
  | {
      type: typeof installMacroType;
      payload: {
        layerKey: LayerKey | undefined;
        button: Button | undefined;
        installed_macro: string;
      };
    }
  | {
      type: typeof uninstallMacroType;
      payload: {
        layerKey: LayerKey | undefined;
        button: Button | undefined;
        installed_macro: string;
      };
    }
  | {
      type: typeof installModeType;
      payload: {
        layerKey: LayerKey | undefined;
        button: Button | undefined;
        installed_mode: string;
      };
    }
  | {
      type: typeof uninstallModeType;
      payload: {
        layerKey: LayerKey | undefined;
        button: Button | undefined;
        installed_mode: string;
      };
    }
  | {
      type: typeof applyModeType;
      payload: {
        layerKey: LayerKey;
        button: Button | undefined;
        mode: StructMode;
      };
    };

export const LayerReducer = (layers: Layers, action: ACTION_TYPE) => {
  const layerKey = action.payload.layerKey as LayerKey;
  const button = action.payload.button as Button;

  const flip =
    (layerKey && button && layers[layerKey][button]?.flip) || ({} as Flip);
  const remap =
    (layerKey && button && layers[layerKey][button]?.remap) || ({} as Remap);

  switch (action.type) {
    case disableFlipType:
      flip.enable = false;
      layers[layerKey][button] = { flip: flip, open: true };
      return { ...layers };
    case alwaysFlipType:
      flip.if_pressed = [];
      flip.enable = true;
      layers[layerKey][button] = { flip: flip, open: true };
      return { ...layers };
    case flipIfPressedSelfType:
      flip.if_pressed = [button];
      flip.enable = true;
      layers[layerKey][button] = { flip: flip, open: true };
      return { ...layers };
    case flipIfPressedSomeButtonsType:
      flip.if_pressed = action.payload.targetButtons;
      flip.enable = true;
      layers[layerKey][button] = { flip: flip, open: true };
      return { ...layers };
    case ignoreButtonsInFlipingType:
      flip.force_neutral = action.payload.targetButtons;
      layers[layerKey][button] = { flip: flip, open: true };
      return { ...layers };
    case remapType:
      flip.enable = false;
      remap.to = action.payload.targetButtons;
      layers[layerKey][button] = { flip: flip, remap: remap, open: true };
      return { ...layers };
    case openMenuType:
      flip.enable = false;
      layers[layerKey][button] = { flip: flip, open: true };
      return { ...layers };
    case closeMenuType:
      flip.enable = false;
      layers[layerKey][button] = { flip: flip, open: false };
      return { ...layers };
    case applyMacroType:
      const structMacro = action.payload.macro;
      if (!structMacro) {
        return { ...layers };
      }
      const macroTable = (layers[layerKey].macro as Macro) || ({} as Macro);
      macroTable[structMacro.name] = structMacro.if_pressed.sort();
      layers[layerKey].macro = macroTable;
      return { ...layers };
    case installMacroType:
      const installedMacro = action.payload.installed_macro;
      const h = { ...layers };
      h.installed_macros ||= {};
      h.installed_macros[installedMacro] = true;
      return h;
    case uninstallMacroType:
      const unregisterInstalledMacro = action.payload.installed_macro;
      const hh = { ...layers };
      hh.installed_macros ||= {};
      hh.installed_macros[unregisterInstalledMacro] = false;
      return hh;
    case installModeType:
      const installedMode = action.payload.installed_mode;
      const l = { ...layers };
      l.installed_modes ||= {};
      l.installed_modes[installedMode] = true;
      return l;
    case uninstallModeType:
      const uninstallMode = action.payload.installed_mode;
      const uml = { ...layers };
      uml.installed_modes ||= {};
      uml.installed_modes[uninstallMode] = false;
      return uml;
    case applyModeType:
      const applyMode = action.payload.mode;
      layers[layerKey].mode = { [applyMode.name]: true };
      return { ...layers };
    default:
      console.log("一致しないaction typeです");
      return { ...layers };
  }
};
