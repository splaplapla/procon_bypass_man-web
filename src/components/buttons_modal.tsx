/** @jsx jsx */

import { jsx } from '@emotion/react'
import React, { useState, useEffect } from "react";
import { css } from '@emotion/react'
import { Button } from "../types/button";

type Props = {
  // callback?(buttons: Array<string>): void;
  callbackOnSubmit: any;
  callbackOnClose: any;
  prefill: (string)[];
  title: string;
};

const buttons: Array<Button> = [
  "a", "b", "x", "y", "up", "right", "down", "left", "r", "l", "zr", "zl",
]

interface CheckedButtons {
  [index: string]: boolean;
}

export const ButtonsModal = ({ callbackOnSubmit, callbackOnClose, title, prefill }: Props) => {
  const [buttonStats, setbuttonStats] = useState<CheckedButtons>({});
  const callback = callbackOnSubmit;
  const handleSubmit = () => {
    const bs = Object.entries(buttonStats).reduce((acc: Array<string>, item) => {
      item[1] && acc.push(item[0]);
      return acc
    }, []).sort()

    callbackOnSubmit(bs);
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
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    buttonStats[e.target.value] = e.target.checked
    setbuttonStats(buttonStats)
  }

  useEffect(() => {
    const map: CheckedButtons = {};
    prefill.forEach((b) => { map[b] = true });
    setbuttonStats(map);
  }, [])

  return (
    <>
      <div css={style}>
        <div css={titlestyle}>{title}</div>

        <ul>
          {buttons.map((b, index) => (
            <li key={index}>
              <label><input type="checkbox" value={b} checked={buttonStats[b]} onClick={handleClick} />{b}</label>
            </li>
          ))}
        </ul>

        <hr />

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
