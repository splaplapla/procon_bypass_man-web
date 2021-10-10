/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect, useContext } from "react";
import { ButtonsSettingContext, } from "./../contexts/buttons_setting";
import { Plugin, PluginBody, AvailablePlugins, ModeNameMap } from "../types/plugin";
import { installModeType, uninstallModeType } from "../reducers/layer_reducer";

const modeClassNamespaces = AvailablePlugins.map((v) => {
  return Object.entries(v).map((v) => {
    const name = v[0];
    const plugin = v[1];
    return plugin.modes.map((m) => {
      return m.class_namespace
    })
  })
}).flat().flat();

type Props = {
  modeKey: string;
};
export const InstallableMode = ({ modeKey }: Props) => {
  const modeName = ModeNameMap[modeKey];
  const { layers, layersDispatch } = useContext(ButtonsSettingContext);
  const isChecked = (name: string) => {
    return layers.installed_modes[name] || false;
  }
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(isChecked(modeKey)) {
      layersDispatch({ type: uninstallModeType, payload: { installed_mode: modeKey }});
    } else {
      layersDispatch({ type: installModeType, payload: { installed_mode: modeKey }});
    }
  }
  return(
    <div>
      <input type="checkbox" onChange={handleClick} checked={isChecked(modeKey)} />{modeName}
    </div>
  )
}

console.log("modeClassNamespaces: ", modeClassNamespaces)
export const InstallableModes = () => {
  return(
    <>
      {
        modeClassNamespaces.map((classNamespace, i) => {
          return(
            <div key={i}>
              <label>
                <InstallableMode modeKey={classNamespace} />
              </label>
            </div>
          );
        })
      }
    </>
  )
}
