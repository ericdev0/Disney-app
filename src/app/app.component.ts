import { Component, OnInit } from '@angular/core';
import { DisneyService } from './services/disney.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'DisneyTheme';

  loadingPercentage: number = 0;
  showLoad: boolean = true;

  constructor(private disneyService: DisneyService) {}

  ngOnInit(): void {
    this.loadCharactersBar();
  }

  loadCharactersBar() {
    this.showLoad = !this.disneyService.isLoadedCharacters;
    const interval = setInterval(() => {
      this.loadingPercentage = (this.disneyService.requestIndex*100)/this.disneyService.totalPages;
      if (this.loadingPercentage === 100) {
        setTimeout(() => {
          clearInterval(interval);
          this.showLoad = !this.disneyService.isLoadedCharacters;
        }, 500);
      }
    }, 0);
  }
}
