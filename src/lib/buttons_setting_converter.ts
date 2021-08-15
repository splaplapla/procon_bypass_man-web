import { LayerKey, layerKeys } from "../types/layer_key";
import { Macro, Remap, Flip, Layers, ButtonsInLayer } from "../types/buttons_setting_type";
import { Button, buttons } from "../types/button";

type Props = {
  prefixKeys: Array<Button>;
  layers: Layers;
};
export const ButtonsSettingConverter = ({ prefixKeys, layers }: Props) => {
  const layerBlock = (layerKey: LayerKey) => {
    const modeTable = layers[layerKey].mode || {}
    const currentMode = Object.keys(modeTable).toString();
    if(currentMode === "disable" || currentMode === '') {
      return `layer :${layerKey} do`;
    } else {
      const modeOption = `, mode: ${currentMode}`
      return `layer :${layerKey}${modeOption} do`;
    }
  }
  type defineButtonMethodProps = {
    layer: ButtonsInLayer;
    button: Button;
  };
  const buttons_with_macro = buttons
  const createButtonMethod = ({ layer , button }: defineButtonMethodProps) => {
    const flip = layer[button].flip;
    const remap = layer[button].remap;
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
        return `remap :${button}${(remap.to || "") && `, to: %i(${remap.to.join(" ")})`}`;
      }
    }
    return null;
  }
  const layerBlockIndent = "    ";
  const topLevelIndent = "  ";
  if(!layers.installed_macros) {  layers.installed_macros = {} };
  if(!layers.installed_modes) {  layers.installed_modes = {} };
  if(!layers.up.macro) { layers.up.macro = {} };
  if(!layers.down.macro) { layers.down.macro = {} };
  if(!layers.right.macro) { layers.right.macro = {} };
  if(!layers.left.macro) { layers.left.macro = {} };

  const expandMacroInLayer = (macro: Macro) => {
    return Object.entries(macro).map((m) => {
      const name = m[0] as string;
      const ifPressed = m[1] as Array<Button>;
      return `${layerBlockIndent}macro ${name}, if_pressed: %i(${ifPressed.join(" ")})` }
    )
  };

  return(
`version: 1.0
setting: |-
${(layers.installed_macros) && Object.keys(layers.installed_macros).map((name) => `${topLevelIndent}install_macro_plugin ${name}`).join("\n")}
${(layers.installed_modes) && Object.keys(layers.installed_modes).map((name) => `${topLevelIndent}install_mode_plugin ${name}`).join("\n")}
  prefix_keys_for_changing_layer %i(${prefixKeys.join(" ")})

  ${
    buttons.reduce((a, b) => {
      const m = createButtonMethod({ layer: layers.up, button: b })
      if(m) { a = a + `\n${layerBlockIndent}` + m }
      return a;
    }, layerBlock("up"))
  }
${expandMacroInLayer(layers.up.macro)}
  end
  ${
    buttons.reduce((a, b) => {
      const m = createButtonMethod({ layer: layers.right, button: b })
      if(m) { a = a + `\n${layerBlockIndent}` + m }
      return a;
    }, layerBlock("right"))
  }
${expandMacroInLayer(layers.down.macro)}
  end
  ${
    buttons.reduce((a, b) => {
      const m = createButtonMethod({ layer: layers.down, button: b })
      if(m) { a = a + `\n${layerBlockIndent}` + m }
      return a;
    }, layerBlock("down"))
  }
${expandMacroInLayer(layers.down.macro)}
  end
  ${
    buttons.reduce((a, b) => {
      const m = createButtonMethod({ layer: layers.left, button: b })
      if(m) { a = a + `\n${layerBlockIndent}` + m }
      return a;
    }, layerBlock("left"))
  }
${expandMacroInLayer(layers.left.macro)}
  end`)
}
