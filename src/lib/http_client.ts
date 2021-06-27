import axios from 'axios';

export class HttpClient {
  constructor() {
  };

  getDirPath() {
    const origin = "http://localhost:9090";
    const path = "/pbm_dir_path";
    return axios.get(`${origin}${path}`);
  }

  getSettingPath() {
    const path = "/pbm_setting_path"
    return "k";
  }
}
