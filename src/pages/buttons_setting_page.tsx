/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect, useContext, useRef } from "react";
import { ButtonsSetting } from "../components/buttons_setting";
import { Button, buttons } from "../types/button";
import { LayerKey, layerKeys } from "../types/layer_key";
import { ButtonInLayer, ButtonsInLayer, Layers, Flip } from "../types/buttons_setting_type";
import { HttpClient } from "../lib/http_client";
import { ButtonsSettingContext, } from "./../contexts/buttons_setting";
import { ButtonsSettingConverter } from "./../lib/buttons_setting_converter";

const httpClient = new HttpClient();

interface LayerRef {
  setVisibility(status: string): string;
};

export const ButtonsSettingPage = () => {
  const settingContext = useContext(ButtonsSettingContext);
  const [selectedLayer, setSelectedLayer] = useState<LayerKey>("up");
  const [debugConsole, setDebugConsole] = useState("");
  const layerRefs = layerKeys.map((l) => ({} as LayerRef));
  const switchLayer = (event:  React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (event.target instanceof HTMLElement) {
      setSelectedLayer(event.target.dataset.layerKey as LayerKey);
      layerRefs.forEach(r => r.setVisibility("hidden"));
      layerRefs[
        Number(event.target.dataset.layerKeyIndex)
      ].setVisibility("show");
    }
  }
  const exportSetting = () => {
    const body = ButtonsSettingConverter({ prefixKey: settingContext.prefixKeys, layers: settingContext.layers }) || ""
    var data = new Blob([body], { type: 'text/yaml' })
    var csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'setting.yml');
    tempLink.click();
  }

  useEffect(() => {
    let isActive = true;

    httpClient.getSetting()
      .then(function (response) {
        settingContext.setPrefixKeys(response.data.setting.prefix_keys_for_changing_layer);
        const layers = layerKeys.reduce((a, key) => {
          a[key] = response.data.setting_group_by_button.layers[key];
          return a;
        }, {} as Layers)
        layerKeys.forEach((layerkey) => {
          buttons.forEach((button) => {
            if(layers[layerkey][button] === undefined) {
              layers[layerkey][button] = {
                flip: { enable: false },
                open: false
              } as ButtonInLayer
            } else if (layers[layerkey][button].flip === undefined) {
              // flipはなくて、remapの時にこっちくる
              layers[layerkey][button].flip = { enable: false }
              layers[layerkey][button].open = true
            } else if ((Object.keys(layers[layerkey][button as Button].flip || {} as Flip).length === 0)) {
              // 常に連打の時がここにくる
              if(layers[layerkey][button]?.flip) {
                layers[layerkey][button].flip = { enable: true }
                layers[layerkey][button].open = true
              }
            }
          })
        })

        console.log(response.data.setting["layers"][layerKeys[0]]);
        setDebugConsole("<設定ファイルの取得に成功しました>");
        if (isActive) {
          settingContext.setLoaded(true);
          settingContext.setLayers(layers);
          console.log("context:", settingContext);
        }
      })

    if (settingContext.loaded) {
      layerRefs[0].setVisibility("show");
    }

    return () => { isActive = false };
  }, [settingContext.loaded]);

  const layerUlStyle = css`
    list-style: none;
    display:flex;
    margin: 0;
    padding: 0;
    border-left: 1px solid #aaa;
  `;
  const layerLiStyle = (layer: LayerKey) => {
    let color = "";
    if(layer === selectedLayer) { color = "white" } else { color = "aaa" };
    return css`
      padding: 20px;
      border-top: 1px solid #aaa;
      border-right: 1px solid #aaa;
      border-bottom: 1px solid #${color};
    `
  };
  const layerComponents = () => {
    if(settingContext.loaded) {
      return(
        layerKeys.map((l, index) => (<ButtonsSetting key={index} layerKey={l} layerRef={layerRefs[index]} />))
      );
    } else {
      return(
        "loading..."
      );
    }
  }

  const loaded = settingContext.loaded
  return (
    <>
      <hr />
      <h2>設定ファイルの変更</h2>
      <div>
        <a href="#" onClick={exportSetting}>エクスポートする</a>
      </div>

      {debugConsole}

      <div>設定中のプレフィックスキー: {settingContext.prefixKeys.join(", ")}</div>
      <ul css={layerUlStyle}>
        {layerKeys.map((l, index) => (
          <li key={l} css={layerLiStyle(l)}>
            <a data-layer-key-index={index} data-layer-key={l} onClick={switchLayer}>{l}</a>
          </li>
        ))}
      </ul>
      {layerComponents()}
    </>
  )
}
