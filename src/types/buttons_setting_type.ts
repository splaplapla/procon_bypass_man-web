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
  to: Button,
}

export type ButtonInLayer = {
    [key in Button]? : {
      flip?: Flip,
      macro?: Macro,
      remap?: Remap,
    } | boolean
}

export type Layers = {
  [key in LayerKey]? : ButtonInLayer
}

export type ButtonsSettingType = {
  prefix_keys_for_changing_layer: Array<Button>;
  layers: Layers;
}
