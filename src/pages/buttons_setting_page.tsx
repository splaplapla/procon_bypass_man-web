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
export const ButtonsSettingPage = ({}:Prop) => {
  const layers = ["up", "right", "down", "down"];

  const [debugConsole, setDebugConsole] = useState("");
  const [prefixKey, setPrefixKey] = useState(prefixKeys);
  const [layerRefs, _layerRefs] = useState(
    layers.map(l => (<ButtonsSetting layer_key={l} />))
  )

  useEffect(() => {
    httpClient.getSetting()
      .then(function (response) {
        setDebugConsole(response.data.setting);
      })
  }, [])

  return (
    <>
      <hr />
      <h2>設定ファイルの変更</h2>
      {debugConsole}

      <div>設定中のプレフィックスキー</div>
      {prefixKey.join(", ")}

      <ul>
        {layerRefs.map((l, i) => (<li key={i}>{l}</li>))}
      </ul>
    </>
  )
}
