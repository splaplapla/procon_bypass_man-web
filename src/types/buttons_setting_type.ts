import { Button } from "./button";
import { LayerKey } from "./layer_key";

export type Flip = {
  if_pressed?: Array<Button>,
  enable: Boolean,
  force_neutral?: Array<Button>,
}

export type StructMacro = {
  name: string,
  if_pressed: Array<Button>,
}

export type Macro = {
  [key in string]: Array<Button>;
}

export type Remap = {
  to: Array<Button>,
}

export type ButtonInLayer = {
  flip?: Flip,
  macro?: Macro, // deprecated
  remap?: Remap,
  open: boolean,
}

type _ButtonsInLayer = {
  [key in Button] : ButtonInLayer;
}

export type ButtonsInLayer = _ButtonsInLayer & {
  macro?: Macro; // TODO macroTableという名前にしたい
};

export type InstalledPlugin = {
  [key in string]: boolean;
}

export type Layers = {
  up: ButtonsInLayer,
  right: ButtonsInLayer,
  down: ButtonsInLayer,
  left: ButtonsInLayer,
  installed_macros?: InstalledPlugin,
  installed_modes?: InstalledPlugin,
}

export type ButtonsSettingType = {
  prefix_keys_for_changing_layer: Array<Button>;
  layers: Layers;
}
