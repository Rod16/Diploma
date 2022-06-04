import { Component, OnInit } from "@angular/core";
import { firebase } from "@nativescript/firebase-core";
import "@nativescript/firebase-auth";
import "@nativescript/firebase-firestore";
import { Router } from "@angular/router";

@Component({
  selector: "Auth",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.scss"],
})
export class AuthComponent implements OnInit {
  defaultApp = firebase().initializeApp();
  auth = firebase().auth();
  settings = firebase().firestore().collection("settings");
  language: string;
  user: any;
  email: string;
  password: string;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.settings.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        this.language = documentSnapshot.data().language;
      });
    });
  }

  signIn() {
    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((cred) => {
        const user = cred.user;
        this.router.navigate(["home"]);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  signUp() {
    this.auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then((cred) => {
        const user = cred.user;
        this.router.navigate(["home"]);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  onTap() {
    this.router.navigate(["home"]);
  }
}
