import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Sign In
  public signIn(username:string, password:string):Observable<any>
  {
    return this.http.post<any>(environment.apiUrl+'/api/Authentication/sign-in', {"username":username, "password": password});
  }

  // Send Image
  public uploadPhoto(formData:FormData):Observable<any>
  {
    return this.http.post<any>(environment.apiUrl+'/api/Image/upload-image', formData);
  }
}
