import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule) },
  { path: 'pokemon', loadChildren: () => import('./pokedex/pokemon/pokemon.module').then( m => m.PokemonPageModule), canLoad:[AuthGuard] },
  { path: 'details', loadChildren: () => import('./pokedex/pokemon/pokemon-detail/pokemon-detail.module').then( m => m.PokemonDetailPageModule), canLoad:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
