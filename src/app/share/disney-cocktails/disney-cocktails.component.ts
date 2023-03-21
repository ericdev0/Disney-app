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
    this.cocktailsClick();
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
    this.removeIframe();

    const urlBase = 'https://cocktail-stack.netlify.app/';
    const nameDrink = strDrink.replace(/\s+/g, '-').toLowerCase();
    const link = `${urlBase}${nameDrink}`;
    const iframe = document.createElement('iframe');
    iframe.src = link;
    iframe.width = '300';
    iframe.height = '400';
    const contenedor = document.getElementById(elementId);
    contenedor?.appendChild(iframe);

    contenedor?.classList.add('cocktail_iframe_selected');
  }

  removeIframe() {
    const iframeContainers = document.querySelectorAll('.cocktail_iframe_container')!;
    iframeContainers.forEach((container) => {
      container.classList.remove('cocktail_iframe_selected');
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    });
  }

  cocktailsClick() {
    window.addEventListener('click', (e)=>{
      const cocktailWrapper = document.querySelectorAll('.cocktail_content_wrapper')!;
      let closeIframe: boolean = true;
      if(cocktailWrapper){
        cocktailWrapper.forEach((wrapper)=>{
          if (e.target === wrapper ) {
            closeIframe = false;
          }
        });
      }
      if (closeIframe) {
        this.removeIframe();
      }
    });
  }

}

