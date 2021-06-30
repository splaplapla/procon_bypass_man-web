/** @jsx jsx */

import { jsx } from '@emotion/react'
import React, { useState, useEffect } from "react";
import { css } from '@emotion/react'
import { HttpClient } from "../lib/http_client";

type Prop = {
};

import { PBM } from "../pbm";
const pbm = new PBM();
const httpClient = new HttpClient();

export const BpmPage= ({}:Prop) => {
  const [pbmStats, setPbmStats] = useState(pbm.initStats());

  const handlePbmStats = (e: React.MouseEvent<HTMLElement>) => {
    setPbmStats(pbm.fetchStats());
  }

  const isShowRestartButton = () => {
    return pbmStats == "running";
  }

  const isShowStartButton = () => {
    return pbmStats == "running";
  }

  const isShowStopButton = () => {
    return pbmStats == "stopped";
  }

  useEffect(() => {
    httpClient.getPbmStats()
      .then(function (response) {
        setPbmStats(response.data.stats);
      })
  })

  return (
    <>
      <h2>PBMのステータス: {pbmStats}</h2>
      <input type="button" onClick={handlePbmStats} value="現在のステータスを取得する" />
      {isShowStopButton() && <input type="button" onClick={handlePbmStats} value="停止する" />}
      {isShowRestartButton() && <input type="button" onClick={handlePbmStats} value="リスタートする" />}
      {isShowStartButton() && <input type="button" onClick={handlePbmStats} value="開始する" />}

    </>
  )
}
