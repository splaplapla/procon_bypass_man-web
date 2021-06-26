/** @jsx jsx */
import * as ReactDOM from "react-dom";
import { css, jsx } from '@emotion/react'
import * as React from "react";
import { useState } from "react";
import { SettingButton } from "./setting_button";

interface Button {
  name: string;
}

type Prop = {
  buttons: Array<string>;
  prefixKey: Array<string>;
};

const style = css`
  background-color: red;
`;

export const Setting: React.FC<Prop> = ({ buttons, prefixKey }) => {
  const [currentLayer, setCurrentLayer] = useState("up")
  const [currentPrefixKey, setCurrentPrefixKey] = useState(prefixKey)

  return (
    <>
      <div>設定中のプレフィックスキー</div>
      {currentPrefixKey.join(", ")}
      <hr />
      <div>layer up</div>
      <div>layer right</div>
      <div>layer down</div>
      <div>layer left</div>
      表示中: {currentLayer}
      <br />

      <hr />
      <div>available plugins</div>
      <div>available mode</div>
      <div>key setting</div>
      <div css={style}>
        <ul>
          {buttons.map(b => (<SettingButton name={b} key={b} />))}
        </ul>
      </div>
    </>
  );
};
