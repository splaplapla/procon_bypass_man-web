/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useContext } from "react";
import { ButtonSetting } from "./button_setting";
import { MacroSettings } from "./macro_settings";
import { ModeSettings } from "./mode_settings";
import { Button, buttons } from "../types/button";
import { LayerKey } from "../types/layer_key";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";

type Props = {
  layerKey: LayerKey;
  layerRef: any;
};

export const ButtonsSetting = ({ layerKey, layerRef }:Props) => {
  const [visibility, setVisibility] = useState("hidden");
  const visibilityStyle = () => {
    if(visibility === "hidden") {
      return css`display: none;`;
    }
  }
  const ulStyle = css`
    border: 1px solid #666;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style-type: none;
    margin: 0 0 0 1em;
    padding: 0;
    width: 900px;
  `;
  const liStyle = css`
    border: 1px solid #aaa;
    margin: 0.2em;
    padding: 0.5em;
    width: 200px;
  `;
  layerRef.setVisibility = setVisibility;

  const { layers } = useContext(ButtonsSettingContext);
  const isEnableMode = !layers[layerKey].mode.disable;

  return(
    <div css={visibilityStyle()}>
      <h4>モード</h4>
      <ModeSettings layerKey={layerKey} />

      <h4>マクロ</h4>
      {isEnableMode && `モードが有効なので選択できません`}
      {!isEnableMode && <MacroSettings layerKey={layerKey} />}

      <h4>各ボタンの設定</h4>
      {isEnableMode && `モードが有効なので選択できません`}
      {!isEnableMode &&
        <div css={ulStyle}>
          {buttons.map((b, i) => (
            <div key={i} css={liStyle}>
              <ButtonSetting layerKey={layerKey} name={b} />
            </div>
          ))}
        </div>
      }
    </div>
  )
}
