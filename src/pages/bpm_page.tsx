/** @jsx jsx */

import { jsx } from '@emotion/react'
import React from "react";
import { useState } from "react";
import { css } from '@emotion/react'

type Prop = {
};

import { PBM } from "../pbm";
const pbm = new PBM();

export const BpmPage= ({}:Prop) => {
  const [pbmStat, updatePbmStat] = useState(pbm.initStats());

  const handlePbmStats = (e: React.MouseEvent<HTMLElement>) => {
    updatePbmStat(pbm.fetchStats());
  }

  const isShowRestartButton = () => {
    return true;
  }

  const isShowStartButton = () => {
    return true;
  }

  const isShowStopButton = () => {
    return true;
  }
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
