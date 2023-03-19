
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-spotify-playlist',
  templateUrl: './spotify-playlist.component.html',
  styleUrls: ['./spotify-playlist.component.css']
})
export class SpotifyPlaylistComponent implements AfterViewInit {
  @Input() spotifyData: any | undefined;
  wasDataFound: boolean = false;


  movieName: string = "Mickey's Twice Upon a Christma";
  wordKeys: string[] = [];
  spotifyArray: any[] = [];

  ID: string = this.movieName.replace(/[^a-z]+/gi, '-').toLowerCase();
  templateID: string = `template_${this.ID}_container`;
  

  constructor(private spotifyService: SpotifyService) {}


  ngAfterViewInit(): void {
    this.spotifyDataCheck();

  }
  
  spotifyDataCheck() {
    if (this.spotifyData.character && this.spotifyData.chipValue) {
      
      this.movieName = this.spotifyData.chipValue;
      this.wordKeys = [];
      this.wordKeys.push(this.spotifyData.character, 'disney');

      this.spotifySearchAndCreate(this.movieName);
    } else {
      console.log('NO llego data', this.spotifyData.template);
    }
  }


  spotifySearchAndCreate(searchText: string) {
    this.spotifyService.searchSpotify(searchText).subscribe((data: any) => {
      let itemCounter: number = 0;
      for (const key in data) {
        const itemsArray: any[] = data[key].items;
        const filteredTtems =  
        itemsArray.filter((item) => {
          const itemName: string = item.name;
          const itemArtistsArray: any[] = item.artists;

          if (itemArtistsArray) {
            for (let i = 0; i < itemArtistsArray.length; i++) {
              const artist = itemArtistsArray[i];
              const itemArtistName: string = artist.name;
              if (itemArtistName.toLowerCase().includes(searchText.toLowerCase())) {
                return true;
              }
              
              for (let i = 0; i < this.wordKeys.length; i++) {
                const word = this.wordKeys[i];
                if (itemArtistName.toLowerCase().includes(word.toLowerCase())) {
                  return true;
                }
              }
            }
          }

          if (itemName.toLowerCase().includes(searchText.toLowerCase())) {
            return true;
          }
          
          for (let i = 0; i < this.wordKeys.length; i++) {
            const word = this.wordKeys[i];
            if (itemName.toLowerCase().includes(word.toLowerCase())) {
              return true;
            }
          }

          return false;
        });

        itemCounter += filteredTtems.length;
        let boolean: boolean;
        if (filteredTtems.length <= 0) {
          boolean = false;
        } else {boolean = true;}
        
        this.spotifyArray.push([key, filteredTtems, boolean]);
      }


      if (itemCounter === 0) {
        this.wasDataFound = false;
      } else {this.wasDataFound = true;}


      this.spotifyArray.forEach((data: any[]) => {
        const iframeType: string = data[0];
        const type = iframeType.slice(0, -1);
        const searchData: any[] = data[1];

        const fragment = document.createDocumentFragment();

        searchData.forEach((item) => {
          const iframe = document.createElement('iframe');
          iframe.style.borderRadius = '12px';
          iframe.src = `https://open.spotify.com/embed/${type}/${item.id}`;
          iframe.width = '100%';
          iframe.height = '152';
          iframe.frameBorder = '0';
          iframe.allowFullscreen = true;
          iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
          //@ts-ignore
          iframe.loading = 'lazy';
  
          fragment.appendChild(iframe);
        });

        data.splice(1,1,fragment);
      });
    });
  }

  addIframes(id: string, fragment: DocumentFragment) {
    const container = document.getElementById(id)!;
    container.appendChild(fragment);
  }

}
