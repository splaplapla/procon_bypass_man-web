import * as React from "react";
import { useState } from "react";

type Prop = {
  name: string;
};

const ButtonMenu: React.FC = () => {
  return(
    <>
      <div>
        <div>連射
          <input type="radio" value="always" id="flip_always"/><label htmlFor="flip_always">常に連打する</label>
          <input type="radio" value="if_puressed" id="flip_if_puressed" /><label htmlFor="flip_if_puressed">常に連打する</label>
          <input type="radio" value="if_puressed_some_buttons" id="flip_if_puressed_some_buttons"/>
          <label htmlFor="flip_if_puressed_some_buttons"> 特定のキーを押したときだけ</label>
        </div>
        詳細です
      </div>
    </>
  )
}

export const SettingButton: React.FC<Prop> = ({ name }) => {
  const [openMenu, toggleMenu] = useState(false);
  const handleToggle = () => {
    toggleMenu(!openMenu);
  }
  const menu = () => {
    ButtonMenu
  }

  return (
    <>
      <li>
        <label><input type="checkbox" onClick={handleToggle}/>{name}</label>
        {openMenu && <ButtonMenu />}
      </li>
    </>
  );
};

