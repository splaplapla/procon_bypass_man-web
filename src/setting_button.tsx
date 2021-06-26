import * as React from "react";
import * as ReactDOM from "react-dom";

type Prop = {
  name: string;
};

export const SettingButton: React.FC<Prop> = ({ name }) => {
  return (
    <>
      {name}です
    </>
  );
};

