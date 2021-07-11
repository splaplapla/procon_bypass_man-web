/** @jsxFrag React.Fragment */

import React, { useState } from "react";
import { jsx } from '@emotion/react'
import { Button } from "../types/button";

type Prop = {
  // callback?(buttons: Array<string>): void;
  callbackOnSubmit: any;
};
export const ButtonsModal = ({ callbackOnSubmit }: Prop) => {
  const callback = callbackOnSubmit;
  const handleSubmit = () => {
    // TODO event.targetの入力をセットする
    callbackOnSubmit && callbackOnSubmit(["l"])
  }

  return (
    <>
      <div>
        [これはモーダルです]
        <a onClick={handleSubmit}>決定する</a>
      </div>
    </>
  )
}
