import { Component, Input, OnInit } from '@angular/core';
import Post from 'src/app/models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post;

  postId: number;
  constructor() { }

  toggleMenu(){
    document.querySelector('.menu').classList.toggle('show')
  }
  
  ngOnInit(): void {
    console.log(this.post)
    this.postId = this.post.id
  }

}
