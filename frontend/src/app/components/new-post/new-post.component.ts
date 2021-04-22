import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import User from '../../models/User';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  
  user: User;
  imagepreview = null
  image= null;
  message:string;
  postData =  {} ;
  
  
  constructor(private userService: UserService, private postService: PostService, private sanitizer: DomSanitizer, private router: Router) { }

  closeModal(event){
    document.querySelector('.modal').classList.toggle('show')
  }

  preview(event) {
    let files = event.target.files;
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    
    var reader = new FileReader();
    this.image = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imagepreview = reader.result; 
    }
  }
  postgroup = new FormGroup({
    title: new FormControl(),
    content: new FormControl()
  })
  
  deleteImage(){
    this.image = null
    this.imagepreview = null
  }
  
  savePostForm(){
    this.postData['title'] = this.postgroup.controls.title.value
    this.postData['description'] = this.postgroup.controls.content.value
    this.postData['authorId'] = this.user.id
    this.postData['pseudo'] = this.user.lastName

    
    let formData = new FormData();
    if(this.image) formData.append('image', this.image[0])
    formData.append('post', JSON.stringify(this.postData))

    this.postService.savePost(formData)
      .subscribe(res=> {
        if(res.message){{
          this.postService.getPost().subscribe(res=>{
            window.location.reload()
          })
        }}
      })
  }

  ngOnInit(): void {
    this.userService.getLogedUSer().subscribe(user=> this.user = user)
  }

}
