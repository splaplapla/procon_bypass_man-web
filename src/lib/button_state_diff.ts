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

  if(!before.prefix_keys_for_changing_layer || !after.prefix_keys_for_changing_layer) { return changes }
  if(before.prefix_keys_for_changing_layer.toString() === after.prefix_keys_for_changing_layer.toString()) {
    // no-op
  } else {
    changes.push(`keyprefixは ${before.prefix_keys_for_changing_layer} => ${after.prefix_keys_for_changing_layer} になります`)
  }

  layerKeys.forEach((layerKey) => {
    buttons.forEach((b) => {
      // どの項目が何に変化したかを出力したかったがめんどくさすぎたのでやめた
      const diffResult = diff(before.layers[layerKey as LayerKey][b], after.layers[layerKey as LayerKey][b]);
      if(Object.keys(diffResult || []).length > 0) {
        console.log(before.layers[layerKey as LayerKey][b], after.layers[layerKey as LayerKey][b])
        changes.push(`layer ${layerKey} の ${b} を変更しました`)
      }
    })
  })

  return changes;
}
