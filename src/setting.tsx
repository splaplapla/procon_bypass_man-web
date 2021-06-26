import * as React from "react";
import { useState } from "react";
import { SettingButton } from "./setting_button";

interface Button {
  name: string;
}

type Prop = {
  buttons: Array<string>;
};

export const Setting: React.FC<Prop> = ({ buttons }) => {

  return (
    <>
      <div>プレフィックスキー</div>
      <div>layer up</div>
      <div>layer right</div>
      <div>layer down</div>
      <div>layer left</div>
      <div>available plugins</div>
      <div>available mode</div>
      <div>key setting</div>
      <div>
        <ul>
          {buttons.map(b => (<SettingButton name={b} />))}
        </ul>
      </div>
    </>
  );
};
