import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { firebase } from "@nativescript/firebase-core";
import "@nativescript/firebase-storage";

@Component({
  selector: "Browse",
  templateUrl: "./browse.component.html",
  styleUrls: ["./browse.component.scss"],
})
export class BrowseComponent implements OnInit {
  title: string;
  author: string;
  field: string;
  country: string;
  year: number;
  description: string;
  email: string;
  id: number;
  language: string;
  theme: string;

  auth = firebase().auth();
  books = firebase().firestore().collection("books");
  settings = firebase().firestore().collection("settings");
  currentId = firebase().firestore().collection("id");

  constructor() {
  }

  ngOnInit(): void {
    this.settings.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        this.language = documentSnapshot.data().language;
        this.theme = documentSnapshot.data().theme;
      });
    });

    this.currentId.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        this.id = documentSnapshot.data().id;
      });
    });

    this.auth.addAuthStateChangeListener((user) => {
      if (user) {
        this.email = user.email;
      }
    });
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  addBook() {
    if (
      this.title &&
      this.author &&
      this.field &&
      this.country &&
      this.year &&
      this.description
    ) {
      this.books
        .add({
          id: this.id,
          title: this.title,
          author: this.author,
          field: this.field,
          country: this.country,
          year: this.year,
          description: this.description,
          email: this.email,
        })
        .then(() => {
          this.currentId.doc("QeJn18EbtF3inORxCPvo").update({
            id: this.id + 1,
          });
          if (this.language === "eng") {
            alert("Book Added");
          } else {
            alert("Книгу додано");
          }
        })
        .catch((error) => {
          if (this.language === "eng") {
            alert("Failed to add book:" + error);
          } else {
            alert("Не вдалося додати книгу: " + error);
          }
        });
    } else {
      if (this.language === "eng") {
        alert("Fill in all text fields to add the book");
      } else {
        alert("Аби додати книгу, заповніть всі текстові поля");
      }
    }
  }
}
