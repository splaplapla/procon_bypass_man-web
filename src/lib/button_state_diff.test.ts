import { Button, buttons } from "../types/button";
import {
  ButtonInLayer,
  ButtonsInLayer,
  Layers,
  ButtonsSettingType,
} from "../types/buttons_setting_type";
import { ButtonStateDiff } from "./button_state_diff";

const makeLayer = () => {
  const defaultLayer = buttons.reduce((acc, item) => {
    acc[item] = { open: false };
    return acc;
  }, {} as ButtonsInLayer);
  const upLayer = Object.assign({}, defaultLayer);
  const downLayer = Object.assign({}, defaultLayer);
  const leftLayer = Object.assign({}, defaultLayer);
  const rightLayer = Object.assign({}, defaultLayer);
  return {
    prefix_keys_for_changing_layer: [] as Array<Button>,
    layers: {
      up: Object.assign({}, upLayer),
      down: Object.assign({}, downLayer),
      left: Object.assign({}, leftLayer),
      right: Object.assign({}, rightLayer),
      installed_macros: {},
      installed_modes: {},
    },
  };
};

describe("全部ブランクの時", () => {
  it("[]を返す", () => {
    const before = Object.assign({}, makeLayer());
    const after = Object.assign({}, makeLayer());

    const actual = ButtonStateDiff({ before: before, after: after });
    expect(actual).toStrictEqual([]);
  });
});

describe("keyで差分がある時", () => {
  it("値を返す", () => {
    const before = Object.assign({}, makeLayer());
    const after = Object.assign({}, makeLayer());

    before.prefix_keys_for_changing_layer = ["a"];
    after.prefix_keys_for_changing_layer = ["y", "x"];

    const actual = ButtonStateDiff({ before: before, after: after });
    expect(actual).toStrictEqual(["key prefixは a => y,x になります"]);
  });
});

describe("layersで差分がある時", () => {
  it("値を返す", () => {
    const before = Object.assign({}, makeLayer());
    const after = Object.assign({}, makeLayer());

    before.prefix_keys_for_changing_layer = ["a"];
    after.prefix_keys_for_changing_layer = ["a"];
    before.layers.up.a = {
      flip: { if_pressed: ["y"], enable: true },
      open: true,
    };
    before.layers.down.a = {
      flip: { if_pressed: ["y"], enable: true },
      open: true,
    };
    after.layers.up.a = {
      flip: { if_pressed: ["a"], enable: false },
      open: true,
    };

    const actual = ButtonStateDiff({ before: before, after: after });
    expect(actual).toStrictEqual([
      "layer up の a を変更しました",
      "layer down の a を変更しました",
    ]);
  });
});

describe("installed_macrosで差分がある時", () => {
  it("値を返す", () => {
    const before = Object.assign({}, makeLayer());
    const after = Object.assign({}, makeLayer());

    before.layers.installed_macros = { a: true };

    const actual = ButtonStateDiff({ before: before, after: after });
    expect(actual).toStrictEqual(["インストール可能なマクロを変更しました"]);
  });
});

describe("layer.x.macroで差分がある時", () => {
  it("値を返す", () => {
    const before = Object.assign({}, makeLayer());
    const after = Object.assign({}, makeLayer());

    before.layers.up.macro = { a: [] };
    after.layers.up.macro = { a: ["b"] };

    const actual = ButtonStateDiff({ before: before, after: after });
    expect(actual).toStrictEqual(["layer up の マクロ を変更しました"]);
  });
});

describe("installed_modesで差分がある時", () => {
  it("値を返す", () => {
    const before = Object.assign({}, makeLayer());
    const after = Object.assign({}, makeLayer());

    before.layers.installed_modes = { b: true };

    const actual = ButtonStateDiff({ before: before, after: after });
    expect(actual).toStrictEqual(["インストール可能なモードを変更しました"]);
  });
});

describe("layer.x.modeで差分がある時", () => {
  it("値を返す", () => {
    const before = Object.assign({}, makeLayer());
    const after = Object.assign({}, makeLayer());

    before.layers.up.mode = {};
    after.layers.up.mode = { a: true };

    const actual = ButtonStateDiff({ before: before, after: after });
    expect(actual).toStrictEqual(["layer up の モード を変更しました"]);
  });
});
