import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,
    private router:Router) { }
    
    //Verify Login
    public loginVerify(user:User){
      //calling webservice and passing username and password
      return this.httpClient.get<User>(environment.apiUrl+'/api/user-login/'+user.username+"&"+user.password)
    }

    //Logout method
    public logOut(){
      sessionStorage.removeItem('username');
      localStorage.removeItem('username');
      localStorage.removeItem('ACCESS_ROLE');
      
    }
}
