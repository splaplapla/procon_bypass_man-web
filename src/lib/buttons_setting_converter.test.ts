import { ButtonsSettingConverter } from "./buttons_setting_converter";
import { Button, buttons } from "../types/button";
import { ButtonsInLayer } from "../types/buttons_setting_type";


describe('全部からのとき', () => {
  it('validなyamlであること', () => {
    // TODO
  })

  it('全部空になること', () => {
    const prefixKeys = ["y", "l"] as Array<Button>;
    const defaultLayer = buttons.reduce((acc, item) => { acc[item] = { open: false }; return acc; }, {} as ButtonsInLayer);
    const upLayer = defaultLayer;
    const downLayer = defaultLayer;
    const leftLayer = defaultLayer;
    const rightLayer = defaultLayer;
    const layers = {
      up: upLayer,
      down: downLayer,
      left: leftLayer,
      right: rightLayer,
    };
    const actual = ButtonsSettingConverter({ prefixKeys: prefixKeys, layers: layers })
    const expected = `version: 1.0
setting: |-
  prefix_keys_for_changing_layer %i(y l)
  layer :up do
  end
  layer :right do
  end
  layer :down do
  end
  layer :left do
  end`;
    expect(expected).toBe(actual);
  })
})
