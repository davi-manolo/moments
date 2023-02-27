import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Moments } from '../moments';
import { Response } from '../response';

@Injectable({
  providedIn: 'root'
})
export class MomentsService {

  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) { }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  getAllMoments(): Observable<Response<Moments[]>> {
    return this.http.get<Response<Moments[]>>(this.apiUrl);
  }

}
