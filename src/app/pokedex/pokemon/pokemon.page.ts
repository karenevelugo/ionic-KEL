import { Component, OnInit } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { PokemonService } from './pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {
   
  loadedGenerations:[];
  loadedGenerationData:{name:string,pokemon_species:[]}={name:'',pokemon_species:[]};
  selectedGeneration:number;
  isLoading=false;

  constructor(private http: HttpClient,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private pokemonService: PokemonService,
    private router: Router) { }

  ngOnInit() {
       
        this.fetchGenerations();
  }
  fetchGenerations() {
    return this.http
      .get<any>('https://pokeapi.co/api/v2/generation/'
      )
      .subscribe( (resData)=>{
        
        if(resData.hasOwnProperty('results'))
        {
          this.loadedGenerations =resData['results']; 
          console.log( this.loadedGenerations);
        }
        }
      );
  }
  
  onSelectGeneration(generation){
    
    if(generation.value){
      this.selectedGeneration =generation.value;  
      this.isLoading = true;
      this.loadingCtrl
      .create({ keyboardClose: true, message: 'Fetching Generation ' + this.selectedGeneration + ' Pokemons' })
      .then(loadingEl => {
        loadingEl.present();
        this.fetchGeneration(this.selectedGeneration)      
      .subscribe((resData)=>{
        console.log(resData);
        if(resData.hasOwnProperty('pokemon_species'))
        { 
          this.loadedGenerationData.name ="Generation " + resData['id'];
          this.loadedGenerationData.pokemon_species = resData['pokemon_species'];
          console.log(this.loadedGenerationData);
        }else{
          console.log('No pokemons for this generation');
        }
        loadingEl.dismiss();
        }
      );
      });    
      
    }
  }
  fetchGeneration(id) {
    return this.http
      .get<any>('https://pokeapi.co/api/v2/generation/'+ id
      );
  }
  onLogout(){
    this.authService.logout();    
  }

  onSearch(pokemonName){

    this.pokemonService.pokemon =pokemonName;
    this.router.navigateByUrl('/details');
  }

}
