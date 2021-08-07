import { Button, buttons } from "../types/button";
import { ButtonInLayer, ButtonsInLayer, Layers, ButtonsSettingType } from "../types/buttons_setting_type";
import { LayerKey, layerKeys } from "../types/layer_key";
import { diff } from 'deep-object-diff';

type Props = {
  before: ButtonsSettingType;
  after: ButtonsSettingType;
};

export type Diff = {
  changes: Array<string>;
}

export const ButtonStateDiff = ({ before, after }: Props) => {
  const result = { changes: [] } as Diff;
  if(before.prefix_keys_for_changing_layer.toString() === after.prefix_keys_for_changing_layer.toString()) {
    // no-op
  } else {
    result.changes.push(`keyprefixは ${before.prefix_keys_for_changing_layer} => ${after.prefix_keys_for_changing_layer} になります`)
  }

  layerKeys.forEach((layerKey) => {
    buttons.forEach((b) => {
      // どの項目が何に変化したかを出力したかったがめんどくさすぎたのでやめた
      const diffResult = diff(before.layers[layerKey as LayerKey][b], after.layers[layerKey as LayerKey][b]);
      if(Object.keys(diffResult).length > 0) {
        result.changes.push(`layer ${layerKey} の ${b} を変更しました`)
      }
    })
  })

  return result;
}
