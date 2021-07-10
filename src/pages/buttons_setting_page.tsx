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
  const [debugConsole, setDebugConsole] = useState("");
  const [prefixKey, setPrefixKey] = useState(prefixKeys);

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
      <ButtonsSetting layer_key="up"/>
      <ButtonsSetting layer_key="right"/>
    </>
  )
}
