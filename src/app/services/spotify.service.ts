import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1/search';
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private client_id = '86d2d9988ce04be5af87b8f96f3e46ae';
  private client_secret = 'da8b89fc67334b17bf57409138bc03a6';
  header = new HttpHeaders({'Authorization': 'Bearer '});


  constructor(private http: HttpClient) { }

  generateSpotifyToken(): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.client_id}:${this.client_secret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    const body = 'grant_type=client_credentials';
  
    return this.http.post(this.tokenUrl, body, { headers }).pipe(
      map((response: any) => {
        return response.access_token;
      })
    );
  }
  
  searchSpotify(searchText: string): Observable<any> {
    return this.generateSpotifyToken().pipe(
      switchMap((accessToken: string) => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        });
        const params = {
          q: searchText,
          type: 'playlist,album,track'
        };
        return this.http.get(this.apiUrl, { headers, params });
      })
    );
  }
  
  
}
