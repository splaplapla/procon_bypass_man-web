import { LayerKey, layerKeys } from "../types/layer_key";
import { Macro, Remap, Flip, Layers, ButtonsInLayer } from "../types/buttons_setting_type";
import { Button, buttons } from "../types/button";

type Props = {
  prefixKeys: Array<Button>;
  layers: Layers;
};
export const ButtonsSettingConverter = ({ prefixKeys, layers }: Props) => {
  const layerBlock = (layerKey: LayerKey) => {
    return `layer :${layerKey} do`;
  }
  type defineButtonMethodProps = {
    layer: ButtonsInLayer;
    button: Button;
  };
  const createButtonMethod = ({ layer , button }: defineButtonMethodProps) => {
    const flip = layer[button].flip;
    const remap = layer[button].remap;
    const macro = layer[button].macro;
    if(flip && flip.enable) {
      if(!flip.if_pressed) { return }
      if(flip.if_pressed.length === 0) {
        return `flip :${button}${(flip.force_neutral || "") && `, force_neutral: %i(${flip.force_neutral?.join(" ")})`}`;
      } else {
        // ex) flip :a
        //     flip :a, if_pressed: [:b]
        return `flip :${button}${(flip.if_pressed || "") && `, if_pressed: %i(${flip.if_pressed?.join(" ")})`}${(flip.force_neutral || "") && `, force_neutral: %i(${flip.force_neutral?.join(" ")})`}`;
      }
    } else { // flipとremapは共存できないのでelseにする
      if(remap) {
        return `remap:${button}${(remap.to || "") && `, to: %i(${remap.to.join(" ")})`}`;
      }
    }
    if(macro) {
      // TODO
    }

    return null;
  }
  const layerBlockIndent = "    ";

  return(
`version: 1.0
setting: |-
  prefix_keys_for_changing_layer %i(${prefixKeys.join(" ")})
  ${buttons.reduce((a, b) => {
    const m = createButtonMethod({ layer: layers.up, button: b })
    if(m) { a = a + `\n${layerBlockIndent}` + m }
    return a;
  }, layerBlock("up"))}
  end
  ${buttons.reduce((a, b) => {
    const m = createButtonMethod({ layer: layers.right, button: b })
    if(m) { a = a + `\n${layerBlockIndent}` + m }
    return a;
  }, layerBlock("right"))}
  end
  ${buttons.reduce((a, b) => {
    const m = createButtonMethod({ layer: layers.down, button: b })
    if(m) { a = a + `\n${layerBlockIndent}` + m }
    return a;
  }, layerBlock("down"))}
  end
  ${buttons.reduce((a, b) => {
    const m = createButtonMethod({ layer: layers.left, button: b })
    if(m) { a = a + `\n${layerBlockIndent}` + m }
    return a;
  }, layerBlock("left"))}
  end`)
}
