import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, knownFolders } from "@nativescript/core";
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
  id: number = 1;
  fileArray = [];

  location = "books/";

  auth = firebase().auth();
  books = firebase().firestore().collection("books");
  settings = firebase().firestore().collection("settings");
  currentId = firebase().firestore().collection("id");
  storage = firebase().storage();
  url = this.storage.ref("books/Lytvynenko_bakalavr_1_2.docx").getDownloadURL();
  knownFolders = knownFolders.documents();
  language: string;
  theme: string;
  size: string;
  settingsArray = [];

  constructor() {
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
      .then((value) => {
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
  }

  bookName() {
    return this.id;
  }

  async storeBook() {
    const bookName = this.bookName();
    const bookRef = this.storage.ref(this.location + "05.05.docx");
    const pathToFile = knownFolders.documents().getFile("05.05.docx");
    await bookRef.putFile(pathToFile.path);
  }

  test() {}
}
