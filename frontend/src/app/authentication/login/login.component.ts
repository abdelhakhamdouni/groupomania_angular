import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  image: string = "assets/images/img-01.png"

  constructor(private authService: AuthService, private router:Router) { }

  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  submit(){
    const email = this.login.controls.email.value
    const password = this.login.controls.password.value
    this.authService.login(email, password).subscribe(data=> {
      if(data.token){
        localStorage.setItem('loged', 'true')
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        this.router.navigateByUrl('/')
      }
    })
  }



  ngOnInit(): void {
  }

}
