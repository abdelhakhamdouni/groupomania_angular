import { Component, OnInit } from '@angular/core';
import Post from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public posts: Post[];
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPost().subscribe(posts=> this.posts = posts)
  }

}
