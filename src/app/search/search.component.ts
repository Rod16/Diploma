import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, ItemEventData } from "@nativescript/core";
import { firebase } from "@nativescript/firebase-core";
import { Router } from "@angular/router";

@Component({
  selector: "Search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  search: string;
  language: string;
  theme: string;
  size: string;
  test: string;
  settingsArray = [];
  booksArray = [];
  settings = firebase().firestore().collection("settings");
  books = firebase().firestore().collection("books");
  chosenBook = firebase().firestore().collection("chosen");
  constructor(private router: Router) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    this.settings.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        this.language = documentSnapshot.data().language;
        this.size = documentSnapshot.data().size;
        this.theme = documentSnapshot.data().theme;
      });
    });
  }

  onSearch() {
    this.booksArray = [];
    this.books
      .where("author", "==", this.search)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          this.booksArray.push(documentSnapshot.data());
        });
      });
    this.books
      .where("country", "==", this.search)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          this.booksArray.push(documentSnapshot.data());
        });
      });
    this.books
      .where("field", "==", this.search)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          this.booksArray.push(documentSnapshot.data());
        });
      });
    this.books
      .where("year", "==", this.search)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          this.booksArray.push(documentSnapshot.data());
        });
      });
  }

  bookChosen(args: ItemEventData) {
    console.log(` Item: ${this.booksArray[args.index]}`);
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
    this.router.navigate(["book"]);
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }
}
