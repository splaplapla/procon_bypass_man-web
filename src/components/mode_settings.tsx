/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useContext } from "react";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { LayerKey } from "../types/layer_key";
import { Button } from "../types/button";
import { Macro, StructMacro } from "../types/buttons_setting_type";

type MacroSettingsProps = {
  layerKey: LayerKey;
};
export const ModeSettings = ({ layerKey }:MacroSettingsProps) => {
  return(
    <div></div>
  )
}
