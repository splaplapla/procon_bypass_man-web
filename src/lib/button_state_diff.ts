import { Button, buttons } from "../types/button";
import { ButtonInLayer, ButtonsInLayer, Layers, ButtonsSettingType } from "../types/buttons_setting_type";
import { LayerKey, layerKeys } from "../types/layer_key";
import { diff } from 'deep-object-diff';

type Props = {
  before: ButtonsSettingType;
  after: ButtonsSettingType;
};

export const ButtonStateDiff = ({ before, after }: Props): Array<string> => {
  const changes = [] as Array<string>;

  if(before.layers?.installed_macros && after.layers?.installed_macros) {
    const installedMacrosDiffResult = diff(before.layers.installed_macros, after.layers.installed_macros);
    if(Object.keys(installedMacrosDiffResult || []).length > 0) {
      changes.push("インストール可能なマクロを変更しました")
    }
  }

  if(!before.prefix_keys_for_changing_layer || !after.prefix_keys_for_changing_layer) { return changes }
  if(before.prefix_keys_for_changing_layer.toString() === after.prefix_keys_for_changing_layer.toString()) {
    // no-op
  } else {
    changes.push(`key prefixは ${before.prefix_keys_for_changing_layer} => ${after.prefix_keys_for_changing_layer} になります`)
  }

  layerKeys.forEach((layerKey) => {
    buttons.forEach((b) => {
      // どの項目が何に変化したかを出力したかったがめんどくさすぎたのでやめた
      const diffResult = diff(before.layers[layerKey as LayerKey][b], after.layers[layerKey as LayerKey][b]);
      if(Object.keys(diffResult || []).length > 0) {
        changes.push(`layer ${layerKey} の ${b} を変更しました`)
      }
    })
  })

  return changes;
}
