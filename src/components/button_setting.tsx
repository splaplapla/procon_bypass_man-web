/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useContext } from "react";
import { Button } from "../types/button";
import { ButtonsModal } from "./buttons_modal";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { ButtonsSettingType, ButtonsInLayer, ButtonInLayer, Layers, Flip } from "../types/buttons_setting_type";
import { LayerKey } from "../types/layer_key";

type ButtonMenuProp = {
  name: Button;
  layerKey: string;
  buttonValue: any;
  setLayers: any;
};

type ModalType = {
  callback?(buttons: Array<string>): void;
};

const ButtonMenu = ({ name, layerKey, buttonValue, setLayers }: ButtonMenuProp) => {
  const flipRadioName = `${layerKey}_button_menu_${name}`;
  const [openModal, setOpenModal] = useState(false)

  // like pipe for modal
  const [modalCallbackOnSubmit, setModalCallbackOnSubmit] = useState(undefined as any)
  const [modalCloseCallback, setModalCloseCallback] = useState(undefined as any)
  const [modalTitle, setModalTitle] = useState("")
  const [modalPrefillButtons, setModalPrefillButtons] = useState<Array<Button>>([])

  // 無効
  const handleNullFlipValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLayers((layers: Layers) => {
      const flip = layers[layerKey as LayerKey][name as Button].flip as Flip
      flip.enable = false;
      return { ...layers };
    });
  };

  // 常に連打
  const handleFlipValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLayers((layers: Layers) => {
      const flip = layers[layerKey as LayerKey][name as Button].flip as Flip
      flip.if_pressed = [];
      flip.enable = true;
      return { ...layers };
    });
  };

  // 自分自身への条件付き連打
  const openIfPressedRadioboxModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLayers((layers: Layers) => {
      const flip = layers[layerKey as LayerKey][name as Button].flip as Flip
      flip.if_pressed = [name];
      flip.enable = true;
      return { ...layers };
    });
  };

  // 条件付き連打
  const [flipIfPressedSomeButtons, setFlipIfPressedSomeButtons] = useState<Array<Button>>(buttonValue.flip.if_pressed || [] as Array<Button>)
  const setFlipIfPressedSomeButtonsWithPersistence = (bs: Array<Button>) => {
    setLayers((layers: Layers) => {
      const flip = layers[layerKey as LayerKey][name as Button].flip as Flip
      flip.if_pressed = bs;
      flip.enable = true;
      return { ...layers };
    });
    setFlipIfPressedSomeButtons(bs);
  }
  const openIfPressedSomeButtonsModal = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
    setOpenModal(true)
    setModalTitle("特定のキーを押したときだけ")
    setModalPrefillButtons(flipIfPressedSomeButtons);
    setModalCallbackOnSubmit(() => setFlipIfPressedSomeButtonsWithPersistence);
    setModalCloseCallback(() => setOpenModal);
  }

  // 無視
  const forceNeutralButtons = buttonValue.flip.force_neutral || [] as Array<Button>
  const setIgnoreButtonsOnFlipingWithPersistence = (bs: Array<Button>) => {
    setLayers((layers: Layers) => {
      const flip = layers[layerKey as LayerKey][name as Button].flip as Flip
      flip.force_neutral = bs;
      return layers;
    });
  }
  const handleIgnoreButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenModal(true)
    setModalTitle("連打中は特定のボタンの入力を無視する")
    setModalPrefillButtons(buttonValue.flip.force_neutral || [] as Array<Button>);
    setModalCallbackOnSubmit(() => setIgnoreButtonsOnFlipingWithPersistence);
    setModalCloseCallback(() => setOpenModal);
  };

  // リマップ
  const setRemapButtonsWithPersistence = (bs: Array<Button>) => {
    setLayers((layers: Layers) => {
      const button = layers[layerKey as LayerKey][name as Button] as ButtonInLayer
      button.remap = { to: bs };
      return { ...layers };
    })
  }
  const handleRemapButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenModal(true)
    setModalTitle("リマップ")
    setModalPrefillButtons(buttonValue.remap?.to || []);
    setModalCallbackOnSubmit(() => setRemapButtonsWithPersistence);
    setModalCloseCallback(() => setOpenModal);
  };

  const isDisabledFlip = (): boolean => {
    return buttonValue.flip && !buttonValue.flip.enable;
  }
  const isAlwaysFlip = (): boolean => {
    if(isDisabledFlip()) { return false };
    return buttonValue.flip && buttonValue.flip.if_pressed && buttonValue.flip.if_pressed.length === 0;
  }
  const isFlipIfPressedSelf = (): boolean => {
    if(isDisabledFlip() || isAlwaysFlip()) { return false }
    return buttonValue.flip && buttonValue.flip.if_pressed && buttonValue.flip.if_pressed.length === 1 && buttonValue.flip.if_pressed[0] === name;
  }
  const isFlipIfPressedSomeButtons = (): boolean => {
    if(isDisabledFlip() || isAlwaysFlip() || isFlipIfPressedSelf()) { return false }
    return true
  }

  const modalWrapperStyle = css(`
      position: relative;
  `)

  return(
    <>
      <div>
        <h2>連打設定</h2>
        <div>
          <label><input type="radio" onChange={handleNullFlipValue} checked={isDisabledFlip()}/>無効</label><br />
          <label><input type="radio" onChange={handleFlipValue} checked={isAlwaysFlip()}/>常に連打する</label><br />
          <label><input type="radio" onChange={openIfPressedRadioboxModal} checked={isFlipIfPressedSelf()}/>このボタンを押している時だけ連打する({name})</label><br />
          <label>
            <input type="radio" onChange={openIfPressedSomeButtonsModal} onClick={openIfPressedSomeButtonsModal} checked={isFlipIfPressedSomeButtons()}/>
            特定のキーを押したときだけ連打する{flipIfPressedSomeButtons && flipIfPressedSomeButtons.length > 0 && `(${flipIfPressedSomeButtons.join(", ")})`}
          </label><br />
        </div>
        <br />

        <h3>連打オプション</h3>
        <div>
          <label>
            <input type="checkbox" onChange={handleIgnoreButton} checked={forceNeutralButtons.length > 0} disabled={isDisabledFlip()} />
              連打中は特定のボタンの入力を無視する{forceNeutralButtons.length > 0 && `(${forceNeutralButtons.join(", ")})`}
            </label>
        </div>

        <h2>リマップ設定</h2>
        <div>
          <label>
            <input type="checkbox" onChange={handleRemapButton} checked={buttonValue.remap?.to} disabled={!isDisabledFlip()} />
              別のボタンに置き換える{buttonValue.remap?.to && buttonValue.remap?.to?.length > 0 && `(${buttonValue.remap?.to?.join(", ")})`}
          </label>
        </div>
      </div>
      <div css={modalWrapperStyle}>
        {openModal && <ButtonsModal callbackOnSubmit={modalCallbackOnSubmit} callbackOnClose={modalCloseCallback} title={modalTitle} prefill={modalPrefillButtons} />}
      </div>
    </>
  )
}

type Prop = {
  name: Button;
  layerKey: string;
};

export const ButtonSetting: React.FC<Prop> = ({ name, layerKey }) => {
  const settingContext = useContext(ButtonsSettingContext);
  const handleToggle = () => {
    if(isOpenMenu()) { // 閉じる
      settingContext.setLayers((layers: Layers) => {
        const currentLayer = layers[layerKey as LayerKey] || {} as ButtonsInLayer
        currentLayer[name as Button] = { flip: { enable: false }, open: false }
        return { ...layers };
      })
    } else { // 開く
      settingContext.setLayers((layers: Layers) => {
        const currentLayer = layers[layerKey as LayerKey] || {} as ButtonsInLayer
        currentLayer[name as Button] = { flip: { enable: false }, open: true }
        return { ...layers };
      })
    }
  }
  // - メニューが開いている
  //   - button.open
  // - 連打無効
  //   - button.flip.enable === false
  // - 常に連打
  //   - button.flip.if_pressed
  // - このボタンを押している時だけ
  //   - button.flip.if_pressed_self
  // - 特定のボタンを押している時だけ
  //   - button.flip.if_pressed_some_buttons
  const isOpenMenu = () => {
    return settingContext.layers[layerKey][name].open;
  }
  const buttonValue = settingContext.layers[layerKey][name] || {} as ButtonInLayer;

  return (
    <>
      <label><input type="checkbox" checked={isOpenMenu()} onChange={handleToggle}/>{name}</label>
      {isOpenMenu() && <ButtonMenu name={name} layerKey={layerKey} buttonValue={buttonValue} setLayers={settingContext.setLayers} />}
    </>
  );
};
