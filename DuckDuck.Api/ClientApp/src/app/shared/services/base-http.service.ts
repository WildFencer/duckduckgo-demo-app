import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  constructor() { }

  public getOptions(contentType: string = 'application/json'): { headers: HttpHeaders } {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', contentType);
    // Added these headers to prevent caching of GET requests for Internet Explorer
    headers = headers.append('Cache-Control', 'no-cache');
    headers = headers.append('Pragma', 'no-cache');
    headers = headers.append('Expires', 'Sat, 01 Jan 2000 00: 00: 00 GMT');
    return { headers: headers };
}

}
