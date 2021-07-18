/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect, useContext } from "react";
import { ButtonsSetting } from "../components/buttons_setting";
import { Button } from "../types/button";
import { LayerKey } from "../types/layer_key";
import { HttpClient } from "../lib/http_client";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";

type Prop = {};

const httpClient = new HttpClient();

interface LayerRef {
  setVisibility(status: string): string;
};

export const ButtonsSettingPage = ({}:Prop) => {
  const settingContext = useContext(ButtonsSettingContext);
  const layerKeys: Array<LayerKey> = ["up", "right", "down", "left"];
  const [debugConsole, setDebugConsole] = useState("");
  const layerRefs = layerKeys.map((l) => ({} as LayerRef));
  const switchLayer = (event:  React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (event !== null && event.target instanceof HTMLElement) {
      layerRefs.forEach(r => r.setVisibility("hidden"));
      layerRefs[
        Number(event.target.dataset.layerKeyIndex)
      ].setVisibility("show");
    }
  }

  useEffect(() => {
    httpClient.getSetting()
      .then(function (response) {
        settingContext.setPrefixKeys(response.data.setting.prefix_keys_for_changing_layer);
        const layers = layerKeys.reduce((a, key) => { a[key] = response.data.setting_group_by_button.layers[key]; return a }, {} as any)

        settingContext.setLayers(layers);
        console.log(response.data.setting["layers"][layerKeys[0]]);
        setDebugConsole("<設定ファイルの取得に成功しました>");
        console.log("context:", settingContext);
      })
    layerRefs[0].setVisibility("show");
  }, []);

  const layerUlStyle = css`
    list-style: none;
    display:flex;
    margin: 0;
    padding: 0;
    border-left: 1px solid #aaa;
  `;
  const layerLiStyle = () => {
    return css`
      padding: 20px;
      border-top: 1px solid #aaa;
      border-right: 1px solid #aaa;
      border-bottom: 1px solid #aaa;
    `;
  };

  return (
    <>
      <hr />
      <h2>設定ファイルの変更</h2>
      {debugConsole}

      <div>設定中のプレフィックスキー: {settingContext.prefixKeys.join(", ")}</div>
      <ul css={layerUlStyle}>
        {layerKeys.map((l, index) => (
          <li key={l} css={layerLiStyle()}>
            <a data-layer-key-index={index} onClick={switchLayer}>{l}</a>
          </li>
        ))}
      </ul>
      {layerKeys.map((l, index) => (<ButtonsSetting key={index} layerKey={l} layerRef={layerRefs[index]} />))}
    </>
  )
}
