import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private fireAuth : AngularFireAuth, private router : Router ) { }

  // login method
  login(email : string, password  : string){
    this.fireAuth.signInWithEmailAndPassword(email, password).then( (res) => {
      localStorage.setItem('token', 'true');
      if(res.user?.emailVerified == true){
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.router.navigate(['/home']); 
    })
  }

  // register method
  register(email: string, password: string){
    this.fireAuth.createUserWithEmailAndPassword(email, password).then( (res) =>{
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
      this.router.navigate(['login']);
    }, err =>{
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // email varification
sendEmailForVarification(user : any) {
  console.log(user);
  user.sendEmailVerification().then((res : any) => {
    this.router.navigate(['/home']);
  }, (err : any) => {
    alert('Something went wrong. Not able to send mail to your email.')
  })
}

//sign in with google
googleSignIn() {
  return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res => {

    this.router.navigate(['/dashboard']);
    localStorage.setItem('token',JSON.stringify(res.user?.uid));

  }, err => {
    alert(err.message);
  })
}


  // logout method
  logout() {
    this.fireAuth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/home']);
    }, err => {
      alert(err.message);
    })
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Cambia esto según cómo almacenes el estado de autenticación
  }

}
