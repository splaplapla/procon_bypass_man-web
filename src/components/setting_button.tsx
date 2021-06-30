/** @jsxFrag React.Fragment */
import React, { useState } from "react";
import { jsx } from '@emotion/react'
import { Button } from "../types/button";

type Prop = {
  name: Button;
};

const ButtonMenu = ({ name }: Prop) => {
  const [flipButton, setFlipButton] = useState("none");
  const [ignoreButton, setIgnoreButton] = useState("none");
  const flipRadioName = `button_menu_${name}`;
  const handleFlipValue = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    setFlipButton(e.target.value);
  };
  const handleIgnoreButton = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    if(e.target.checked) {
      setIgnoreButton("has");
    } else {
      setIgnoreButton("none");
    }
  };

  return(
    <>
      <div>
        連射({flipButton})
        <div>
          <label><input type="radio" onClick={handleFlipValue} name={flipRadioName} value="always"/>常に連打する</label><br />
          <label><input type="radio" onClick={handleFlipValue} name={flipRadioName} value="if_puressed"/>このボタンを押している時だけ連打する</label><br />
          <label><input type="radio" onClick={handleFlipValue} name={flipRadioName} value="if_puressed_some_buttons"/>特定のキーを押したときだけ</label><br />
        </div>
        <br />

        その他({ignoreButton})
        <div>
          <label><input type="checkbox" onClick={handleIgnoreButton} />連射中は特定の入力を無視する</label>
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

  return (
    <>
      <label><input type="checkbox" onClick={handleToggle}/>{name}</label>
      {openMenu && <ButtonMenu name={name} />}
    </>
  );
};

