import { EventEmitter, Injectable, Output } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  @Output() DataLaucher: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  
}