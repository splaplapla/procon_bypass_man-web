/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect } from "react";

import { Button } from "../types/button";
import { HttpClient } from "../lib/http_client";

const httpClient = new HttpClient();

export const PressedButtonsPage = () => {
  const [timer, setTimer] = useState(true);
  const [buttons, setButtons] = useState([] as Array<Button>);

  const updateState = () => {
    console.log("called");
  };

  useEffect(() => {
    if (timer) {
      const timerId = setInterval(updateState, 1500);
      return () => clearInterval(timerId);
    }

    httpClient.getPressedButtons()
      .then(function (response) {
        setButtons(response.data.buttons);
      })
  }, [timer]);

  return (
    <>
      <div>
        押されたボタンを表示する<br />
        {buttons}
      </div>
    </>
  )
}

