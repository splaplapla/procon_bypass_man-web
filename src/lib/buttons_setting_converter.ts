import { LayerKey, layerKeys } from "../types/layer_key";
import { Macro, Remap, Flip, Layers } from "../types/buttons_setting_type";
import { Button, buttons } from "../types/button";

type Props = {
  prefixKey: any;
  layers: Layers;
};
export const ButtonsSettingConverter = ({ prefixKey, layers }: Props) => {
  const layerBlock = (name: LayerKey) => {
    return `layer :right do
    `
  }
  type defineButtonMethodProps = {
    macro?: Macro;
    remap?: Remap;
    flip?: Flip;
    button: Button;
  };
  const defineButtonMethod = ({ macro, remap, flip, button }: defineButtonMethodProps) => {
    if(flip) {
      debugger;
        // ex) flip :a
        return `flip :${button}${(flip.if_pressed || "") && `, if_pressed: %i(${flip.if_pressed})`}
`
    }
    if(remap) {
    }
    if(macro) {
      // TODO
    }
  }

  if(!layers || !layers.up) { return };

  return(
`version: 1.0
setting: |-
  prefix_keys_for_changing_layer [${prefixKey.join(" ")}]
  ${buttons.reduce((a, b) => {
    a = a + defineButtonMethod({ flip: (layers && layers.up[b] && layers.up[b].flip), remap: layers.up[b].remap, macro: layers.up[b].macro, button: b }); return a;
  }, layerBlock("up")) + "end"}
  ${layers.right && buttons.reduce((a, b) => { a = a + b ; return a }, layerBlock("right"))}
  ${layers.down && buttons.reduce((a, b) => { a = a + b ; return a }, layerBlock("down"))}
  ${layers.left && buttons.reduce((a, b) => { a = a + b ; return a }, layerBlock("left"))}
  `)
}
