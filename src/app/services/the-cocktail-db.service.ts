import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  private baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  private categoriesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.categoriesUrl);
  }

  getCocktails(strCategory: string): Observable<any> {
    const apiUrl = `${this.baseUrl}${strCategory}`;
    return this.http.get<any>(apiUrl);
  }

  getRandomCocktails(cocktails: any[], count: number): any[] {
    const randomCocktails: any[] = [];
    while (randomCocktails.length < count) {
      const randomIndex = Math.floor(Math.random() * cocktails.length);
      const cocktail = cocktails[randomIndex];
      if (!randomCocktails.includes(cocktail)) {
        randomCocktails.push(cocktail);
      }
    }
    return randomCocktails;
  }
}
