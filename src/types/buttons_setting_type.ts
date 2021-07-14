import { Button } from "./button";
import { LayerKey } from "./layer_key";

type Flip = {
  if_pressed?: Array<Button>,
  force_neutral?: Button,
}

type Macro = {
  if_pressed: Array<Button>,
}

type Remap = {
  to: Button,
}

export type ButtonsSettingType = {
  prefix_keys_for_changing_layer: Array<Button>;
  layers: {
    [key in LayerKey]? : {
      [key in Button]? : {
        flip?: Flip,
        macro?: Macro,
        remap?: Remap,
      } | false
    }
  }
}
