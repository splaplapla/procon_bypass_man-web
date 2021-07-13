/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect, useContext } from "react";
import { ButtonsSetting } from "../components/buttons_setting";
import { Button } from "../types/button";
import { layerKey } from "../types/layerKey";
import { HttpClient } from "../lib/http_client";
import { SettingContext } from "./../contexts/buttons_setting";

type Prop = {};

const httpClient = new HttpClient();

interface LayerRef {
  setVisibility(status: string): string;
};

export const ButtonsSettingPage = ({}:Prop) => {
  const layerKeys: Array<layerKey> = ["up", "right", "down", "left"];
  const [debugConsole, setDebugConsole] = useState("");
  const [prefixKey, setPrefixKey] = useState<Array<Button>>([]);
  const layerRefs = layerKeys.map((l) => ({} as LayerRef));
  const switchLayer = (event:  React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (event !== null && event.target instanceof HTMLElement) {
      layerRefs.forEach(r => r.setVisibility("hidden"));
      layerRefs[
        Number(event.target.dataset.layerKeyIndex)
      ].setVisibility("show");
    }
  }
  const settingContext = useContext(SettingContext);

  useEffect(() => {
    httpClient.getSetting()
      .then(function (response) {
        setPrefixKey(response.data.setting.prefix_keys_for_changing_layer)
        console.log(response.data.setting["layers"][layerKeys[0]]);
        setDebugConsole("<設定ファイルの取得に成功しました>");
      })
    layerRefs[0].setVisibility("show");
    console.log("context:", settingContext);
  }, []);

  return (
    <>
      <hr />
      <h2>設定ファイルの変更</h2>
      {debugConsole}

      <div>設定中のプレフィックスキー: {prefixKey.join(", ")}</div>
      <ul>
        {layerKeys.map((l, index) => (
          <li key={l}>
            <a data-layer-key-index={index} onClick={switchLayer}>{l}</a>
          </li>
        ))}
      </ul>
      {layerKeys.map((l, index) => (<ButtonsSetting key={index} layer_key={l} layer_ref={layerRefs[index]} />))}
    </>
  )
}
