/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect } from "react";

import { Button } from "../types/button";
import { HttpClient } from "../lib/http_client";

const httpClient = new HttpClient();

export const PressedButtonsPage = () => {
  const [timer, setTimer] = useState(true);
  const [buttons, setButtons] = useState<Array<Button>>([]);
  const [leftAnalogStickX, setLeftAnalogStickX] = useState<number>(0);
  const [leftAnalogStickY, setLeftAnalogStickY] = useState<number>(0);
  const [leftAnalogStickAbsX, setLeftAnalogStickAbsX] = useState<number>(0);
  const [leftAnalogStickAbsY, setLeftAnalogStickAbsY] = useState<number>(0);

  const updateButtons = () => {
    httpClient.getPressedButtons().then(function (response) {
      setButtons(response.data.buttons);
      setLeftAnalogStickX(response.data.left_analog_stick.x);
      setLeftAnalogStickY(response.data.left_analog_stick.y);
      setLeftAnalogStickAbsX(response.data.left_analog_stick_by_abs.x);
      setLeftAnalogStickAbsY(response.data.left_analog_stick_by_abs.y);
    });
  };

  useEffect(() => {
    updateButtons();
    if (timer) {
      const timerId = setInterval(updateButtons, 1500);
      return () => clearInterval(timerId);
    }
  }, [timer]);

  // TODO デザイン
  // https://phantom-hand.web.app/projects/metroid_dread
  // https://github.com/noov-smash/PhantomHand-React/blob/ddbc035ab10bb29bc0a32f3bc448b07706e3b994/src/screens/Project/components/NintendoSwitchProCon.tsx#L15 みたいな実装で押しているボタンを可視したい
  return (
    <>
      <div>
        押されたボタン: {buttons.join(",")}<br />
        X: {leftAnalogStickX}<br />
        Y: {leftAnalogStickY}<br />
        abs X: {leftAnalogStickAbsX}<br />
        abs Y: {leftAnalogStickAbsY}<br />
      </div>
    </>
  )
}

