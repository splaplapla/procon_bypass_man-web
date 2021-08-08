/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useContext } from "react";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { LayerKey } from "../types/layer_key";
import { Button } from "../types/button";
import { Macro } from "../types/buttons_setting_type";
import { Plugin, PluginBody } from "../types/plugin";
import { ButtonsModal } from "./buttons_modal";
import { applyMacroType } from "../reducers/layer_reducer";

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
const PluginsNameMap = availablePlugins.reduce((hash, item: Plugin) => {
  for (var [name, plugin] of Object.entries(item)) {
    plugin.macros.forEach((macro: PluginBody) => {
      hash[macro.class_namespace] = macro.display_name
    })
  };
  return hash;
}, {} as any)

type MacroSettingProps = {
  layerKey: LayerKey;
  macro: Macro;
};
const MacroSetting = ({ macro, layerKey }: MacroSettingProps) => {
  const { layersDispatch } = useContext(ButtonsSettingContext);
  // for modal
  const [openModal, setOpenModal] = useState(false)
  const [modalCallbackOnSubmit, setModalCallbackOnSubmit] = useState(undefined as any)
  const [modalCloseCallback, setModalCloseCallback] = useState(undefined as any)
  const [modalTitle, setModalTitle] = useState("")
  const [modalPrefillButtons, setModalPrefillButtons] = useState<Array<Button>>([])

  const setButtonsForModal = (bs: Array<Button>) => {
    macro.if_pressed = bs;
    layersDispatch({ type: applyMacroType, payload: { layerKey: layerKey, macro: macro }});
  }
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenModal(true)
    setModalTitle("発動キーの設定")
    setModalPrefillButtons(macro.if_pressed);
    setModalCallbackOnSubmit(() => setButtonsForModal);
    setModalCloseCallback(() => setOpenModal);
  }
  const isEnable = macro.if_pressed.length > 0;

  return(
    <>
      <li key={macro.name}>
        <label>
          <input type="checkbox" onChange={handleClick} checked={isEnable} />
          {PluginsNameMap[macro.name]}
        </label>
        <br />
        {isEnable && `${macro.if_pressed.join(", ")}で発動`}
      </li>
      <div css={css`position: relative;`}>
        {openModal && <ButtonsModal callbackOnSubmit={modalCallbackOnSubmit} callbackOnClose={modalCloseCallback} title={modalTitle} prefill={macro.if_pressed} positionOnShown={"relative"} />}
      </div>
    </>
  )
}

type MacroSettingsProps = {
  layerKey: LayerKey;
};
export const MacroSettings = ({ layerKey }:MacroSettingsProps) => {
  const { layers } = useContext(ButtonsSettingContext);
  const macroTable = layers[layerKey].macro as Macro || {} as Macro;
  const macros = Object.entries(macroTable).reduce((acc, item) => {
    acc.push({ name: item[0], if_pressed: item[1] });
    return acc;
  }, [] as Array<any>)

  return(
    <>
      <ul>
        {macros.map((m) => <MacroSetting key={m.name} macro={m} layerKey={layerKey} />)}
      </ul>
    </>
  )
}
