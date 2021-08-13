/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useContext } from "react";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { Plugin, PluginBody, AvailablePlugins, ModeNameMap } from "../types/plugin";
import { LayerKey } from "../types/layer_key";
import { Button } from "../types/button";
import { StructMode } from "../types/buttons_setting_type";

type DetailProps = {
  layerKey: LayerKey;
  mode: StructMode;
};
export const ModeSetting = ({ layerKey, mode }: DetailProps) => {
  const { layersDispatch } = useContext(ButtonsSettingContext);

  return(
    <p>
      {mode.name}
    </p>
  )
}

type ListProps = {
  layerKey: LayerKey;
};
export const ModeSettings = ({ layerKey }:ListProps) => {
  const { layers } = useContext(ButtonsSettingContext);
  const modeTable = layers[layerKey].mode as any || {} as any;
  const modes = Object.keys(ModeNameMap).reduce((acc, modeName: string) => {
    const ifp = modeTable[modeName as string] as Array<Button> || [] as Array<Button>;
    acc.push({ name: modeName } as StructMode);
    return acc;
  }, [] as Array<any>)

  return(
    <ul>
      {modes.map((m) => {
         return layers.installed_modes[m.name] && <ModeSetting key={m.name} mode={m} layerKey={layerKey} />
        }
      )}
    </ul>
  )
}
