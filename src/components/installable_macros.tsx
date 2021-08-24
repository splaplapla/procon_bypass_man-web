/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect, useContext } from "react";
import { ButtonsSettingContext, } from "./../contexts/buttons_setting";
import { Plugin, PluginBody, AvailablePlugins, MacroNameMap } from "../types/plugin";
import { installMacroType, uninstallMacroType } from "../reducers/layer_reducer";

const macroClassNamespaces = AvailablePlugins.map((v) => {
  return Object.entries(v).map((v) => {
    const name = v[0];
    const plugin = v[1];
    return plugin.macros.map((m) => {
      return m.class_namespace
    })
  })
}).flat().flat();


type Props = {
  classNamespace: string;
};
export const InstallableMacro = ({ classNamespace }: Props) => {
  const { layers, layersDispatch } = useContext(ButtonsSettingContext);
  const isChecked = (name: string) => {
    return layers.installed_macros[name] || false;
  }
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(isChecked(classNamespace)) {
      layersDispatch({ type: uninstallMacroType, payload: { installed_macro: classNamespace }});
    } else {
      layersDispatch({ type: installMacroType, payload: { installed_macro: classNamespace }});
    }
  }
  return(
    <>
      <input type="checkbox" onChange={handleClick} checked={isChecked(classNamespace)} /> {MacroNameMap[classNamespace]}
    </>
  )
}

export const InstallableMacros = () => {
  return(
    <>
      {
        macroClassNamespaces.map((classNamespace, i) => {
          return(
            <div key={i}>
              <label>
                <InstallableMacro classNamespace={classNamespace} />
              </label>
            </div>
          );
        })
      }
    </>
  )
}
