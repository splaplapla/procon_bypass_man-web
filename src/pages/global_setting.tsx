/** @jsx jsx */

import { jsx } from '@emotion/react'
import React from "react";
import { useState } from "react";
import { SettingButton } from "setting_button";
import { css } from '@emotion/react'

type Prop = {
};

export const GlobalSetting = ({}:Prop) => {
  return (
    <>
      <h2>設定</h2>
      <label>PBMのディレクトリパス: <input type="text" value="" /></label>
      <input type="submit" value="更新する" />
      <hr />
    </>
  )
}
