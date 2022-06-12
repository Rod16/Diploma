import { Component, NgZone, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, ItemEventData } from "@nativescript/core";
import { firebase } from "@nativescript/firebase-core";
import "@nativescript/firebase-firestore";
import { Router } from "@angular/router";

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  auth = firebase().auth();
  books = firebase().firestore().collection("books");
  chosenBook = firebase().firestore().collection("chosen");
  settings = firebase().firestore().collection("settings");
  language: string;
  theme: string;
  size: string;
  booksArray = [];
  constructor(private router: Router, private zone: NgZone) {
  }

  ngOnInit(): void {
    this.books.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        this.booksArray.push(documentSnapshot.data());
      });
    });

    this.settings.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        this.language = documentSnapshot.data().language;
        this.size = documentSnapshot.data().size;
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
          alert("Failed to add book:" + error);
        } else {
          alert("Не вдалося додати книгу: " + error);
        }
      });
    this.zone.run(() => {
      this.router.navigate(["book"]);
    });
  }

  signOut(): void {
    firebase().auth().signOut();
    this.router.navigate(["auth"]);
  }
}
