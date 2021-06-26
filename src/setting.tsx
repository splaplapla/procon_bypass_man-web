import * as React from "react";
import * as ReactDOM from "react-dom";
import { SettingButton } from "./setting_button";

type Prop = {};

export const Setting: React.FC<Prop> = () => {
  return (
    <>
      <div>プレフィックスキー</div>
      <div>layer up</div>
      <div>available plugins</div>
      <div>available mode</div>
      <div>key setting</div>
      <div>
        <SettingButton name="a" />
        <SettingButton name="b" />
        <SettingButton name="x" />
        <SettingButton name="y" />
        <SettingButton name="up" />
        <SettingButton name="down" />
        <SettingButton name="right" />
        <SettingButton name="left" />
        <SettingButton name="r" />
        <SettingButton name="l" />
        <SettingButton name="zr" />
        <SettingButton name="zl" />
      </div>
    </>
  );
};
