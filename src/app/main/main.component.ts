import { Component, OnInit} from '@angular/core';
import { CharacterService } from '../services/Character.service';
import { RawgService } from '../services/rawg.service';
import { TheMovieDBService } from '../services/the-movie-db.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public characters: any[] = [{
    "films": [
        "Hollywood Party",
        "Fantasia",
        "Fun and Fancy Free",
        "TRON",
        "Who Framed Roger Rabbit",
        "Oliver & Company",
        "The Little Mermaid",
        "Toy Story",
        "A Goofy Movie",
        "Mickey's Once Upon a Christmas",
        "Fantasia 2000",
        "Mickey's Magical Christmas: Snowed in at the House of Mouse",
        "Mickey's House of Villains",
        "Teacher's Pet (film)",
        "The Lion King 1½",
        "101 Dalmatians II: Patch's London Adventure",
        "Mickey, Donald, Goofy: The Three Musketeers",
        "Mickey's Twice Upon a Christmas",
        "Chicken Little (film)",
        "Meet the Robinsons",
        "Wreck-It Ralph (film)",
        "Saving Mr. Banks",
        "Frozen",
        "Zootopia",
        "Ralph Breaks the Internet"
    ],
    "shortFilms": [],
    "tvShows": [
        "Walt Disney anthology series",
        "The Mickey Mouse Club",
        "The Mouse Factory",
        "Adventures of the Gummi Bears",
        "Bonkers",
        "101 Dalmatians: The Series",
        "Mickey Mouse Works",
        "House of Mouse",
        "Mickey Mouse Clubhouse",
        "Imagination Movers",
        "Mickey's Letter Time",
        "Have a Laugh!",
        "Mickey’s Mousekersize",
        "A Poem Is...",
        "Mickey Mouse (TV series)",
        "Minnie's Bow-Toons",
        "Once Upon a Time",
        "Frozen: Northern Lights",
        "At Home With Olaf",
        "Mickey Mouse Mixed-Up Adventures",
        "DuckTales (2017 series)",
        "Mickey Go Local",
        "The Wonderful World of Mickey Mouse",
        "WandaVision",
        "Mickey Mouse Funhouse"
    ],
    "videoGames": [
        "Mickey Mouse: The Computer Game",
        "Mickey Mousecapade",
        "Adventures in the Magic Kingdom",
        "Illusion (series)",
        "The Magical Quest starring Mickey Mouse",
        "Mickey Mania: The Timeless Adventures of Mickey Mouse",
        "Mickey's Speedway USA",
        "Mickey's Racing Adventure",
        "Disney's Party",
        "Disney's Magical Mirror Starring Mickey Mouse",
        "Disney's Hide and Sneak",
        "Disney Friends",
        "Kingdom Hearts (series)",
        "Epic Mickey (series)",
        "Kinect Disneyland Adventures",
        "Disney Infinity (series)",
        "Disney Magical World",
        "Disney Magical World 2",
        "Where's My Mickey?",
        "Disney Tsum Tsum (game)",
        "Disney Magical Dice",
        "Disney Heroes: Battle Mode",
        "Disney Mirrorverse",
        "Disney Sorcerer's Arena"
    ],
    "parkAttractions": [
        "Mickey and Minnie's Runaway Railway",
        "Fantasmic!",
        "Mickey's PhilharMagic",
        "Mickey's Royal Friendship Faire",
        "World of Color",
        "Main Street Electrical Parade",
        "Mickey Mouse Revue",
        "Town Square Theater",
        "Mickey's House and Meet Mickey",
        "One Man's Dream II: The Magic Lives On!",
        "Midship Detective Agency",
        "My Friend Duffy",
        "The Golden Mickeys",
        "Festival of Fantasy Parade",
        "Paint the Night Parade",
        "Mickey and the Magical Map",
        "Wonderful World of Animation"
    ],
    "allies": [],
    "enemies": [],
    "_id": 4703,
    "name": "Mickey Mouse",
    "imageUrl": "https://static.wikia.nocookie.net/disney/images/9/99/Mickey_Mouse_Disney_3.jpeg",
    "url": "https://api.disneyapi.dev/characters/4703"
  }];
  ChipValues: any[] = [];
  chipSelected: any;

  // movies and tvshows properties:
  page: number = 1;
  

  
  // main properties:
  templatesData: any[] = [];
  spotifyData: any[] = [];
  videogames: object | undefined;
  moviesAndTVshows: object | undefined;

  constructor(
    private characterService: CharacterService,
    private theMovieDBService: TheMovieDBService,
    private rawgService: RawgService
  ) { }

  ngOnInit(): void {
    this.classMainCard();
    this.getCharacter();
    this.TemplateReset();
  }
  


  // pedir data de los personajes -----------------------
  getCharacter() {
    this.characterService.DataLaucher.subscribe(data => {
      this.characters = data.data;
    })
  }

  getChipValue(media_type: string, value: string) {
    this.ChipValues = [{media_type: media_type,value: value}];
    this.spotifyData = [];
    this.sendSpotifyData(value);
    this.filmsOrVideogames();
  }

  // arreglo css
  classMainCard() {
    const cardMainWrapper = document.getElementById('cardMain_wrapper')!;
    const mainCardStyleDefault = document.querySelector('.main_cardStyleDefault')!;

    const observer = new MutationObserver(() => {
      if (cardMainWrapper?.children.length > 1) {
        mainCardStyleDefault.classList.remove('mainCard_border');
      } else {
        mainCardStyleDefault.classList.add('mainCard_border');
      }
    });

    const observerConfig = { childList: true };
    observer.observe(cardMainWrapper, observerConfig);
    
  }


// pedir data de las peliculas y series de los personajes -----------------------
  requestMovieOrTVshow(query: string) {
    const searchName = query.replace(/ *\([^)]*\) */g, '').replace(/\s+/g, '%20').toLowerCase();
    this.theMovieDBService.searchMovies(searchName, this.page).subscribe((response: any)=>{
      this.moviesAndTVshows = {
        query: this.ChipValues[0].value,
        type: 'moviesAndTVshows',
        template: response.results
      };

      this.templatesData = [this.moviesAndTVshows];
    });
  }



// pedir data de videojuegos de los personajes -----------------------
  requestVideogames(query: string) {
    const searchName = query.replace(/\s+/g, '%20').toLowerCase();
    this.rawgService.getGames(searchName).subscribe( response => {
      this.videogames = {
        query: this.ChipValues[0].value,
        type: 'videogames',
        template: response.results
      };
      
      this.templatesData = [this.videogames];
    })
  }


  // clasificar la data de los personajes -----------------------
  filmsOrVideogames() {
    if (this.ChipValues[0].media_type !== "videoGame") {
      this.requestMovieOrTVshow(this.ChipValues[0].value);
    } else {
      this.requestVideogames(this.ChipValues[0].value);
    }
  }
  

// enviar data a spotify component -----------------------
sendSpotifyData(chipValue: string) {
  this.spotifyData.push({chipValue: chipValue, character: this.characters[0].name});
}



// restablecer targeta -----------------------
  TemplateReset() {
    const itemListCharacters = document.querySelector('.sideLeft_mat-nav-list');
    itemListCharacters?.addEventListener('click',() => {
      this.templatesData = [];
      this.spotifyData = [];
    });
  }
  

}
