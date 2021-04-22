import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { UsercardComponent } from './components/usercard/usercard.component';
import { LastPostsComponent } from './components/last-posts/last-posts.component';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfilComponent } from './components/profil/profil.component';
import { HttpClientModule } from '@angular/common/http';
import Constantes from './services/constantes.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './gaurds/auth.guard';
import { AuthenticationModule } from './authentication/authentication.module';
import { NewPostComponent } from './components/new-post/new-post.component';
import { CKEditorModule } from 'ckeditor4-angular';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UserListComponent,
    PostComponent,
    CommentComponent,
    UsercardComponent,
    LastPostsComponent,
    ListPostsComponent,
    ProfilComponent,
    NewPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    AuthenticationModule,
    CKEditorModule
  ],
  providers: [
    Constantes,
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
