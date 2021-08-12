/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect, useContext } from "react";
import { ButtonsSettingContext, } from "./../contexts/buttons_setting";
import { Plugin, PluginBody } from "../types/plugin";
import { registerInstalledModeType, unregisterInstalledModeType } from "../reducers/layer_reducer";

// TODO extract to file
const availablePlugins = [
  {
    splatoon2: {
      modes: [
        { display_name: "splatoon2.guruguru", class_namespace: "ProconBypassMan::Splatoon2::Mode::Guruguru" },
        { display_name: "splatoon2.guruguru3", class_namespace: "ProconBypassMan::Splatoon2::Mode::Foo" },
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

const modeClassNamespaces = availablePlugins.map((v) => {
  return Object.entries(v).map((v) => {
    const name = v[0];
    const plugin = v[1];
    return plugin.modes.map((m) => {
      return m.class_namespace
    })
  })
}).flat().flat();

type Props = {
  classNamespace: string;
};
export const InstallableMode = ({ classNamespace }: Props) => {
  const { layers, layersDispatch } = useContext(ButtonsSettingContext);
  const isChecked = (name: string) => {
    return layers.installed_modes[name] || false;
  }
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(isChecked(classNamespace)) {
      layersDispatch({ type: unregisterInstalledModeType, payload: { installed_mode: classNamespace }});
    } else {
      layersDispatch({ type: registerInstalledModeType, payload: { installed_mode: classNamespace }});
    }
  }
  return(
    <div>
      <input type="checkbox" onChange={handleClick} checked={isChecked(classNamespace)} />{classNamespace}
  </div>
  )
}

export const InstallableModes = () => {
  return(
    <>
      {
        modeClassNamespaces.map((classNamespace, i) => {
          return(
            <div key={i}>
              <label>
                <InstallableMode classNamespace={classNamespace} />
              </label>
            </div>
          );
        })
      }
    </>
  )
}
