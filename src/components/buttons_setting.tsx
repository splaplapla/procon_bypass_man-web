/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState } from "react";
import { ButtonSetting } from "./button_setting";
import { Button, buttons } from "../types/button";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";

type Props = {
  layerKey: string;
  layerRef: any;
};

export const ButtonsSetting = ({ layerKey, layerRef }:Props) => {
  const [visibility, setVisibility] = useState("hidden");
  const visibilityClassName = () => {
    if(visibility === "hidden") {
      return "hidden"
    } else {
      return "shown"
    }
  };
  const style = () => {
    return css`
      &.hidden {
        display: none;
      }
      &.shown {
        display: block;
      }

      ul {
        border: 1px solid #666; display: flex;
        flex-wrap: wrap;
        justify-content: center;
        list-style-type: none;
        margin: 0 0 0 1em;
        padding: 0;
        width: 900px;

        li {
          border: 1px solid #aaa;
          display: table;
          line-height: 110%;
          margin: 0.2em;
          padding: 0.5em;
          text-align: center;
          width: 200px;
          height: 100px;
        }
      }
    `;
  };

  layerRef.setVisibility = setVisibility;

  return (
    <div className={visibilityClassName()} css={style}>
      <ul>
        {buttons.map((b, i) => (
          <li key={i}>
            <ButtonSetting layerKey={layerKey} name={b} />
          </li>
        ))}
      </ul>
    </div>
  )
}
