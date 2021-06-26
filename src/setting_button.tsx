import * as React from "react";
import { useState } from "react";

type Prop = {
  name: string;
};

export const SettingButton: React.FC<Prop> = ({ name }) => {
  const [openMenu, toggleMenu] = useState(false);
  const handleToggle = () => {
    toggleMenu(!openMenu);
  }

  return (
    <>
      <li onClick={handleToggle}>
        {name}です
        {openMenu &&
        <div>
          詳細です
        </div>
        }
      </li>
    </>
  );
};

