import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../shared/user';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  error = '';
  loginUser?:User;

  // loginUser: User;
  constructor(private fb: FormBuilder,
     private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {

    //create reactive form

    this.loginForm = this.fb.group({
      fullname: ['', [Validators.required]],
      password: ['', [Validators.required]]

    });
  }

  //get control for validation
  get formControls() {
    return this.loginForm.controls;
  }

  
  //login verify
  loginCredential() {

    

    this.isSubmitted = true;


    //form invalid
    if (this.loginForm.invalid)
      return;


    //form isvalid
    if (this.loginForm.valid) {
      
      //calling methode from web service

      this.authService.loginVerify(this.loginForm.value)
      .subscribe(data=>{
        console.log(data);

        //checking rolebased authentication
        if(data.roleid===1){
          localStorage.setItem("username",data.username);
          sessionStorage.setItem("username",data.username);
          
          localStorage.setItem("ACCESS_ROLE",data.roleid.toString());
          this.router.navigateByUrl('/admin')

        }else if((data.roleid===2)){
          localStorage.setItem("username",data.username);
          sessionStorage.setItem("username",data.username);
          localStorage.setItem("ACCESS_ROLE",data.roleid.toString());
          this.router.navigateByUrl('/hrmanager')
        }
        else{
          this.error="Sorry... This Role is not allowed "
        }
        
        

      },
      error=>{
        this.error="Invalid username and password"
      });

    }
    

  }
}
