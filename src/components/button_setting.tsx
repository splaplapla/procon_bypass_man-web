/** @jsxFrag React.Fragment */

import React, { useState, useRef } from "react";
import { jsx } from '@emotion/react'
import { Button } from "../types/button";
import { ButtonsModal } from "./buttons_modal";

type Prop = {
  name: Button;
};

type ModalType = {
  callback?(buttons: Array<string>): void;
};

const ButtonMenu = ({ name }: Prop) => {
  const [flipButton, setFlipButton] = useState("none");
  const [ignoreButton, setIgnoreButton] = useState("none");
  const flipRadioName = `button_menu_${name}`;
  const [openModal, setOpenModal] = useState(false)
  const [modalCallback, setModalCallback] = useState(undefined as any)
  const [modalCloseCallback, setModalCloseCallback] = useState(undefined as any)
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
  const [flipIfPressedButtons, setflipIfPressedButtons] = useState([])
  const openIfPressedRadioboxModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    setOpenModal(true)
    setModalCallback(() => setflipIfPressedButtons);
    setModalCloseCallback(() => setOpenModal);
  };

  return(
    <>
      <div>
        連射({flipButton})
        <div>
          <label><input type="radio" onClick={handleFlipValue} name={flipRadioName} value="always"/>常に連打する</label><br />
          <label><input type="radio" onClick={openIfPressedRadioboxModal} name={flipRadioName} value="if_puressed"/>このボタンを押している時だけ連打する({flipIfPressedButtons.join(", ")})</label><br />
          <label><input type="radio" onClick={handleFlipValue} name={flipRadioName} value="if_puressed_some_buttons"/>特定のキーを押したときだけ</label><br />
        </div>
        <br />

        その他({ignoreButton})
        <div>
          <label><input type="checkbox" onClick={handleIgnoreButton} />連射中は特定の入力を無視する</label>
        </div>
      </div>
      {openModal && <ButtonsModal callbackOnSubmit={modalCallback} callbackOnClose={modalCloseCallback} />}
    </>
  )
}

export const ButtonSetting: React.FC<Prop> = ({ name }) => {
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

