import axios from 'axios';

type PbmStats = "stopped" | "running" | "unknown" | "waiting";

interface DirPathApiResponse {
  result: string,
  dir_path: string,
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
}

export class HttpClient {
  constructor() {
  };

  getDirPath() {
    const path = "/api/pbm_dir_path";
    return axios.get<DirPathApiResponse>(`/api/pbm_dir_path`);
  }

  postDirPath(dirPath: string) {
    return axios.post<PostApiResponse>(`/api/pbm_dir_path`, { dir_path: dirPath });
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
}
