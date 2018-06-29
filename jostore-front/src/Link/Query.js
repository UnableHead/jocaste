import request from "request";
import fileDownload from "js-file-download";
import config from "../configLoader";


class QueryManager{
  constructor(){
    this.backHost = config.backHost;
  }

  getListModule(callback){
    request.post(
      {url: this.backHost + "query/listItemModule"},
      (err, httpResponse, body) => {
        if (!err && httpResponse.statusCode === 200){
          const info = JSON.parse(body);
          return callback(info);
        }
      }
    );
  }

  getFileURL(imgName){
    return this.backHost + "download/" + imgName;
  }

  downloadFile(fileName){
    const postData = {targetFileName: fileName};
    request.post(
      {url: this.backHost + "download/", form: postData},
      (err, httpResponse, body) => {
        if(!err && httpResponse.statusCode === 200){
          fileDownload(body, fileName);
        }
      }
    );
  }

  getFile(fileName, callback){
    const postData = {targetFileName: fileName};
    request.post(
      {url: this.backHost + "download/", form: postData},
      (err, httpResponse, body) => {
        if(!err && httpResponse.statusCode === 200){
          return callback(body);
        }
      }
    );
  }
}

const query = new QueryManager();

export default query;