/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState } from "react";
import { ButtonSetting } from "./button_setting";
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
  const ulStyle = () => {
    return css`
      border: 1px solid #666;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      list-style-type: none;
      margin: 0 0 0 1em;
      padding: 0;
      width: 900px;
    `;
  };
  const liStyle = () => {
    return css`
      border: 1px solid #aaa;
      margin: 0.2em;
      padding: 0.5em;
      width: 200px;
    `;
  }
  layerRef.setVisibility = setVisibility;

  return (
    <div css={visibilityStyle()}>
      <div css={ulStyle()}>
        {buttons.map((b, i) => (
          <div key={i} css={liStyle()}>
            <ButtonSetting layerKey={layerKey} name={b} />
          </div>
        ))}
      </div>
    </div>
  )
}
