import request from "request";
import config from "./configLoader";

const query = {
  getListModule: () => {
    console.log("Matthias");
    const postData = {truc: 8};
    request.post(
      {url: config.backHost + "query/listItemModule", form: postData},
      (err, httpResponse, body) => {
        if(!err && httpResponse.statusCode === 200){
          const info = JSON.parse(body);
          console.log("Matthias", info);
        }
      }
    );
  },
  getImage: () => {
    //
  }
};

export default query;