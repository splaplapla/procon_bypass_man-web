/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useContext } from "react";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { Plugin, PluginBody, AvailablePlugins, ModeNameMap } from "../types/plugin";
import { LayerKey } from "../types/layer_key";
import { Button } from "../types/button";
import { StructMode, ModeTable } from "../types/buttons_setting_type";
import { applyModeType } from "../reducers/layer_reducer";

type DetailProps = {
  layerKey: LayerKey;
  mode: StructMode;
};
export const ModeSetting = ({ layerKey, mode }: DetailProps) => {
  const { layersDispatch, layers } = useContext(ButtonsSettingContext);
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    layersDispatch({ type: applyModeType, payload: { layerKey: layerKey, mode: mode }});
  }
  const isChecked = (mode: StructMode) => {
    return ((layers[layerKey].mode || false) && !!layers[layerKey].mode[mode.name]);
  }
  return(
    <li>
      <label><input type="radio" onChange={handleClick} checked={isChecked(mode)} />{mode.name}</label>
    </li>
  )
}

type ListProps = {
  layerKey: LayerKey;
};
export const ModeSettings = ({ layerKey }:ListProps) => {
  const { layers } = useContext(ButtonsSettingContext);
  const modeTable: ModeTable = layers[layerKey].mode || {};
  const modes = Object.keys(ModeNameMap).reduce((acc, modeName: string) => {
    if(layers.installed_modes[modeName]) {
      acc.push({ name: modeName } as StructMode);
    }
    return acc;
  }, [] as Array<StructMode>);
  modes.unshift({ name: "disable" } as StructMode);

  const hasSomeModes = modes.length > 1;

  return(
    <>
      {
        hasSomeModes &&
        <ul>
          {modes.map((m) => {
             return <ModeSetting key={m.name} mode={m} layerKey={layerKey} />
            }
          )}
        </ul>
      }
      {!hasSomeModes && `選択可能なモードがありません`}
    </>
  )
}
