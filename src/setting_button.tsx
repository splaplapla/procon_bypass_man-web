import * as React from "react";

type Prop = {
  name: string;
};

export const SettingButton: React.FC<Prop> = ({ name }) => {
  return (
    <>
      <li>
        {name}です
      </li>
    </>
  );
};

