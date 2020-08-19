import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  public pokemon = '';

  constructor(private router: Router){

  }
  

}
