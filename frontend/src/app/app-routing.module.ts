import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfilComponent } from './components/profil/profil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfilComponent },
  { path: 'message', component: ProfilComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
