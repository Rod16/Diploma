import { Component, OnInit } from "@angular/core";
import { firebase } from "@nativescript/firebase-core";
import "@nativescript/firebase-auth";
import "@nativescript/firebase-storage";
import { Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { setTextSync } from "nativescript-clipboard";

@Component({
  selector: "Book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
})
export class BookComponent implements OnInit {
  chosenBook = firebase().firestore().collection("chosen");
  bookmarks = firebase().firestore().collection("bookmarks");
  settings = firebase().firestore().collection("settings");
  url: Promise<string>;
  myArray: Array<any> = [];
  language: string;
  theme: string;
  size: string;
  reference: string;
  settingsArray = [];
  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.chosenBook.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        this.myArray.push(documentSnapshot.data());
        this.reference = "books/" + documentSnapshot.data().id + ".pdf";
        this.url = firebase().storage().ref(this.reference).getDownloadURL();
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

  goBack() {
    this.routerExtensions.backToPreviousPage();
    console.log(this.reference);
  }

  getLink() {
    this.url.then((url) => {
      setTextSync(url);
      if (this.language === "eng") {
        alert("The download link was copied to clipboard");
      } else {
        alert("Посилання для завантаження було скопійовано до буфера обміну");
      }
    })
      .catch(() => {
      if (this.language === "eng") {
        alert("The file is not in the database");
      } else {
        alert("Файлу немає в базі даних");
      }
    });
  }

  addBook() {
    this.bookmarks
      .add(this.myArray[0])
      .then((value) => {
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
  }
}
