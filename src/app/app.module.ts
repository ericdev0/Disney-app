import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SideComponent } from './side/side.component';
import { SpotifyPlaylistComponent } from './share/spotify-playlist/spotify-playlist.component';
import { DisneyCocktailsComponent } from './share/disney-cocktails/disney-cocktails.component';
import { CardComponent } from './share/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateComponent } from './share/template/template.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SideComponent,
    SpotifyPlaylistComponent,
    DisneyCocktailsComponent,
    CardComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatListModule,
    MatChipsModule,
    BrowserAnimationsModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
