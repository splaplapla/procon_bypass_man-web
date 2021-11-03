/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect } from "react";

export const PressedButtonsPage = () => {
  const [timer, setTimer] = useState(true);

  const updateState = () => {
    console.log("called");
  };

  useEffect(() => {
    if (timer) {
      const timerId = setInterval(updateState, 1500);
      return () => clearInterval(timerId);
    }
  }, [timer]);

  return (
    <>
      <div>
      押されたボタンを表示する
      </div>
    </>
  )
}

