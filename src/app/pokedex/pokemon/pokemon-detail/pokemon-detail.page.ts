import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss']
})
export class PokemonDetailPage implements OnInit {

  pokemonDetails:{
    name:string,
    imgPath:string,
    order:number,
    types:string[],
    stats:string[],
    abilities:string[]
  }={name:'',imgPath:'',order:null,types:[],stats:[],abilities:[]};

  errorMessage:string=null; 
  isLoading:boolean; 
  isError:boolean=false;
  pokemon;

  constructor(private router: Router, 
    private navCtrl: NavController, 
    private route: ActivatedRoute,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private pokemonService: PokemonService) {}

    
  ngOnInit() {

      this.loadDetails(); 
     
  }
  
  fetchDetails(id) {

    return this.http
      .get<any>('https://pokeapi.co/api/v2/pokemon/'+ id
      )      
  }

  onSearch(event){
    if(event.target.value.trim() !== ''){
      this.pokemonService.pokemon =event.target.value.toLowerCase();
      this.loadDetails();
    }
    return;
    //this.router.navigate(['/details',this.pokemonService.pokemon]);

  }
  loadDetails(){
    
    /*this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('pokemon')) {
        this.navCtrl.navigateBack('/pokemon');
        return;
      }*/
      this.pokemon =this.pokemonService.pokemon;
      this.isLoading = true;
    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Finding Pokemon...' })
    .then(loadingEl => {
      loadingEl.present();
      this.fetchDetails(this.pokemon )
      
      .subscribe((resData)=>{               
        if(resData)
        { 
          this.pokemonDetails.name =resData['name'] ;
          this.pokemonDetails.imgPath ="https://pokeres.bastionbot.org/images/pokemon/"+resData['id']+".png";
          this.pokemonDetails.order =resData['order'] ;
          for (let type of resData['types'] ){
            //console.log(resData);  
            this.pokemonDetails.types.push(type['type'].name);
          }
          for (let ability of resData['abilities'] ){
            
            this.pokemonDetails.abilities.push(ability['ability'].name);
          }
          let ctr =0;
          for (let stat of resData['stats']){ 
            if(ctr < 2) { this.pokemonDetails.stats.push(stat['stat'].name); }else{
              break;
            }
          ctr++;
          }
          //console.log(this.pokemonDetails);  
        }else{
          //this.errorMessage = 'Pokemon not found';
          this.pokemonDetails.name ='Pokemon not found' ;
          this.pokemonDetails.imgPath ="../../assets/icon/pokeball.png";
        }          
        loadingEl.dismiss();
        this.isLoading = false;
        this.isError=false;
      },(err)=>{
        //this.errorMessage = 'Pokemon not found';
        this.isError=true;
        this.pokemonDetails.name ='Pokemon not found' ;
          this.pokemonDetails.imgPath ="../../assets/icon/pokeball.png";
        this.isLoading = false;
        loadingEl.dismiss();
      }
      );
      
    });  
    //});
    
  }
}
