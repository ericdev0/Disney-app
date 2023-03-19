import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDBService {

  constructor(private http: HttpClient) { }

  searchMovies(query: string, page: number) {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=b6307a7b75c136a25a5cb9e70233f0b8&language=es-ES&query=${query}&page=${page}&include_adult=false`;
    return this.http.get(url);
  }
}
