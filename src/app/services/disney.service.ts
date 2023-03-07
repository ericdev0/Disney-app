import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisneyService {
  private baseUrl = 'https://api.disneyapi.dev/characters';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
} 
