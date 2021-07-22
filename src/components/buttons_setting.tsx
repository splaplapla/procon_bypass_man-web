/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect, useContext } from "react";
import { ButtonSetting } from "./button_setting";
import { Button } from "../types/button";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";

type Props = {
  layerKey: string;
  layerRef: any;
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

export const ButtonsSetting = ({ layerKey, layerRef }:Props) => {
  // const settingContext = useContext(ButtonsSettingContext);
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
  const handleDebug = () =>{
    debugger;
  }
  layerRef.setVisibility = setVisibility;

  return (
    <>
      <div css={style()}>
        <h1>{layerKey}</h1>
        <div>available plugins</div>
        <div>available mode</div>
        <div>
          <a onClick={handleDebug}>key setting</a>
        </div>
        <div>

          <ul css={ulstyle}>{
            buttons.map((b, i) => (
              <li key={i} css={listyle}>
                <ButtonSetting layerKey={layerKey} name={b} />
              </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}
