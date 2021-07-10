/** @jsx jsx */

import { jsx } from '@emotion/react'
import React, { useState, useEffect } from "react";
import { css } from '@emotion/react'
import { ButtonsSetting } from "../components/buttons_setting";
import { Button } from "../types/button";
import { HttpClient } from "../lib/http_client";

type Prop = {};

// TODO serverから取得する
const prefixKeys: Array<Button> = [
  "r", "l", "zr", "zl",
]

const httpClient = new HttpClient();

interface LayerRef {
  setVisibility(status: string): string;
};

export const ButtonsSettingPage = ({}:Prop) => {
  const layer_keys = ["up", "right", "down", "left"];
  const [debugConsole, setDebugConsole] = useState("");
  const [prefixKey, setPrefixKey] = useState(prefixKeys);
  const layerRefs = layer_keys.map((l) => ({} as LayerRef));
  const handleClick = () => {
  };

  useEffect(() => {
    httpClient.getSetting()
      .then(function (response) {
        setDebugConsole(response.data.setting);
      })

    layerRefs[0].setVisibility("show");
  }, []);

  return (
    <>
      <hr />
      <h2>設定ファイルの変更</h2>
      {debugConsole}

      <div>設定中のプレフィックスキー</div>
      {prefixKey.join(", ")}
      <a onClick={handleClick}>hi</a>

      {layer_keys.map((l, index) => (<ButtonsSetting key={index} layer_key={l} layer_ref={layerRefs[index]} />))}
    </>
  )
}
