import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
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
  data: any;
  language: string;
  theme: string;
  size: string;
  booksArray = [];
  settingsArray = [];
  constructor(private router: Router) {
    // Use the component constructor to inject providers.
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

  signOut(): void {
    firebase().auth().signOut();
    this.router.navigate(["auth"]);
  }
}
