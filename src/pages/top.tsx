/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useState, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { GlobalSetting } from "./global_setting_page";
import { BpmPage } from "./bpm_page";
import { Home } from "./home";
import { ButtonsSettingPage } from "./buttons_setting_page";
import { RecodingModePage } from "./recoding_mode_page";
import { PressedButtonsPage } from "./pressed_buttons_page";
import { ButtonsSettingContext } from "./../contexts/buttons_setting";
import {
  ButtonsInLayer,
  Layers,
  ButtonsSettingType,
} from "../types/buttons_setting_type";
import { buttons, Button } from "../types/button";
import { LayerReducer } from "../reducers/layer_reducer";
import ErrorBoundary from "../lib/error_boundary";

const ButtonsSettingProvider: React.FC = ({ children }) => {
  const initLayers: Layers = {
    up: buttons.reduce((a, i) => {
      a[i] = { open: false };
      return a;
    }, {} as ButtonsInLayer),
    right: buttons.reduce((a, i) => {
      a[i] = { open: false };
      return a;
    }, {} as ButtonsInLayer),
    down: buttons.reduce((a, i) => {
      a[i] = { open: false };
      return a;
    }, {} as ButtonsInLayer),
    left: buttons.reduce((a, i) => {
      a[i] = { open: false };
      return a;
    }, {} as ButtonsInLayer),
    installed_macros: {},
    installed_modes: {},
  };
  const [prefixKeys, setPrefixKeys] = useState([]);
  const [layers, layersDispatch] = useReducer(
    LayerReducer,
    initLayers as Layers
  );
  const value = {
    layers,
    prefixKeys,
    setPrefixKeys,
    layersDispatch,
  };
  return (
    <ButtonsSettingContext.Provider value={value}>
      {children}
    </ButtonsSettingContext.Provider>
  );
};

export const Top: React.FC = () => {
  const menuStyle = css`
    ul {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
      li {
        padding-right: 3px;
        display: block;
        a {
          text-decoration: none;
          display: block;
          padding: 10px;
          background-color: #333;
          color: white;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  `;

  return (
    <>
      <Router>
        <div>
          <nav css={menuStyle}>
            <ul>
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/setting">設定</Link>
              </li>
              <li>
                <Link to="/buttons_setting">ボタン設定</Link>
              </li>
              <li>
                <Link to="/pressed_buttons">入力中のボタン表示する画面</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/setting">
              <ErrorBoundary>
                <GlobalSetting />
              </ErrorBoundary>
            </Route>
            <Route path="/pbm">
              <ErrorBoundary>
                <BpmPage />
              </ErrorBoundary>
            </Route>
            <Route path="/buttons_setting">
              <ErrorBoundary>
                <ButtonsSettingProvider>
                  <ButtonsSettingPage />
                </ButtonsSettingProvider>
              </ErrorBoundary>
            </Route>
            <Route path="/recoding_mode">
              <RecodingModePage />
            </Route>
            <Route path="/pressed_buttons">
              <PressedButtonsPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};
