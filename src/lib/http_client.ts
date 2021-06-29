import axios from 'axios';

export class HttpClient {
  constructor() {
  };

  getDirPath() {
    const path = "/api/pbm_dir_path";
    return axios.get(`${path}`);
  }

  postDirPath(dirPath: string) {
    const path = "/api/pbm_dir_path";
    return axios.post(`${path}`, { dir_path: dirPath });
  }

  getSettingPath() {
    const path = "/pbm_setting_path"
    return "k";
  }

  getPbmStats() {
    const path = "/api/pbm_stats";
    return axios.get(`${path}`);
  }
}
