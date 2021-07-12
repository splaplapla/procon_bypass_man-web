import axios from 'axios';
import { PbmStats } from "../types/pbm_stats";
import { Button } from "../types/button";
import { layerKey } from "../types/layerKey";

interface DirPathApiResponse {
  result: string,
  root_path: string,
}

interface SettingPathApiResponse {
  result: string,
  setting_path: string,
}

interface PostApiResponse {
  result: string,
}

interface StatsApiResponse {
  stats: PbmStats,
  result: string,
  pid: number | null,
}

// TODO intefaceで定義したい
type Flip = {
  [key in Button]? : {
   if_pressed: Array<Button>,
   force_neutral: Button,
  }
}

type Macro = {
  [key in Button]? : {
    if_pressed: Array<Button>,
  }
}

type Remap = {
  [key in Button]? : {
    to: Button,
  }
}

interface Layer {
  flip: Flip,
  macro: Macro,
  remap: Remap,
}

interface Layers {
  up: Layer,
  right: Layer,
  down: Layer,
  left: Layer,
}

interface SettingType {
  prefix_keys_for_changing_layer: Array<Button>,
  layers: Layers,
}

interface SettingApiResponse {
  result: string,
  setting: SettingType,
}

export class HttpClient {
  constructor() {
  };

  getDirPath() {
    const path = "/api/pbm_root__path";
    return axios.get<DirPathApiResponse>(`/api/pbm_root_path`);
  }

  postDirPath(dirPath: string) {
    return axios.post<PostApiResponse>(`/api/pbm_root_path`, { root_path: dirPath });
  }

  getSettingPath() {
    return axios.get<SettingPathApiResponse>( "/api/pbm_setting_path");
  }

  postSettingPath(settingPath: string) {
    const path = "/api/pbm_setting_path"
    return axios.post<PostApiResponse>(`${path}`, { setting_path: settingPath });
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

  getSetting() {
    return axios.get<SettingApiResponse>( "/api/pbm_setting");
  }
}
