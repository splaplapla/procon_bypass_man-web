/** @jsx jsx */

import { jsx } from '@emotion/react'
import React, { useState, useEffect } from "react";
import { css } from '@emotion/react'
import { HttpClient } from "../lib/http_client";
import { PbmStats } from "../types/pbm_stats";

type Prop = {
};

const httpClient = new HttpClient();

export const BpmPage= ({}:Prop) => {
  const [pbmStats, setPbmStats] = useState("unknown" as PbmStats);

  const handlePbmStats = (e: React.MouseEvent<HTMLElement>) => {
    httpClient.getPbmStats()
      .then(function (response) {
        setPbmStats(response.data.stats);
      })
  }
  const handleStartPbm = (e: React.MouseEvent<HTMLElement>) => {
    httpClient.startPbm()
      .then(function (response) {
        if(response.data.result === "ok") {
          setPbmStats("waiting" as PbmStats);
        } else {
          setPbmStats("error" as PbmStats);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const handleStopPbm = (e: React.MouseEvent<HTMLElement>) => {
    httpClient.stopPbm()
      .then(function (response) {
        if(response.data.result === "ok") {
          setPbmStats("stopped" as PbmStats);
        } else {
          setPbmStats("error" as PbmStats);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const isShowRestartButton = () => {
    return pbmStats == "running";
  }

  const isShowStartButton = () => {
    return pbmStats == "stopped";
  }

  const isShowStopButton = () => {
    return pbmStats == "running";
  }

  useEffect(() => {
    httpClient.getPbmStats()
      .then(function (response) {
        setPbmStats(response.data.stats);
      })
  }, [])

  return (
    <>
      <h2>PBMのステータス: {pbmStats}</h2>
      <input type="button" onClick={handlePbmStats} value="現在のステータスを取得する" />
      {isShowStopButton() && <input type="button" onClick={handleStopPbm} value="停止する" />}
      {isShowStartButton() && <input type="button" onClick={handleStartPbm} value="開始する" />}
    </>
  )
}
