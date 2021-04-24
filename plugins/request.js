import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io/api'
})

export default function ({ store }) {
  request.interceptors.request.use(
    function(config) {
      const { user } = store.state;

      if(user && user.token) {
        config.headers.Authorization = `Token ${user.token}`;
      }
      return config;
    },
    function (error) {
      return Object.assign({ retCode: -10000 }, error);
    }
  )
  // 模拟返回状态码
  request.interceptors.response.use(
    function (response) {
      return Object.assign({ retCode: 0 }, response);
    },
    function (error) {
      return Promise.resolve(Object.assign({ retCode: -10000 }, error.response));
    })
}