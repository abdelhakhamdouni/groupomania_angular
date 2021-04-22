import { Component, OnInit } from '@angular/core';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public posts: Post[];
  user: User;
  constructor(private postService: PostService, private userService: UserService) { }

  showModal(){
    document.querySelector('input').blur()
    document.querySelector('.modal').classList.toggle('show')

  }


  ngOnInit(): void {
    this.postService.getPost().subscribe(posts=> this.posts = posts)
    this.userService.getLogedUSer().subscribe(user=> this.user = user)
  }

}
