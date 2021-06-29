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
  const [pbmStat, setPbmStat] = useState(pbm.initStats());
  const [pbmPath, setPbmPath] = useState(0);

  const handlePbmStats = (e: React.MouseEvent<HTMLElement>) => {
    setPbmStat(pbm.fetchStats());
  }

  const isShowRestartButton = () => {
    return pbmStat == "running";
  }

  const isShowStartButton = () => {
    return pbmStat == "running";
  }

  const isShowStopButton = () => {
    return pbmStat == "stopped";
  }

  useEffect(() => {
    httpClient.getPbmStats()
      .then(function (response) {
        setPbmStat(response.data.stats as any);
      })
  })

  return (
    <>
      <h2>PBMのステータス: {pbmStat}</h2>
      <input type="button" onClick={handlePbmStats} value="現在のステータスを取得する" />
      {isShowStopButton() && <input type="button" onClick={handlePbmStats} value="停止する" />}
      {isShowRestartButton() && <input type="button" onClick={handlePbmStats} value="リスタートする" />}
      {isShowStartButton() && <input type="button" onClick={handlePbmStats} value="開始する" />}

    </>
  )
}
