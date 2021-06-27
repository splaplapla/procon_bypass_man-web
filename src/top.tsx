import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Setting } from "./setting";
import { PBM } from "./pbm";
import { GlobalSetting } from "./pages/global_setting";

type Prop = {
};
const buttons = [
  "a", "b", "x", "y", "up", "right", "down", "left", "r", "l", "zr", "zl",
]
// TODO serverから取得する
const prefixKey = [
  "r", "l", "zr", "zl",
]
const pbm = new PBM();

export const Top: React.FC<Prop> = () => {
  const [pbmStat, updatePbmStat] = useState(pbm.initStats());

  const handlePbmStats = (e: React.MouseEvent<HTMLElement>) => {
    updatePbmStat(pbm.fetchStats());
  }

  const isShowRestartButton = () => {
    return true;
  }

  const isShowStartButton = () => {
    return true;
  }

  const isShowStopButton = () => {
    return true;
  }

  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/setting">設定</Link>
              </li>
              <li>
                <Link to="/pbm">PBMへの操作</Link>
              </li>
              <li>
                <Link to="/buttons_setting">ボタン設定</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/setting">
              <GlobalSetting />
            </Route>
            <Route path="/pbm">
            </Route>
            <Route path="/buttons_setting">
            </Route>
          </Switch>
        </div>
      </Router>

      <h2>PBMのステータス: {pbmStat}</h2>
      <input type="button" onClick={handlePbmStats} value="現在のステータスを取得する" />
      {isShowStopButton() && <input type="button" onClick={handlePbmStats} value="停止する" />}
      {isShowRestartButton() && <input type="button" onClick={handlePbmStats} value="リスタートする" />}
      {isShowStartButton() && <input type="button" onClick={handlePbmStats} value="開始する" />}

      <hr />
      <h2>設定ファイルの変更</h2>
      <Setting buttons={buttons} prefixKey={prefixKey} />
    </>
  );
};
