import { Component, OnInit, AfterViewInit, Host, Input } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  // ID: string = this.query.value.replace(/[^a-z]+/gi, '-').toLowerCase();
  @Input() templateData: any | undefined;
  wasDataFound: boolean = false;
  cardData: any[] = [];

  // movies and tvshows properties:
  imgBaseUrl: string = 'https://image.tmdb.org/t/p/w500';
  imgErrorUrl: string = '../../../assets/img/not_found_imgFilm.jpg';

  public parentPlatformsIcons: any[] = [
    {'PC': '../../../assets/icons/windows.svg' },
    {'PlayStation': '../../../assets/icons/playstation.svg' },
    {'Xbox': '../../../assets/icons/xbox.svg' },
    {'iOS': '../../../assets/icons/ios.svg' },
    {'Android': '../../../assets/icons/android.svg' },
    {'Apple Macintosh' : '../../../assets/icons/apple-logo.svg'},
    {'Linux': '../../../assets/icons/linux.svg' },
    {'Nintendo': '../../../assets/icons/nintendo.svg' },
    {'Atari': '../../../assets/icons/atari.svg' },
    {'Commodore / Amiga' : '../../../assets/icons/vintage-joystick.svg'},
    {'SEGA': '../../../assets/icons/sega.svg' },
    {'3DO': '../../../assets/icons/gameControl.svg' },
    {'Neo Geo' : '../../../assets/icons/neogeo.svg'},
    {'Web': '../../../assets/icons/web.svg' },
    {'movie': '../../../assets/icons/movie.svg' },
    {'tv': '../../../assets/icons/television.svg' },
  ]


  constructor() {}
  
  ngOnInit(): void {
    this.cardDataCheck();
  }

  cardDataCheck() {
    if (this.templateData.template.length > 0) {
      this.wasDataFound = true;
      this.templateType();
    } else {
      this.wasDataFound = false;
    }
  }

  arrayCheck(stores: any) {
    if (stores !== null) {
      return [stores];
    } else {return [];}
  }

  screenshotsCheck(screenshots: any[]) {
    const short_screenshots: string[] = []
    screenshots.forEach((screenshot) => {
      short_screenshots.push(screenshot.image);
    });
    return short_screenshots;
  }

  filterParentPlatformsIcons(keys: any[], key: string) {
    const card_icons: any[] = [];
    if (keys !== undefined && key !== undefined) {
      if (key === 'videogame') {
        keys.forEach((KEY: any) => {
          const iconsFilter: any[] = this.parentPlatformsIcons.filter((icon) => icon[KEY.platform.name]);
          const iconUrl = iconsFilter.length !== 0? iconsFilter[0][KEY.platform.name]: '';
          card_icons.push({key: KEY.platform.name, iconUrl: iconUrl});
        });
      } else {
        const iconsFilter: any[] = this.parentPlatformsIcons.filter((icon) => icon[key]);
        const iconUrl = iconsFilter.length !== 0? iconsFilter[0][key]: '';
        card_icons.push({key: key, iconUrl: iconUrl});
      }
    } else {
      return [];
    }
    
    return card_icons;
  }

  imgUrlcheck(url: string): string {
    if (url !== null && url !== undefined && url !== "") {
      return this.imgBaseUrl+url;
    } else {
      return this.imgErrorUrl;
    }
  }

  stringCheck(string: string): any | void {
    if (string !== undefined && string !== null && string !== "") {
      return [string];
    } else {return;}
  }

  templateType() {
    if (this.templateData !== undefined) {
      if (this.templateData.type === "moviesAndTVshows") {
        const template: any[] = this.templateData.template;
        const _cardData: any[] = [];
        template.forEach((film) => {
          if (
            film.poster_path &&
            (film.title || film.name) &&
            (film.release_date || film.first_air_date)
          ) {
            let title: string | undefined;
            let original_title: string = '';
            let release_date: string | undefined;
            
            if (film.media_type === 'movie') {
              title = film.title;
              original_title = film.original_title;
              release_date = film.release_date;
            } 
            else
            if (film.media_type === 'tv') {
              title = film.name;
              original_title = film.original_name;
              release_date = film.first_air_date;
            }
  
            const data: object = {
              card_id: film.id,
              media_type: film.media_type,
              card_icons: this.filterParentPlatformsIcons([film.media_type],film.media_type),
              title: title,
              release_date: release_date,
              overview: this.stringCheck(film.overview),
              poster_path: this.imgUrlcheck(film.poster_path),
              screenshots: [this.imgUrlcheck(film.backdrop_path)],
              original_title: this.stringCheck(original_title),
              original_language: this.stringCheck(film.original_language),
              vote_average: this.stringCheck(`${film.vote_average}/10`),
            };
  
            _cardData.push(data);
          }

        });

        this.cardData = _cardData;
      } else if (this.templateData.type === "videogames") {
        const template: any[] = this.templateData.template;
        const _cardData: any[] = [];
        template.forEach((game) => {

          const data: object = {
            card_id: game.id,//check
            media_type: 'videogame',//check
            card_icons: this.filterParentPlatformsIcons(game.parent_platforms, 'videogame'),//check
            title: game.name,//check
            release_date: game.released,//check
            poster_path: game.background_image,//check
            screenshots: this.screenshotsCheck(game.short_screenshots),//check

            stores: this.arrayCheck(game.stores),
            genres: this.arrayCheck(game.genres),
            platforms: this.arrayCheck(game.platforms),
            tags: this.arrayCheck(game.tags)
          };

          _cardData.push(data);
        });
        this.cardData = _cardData;
      }
    }
  }

}
