/** @jsx jsx */

import { jsx } from '@emotion/react'
import React, { useState, useEffect } from "react";
import { css } from '@emotion/react'
import axios from 'axios';

import { HttpClient } from "../lib/http_client";

type Prop = {
};
const httpClient = new HttpClient();

export const GlobalSetting = ({}:Prop) => {
  const [dirPath, setDirPath] = useState("");
  const [settingPath, setSettingPath] = useState("");
  const [serverResponseMessage, setServerResponseMessage] = useState("");

  const inputStyle = css`
    width: 400px;
  `

  useEffect(() => {
    httpClient.getDirPath()
      .then(function (response) {
        setDirPath(response.data.root_path);
      })
      .catch(function (error) {
        setServerResponseMessage("サーバとの通信に失敗しました");
        console.log(error);
      })
    httpClient.getSettingPath()
      .then(function (response) {
        setSettingPath(response.data.setting_path);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  const handleDirChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirPath(e.target.value);
  };

  const handleDirSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>)  => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    httpClient.postDirPath(dirPath);
    setServerResponseMessage("PBMのディレクトリパスの更新に成功しました");
  };

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingPath(e.target.value);
  };

  const handleSettingSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>)  => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    httpClient.postSettingPath(settingPath);
    setServerResponseMessage("PBMの設定ファイルパスの更新に成功しました");
  };

  return (
    <>
      <h2>設定</h2>
      <div>
        {serverResponseMessage}
      </div>
      <label>PBMのディレクトリパス:
        <input type="text" css={inputStyle} value={dirPath} onChange={handleDirChange} />
      </label>
      <input type="submit" value="更新する" onClick={handleDirSubmit} />
      <hr />

      <label>PBMの設定ファイルパス:
        <input type="text" css={inputStyle} value={settingPath || "未設定"} onChange={handleSettingChange} />
      </label>
      <input type="submit" value="更新する" onClick={handleSettingSubmit} />
      <hr />
    </>
  )
}
