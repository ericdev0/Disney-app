import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements AfterViewInit {
  
  @Input() filmData: any;
  @Input() cardID: any = '';
  cardElement: any;
  hideDefaultCard: boolean = false;
  

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cardElement = document.getElementById(this.cardID);
    this.showDefaultCard();
    this.showScreenshots();
    this.cd.detectChanges();
  }





  showDefaultCard() {
    const cardCssVariables = this.cardElement.querySelector('.cardCssVariables');
    //@ts-ignore
    cardCssVariables?.style.setProperty(
      '--background-image', `url(${this.filmData.poster_path})`
    );

    cardCssVariables?.addEventListener('mouseleave', () => {
      this.hideDefaultCard = false;
      //@ts-ignore
      const styleCardCssVariables = cardCssVariables?.style;
      styleCardCssVariables.setProperty('--background-image', `url(${this.filmData.poster_path})`);
      styleCardCssVariables.setProperty('--opacityDefaultCard', `0`);
      styleCardCssVariables.setProperty('--pointerEvents-DefaultCard', `none`);
    });
    
    cardCssVariables?.addEventListener('mouseenter', () => {
      this.hideDefaultCard = true;
      //@ts-ignore
      const styleCardCssVariables = cardCssVariables?.style;
      styleCardCssVariables.setProperty('--background-image', `url(${this.filmData.poster_path})`);
      styleCardCssVariables.setProperty('--opacityDefaultCard', `1`);
      styleCardCssVariables.setProperty('--pointerEvents-DefaultCard', `auto`);
    });
  }

  showScreenshots() {
    const cardCssVariables = this.cardElement.querySelector('.cardCssVariables');
    const selectImageBars = this.cardElement.querySelectorAll('.selectImage_bar');
    selectImageBars.forEach((selectImageBar: Element) => {
      selectImageBar.addEventListener('mouseenter', () => {
        //@ts-ignore
        cardCssVariables?.style.setProperty(
          '--background-image', `url(${selectImageBar.getAttribute('data-screenshotLink')})`
        );
      });
    });
  }



}
