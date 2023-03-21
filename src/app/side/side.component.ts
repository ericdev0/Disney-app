import { Component, ElementRef, Host, OnInit, ViewChild } from '@angular/core';
import { DisneyService } from '../services/disney.service';
import { CharacterService } from '../services/Character.service';
import { MainComponent } from '../main/main.component';


@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  searchText: string = ''
  characters: any;
  arraySearchCharacter: any[] = [];
  characterData: any[] = [];


  constructor(
    private disneyService: DisneyService,
    private characterService: CharacterService
  ) { }

  ngOnInit() {
    this.disneyService.loadCharacters().subscribe(() => {
      this.characters = this.disneyService.characters;
      this.searchCharacter();
    });
  }


  searchCharacter() {
    const capitalized = this.searchText.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const ArraySearch = this.getCharacterByName(`${capitalized}`)!;
    this.arraySearchCharacter = ArraySearch;
  }

  getCharacterByName(name: string) {
    return this.characters?.filter((character: any) => character.name.includes(`${name}`));
  }

  dataToMain(data: any) {
    this.characterData = [data];
    this.characterService.DataLaucher.emit({data: this.characterData});

    const cardMainWrapper = document.getElementById('cardMain_wrapper')!;
    if (cardMainWrapper.children.length === 1) {
      cardMainWrapper.style.setProperty('--cardAnimationIN-animation', 'bounceInLeft');
      cardMainWrapper.style.setProperty('--cardAnimationIN-duration', '1s');
      cardMainWrapper.classList.remove('cardAnimationIN');
      setTimeout(() => {
        cardMainWrapper.classList.add('cardAnimationIN');
      }, 0);
    } else {
      cardMainWrapper.style.setProperty('--cardAnimationIN-animation', 'bounce');
      cardMainWrapper.style.setProperty('--cardAnimationIN-duration', '.5s');
      cardMainWrapper.classList.remove('cardAnimationIN');
      setTimeout(() => {
        cardMainWrapper.classList.add('cardAnimationIN');
      }, 0);
    }
  }

}