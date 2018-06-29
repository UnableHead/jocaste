import request from "request";
import config from "../configLoader";

const query = {
  getListModule: (callback) => {
    request.post(
      {url: config.backHost + "query/listItemModule"},
      (err, httpResponse, body) => {
        if(!err && httpResponse.statusCode === 200){
          const info = JSON.parse(body);
          return callback(info);
        }
      }
    );
  },
  getImageURL: (imgName) => {
    return config.backHost + "download/" + imgName;
  },
  getImage: (imgName, callback) => {
    const postData = {targetFileName: imgName};
    request.post(
      {url: config.backHost + "download/", form: postData},
      (err, httpResponse, body) => {
        if(!err && httpResponse.statusCode === 200){
          return callback(body);
        }
      }
    );
  },
  getTruc: (callback) => {
    const postData = {truc: 8};
    request.post(
      {url: config.backHost + "download/img/", form: postData},
      (err, httpResponse, body) => {
        if(!err && httpResponse.statusCode === 200){
          const info = JSON.parse(body);
          return callback(info);
        }
      }
    );
  }
};

export default query;