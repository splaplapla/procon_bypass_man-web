/** @jsx jsx */

import { jsx } from '@emotion/react'
import React, { useState, useEffect } from "react";
import { css } from '@emotion/react'
import { Button } from "../types/button";

type Props = {
  // callback?(buttons: Array<string>): void;
  callbackOnSubmit: any;
  callbackOnClose: any;
  title: string;
};
export const ButtonsModal = ({ callbackOnSubmit, callbackOnClose, title }: Props) => {
  const callback = callbackOnSubmit;
  const handleSubmit = () => {
    // TODO event.targetの入力をセットする
    callbackOnSubmit(["l"]);
    callbackOnClose(false);
    return false;
  };
  const handleCancel = () => {
    callbackOnClose(false);
    return false;
  }
  const titlestyle = css(`
    margin-top: 10px;
    font-size: 1.17em;
    font-weight: bold;
  `)
  const style = css(`
    position: absolute;
    align: left;
    top: 500px;
    width: 400px;
    height: 400px;
    border: solid;
    background-color: white;
  `);

  return (
    <>
      <div css={style}>
        <div css={titlestyle}>{title}</div>
        <ul>
          <li>
            <a onClick={handleCancel}>変更せず閉じる</a>
          </li>
          <li>
            <a onClick={handleSubmit}>決定する</a>
          </li>
        </ul>
      </div>
    </>
  )
}
