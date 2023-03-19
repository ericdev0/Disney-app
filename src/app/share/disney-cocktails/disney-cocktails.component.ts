import { Component } from '@angular/core';
import { CocktailService } from 'src/app/services/the-cocktail-db.service';

@Component({
  selector: 'app-disney-cocktails',
  templateUrl: './disney-cocktails.component.html',
  styleUrls: ['./disney-cocktails.component.css']
})
export class DisneyCocktailsComponent {

  cocktails: any[] = [];
  categories: any[] = [];

  constructor(private cocktailService: CocktailService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getCocktails('Ordinary Drink');
  }

  getCategories(): void {
    this.cocktailService.getCategories()
      .subscribe( data => this.categories = data.drinks);
  }

  getCocktails(category: string): void {
    const strCategory = category.replace(/\s+/g, '_');
    this.cocktailService.getCocktails(strCategory)
      .subscribe(response => {
        this.getRandomCocktails(response.drinks, 5)
      });
  }
  
  getRandomCocktails(cocktails: any[], number: number): void {
    const randomCocktails = this.cocktailService.getRandomCocktails(cocktails, number);
    this.cocktails = randomCocktails;
  }
  
  addIframe(strDrink: string, elementId: string) {
    const urlBase = 'https://cocktail-stack.netlify.app/';
    const nameDrink = strDrink.replace(/\s+/g, '-').toLowerCase();
    const link = `${urlBase}${nameDrink}`;
    const iframe = document.createElement('iframe');
    iframe.src = link;
    iframe.width = '300';
    iframe.height = '200';
    const contenedor = document.getElementById(elementId);
    contenedor?.appendChild(iframe);
  }
}

