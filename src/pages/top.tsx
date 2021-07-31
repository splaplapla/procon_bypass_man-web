import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { GlobalSetting } from "./global_setting_page";
import { BpmPage } from "./bpm_page";
import { ButtonsSettingPage } from "./buttons_setting_page";
import { RecodingModePage } from "./recoding_mode_page";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import { ButtonsSettingType, ButtonsInLayer, Layers, Flip, Remap } from "../types/buttons_setting_type";
import { buttons, Button } from "../types/button";
import { LayerKey } from "../types/layer_key";

type ACTIONTYPE =
    | { type: "disableFlip", payload: { layerKey: LayerKey, button: Button } }
    | { type: "alwaysFlip", payload: { layerKey: LayerKey, button: Button } }
    | { type: "flipIfPressedSelf", payload: { layerKey: LayerKey, button: Button } }
    | { type: "flipIfPressedSomeButtons", payload: { layerKey: LayerKey, button: Button, targetButtons: Array<Button> } }
    | { type: "ignoreButtonsInFliping", payload: { layerKey: LayerKey, button: Button, targetButtons: Array<Button> } }
    | { type: "remap", payload: { layerKey: LayerKey, button: Button, targetButtons: Array<Button> } }
    | { type: "openMenu", payload: { layerKey: LayerKey, button: Button } }
    | { type: "closeMenu", payload: { layerKey: LayerKey, button: Button } }

const reducer = (layers: Layers, action: ACTIONTYPE) => {
  const layerKey = action.payload.layerKey;
  const button = action.payload.button;
  const flip = layers[layerKey][button].flip || {} as Flip
  const remap = layers[layerKey][button].remap || {} as Remap

  switch (action.type) {
    case "disableFlip":
      flip.enable = false;
      return { ...layers };
    case "alwaysFlip":
      flip.if_pressed = [];
      flip.enable = true;
      return { ...layers };
    case "flipIfPressedSelf":
      flip.if_pressed = [button];
      flip.enable = true;
      return { ...layers };
    case "flipIfPressedSomeButtons":
      flip.if_pressed = action.payload.targetButtons;
      flip.enable = true;
      return { ...layers };
    case "ignoreButtonsInFliping":
      flip.force_neutral = action.payload.targetButtons;
      return { ...layers };
    case "remap":
      remap.to = action.payload.targetButtons;
      return { ...layers };
    case "openMenu":
      layers[layerKey][button].open = true;
      return { ...layers };
    case "closeMenu":
      layers[layerKey][button].open = false;
      return { ...layers };
    default:
      return { ...layers };
  }
};

const ButtonsSettingProfile: React.FC = ({children}) => {
  const initLayers: Layers = {
    up: buttons.reduce((a, i) => { a[i] = { open: false }; return a }, {} as ButtonsInLayer),
    right: buttons.reduce((a, i) => { a[i] = { open: false }; return a }, {} as ButtonsInLayer),
    down: buttons.reduce((a, i) => { a[i] = { open: false }; return a }, {} as ButtonsInLayer),
    left: buttons.reduce((a, i) => { a[i] = { open: false }; return a }, {} as ButtonsInLayer),
  }
  const [prefixKeys, setPrefixKeys] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [layers, setLayers] = useState(initLayers);
  const [layers2, layersDispatch] = useReducer(reducer, initLayers as Layers);
  const value = {
    loaded,
    setLoaded,
    layers,
    setLayers,
    prefixKeys,
    setPrefixKeys,
    layersDispatch,
  }
  return (
    <ButtonsSettingContext.Provider value={value}>
      {children}
    </ButtonsSettingContext.Provider>
  )
}

export const Top: React.FC = () => {
  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/setting">設定</Link>
              </li>
              <li>
                <Link to="/pbm">PBMのステータス</Link>
              </li>
              <li>
                <Link to="/recoding_mode">入力の録画</Link>
              </li>
              <li>
                <Link to="/buttons_setting">ボタン設定(wip)</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" ></Route>
            <Route path="/setting">
              <GlobalSetting />
            </Route>
            <Route path="/pbm">
              <BpmPage />
            </Route>
            <Route path="/buttons_setting">
              <ButtonsSettingProfile><ButtonsSettingPage /></ButtonsSettingProfile>
            </Route>
            <Route path="/recoding_mode">
              <RecodingModePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};
