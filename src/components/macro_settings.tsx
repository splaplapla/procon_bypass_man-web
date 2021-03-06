/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState, useReducer, useContext } from "react";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { LayerKey } from "../types/layer_key";
import { Button } from "../types/button";
import { Macro, StructMacro } from "../types/buttons_setting_type";
import {
  Plugin,
  PluginBody,
  AvailablePlugins,
  MacroNameMap,
} from "../types/plugin";
import { ButtonsModal } from "./buttons_modal";
import { applyMacroType } from "../reducers/layer_reducer";

import { useModal } from "../hooks/useModal";
import { ModalProps } from "../components/buttons_modal";

type MacroSettingProps = {
  layerKey: LayerKey;
  macro: StructMacro;
};
const MacroSetting = ({ macro, layerKey }: MacroSettingProps) => {
  const { layersDispatch } = useContext(ButtonsSettingContext);
  const [modalProps, openModal] = useModal();

  const setButtonsForModal = (bs: Array<Button>) => {
    macro.if_pressed = bs;
    layersDispatch({
      type: applyMacroType,
      payload: { layerKey: layerKey, macro: macro },
    });
  };
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    openModal({
      title: "マクロを発動するキーの変更",
      prefill: macro.if_pressed,
      callbackOnSubmit: setButtonsForModal,
    });
  };
  const isEnable = macro.if_pressed.length > 0;

  return (
    <>
      <li key={macro.name}>
        <label>
          <input type="checkbox" onChange={handleClick} checked={isEnable} />
          {MacroNameMap[macro.name]}
        </label>
        <br />
        {isEnable && `${macro.if_pressed.join(", ")}で発動`}
      </li>
      <div
        css={css`
          position: relative;
        `}
      >
        {<ButtonsModal {...(modalProps as ModalProps)} />}
      </div>
    </>
  );
};

type MacroSettingsProps = {
  layerKey: LayerKey;
};
export const MacroSettings = ({ layerKey }: MacroSettingsProps) => {
  const { layers } = useContext(ButtonsSettingContext);
  const macroTable = (layers[layerKey].macro as any) || ({} as any);
  const macros = Object.keys(MacroNameMap).reduce((acc, macroName: string) => {
    const ifp =
      (macroTable[macroName as string] as Array<Button>) ||
      ([] as Array<Button>);
    if (layers.installed_macros[macroName]) {
      acc.push({ name: macroName, if_pressed: ifp } as StructMacro);
    }
    return acc;
  }, [] as Array<any>);
  const hasSomeMacros = macros.length > 0;

  return (
    <>
      {hasSomeMacros && (
        <ul>
          {macros.map((m) => {
            return <MacroSetting key={m.name} macro={m} layerKey={layerKey} />;
          })}
        </ul>
      )}
      {!hasSomeMacros && `選択可能なマクロがありません`}
    </>
  );
};
