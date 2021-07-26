/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useEffect, useContext } from "react";
import { Button } from "../types/button";
import { ButtonsModal } from "./buttons_modal";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { ButtonsSettingType, ButtonsInLayer, ButtonInLayer, Layers, Flip } from "../types/buttons_setting_type";
import { LayerKey } from "../types/layer_key";

type ButtonMenuProp = {
  name: Button;
  layerKey: string;
  buttonValue: any;
};

type ModalType = {
  callback?(buttons: Array<string>): void;
};

const ButtonMenu = ({ name, layerKey, buttonValue }: ButtonMenuProp) => {
  // ここでuseContenxtするのをやめる。ButtonSettingのpropsから受け取る
  const settingContext = useContext(ButtonsSettingContext);

  const flipRadioName = `${layerKey}_button_menu_${name}`;
  const [openModal, setOpenModal] = useState(false)

  // like pipe for modal
  const [modalCallbackOnSubmit, setModalCallbackOnSubmit] = useState(undefined as any)
  const [modalCloseCallback, setModalCloseCallback] = useState(undefined as any)
  const [modalTitle, setModalTitle] = useState("")
  const [modalPrefillButtons, setModalPrefillButtons] = useState<Array<Button>>([])

  // 無効
  const handleNullFlipValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    settingContext.setLayers((layers: Layers) => {
      const flip = layers[layerKey as LayerKey][name as Button].flip as Flip
      flip.enable = false;
      return { ...layers };
    });
  };

  // 常に連打
  const handleFlipValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    settingContext.setLayers((layers: Layers) => {
      const flip = layers[layerKey as LayerKey][name as Button].flip as Flip
      flip.if_pressed = [];
      flip.enable = true;
      return { ...layers };
    });
  };

  // 自分自身への条件付き連打
  const [flipIfPressedSelf, setFlipIfPressedSelf] = useState<Array<Button>>([name]);
  const openIfPressedRadioboxModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    settingContext.setLayers((layers: Layers) => {
      const flip = layers[layerKey as LayerKey][name as Button].flip as Flip
      flip.if_pressed = [name];
      flip.enable = true;
      return { ...layers };
    });
  };

  // 条件付き連打
  const [flipIfPressedSomeButtons, setFlipIfPressedSomeButtons] = useState<Array<Button>>([])
  const setFlipIfPressedSomeButtonsWithPersistence = (bs: Array<Button>) => {
    settingContext.setLayers((layers: Layers) => {
      const flip = layers[layerKey as LayerKey][name as Button].flip as Flip
      flip.if_pressed = bs;
      flip.enable = true;
      return settingContext.layers;
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
  const [ignoreButtonsOnFliping, setIgnoreButtonsOnFliping] = useState<Array<Button>>([])
  const setIgnoreButtonsOnFlipingWithPersistence = (bs: Array<Button>) => {
    settingContext.setLayers((layer: Layers) => {
      settingContext.layers[layerKey][name].flip.force_neutral = bs;
      return settingContext.layers;
    });
    setIgnoreButtonsOnFliping(bs);
  }
  const handleIgnoreButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenModal(true)
    setModalTitle("連打中は特定のボタンの入力を無視する")
    setModalPrefillButtons(ignoreButtonsOnFliping);
    setModalCallbackOnSubmit(() => setIgnoreButtonsOnFlipingWithPersistence);
    setModalCloseCallback(() => setOpenModal);
  };

  // リマップ
  const setRemapButtonsWithPersistence = (bs: Array<Button>) => {
    settingContext.setLayers((layer: Layers) => {
      settingContext.layers[layerKey][name].remap = { to: bs };
      return settingContext.layers;
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
    return buttonValue.flip && buttonValue.flip.if_pressed.length === 0;
  }
  const isFlipIfPressedSelf = (): boolean => {
    if(isDisabledFlip() || isAlwaysFlip()) { return false }
    return buttonValue.flip && buttonValue.flip.if_pressed.length === 1 && buttonValue.flip.if_pressed[0] === name;
  }
  const isFlipIfPressedSomeButtons = (): boolean => {
    if(isDisabledFlip() || isAlwaysFlip() || isFlipIfPressedSelf()) { return false }
    return true
  }

  useEffect(() => {
    if(buttonValue.flip && Object.keys(buttonValue.flip).length === 1) {
    } else if(buttonValue.flip && Object.keys(buttonValue.flip).length > 1) {
      if(buttonValue.flip.if_pressed === name || buttonValue.flip.if_pressed === [name]) {
      } else {
        setFlipIfPressedSomeButtons([buttonValue.flip.if_pressed] as Array<Button>);
      }
      if(buttonValue.flip.force_neutral) {
        setIgnoreButtonsOnFliping([buttonValue.flip.force_neutral]);
      }
    } else if(buttonValue.remap) {
      // 要らなくなった
    } else if(buttonValue.macro) {
      // TODO
    }
  }, [])

  const modalWrapperStyle = css(`
      position: relative;
  `)

  // if(buttonValue.remap?.to) { debugger }

  return(
    <>
      <div>
        <h2>連打設定</h2>
        <div>
          <label><input type="radio" onChange={handleNullFlipValue} checked={isDisabledFlip()}/>無効</label><br />
          <label><input type="radio" onChange={handleFlipValue} checked={isAlwaysFlip()}/>常に連打する</label><br />
          <label><input type="radio" onChange={openIfPressedRadioboxModal} checked={isFlipIfPressedSelf()}/>このボタンを押している時だけ連打する({flipIfPressedSelf})</label><br />
          <label>
            <input type="radio" onChange={openIfPressedSomeButtonsModal} onClick={openIfPressedSomeButtonsModal} checked={isFlipIfPressedSomeButtons()}/>
            特定のキーを押したときだけ連打する{flipIfPressedSomeButtons.length > 0 && `(${flipIfPressedSomeButtons.join(", ")})`}
          </label><br />
        </div>
        <br />

        <h3>連打オプション</h3>
        <div>
          <label>
            <input type="checkbox" onChange={handleIgnoreButton} checked={ignoreButtonsOnFliping.length > 0} disabled={isDisabledFlip()} />
              連打中は特定のボタンの入力を無視する{ignoreButtonsOnFliping.length > 0 && `(${ignoreButtonsOnFliping.join(", ")})`}
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
        currentLayer[name as Button] = { flip: { enable: true }, open: true }
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
    return settingContext.layers[layerKey][name].open
  }
  const buttonValue = settingContext.layers[layerKey][name] || {} as ButtonInLayer;

  return (
    <>
      <label><input type="checkbox" defaultChecked={isOpenMenu()} onClick={handleToggle}/>{name}</label>
      {isOpenMenu() && <ButtonMenu name={name} layerKey={layerKey} buttonValue={buttonValue}/>}
    </>
  );
};
