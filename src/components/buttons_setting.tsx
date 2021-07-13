/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect } from "react";
import { ButtonSetting } from "./button_setting";
import { Button } from "../types/button";

type Props = {
  layer_key: string;
  layer_ref: any;
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

const buttons: Array<Button> = [
  "a", "b", "x", "y", "up", "right", "down", "left", "r", "l", "zr", "zl",
]

export const ButtonsSetting = ({ layer_key, layer_ref }:Props) => {
    // debugger;
  const [settingButtons, setSettingButtons] = useState(
    buttons.map(b => (<ButtonSetting name={b} />))
  );
  const [visibility, setVisibility] = useState("hidden");

  const style = () => {
    if(visibility === "hidden") {
      return(css`
        display: none;
      `)
    } else {
      return(css`
        display: block;
      `)
    }
  }
  layer_ref.setVisibility = setVisibility;

  return (
    <>
      <div id={`layer_${layer_key}`} css={style()}>
        <h1>{layer_key}</h1>
        <div>available plugins</div>
        <div>available mode</div>
        <div>key setting</div>
        <div>
          <ul css={ulstyle}>{settingButtons.map((b, i) => (<li key={i} css={listyle}>{b}</li>))}</ul>
        </div>
      </div>
    </>
  )
}
