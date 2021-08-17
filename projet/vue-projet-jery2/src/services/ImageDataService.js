import http from "../http-common";

class ImageDataService {
 

  create(data) {
    return http.post("/upload", data);
  }
 
}

export default new ImageDataService();