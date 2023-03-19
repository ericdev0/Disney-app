import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//@ts-ignore
import { concatMap, from, last, Observable, tap, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DisneyService {
  public urlbase: string = 'https://api.disneyapi.dev/characters';
  public totalPages: any = null;
  public requestIndex: number = 0;
  public characters: any[] = [];
  public isLoadedCharacters: boolean = false;

  constructor(private http: HttpClient) { }

  getCharacters(page: number) {
    return this.http.get(`${this.urlbase}?page=${page}`);
  }

  public getTotalPages(): Observable<any> {
    return this.getCharacters(1).pipe(
      tap((response: any) => {
        this.totalPages = response.totalPages;
      })
    );
  }

  public getAllCharacters(): Observable<any> {
    const requests = [];
    for (let i = 1; i <= this.totalPages; i++) {
      requests.push(this.getCharacters(i));
    }
    return from(requests).pipe(
      concatMap((request, i) =>  {this.requestIndex = i+1; return request; }),
      tap((response: any) => {
        this.characters = this.characters.concat(response.data);
      }),
      last()
    );
  }

  public loadCharacters(): Observable<any> {
    this.isLoadedCharacters = false;
    console.log('Cargando los personajes...');
    return this.getTotalPages().pipe(
      switchMap(() => this.getAllCharacters()),
      tap(() => {
        this.isLoadedCharacters = true;
        console.log('Se ha cargado todos los personajes.'); 
      })
    );
  }
  
}
