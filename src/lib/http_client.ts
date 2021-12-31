import axios from "axios";
import { PbmStats } from "../types/pbm_stats";
import { Button } from "../types/button";
import { LayerKey } from "../types/layer_key";
import { ButtonsSettingType } from "../types/buttons_setting_type";

interface AnalogStickPosition {
  x: number;
  y: number;
}

interface DirPathApiResponse {
  result: string;
  root_path: string;
}

interface SettingPathApiResponse {
  result: string;
  setting_path: string;
}

interface PostApiResponse {
  result: string;
}

interface StatsApiResponse {
  stats: PbmStats;
  result: string;
  pid: number | null;
}

interface PressedButtonsResponse {
  buttons: Array<Button>;
  left_analog_stick: AnalogStickPosition;
  left_analog_stick_by_abs: AnalogStickPosition;
}

export interface SettingApiResponse {
  result: string;
  setting: ButtonsSettingType;
  setting_group_by_button: any;
  installed_macros: Array<string>;
  installed_modes: Array<string>;
}

interface SettingDigestApiResponse {
  result: string;
  digest: string;
}

export class HttpClient {
  constructor() {}

  getDirPath() {
    const path = "/api/pbm_root__path";
    return axios.get<DirPathApiResponse>(`/api/pbm_root_path`);
  }

  postDirPath(dirPath: string) {
    return axios.post<PostApiResponse>(`/api/pbm_root_path`, {
      root_path: dirPath,
    });
  }

  getSettingPath() {
    return axios.get<SettingPathApiResponse>("/api/pbm_setting_path");
  }

  postSettingPath(settingPath: string) {
    const path = "/api/pbm_setting_path";
    return axios.post<PostApiResponse>(`${path}`, {
      setting_path: settingPath,
    });
  }

  getPbmStats() {
    const path = "/api/pbm_stats";
    return axios.get<StatsApiResponse>(`${path}`);
  }

  startPbm() {
    const path = "/api/start_pbm";
    return axios.post<PostApiResponse>(`${path}`);
  }

  stopPbm() {
    const path = "/api/stop_pbm";
    return axios.post<PostApiResponse>(`${path}`);
  }

  reloadPbmSetting() {
    const path = "/api/reload_pbm_setting";
    return axios.post<PostApiResponse>(`${path}`);
  }

  getSetting() {
    return axios.get<SettingApiResponse>("/api/pbm_setting");
  }

  postSetting(settingYaml: string) {
    return axios.post<PostApiResponse>("/api/pbm_setting", {
      setting_yaml: settingYaml,
    });
  }

  getSettingDigest() {
    return axios.get<SettingDigestApiResponse>("/api/pbm_setting_digest");
  }

  getPressedButtons() {
    return axios.get<PressedButtonsResponse>("/api/pressed_buttons");
  }
}
