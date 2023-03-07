import { Component, OnInit} from '@angular/core';
import { CharacterService } from '../services/Character.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public characters: any[] = [];

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.characterService.DataLaucher.subscribe(data => {
      console.log(data);
      this.characters = data.data;
    })
  }

  
}
