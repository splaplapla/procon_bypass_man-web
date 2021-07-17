/** @jsxFrag React.Fragment */

import React, { useState, useEffect, useContext } from "react";
import { jsx } from '@emotion/react'
import { Button } from "../types/button";
import { ButtonsModal } from "./buttons_modal";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { ButtonsSettingType, ButtonInLayer, Layers } from "../types/buttons_setting_type";
import { LayerKey } from "../types/layer_key";

type Prop = {
  name: Button;
  layerKey: string;
};

type ModalType = {
  callback?(buttons: Array<string>): void;
};

const ButtonMenu = ({ name, layerKey }: Prop) => {
  const settingContext = useContext(ButtonsSettingContext);
  const [flipButtonTitle, setFlipButtonTitle] = useState("none");
  const [ignoreButton, setIgnoreButton] = useState("none");

  const flipRadioName = `${layerKey}_button_menu_${name}`;
  const [openModal, setOpenModal] = useState(false)

  // like pipe for modal
  const [modalCallback, setModalCallback] = useState(undefined as any)
  const [modalCloseCallback, setModalCloseCallback] = useState(undefined as any)
  const [modalTitle, setModalTitle] = useState("")
  const [modalPrefillButtons, setModalPrefillButtons] = useState<Array<Button>>([])

  // checkbox state for flip
  const [flipCheckedName, setFlipCheckedName] = useState('none')

  // 常に連打
  const handleFlipValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlipButtonTitle(e.target.value);
    setFlipCheckedName(e.target.value);
  };

  // 自分自身への条件付き連打
  const [flipIfPressedSelf, setFlipIfPressedSelf] = useState<Array<Button>>([name]);
  const openIfPressedRadioboxModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlipButtonTitle(e.target.value);
    setFlipCheckedName(e.target.value);
  };

  // 条件付き連打
  const [flipIfPressedSomeButtons, setFlipIfPressedSomeButtons] = useState<Array<Button>>([])
  const openIfPressedSomeButtonsModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlipButtonTitle(e.target.value);
    setFlipCheckedName(e.target.value);

    setOpenModal(true)
    setModalTitle("特定のキーを押したときだけ")
    setModalPrefillButtons(flipIfPressedSomeButtons);
    setModalCallback(() => setFlipIfPressedSomeButtons);
    setModalCloseCallback(() => setOpenModal);
  }

  // 無視
  const [ignoreButtonsOnFliping, setIgnoreButtonsOnFliping] = useState([])
  const handleIgnoreButton = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    const buttonValue = settingContext.layers[layerKey][name];
    if(buttonValue.flip && Object.keys(buttonValue.flip).length === 0) {
      setFlipButtonTitle("always");
      setFlipCheckedName("always");
    } else if(buttonValue.flip) {
      if(buttonValue.flip.if_pressed === name || buttonValue.flip.if_pressed === [name]) {
        setFlipButtonTitle("if_pressed");
        setFlipCheckedName("if_pressed");
      } else {
        setFlipButtonTitle("if_pressed_some_buttons");
        setFlipCheckedName("if_pressed_some_buttons");
        setFlipIfPressedSomeButtons([buttonValue.flip.if_pressed] as Array<Button>);
      }
    } else if(buttonValue.remap) {
      // TODO
    } else if(buttonValue.macro) {
      // TODO
    }
  }, [])

  return(
    <>
      <div>
        連打({flipButtonTitle})
        <div>
          <label><input type="radio" onChange={handleFlipValue} checked={flipCheckedName === "always"} name={flipRadioName} value="always"/>常に連打する</label><br />
          <label><input type="radio" onChange={openIfPressedRadioboxModal} checked={flipCheckedName === "if_pressed"} name={flipRadioName} value="if_pressed"/>このボタンを押している時だけ連打する({flipIfPressedSelf})</label><br />
          <label><input type="radio" onChange={openIfPressedSomeButtonsModal} checked={flipCheckedName === "if_pressed_some_buttons"} name={flipRadioName} value="if_pressed_some_buttons"/>特定のキーを押したときだけ({flipIfPressedSomeButtons.join(", ")})</label><br />
        </div>
        <br />

        連打オプション({ignoreButton})
        <div>
          <label><input type="checkbox" onChange={handleIgnoreButton} checked={false} />連打中は特定の入力を無視する({ignoreButtonsOnFliping.join(", ")})</label>
        </div>
      </div>
      {openModal && <ButtonsModal callbackOnSubmit={modalCallback} callbackOnClose={modalCloseCallback} title={modalTitle} prefill={modalPrefillButtons} />}
    </>
  )
}

export const ButtonSetting: React.FC<Prop> = ({ name, layerKey }) => {
  const settingContext = useContext(ButtonsSettingContext);

  const handleToggle = () => {
    if(settingContext.layers[layerKey][name]) { // 閉じる
      settingContext.setLayers((layers: Layers) => {
        const currentLayer = layers[layerKey as LayerKey] || {} as ButtonInLayer
        currentLayer[name as Button] = false
        return { ...layers };
      })
    } else { // 開く
      settingContext.setLayers((layers: Layers) => {
        const currentLayer = layers[layerKey as LayerKey] || {} as ButtonInLayer
        currentLayer[name as Button] = true
        return { ...layers };
      })
    }
  }
  const isOpenMenu = () => {
    return !!(settingContext.layers[layerKey] && settingContext.layers[layerKey][name]);
  }

  return (
    <>
      <label><input type="checkbox" checked={isOpenMenu()} onChange={handleToggle}/>{name}</label>
      {isOpenMenu() && <ButtonMenu name={name} layerKey={layerKey} />}
    </>
  );
};

