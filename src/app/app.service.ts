import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  sendMail(payload: { name: string, email: string, message: string, subject: string}) {
    return this.http.post('/api/contact', payload);
  }

  getResume() {
    return this.http.get('/api/data');
  }

}
