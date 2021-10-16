/** @jsx jsx */

import { jsx, css } from '@emotion/react'
import React, { useState, useReducer, useContext } from "react";
import { Button } from "../types/button";
import { ButtonState } from "./../lib/button_state";
import { ButtonsModal } from "./buttons_modal";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { ButtonsSettingType, ButtonsInLayer, ButtonInLayer, Layers, Flip } from "../types/buttons_setting_type";
import { LayerKey } from "../types/layer_key";
import { disableFlipType, alwaysFlipType, flipIfPressedSelfType, flipIfPressedSomeButtonsType, ignoreButtonsInFlipingType, remapType, openMenuType, closeMenuType } from "../reducers/layer_reducer";

type ButtonMenuProp = {
  name: Button;
  layerKey: LayerKey;
  buttonValue: ButtonInLayer;
  layersDispatch: any;
};

const ButtonMenu = ({ name, layerKey, buttonValue, layersDispatch }: ButtonMenuProp) => {
  const buttonState = new ButtonState(name, buttonValue.flip, buttonValue.remap);

  // for modal
  const [isOpenModal, toggleModal] = useReducer((m) => { return !m; }, false);

  const [modalCallbackOnSubmit, setModalCallbackOnSubmit] = useState(undefined as any)
  const [modalCloseCallback, setModalCloseCallback] = useState(undefined as any)
  const [modalTitle, setModalTitle] = useState("")
  const [modalPrefillButtons, setModalPrefillButtons] = useState<Array<Button>>([])

  // 無効
  const handleNullFlipValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    layersDispatch({ type: disableFlipType, payload: { layerKey: layerKey, button: name }});
  };

  // 常に連打
  const handleFlipValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    layersDispatch({ type: alwaysFlipType, payload: { layerKey: layerKey, button: name }});
  };

  // 自分自身への条件付き連打
  const openIfPressedRadioboxModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    layersDispatch({ type: flipIfPressedSelfType, payload: { layerKey: layerKey, button: name }});
  };

  // 条件付き連打
  const flipIfPressedSomeButtons = buttonValue?.flip?.if_pressed || [] as Array<Button>;
  const setFlipIfPressedSomeButtonsWithPersistence = (bs: Array<Button>) => {
    layersDispatch({ type: flipIfPressedSomeButtonsType, payload: { layerKey: layerKey, button: name, targetButtons: bs }});
  }
  const openIfPressedSomeButtonsModal = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
    toggleModal();
    setModalTitle("特定のキーを押したときだけ")
    setModalPrefillButtons(flipIfPressedSomeButtons);
    setModalCallbackOnSubmit(() => setFlipIfPressedSomeButtonsWithPersistence);
    setModalCloseCallback(() => toggleModal);
  }

  // 無視
  const forceNeutralButtons = buttonValue.flip?.force_neutral || [] as Array<Button>
  const setIgnoreButtonsOnFlipingWithPersistence = (bs: Array<Button>) => {
    layersDispatch({ type: ignoreButtonsInFlipingType, payload: { layerKey: layerKey, button: name, targetButtons: bs }});
  }
  const handleIgnoreButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleModal();
    setModalTitle("連打中は特定のボタンの入力を無視する")
    setModalPrefillButtons(buttonValue.flip?.force_neutral || [] as Array<Button>);
    setModalCallbackOnSubmit(() => setIgnoreButtonsOnFlipingWithPersistence);
    setModalCloseCallback(() => toggleModal);
  };

  // リマップ
  const setRemapButtonsWithPersistence = (bs: Array<Button>) => {
    layersDispatch({ type: remapType, payload: { layerKey: layerKey, button: name, targetButtons: bs }});
  }
  const handleRemapButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleModal();
    setModalTitle("リマップ")
    setModalPrefillButtons(buttonValue.remap?.to || []);
    setModalCallbackOnSubmit(() => setRemapButtonsWithPersistence);
    setModalCloseCallback(() => toggleModal);
  };

  return(
    <>
      <fieldset><legend><strong>連打設定</strong></legend>
        <label><input type="radio" onChange={handleNullFlipValue} checked={buttonState.isDisabledFlip()}/>無効</label><br />
        <label><input type="radio" onChange={handleFlipValue} checked={buttonState.isAlwaysFlip()}/>常に連打する</label><br />
        <label><input type="radio" onChange={openIfPressedRadioboxModal} checked={buttonState.isFlipIfPressedSelf()}/>このボタンを押している時だけ連打する({name})</label><br />
        <label>
          <input type="radio" onChange={openIfPressedSomeButtonsModal} onClick={openIfPressedSomeButtonsModal} checked={buttonState.isFlipIfPressedSomeButtons()}/>
          特定のキーを押したときだけ連打する{flipIfPressedSomeButtons.length > 0 && `(${flipIfPressedSomeButtons.join(", ")})`}
        </label>

        <fieldset><legend><strong>連打オプション</strong></legend>
          <label>
            <input type="checkbox" onChange={handleIgnoreButton} checked={forceNeutralButtons.length > 0} disabled={buttonState.isDisabledFlip()} />
            連打中は特定のボタンの入力を無視する{forceNeutralButtons.length > 0 && `(${forceNeutralButtons.join(", ")})`}
          </label>
        </fieldset>
      </fieldset>

      <fieldset><legend><strong>リマップ設定</strong></legend>
        <label>
          <input type="checkbox" onChange={handleRemapButton} checked={buttonState.isRemap()} disabled={!buttonState.isDisabledFlip()} />
            別のボタンに置き換える{buttonState.isRemap() && `(${buttonValue.remap?.to?.join(", ")})`}
        </label>
      </fieldset>
      <div css={css`position: relative;`}>
        {isOpenModal && <ButtonsModal callbackOnSubmit={modalCallbackOnSubmit} callbackOnClose={modalCloseCallback} title={modalTitle} prefill={modalPrefillButtons} positionOnShown={"relative"} />}
      </div>
    </>
  )
}

type Prop = {
  name: Button;
  layerKey: LayerKey;
};

export const ButtonSetting: React.FC<Prop> = ({ name, layerKey }) => {
  const settingContext = useContext(ButtonsSettingContext);
  const handleToggle = () => {
    if(isOpenMenu()) { // 閉じる
      settingContext.layersDispatch({ type: closeMenuType, payload: { layerKey: layerKey, button: name }});
    } else { // 開く
      settingContext.layersDispatch({ type: openMenuType, payload: { layerKey: layerKey, button: name }});
    }
  }

  const isOpenMenu = () => {
    return settingContext.layers[layerKey][name].open;
  }
  const buttonValue = settingContext.layers[layerKey][name] || {} as ButtonInLayer;

  return (
    <>
      <label><input type="checkbox" checked={isOpenMenu()} onChange={handleToggle}/>{name}</label>
      {isOpenMenu() && <ButtonMenu name={name} layerKey={layerKey} buttonValue={buttonValue} layersDispatch={settingContext.layersDispatch} />}
    </>
  );
};
