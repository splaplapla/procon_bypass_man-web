import * as React from "react";
import { useState } from "react";

type Prop = {
  name: string;
};

const ButtonMenu: React.FC<Prop> = ({ name }) => {
  const [flipValue, setFlipValue] = useState("none");
  const flipRadioName = `button_menu_${name}`;
  const handleFlipValue = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    setFlipValue(e.target.value);
  };

  return(
    <>
      <div>
        連射({flipValue})
        <div>
          <label><input type="radio" onClick={handleFlipValue} name={flipRadioName} value="always"/>常に連打する</label><br />
          <label><input type="radio" onClick={handleFlipValue} name={flipRadioName} value="if_puressed"/>このボタンを押している時だけ連打する</label><br />
          <label><input type="radio" onClick={handleFlipValue} name={flipRadioName} value="if_puressed_some_buttons"/>特定のキーを押したときだけ</label><br />
        </div>
        <br />
        その他
        <div>
          <label><input type="checkbox" />連射中は特定の入力を無視する</label>
        </div>
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
        {openMenu && <ButtonMenu name={name} />}
      </li>
    </>
  );
};

