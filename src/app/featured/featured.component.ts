import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application, ItemEventData } from '@nativescript/core'
import { firebase } from '@nativescript/firebase-core';
import { Router } from '@angular/router';

@Component({
  selector: "Featured",
  templateUrl: "./featured.component.html",
  styleUrls: ["./featured.component.scss"],
})
export class FeaturedComponent implements OnInit {
  auth = firebase().auth();
  bookmarks = firebase().firestore().collection("bookmarks");
  chosenBook = firebase().firestore().collection("chosen");
  settings = firebase().firestore().collection("settings");
  language: string;
  theme: string;
  booksArray = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.bookmarks.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        this.booksArray.push(documentSnapshot.data());
      });
    });

    this.settings.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        this.language = documentSnapshot.data().language;
        this.theme = documentSnapshot.data().theme;
      });
    });
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  bookChosen(args: ItemEventData) {
    this.chosenBook
      .doc("ZCjUOSAtGmsixwi6NeGY")
      .update(this.booksArray[args.index])
      .catch((error) => {
        if (this.language === "eng") {
          alert("Failed to choose book:" + error);
        } else {
          alert("Не вдалося обрати книгу: " + error);
        }
      });
    this.router.navigate(["book"]);
  }

  signOut(): void {
    firebase().auth().signOut();
    this.router.navigate(["auth"]);
  }
}
