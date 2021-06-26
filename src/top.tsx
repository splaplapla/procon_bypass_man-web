import React from "react";
import ReactDOM from "react-dom";
import { Setting } from "./setting";

type Prop = {
};
const buttons = [
  "a", "b", "x", "y", "up", "right", "down", "left", "r", "l", "zr", "zl",
]
// TODO serverから取得する
const prefixKey = [
  "r", "l", "zr", "zl",
]

export const Top: React.FC<Prop> = () => {
  return (
    <>
      <h2>設定ファイルの変更</h2>
      <Setting buttons={buttons} prefixKey={prefixKey} />
    </>
  );
};
