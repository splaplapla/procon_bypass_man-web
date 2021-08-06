/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState } from "react";
import { Button, buttons } from "../types/button";

type Props = {
  callbackOnSubmit: any;
  callbackOnClose: any;
  prefill: Array<Button>;
  title: string;
  positionOnShown: string;
};

type CheckedButtons = {
  [key in Button] : boolean
}

export const ButtonsModal = ({ callbackOnSubmit, callbackOnClose, title, prefill, positionOnShown }: Props) => {
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
  const style = () => {
    if(positionOnShown === "relative") {
      return css(`
        position: absolute;
        align: left;
        top: -400px;
        width: 400px;
        height: 400px;
        border: solid;
        background-color: white;
      `);
    } else {
      return css(`
        position: absolute;
        align: left;
        top: 0px;
        left: 20px;
        width: 400px;
        height: 400px;
        border: solid;
        background-color: white;
      `);
    }
  }
  const aStyle = css`
    background-color: #4669ff;
    border-bottom: solid 2px #003aff;
    border-right: solid 2px #003aff;
    border-radius: 20px;
    font-weight: bold;
    color: #FFF;
    text-decoration: none;
    padding: 10px;
    display: inline-block;
    margin-left: 10px;
  `;

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedButtonMap((previousButtonStats) => {
      previousButtonStats[e.target.value as Button] = e.target.checked;
      return previousButtonStats;
    })
  }

  return (
    <>
      <div css={style()}>
        <div css={titlestyle}>{title}</div>

        {buttons.map((b, index) => (
          <div key={index}>
            <label><input type="checkbox" value={b} defaultChecked={checkedButtonMap[b]} onChange={handleClick} />{b}</label>
          </div>
        ))}

        <hr />
        <div css={css`display: flex`}>
          <a href={"#"} onClick={handleCancel} css={aStyle}>変更せず閉じる</a>
          <a href={"#"} onClick={handleSubmit} css={aStyle}>決定する</a>
        </div>
      </div>
    </>
  )
}
