/** @jsxFrag React.Fragment */

import React, { useState } from "react";
import { jsx } from '@emotion/react'
import { Button } from "../types/button";

type Prop = {
  callback?(buttons: Array<string>): void;
};
export const ButtonsModal = ({ callback }: Prop) => {
  const handleSubmit = () => {
    // TODO event.targetの入力をセットする
    callback && callback(["l", "y"])
  }

  return (
    <>
      <div>
        a
      </div>
    </>
  )
}
