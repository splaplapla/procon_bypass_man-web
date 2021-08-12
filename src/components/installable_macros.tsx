/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect, useContext } from "react";
import { ButtonsSettingContext, } from "./../contexts/buttons_setting";
import { Plugin, PluginBody } from "../types/plugin";
import { registerInstalledMacroType, unregisterInstalledMacroType } from "../reducers/layer_reducer";

// TODO extract to file
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
const PluginsNameMap = availablePlugins.reduce((hash, item: Plugin) => {
  for (var [name, plugin] of Object.entries(item)) {
    plugin.macros.forEach((macro: PluginBody) => {
      hash[macro.class_namespace] = macro.display_name
    })
  };
  return hash;
}, {} as any)

const macroClassNamespaces = availablePlugins.map((v) => {
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
    return layers.installed_macros[name];
  }
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(isChecked(classNamespace)) {
      layersDispatch({ type: unregisterInstalledMacroType, payload: { installed_macro: classNamespace }});
    } else {
      layersDispatch({ type: registerInstalledMacroType, payload: { installed_macro: classNamespace }});
    }
  }
  return(
    <>
      <input type="checkbox" onChange={handleClick} checked={isChecked(classNamespace)} /> {classNamespace}
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
