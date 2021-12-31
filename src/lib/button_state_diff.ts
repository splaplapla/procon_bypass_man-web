import { Button, buttons } from "../types/button";
import { ButtonInLayer, ButtonsInLayer, Layers, ButtonsSettingType, Macro, ModeTable } from "../types/buttons_setting_type";
import { LayerKey, layerKeys } from "../types/layer_key";
import { diff } from 'deep-object-diff';

type Props = {
  before: ButtonsSettingType;
  after: ButtonsSettingType;
};

export const ButtonStateDiff = ({ before, after }: Props): Array<string> => {
  const changes = [] as Array<string>;

  if(!before || !after || !before.layers) { return changes; }

  if(before.layers.installed_macros && after.layers.installed_macros) {
    const installedMacrosDiffResult = diff(before.layers.installed_macros, after.layers.installed_macros);
    if(Object.keys(installedMacrosDiffResult || []).length > 0) {
      changes.push("インストール可能なマクロを変更しました")
    }
  }

  if(before.layers.installed_modes && after.layers.installed_modes) {
    const installedModesDiffResult = diff(before.layers.installed_modes, after.layers.installed_modes);
    if(Object.keys(installedModesDiffResult || []).length > 0) {
      changes.push("インストール可能なモードを変更しました")
    }
  }

  if(before.prefix_keys_for_changing_layer && after.prefix_keys_for_changing_layer) {
    if(before.prefix_keys_for_changing_layer.toString() === after.prefix_keys_for_changing_layer.toString()) {
      // no-op
    } else {
      changes.push(`key prefixは ${before.prefix_keys_for_changing_layer} => ${after.prefix_keys_for_changing_layer} になります`)
    }
  }

  layerKeys.forEach((layerKey) => {
    const beforeMacro = before.layers[layerKey].macro || {} as Macro
    const afterMacro = after.layers[layerKey].macro || {} as Macro
    const macroDiffResult = diff(beforeMacro, afterMacro);
    if(Object.keys(macroDiffResult || []).length > 0) {
      changes.push(`layer ${layerKey} の マクロ を変更しました`)
    }

    const beforeMode = before.layers[layerKey].mode || {} as ModeTable
    const afterMode = after.layers[layerKey].mode || {} as ModeTable
    const modeDiffResult = diff(beforeMode, afterMode);
    if(Object.keys(modeDiffResult || []).length > 0) {
      changes.push(`layer ${layerKey} の モード を変更しました`)
    }

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
