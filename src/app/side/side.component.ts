import { Component, OnInit } from '@angular/core';
import { DisneyService } from '../services/disney.service';
import { CharacterService } from '../services/Character.service';


@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  characters: any[] | undefined;
  characterName: string = ''
  arraySearchCharacter: any[] = [];
  characterData: any[] = [];

  constructor(
    private disneyService: DisneyService,
    private characterService: CharacterService
  ) { }

  ngOnInit() {
    this.getCharactersMethods();
  }


  getCharactersMethods() {
    this.disneyService.getCharacters().subscribe(data => {
      this.characters = data.data;
      
      const capitalized = this.characterName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      const search = this.getCharacterByName(`${capitalized}`)!;
      this.arraySearchCharacter = search; 
      // console.log(this.arraySearchCharacter);
    });
  }

  getCharacterByName(name: string) {
    return this.characters?.filter(character => character.name.includes(`${name}`));
  }

  dataToMain(data: any) {
    this.characterData = [data]
    // console.log(this.characterData);
    this.characterService.DataLaucher.emit({data: this.characterData})
  }

}