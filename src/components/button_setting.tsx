/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect, useContext } from "react";
import { Button } from "../types/button";
import { ButtonsModal } from "./buttons_modal";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { ButtonsSettingType, ButtonsInLayer, Layers } from "../types/buttons_setting_type";
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

  const flipRadioName = `${layerKey}_button_menu_${name}`;
  const [openModal, setOpenModal] = useState(false)

  // like pipe for modal
  const [modalCallbackOnSubmit, setModalCallbackOnSubmit] = useState(undefined as any)
  const [modalCloseCallback, setModalCloseCallback] = useState(undefined as any)
  const [modalTitle, setModalTitle] = useState("")
  const [modalPrefillButtons, setModalPrefillButtons] = useState<Array<Button>>([])

  // checkbox state for flip
  const [flipCheckedName, setFlipCheckedName] = useState('none')

  // 常に連打
  const handleFlipValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlipCheckedName(e.target.value);
  };

  // 自分自身への条件付き連打
  const [flipIfPressedSelf, setFlipIfPressedSelf] = useState<Array<Button>>([name]);
  const openIfPressedRadioboxModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlipCheckedName(e.target.value);
  };

  // 条件付き連打
  const [flipIfPressedSomeButtons, setFlipIfPressedSomeButtons] = useState<Array<Button>>([])
  const openIfPressedSomeButtonsModal = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
    setFlipCheckedName((e.target as HTMLInputElement).value);

    setOpenModal(true)
    setModalTitle("特定のキーを押したときだけ")
    setModalPrefillButtons(flipIfPressedSomeButtons);
    setModalCallbackOnSubmit(() => setFlipIfPressedSomeButtons);
    setModalCloseCallback(() => setOpenModal);
  }

  // 無視
  const [ignoreButtonsOnFliping, setIgnoreButtonsOnFliping] = useState<Array<Button>>([])
  const handleIgnoreButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenModal(true)
    setModalTitle("連打中は特定のボタンの入力を無視する")
    setModalPrefillButtons(ignoreButtonsOnFliping);
    setModalCallbackOnSubmit(() => setIgnoreButtonsOnFliping);
    setModalCloseCallback(() => setOpenModal);
  };

  // リマップ
  const [remapButtons, setRemapButtons] = useState<Array<Button>>([])
  const setRemapButtonsWithPersistence = (bs: Array<Button>) => {
    settingContext.setLayers((layer: Layers) => {
      settingContext.layers[layerKey][name].remap = { to: bs };
      return settingContext.layers;
    })
    setRemapButtons(bs); // component rerenderするためにuseStateに書き込む
  }
  const handleRemapButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenModal(true)
    setModalTitle("リマップ")
    setModalPrefillButtons(remapButtons);
    // contextに書き込むための
    setModalCallbackOnSubmit(() => setRemapButtonsWithPersistence);
    setModalCloseCallback(() => setOpenModal);
  };

  useEffect(() => {
    const buttonValue = settingContext.layers[layerKey][name];
    if(buttonValue.flip && Object.keys(buttonValue.flip).length === 0) {
      setFlipCheckedName("always");
    } else if(buttonValue.flip) {
      if(buttonValue.flip.if_pressed === name || buttonValue.flip.if_pressed === [name]) {
        setFlipCheckedName("if_pressed");
      } else {
        setFlipCheckedName("if_pressed_some_buttons");
        setFlipIfPressedSomeButtons([buttonValue.flip.if_pressed] as Array<Button>);
      }
      if(buttonValue.flip.force_neutral) {
        setIgnoreButtonsOnFliping([buttonValue.flip.force_neutral]);
      }
    } else if(buttonValue.remap) {
      setRemapButtons(buttonValue.remap.to);
    } else if(buttonValue.macro) {
      // TODO
    }
  }, [])

  const modalWrapperStyle = css(`
      position: relative;
  `)

  return(
    <>
      <div>
        <h2>連打設定</h2>
        <div>
          <label><input type="radio" onChange={handleFlipValue} checked={flipCheckedName === "always"} name={flipRadioName} value="always"/>常に連打する</label><br />
          <label><input type="radio" onChange={openIfPressedRadioboxModal} checked={flipCheckedName === "if_pressed"} name={flipRadioName} value="if_pressed"/>このボタンを押している時だけ連打する({flipIfPressedSelf})</label><br />
          <label>
            <input type="radio" onChange={openIfPressedSomeButtonsModal} onClick={openIfPressedSomeButtonsModal} checked={flipCheckedName === "if_pressed_some_buttons"} name={flipRadioName} value="if_pressed_some_buttons"/>
            特定のキーを押したときだけ連打する{flipIfPressedSomeButtons.length > 0 && `(${flipIfPressedSomeButtons.join(", ")})`}
          </label><br />
        </div>
        <br />

        <h3>連打オプション</h3>
        <div>
          <label>
            <input type="checkbox" onChange={handleIgnoreButton} checked={ignoreButtonsOnFliping.length > 0} />
              連打中は特定のボタンの入力を無視する{ignoreButtonsOnFliping.length > 0 && `(${ignoreButtonsOnFliping.join(", ")})`}
            </label>
        </div>

        <h2>リマップ設定</h2>
        <div>
          <label>
            <input type="checkbox"  onChange={handleRemapButton} checked={remapButtons.length > 0} />
              別のボタンに置き換える{remapButtons.length > 0 && `(${remapButtons.join(", ")})`}
          </label>
        </div>
      </div>
      <div css={modalWrapperStyle}>
        {openModal && <ButtonsModal callbackOnSubmit={modalCallbackOnSubmit} callbackOnClose={modalCloseCallback} title={modalTitle} prefill={modalPrefillButtons} />}
      </div>
    </>
  )
}

export const ButtonSetting: React.FC<Prop> = ({ name, layerKey }) => {
  const settingContext = useContext(ButtonsSettingContext);

  const handleToggle = () => {
    if(isOpenMenu()) { // 閉じる
      settingContext.setLayers((layers: Layers) => {
        const currentLayer = layers[layerKey as LayerKey] || {} as ButtonsInLayer
        currentLayer[name as Button] = {}
        return { ...layers };
      })
    } else { // 開く
      settingContext.setLayers((layers: Layers) => {
        const currentLayer = layers[layerKey as LayerKey] || {} as ButtonsInLayer
        currentLayer[name as Button] = { flip: {} }
        return { ...layers };
      })
    }
  }
  const isOpenMenu = () => {
    return settingContext.layers[layerKey] &&
      settingContext.layers[layerKey][name] &&
      Object.keys(settingContext.layers[layerKey][name]).length > 0;
  }

  return (
    <>
      <label><input type="checkbox" defaultChecked={isOpenMenu()} onChange={handleToggle}/>{name}</label>
      {isOpenMenu() && <ButtonMenu name={name} layerKey={layerKey} />}
    </>
  );
};

