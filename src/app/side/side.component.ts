import { Component, OnInit } from '@angular/core';
import { DisneyService } from '../services/disney.service';
import { CharacterService } from '../services/Character.service';


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
  }

}