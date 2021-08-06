import { ButtonsSettingConverter } from "./buttons_setting_converter";
import { Button, buttons } from "../types/button";
import { ButtonsInLayer } from "../types/buttons_setting_type";
import yaml from "js-yaml";

describe('値があるとき', () => {
  it('validなyamlであること', () => {
    const prefixKeys = ["y", "l"] as Array<Button>;
    const defaultLayer = buttons.reduce((acc, item) => { acc[item] = { open: false }; return acc; }, {} as ButtonsInLayer);
    const upLayer =  Object.assign({}, defaultLayer);
    const downLayer = Object.assign({}, defaultLayer);
    const leftLayer = Object.assign({}, defaultLayer);
    const rightLayer = Object.assign({}, defaultLayer);
    upLayer.a = { flip: { if_pressed: [], enable: true, force_neutral: ["y"] }, open: true }
    upLayer.b = { flip: { if_pressed: ["a"], enable: true, force_neutral: ["y"] }, open: true }
    upLayer.x = { flip: { if_pressed: ["a"], enable: false, force_neutral: ["y"] }, open: true }
    upLayer.y = { flip: { if_pressed: [], enable: false, force_neutral: [] }, open: true }
    downLayer.a = { flip: { if_pressed: ["a", "b"], enable: true, force_neutral: ["y", "x"] }, open: true }
    const layers = {
      up: upLayer,
      down: downLayer,
      left: leftLayer,
      right: rightLayer,
    };
    const actual = ButtonsSettingConverter({ prefixKeys: prefixKeys, layers: layers })
    yaml.load(actual)
  })

  it('定義が出力されること', () => {
    const prefixKeys = ["y", "l"] as Array<Button>;
    const defaultLayer = buttons.reduce((acc, item) => { acc[item] = { open: false }; return acc; }, {} as ButtonsInLayer);
    const upLayer =  Object.assign({}, defaultLayer);
    const downLayer = Object.assign({}, defaultLayer);
    const leftLayer = Object.assign({}, defaultLayer);
    const rightLayer = Object.assign({}, defaultLayer);
    upLayer.a = { flip: { if_pressed: [], enable: true, force_neutral: ["y"] }, open: true }
    upLayer.b = { flip: { if_pressed: ["a"], enable: true, force_neutral: ["y"] }, open: true }
    upLayer.x = { flip: { if_pressed: ["a"], enable: false, force_neutral: ["y"] }, open: true }
    upLayer.y = { flip: { if_pressed: [], enable: false, force_neutral: [] }, open: true }
    downLayer.a = { flip: { if_pressed: ["a", "b"], enable: true, force_neutral: ["y", "x"] }, open: true }
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
    flip :a, force_neutral: %i(y)
    flip :b, if_pressed: %i(a), force_neutral: %i(y)
  end
  layer :right do
  end
  layer :down do
    flip :a, if_pressed: %i(a b), force_neutral: %i(y x)
  end
  layer :left do
  end`;
    expect(expected).toBe(actual);
  })
})

describe('全部からのとき', () => {
  it('validなyamlであること', () => {
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
    yaml.load(actual)
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
