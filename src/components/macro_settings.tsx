/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useContext } from "react";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { LayerKey } from "../types/layer_key";
import { Button } from "../types/button";
import { Macro } from "../types/buttons_setting_type";
import { Plugin, PluginBody } from "../types/plugin";
import { ButtonsModal } from "./buttons_modal";
import { applyMacrosType } from "../reducers/layer_reducer";

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

// class_namespaceをキーにしたnameのhashを作る
const PluginsNameMap = availablePlugins.reduce((hash: any, item: Plugin) => {
  for (var [name, plugin] of Object.entries(item)) {
    plugin.macros.forEach((macro: PluginBody) => {
      hash[macro.class_namespace] = macro.display_name
    })
  };
  return hash;
}, {})

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
  const { layersDispatch } = useContext(ButtonsSettingContext);
  // for modal
  const [openModal, setOpenModal] = useState(false)
  const [modalCallbackOnSubmit, setModalCallbackOnSubmit] = useState(undefined as any)
  const [modalCloseCallback, setModalCloseCallback] = useState(undefined as any)
  const [modalTitle, setModalTitle] = useState("")
  const [modalPrefillButtons, setModalPrefillButtons] = useState<Array<Button>>([])

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenModal(true)
    setModalTitle("発動キーの設定")
    setModalPrefillButtons(if_pressed);
    // setModalCallbackOnSubmit(() => setIgnoreButtonsOnFlipingWithPersistence);
    setModalCloseCallback(() => setOpenModal);
    //  layersDispatch({ type: applyMacrosType, payload: { layerKey: layerKey,  }});
  }
  const isEnable = if_pressed.length > 0;

  return(
    <>
      <li key={name}>
        <label>
          <input type="checkbox" onChange={handleClick} checked={isEnable} />
          {PluginsNameMap[name]}
        </label>
        <br />
          {isEnable && `${if_pressed.join(", ")}で発動`}
      </li>
      <div css={css`position: relative;`}>
        {openModal && <ButtonsModal callbackOnSubmit={modalCallbackOnSubmit} callbackOnClose={modalCloseCallback} title={modalTitle} prefill={if_pressed} positionOnShown={"relative"} />}
      </div>
    </>
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
      {macros && <h4>設定可能なマクロ</h4>}
      {macros &&
        <ul>
          {macros.map((m) => <MacroSetting key={m.name} name={m.name} if_pressed={m.if_pressed} />)}
        </ul>
      }
      {macros && <div css={css`margin-top: 20px;`}></div>}
    </>
  )
}
