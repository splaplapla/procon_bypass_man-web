/** @jsx jsx */

import { jsx } from '@emotion/react'
import React, { useState } from "react";
import { css } from '@emotion/react'
import { ButtonSetting } from "./button_setting";
import { Button } from "../types/button";

type Prop = {
  buttons: Array<Button>;
  prefixKey: Array<Button>;
};

const ulstyle = css`
    border: 1px solid #666; display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style-type: none;
    margin: 0 0 0 1em;
    padding: 0;
    width: 900px;
`;
const listyle = css`
    border: 1px solid #aaa;
    display: table;
    line-height: 110%;
    margin: 0.2em;
    padding: 0.5em;
    text-align: center;
    width: 200px;
    height: 100px;
`;

export const ButtonsSetting = ({ buttons, prefixKey }:Prop) => {
  const [currentLayer, setCurrentLayer] = useState("up")
  const [currentPrefixKey, setCurrentPrefixKey] = useState(prefixKey)
  const [settingButtons, setSettingButtons] = useState(
    buttons.map(b => (<ButtonSetting name={b} />))
  );

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
      <div>
        <ul css={ulstyle}>{settingButtons.map((b, i) => (<li key={i} css={listyle}>{b}</li>))}</ul>
      </div>
    </>
  );
};
