/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect } from "react";
import { Button, buttons } from "../types/button";

type Props = {
  callbackOnSubmit: any;
  callbackOnClose: any;
  prefill: Array<Button>;
  title: string;
};

type CheckedButtons = {
  [key in Button] : boolean
}

export const ButtonsModal = ({ callbackOnSubmit, callbackOnClose, title, prefill }: Props) => {
  const [checkedButtonMap, setCheckedButtonMap] = useState(
    prefill.reduce((a, b) => { a[b] = true; return a },
      buttons.reduce((a, b) => { a[b] = false; return a }, {} as CheckedButtons)
    )
  )

  const callback = callbackOnSubmit;
  const handleSubmit = () => {
    const bs = Object.entries(checkedButtonMap).reduce((acc, item) => {
      const checked: boolean = item[1];
      const button = item[0] as Button;
      checked && acc.push(button);
      return acc;
    }, [] as Array<Button>).sort();

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
    top: -400px;
    width: 400px;
    height: 400px;
    border: solid;
    background-color: white;
  `);
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedButtonMap((previousButtonStats) => {
      previousButtonStats[e.target.value as Button] = e.target.checked;
      return previousButtonStats;
    })
  }

  return (
    <>
      <div css={style}>
        <div css={titlestyle}>{title}</div>

        <ul>
          {buttons.map((b, index) => (
            <li key={index}>
              <label><input type="checkbox" value={b} defaultChecked={checkedButtonMap[b]} onChange={handleClick} />{b}</label>
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
