import * as React from "react";
import * as ReactDOM from "react-dom";
import { ButtonSetting } from "./buttons_setting";

type Prop = {
};

export const Top: React.FC<Prop> = () => {
  return (
    <>
      <h2>設定ファイルの変更</h2>
      <ButtonSetting />
    </>
  );
};
