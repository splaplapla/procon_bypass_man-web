/** @jsx jsx */

import { jsx } from '@emotion/react'
import React, { useState, useEffect } from "react";
import { css } from '@emotion/react'
import { Button } from "../types/button";

type Props = {
  // callback?(buttons: Array<string>): void;
  callbackOnSubmit: any;
  callbackOnClose: any;
};
export const ButtonsModal = ({ callbackOnSubmit, callbackOnClose }: Props) => {
  const callback = callbackOnSubmit;
  const handleSubmit = () => {
    // TODO event.targetの入力をセットする
    callbackOnSubmit(["l"]);
    callbackOnClose(false);
    return false;
  };

  const style = css(`
    position: absolute;
    top: 500px;
    width: 400px;
    height: 400px;
    background-color: red;
  `);

  return (
    <>
      <div css={style}>
        [これはモーダルです]
        <a onClick={handleSubmit}>決定する</a>
      </div>
    </>
  )
}
