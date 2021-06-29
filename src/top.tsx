import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { PBM } from "./pbm";
import { GlobalSetting } from "./pages/global_setting";
import { BpmPage } from "./pages/bpm_page";
import { SettingPage } from "./pages/setting_page";

type Prop = {
};

export const Top: React.FC<Prop> = () => {
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
                <Link to="/pbm">PBMへの操作</Link>
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
              <SettingPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};
