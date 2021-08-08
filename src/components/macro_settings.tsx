/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useContext } from "react";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { LayerKey } from "../types/layer_key";
import { Button } from "../types/button";
import { Macro } from "../types/buttons_setting_type";
import { Plugin } from "../types/plugin";

// plugins.
const availablePlugins = [
  {
    splatoon2: {
      modes: [
        { display_name: "splatoon2.guruguru", class_namespace: "ProconBypassMan::Splatoon2::Mode::Guruguru" },
      ],
      macros: [
        { display_name: "splatoon2.fast_return", class_namespace: "ProconBypassMan::Splatoon2::Macro::FastReturn" },
      ],
    }
  } as Plugin,
]

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

type MacroSettingProps = {
  name: string;
  if_pressed: Array<Button>;
};
const MacroSetting = ({ name, if_pressed }: MacroSettingProps) => {
  return(
    <div css={liStyle} key={name}>{name}</div>
  )
}

type MacroSettingsProps = {
  layerKey: LayerKey;
};
export const MacroSettings = ({ layerKey }:MacroSettingsProps) => {
  const { layers } = useContext(ButtonsSettingContext);
  const macros = layers[layerKey].macro as Array<Macro>;

  return(
    <>
      {macros && <div css={ulStyle}>
        {macros.map((m) => <MacroSetting key={m.name} name={m.name} if_pressed={m.if_pressed} />)}
      </div>}
      {macros && <div css={css`margin-top: 20px;`}></div>}
    </>
  )
}
