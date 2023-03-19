import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  private keyApi = '18ff4c244f7d48fe94e71af71fb8d546';
  
  constructor(private http: HttpClient) { }
  
  getGames(slug: string): Observable<any>{
    const GAME_URL = `https://api.rawg.io/api/games?search=${slug}&key=${this.keyApi}`;
    return this.http.get<any>(GAME_URL);
  }
  
}
