import { Button, buttons } from "../types/button";
import { ButtonInLayer, ButtonsInLayer, Layers, ButtonsSettingType } from "../types/buttons_setting_type";
import { ButtonStateDiff } from "./button_state_diff";

describe('', () => {
  it('[]を返す', () => {
    const defaultLayer = buttons.reduce((acc, item) => { acc[item] = { open: false }; return acc; }, {} as ButtonsInLayer);
    const upLayer =  Object.assign({}, defaultLayer);
    const downLayer = Object.assign({}, defaultLayer);
    const leftLayer = Object.assign({}, defaultLayer);
    const rightLayer = Object.assign({}, defaultLayer);
    const before = { prefix_keys_for_changing_layer: [], layers: { up: upLayer, down: downLayer, left: leftLayer, right: rightLayer  } }
    const after = { prefix_keys_for_changing_layer: [], layers: { up: upLayer, down: downLayer, left: leftLayer, right: rightLayer  } }

    const actual = ButtonStateDiff({ before: before, after: after })
    expect(actual).toStrictEqual([])
  })
})
