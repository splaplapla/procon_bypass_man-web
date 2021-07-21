import { Button } from "./button";
import { LayerKey } from "./layer_key";

export type Flip = {
  if_pressed?: Array<Button>,
  force_neutral?: Array<Button>,
}

export type Macro = {
  if_pressed: Array<Button>,
}

export type Remap = {
  to: Array<Button>,
}

export type ButtonInLayer = {
  flip?: Flip,
  macro?: Macro,
  remap?: Remap,
}

export type ButtonsInLayer = {
  [key in Button] : ButtonInLayer
}

export type Layers = {
  up: ButtonsInLayer,
  right: ButtonsInLayer,
  down: ButtonsInLayer,
  left: ButtonsInLayer,
}

export type ButtonsSettingType = {
  prefix_keys_for_changing_layer: Array<Button>;
  layers: Layers;
}
