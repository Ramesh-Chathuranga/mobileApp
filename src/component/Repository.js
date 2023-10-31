import axios from "axios";
import _ from "lodash";

 class Repository {

  constructor() {
  
  }
  data = async (method, path, data = null, user_token = '') => {
  
    return axios({
      method: method,
      url: path,
      data: data,
      headers: {
        // Authorization: access_token.length > 0 ? `Bearer ${access_token}` : `Bearer`,
        Accept: "application/json",
        'Content-Type':  'multipart/form-data',
      }
    })
      .then((response) => {
        return response
      })
      .catch((e) => {
        return e.response;
      });
  };
  
  getAxios = async (path) => {
    return axios.get(path);
  }
  getData = (path, data, token = '') => {
    return this.data("get", path, data, token);
  };
  postData = (path, data, token = '') => {
    return this.data("post", path, data, token);
  };
  putData = (path, data, token = '') => {
    return this.data("put", path, data, token);
  };
  
//   uploadForm = async (path, fd, user_token = '') => {
//     const token = await LocalStorage.get('TOKEN_KEY');
//     let access_token = '';
//     if (token) {
//       access_token = JSON.parse(token);
//     }
//     const url = this.url + path;
//     try {
//       let response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'content-type': 'multipart/form-data',
//         },
//         body: fd
//       })
//       return await response.json();
//     } catch (error) {
//       return { error }
//     }
    
//   }
}

export default new Repository()