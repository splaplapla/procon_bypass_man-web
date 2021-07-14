/** @jsxFrag React.Fragment */

import React, { useState, useRef, useContext } from "react";
import { jsx } from '@emotion/react'
import { Button } from "../types/button";
import { ButtonsModal } from "./buttons_modal";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";

type Prop = {
  name: Button;
  layerKey: string;
};

type ModalType = {
  callback?(buttons: Array<string>): void;
};

const ButtonMenu = ({ name, layerKey }: Prop) => {
  const settingContext = useContext(ButtonsSettingContext);
  // debugger;
  settingContext.layers[layerKey][name]
  const [flipButton, setFlipButton] = useState("none");
  const [ignoreButton, setIgnoreButton] = useState("none");

  const flipRadioName = `button_menu_${name}`;
  const [openModal, setOpenModal] = useState(false)

  // like pipe for modal
  const [modalCallback, setModalCallback] = useState(undefined as any)
  const [modalCloseCallback, setModalCloseCallback] = useState(undefined as any)
  const [modalTitle, setModalTitle] = useState("")
  const [modalPrefillButtons, setModalPrefillButtons] = useState([])

  const handleFlipValue = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    setFlipButton(e.target.value);
  };

  // 無視
  const [ignoreButtonsOnFliping, setIgnoreButtonsOnFliping] = useState([])
  const handleIgnoreButton = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    if(e.target.checked) {
      setIgnoreButton("has");
      setOpenModal(true)
      setModalTitle("連打中は特定の入力を無視する")
      setModalPrefillButtons(ignoreButtonsOnFliping);
      setModalCallback(() => setIgnoreButtonsOnFliping);
      setModalCloseCallback(() => setOpenModal);
    } else {
      setIgnoreButton("none");
    }
  };

  // 自分自身への条件付き連打
  const [flipIfPressedButtons, setflipIfPressedButtons] = useState<Array<Button>>([name])
  const openIfPressedRadioboxModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
  };

  // 条件付き連打
  const [flipIfPressedSomeButtons, setFlipIfPressedSomeButtons] = useState([])
  const openIfPressedSomeButtonsModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    setOpenModal(true)
    setModalTitle("特定のキーを押したときだけ")
    setModalPrefillButtons(flipIfPressedSomeButtons);
    setModalCallback(() => setFlipIfPressedSomeButtons);
    setModalCloseCallback(() => setOpenModal);
  }

  return(
    <>
      <div>
        連打({flipButton})
        <div>
          <label><input type="radio" onClick={handleFlipValue} name={flipRadioName} value="always"/>常に連打する</label><br />
          <label><input type="radio" onClick={openIfPressedRadioboxModal} name={flipRadioName} value="if_puressed"/>このボタンを押している時だけ連打する({flipIfPressedButtons.join(", ")})</label><br />
          <label><input type="radio" onClick={openIfPressedSomeButtonsModal} name={flipRadioName} value="if_puressed_some_buttons"/>特定のキーを押したときだけ({flipIfPressedSomeButtons.join(", ")})</label><br />
        </div>
        <br />

        その他({ignoreButton})
        <div>
          <label><input type="checkbox" onClick={handleIgnoreButton} />連打中は特定の入力を無視する({ignoreButtonsOnFliping.join(", ")})</label>
        </div>
      </div>
      {openModal && <ButtonsModal callbackOnSubmit={modalCallback} callbackOnClose={modalCloseCallback} title={modalTitle} prefill={modalPrefillButtons} />}
    </>
  )
}

export const ButtonSetting: React.FC<Prop> = ({ name, layerKey }) => {
  const [openMenu, toggleMenu] = useState(false);
  const handleToggle = () => {
    toggleMenu(!openMenu);
  }

  return (
    <>
      <label><input type="checkbox" onClick={handleToggle}/>{name}</label>
      {openMenu && <ButtonMenu name={name} layerKey={layerKey} />}
    </>
  );
};

