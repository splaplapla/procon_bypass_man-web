import { ButtonsSettingConverter } from "./buttons_setting_converter";
import { Button, buttons } from "../types/button";
import { ButtonsInLayer } from "../types/buttons_setting_type";
import yaml from "js-yaml";
import _ from 'lodash';

describe('値があるとき', () => {
  const prefixKeys = ["y", "l"] as Array<Button>;
  const defaultLayer = buttons.reduce((acc, item) => { acc[item] = { open: false }; return acc; }, {} as ButtonsInLayer);
  const upLayer =  _.cloneDeep(defaultLayer);
  const downLayer = _.cloneDeep(defaultLayer);
  const leftLayer = _.cloneDeep(defaultLayer);
  const rightLayer = _.cloneDeep(defaultLayer);
  upLayer.a = { flip: { if_pressed: [], enable: true, force_neutral: ["y"] }, open: true }
  upLayer.b = { flip: { if_pressed: ["a"], enable: true, force_neutral: ["y"] }, open: true }
  upLayer.x = { flip: { if_pressed: ["a"], enable: false, force_neutral: ["y"] }, open: true }
  upLayer.y = { flip: { if_pressed: [], enable: false, force_neutral: [] }, open: true }
  downLayer.a = { flip: { if_pressed: ["a", "b"], enable: true, force_neutral: ["y", "x"] }, open: true }
  leftLayer.a = { remap: { to: ["b", "y"] }, open: true }
  const layers = {
    up: upLayer,
    down: downLayer,
    left: leftLayer,
    right: rightLayer,
  };

  it('validなyamlであること', () => {
    const actual = ButtonsSettingConverter({ prefixKeys: prefixKeys, layers: layers })
    yaml.load(actual)
  })

  it('定義が出力されること', () => {
    const actual = ButtonsSettingConverter({ prefixKeys: prefixKeys, layers: layers })
    const expected = `version: 1.0
setting: |-
  prefix_keys_for_changing_layer %i(y l)
  layer :up do
    flip :a, force_neutral: %i(y)
    flip :b, if_pressed: %i(a), force_neutral: %i(y)
  end
  layer :right do
  end
  layer :down do
    flip :a, if_pressed: %i(a b), force_neutral: %i(y x)
  end
  layer :left do
    remap :a, to: %i(b y)
  end`;
    expect(actual).toBe(expected);
  })
})

describe('macroがあるとき', () => {
})

describe('全部からのとき', () => {
  const prefixKeys = ["y", "l"] as Array<Button>;
  const defaultLayer = buttons.reduce((acc, item) => { acc[item] = { open: false }; return acc; }, {} as ButtonsInLayer);
  const layers = {
    up: defaultLayer,
    down: defaultLayer,
    left: defaultLayer,
    right: defaultLayer,
  };

  it('validなyamlであること', () => {
    const actual = ButtonsSettingConverter({ prefixKeys: prefixKeys, layers: layers })
    yaml.load(actual)
  })

  it('全部空になること', () => {
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
    expect(actual).toBe(expected);
  })
})
