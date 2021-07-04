/** @jsx jsx */

import { jsx } from '@emotion/react'
import React, { useState, useEffect } from "react";
import { css } from '@emotion/react'
import { Setting } from "../components/setting";
import { Button } from "../types/button";
import { HttpClient } from "../lib/http_client";

type Prop = {};

const buttons: Array<Button> = [
  "a", "b", "x", "y", "up", "right", "down", "left", "r", "l", "zr", "zl",
]
// TODO serverから取得する
const prefixKey: Array<Button> = [
  "r", "l", "zr", "zl",
]

const httpClient = new HttpClient();
export const SettingPage = ({}:Prop) => {
  const [debugConsole, setDebugConsole] = useState("")

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
      <Setting buttons={buttons} prefixKey={prefixKey} />
    </>
  )
}
