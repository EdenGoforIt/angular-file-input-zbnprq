import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
  export class UploadService {
    constructor(private http: HttpClient) {
    }

    upload(data: File) {
      let url = 'http://localhost:64952/api/Excel/Import';

      const content = new FormData();
      if (data !== null && data !== undefined) {
        content.append("file", data, "file");
      }
      
      content.append("status", "customer");

      let options : any = {
        body: content,
        observe: "response",
        responseType: "blob",           
        headers: new HttpHeaders({
          "Accept": "application/json"
        })
      };

      return this.http.request("post", url, options);
    }
  }