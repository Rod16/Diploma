import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { firebase } from '@nativescript/firebase-core';
import { Router } from '@angular/router';

@Component({
  selector: "Settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  auth = firebase().auth();
  settings = firebase().firestore().collection("settings");
  language: string;
  theme: string;
  size: string;
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

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  onLight() {
    this.settings
      .doc("J0lzN7fUqG80Xl6fwXjW")
      .update({
        theme: "light",
      })
      .then((value) => {
        if (this.language === "eng") {
          alert("Light theme");
        } else {
          alert("Світла тема");
        }
        this.ngOnInit();
      })
      .catch((error) => {
        if (this.language === "eng") {
          alert("Failed to choose theme:" + error);
        } else {
          alert("Не вдалося обрати тему: " + error);
        }
      });
  }

  onDark() {
    this.settings
      .doc("J0lzN7fUqG80Xl6fwXjW")
      .update({
        theme: "dark",
      })
      .then((value) => {
        if (this.language === "eng") {
          alert("Dark theme");
        } else {
          alert("Темна тема");
        }
        this.ngOnInit();
      })
      .catch((error) => {
        if (this.language === "eng") {
          alert("Failed to choose theme:" + error);
        } else {
          alert("Не вдалося обрати тему: " + error);
        }
      });
  }

  onSmall() {
    this.settings
      .doc("J0lzN7fUqG80Xl6fwXjW")
      .update({
        size: "17",
      })
      .then((value) => {
        if (this.language === "eng") {
          alert("Small font size");
        } else {
          alert("Малий шрифт");
        }
      })
      .catch((error) => {
        if (this.language === "eng") {
          alert("Failed to choose font size:" + error);
        } else {
          alert("Не вдалося обрати шрифт: " + error);
        }
      });
  }

  onLarge() {
    this.settings
      .doc("J0lzN7fUqG80Xl6fwXjW")
      .update({
        size: "20",
      })
      .then((value) => {
        if (this.language === "eng") {
          alert("Large font size");
        } else {
          alert("Великий шрифт");
        }
      })
      .catch((error) => {
        if (this.language === "eng") {
          alert("Failed to choose font size:" + error);
        } else {
          alert("Не вдалося обрати шрифт: " + error);
        }
      });
  }

  onEng() {
    this.settings
      .doc("J0lzN7fUqG80Xl6fwXjW")
      .update({
        language: "eng",
      })
      .then((value) => {
        alert("English");
        this.ngOnInit();
      })
      .catch((error) => {
        if (this.language === "eng") {
          alert("Failed to choose language:" + error);
        } else {
          alert("Не вдалося обрати мову: " + error);
        }
        
      });
  }

  onUa() {
    this.settings
      .doc("J0lzN7fUqG80Xl6fwXjW")
      .update({
        language: "ua",
      })
      .then((value) => {
        alert("Українська мова");
        this.ngOnInit();
      })
      .catch((error) => {
        if (this.language === "eng") {
          alert("Failed to choose language:" + error);
        } else {
          alert("Не вдалося обрати мову: " + error);
        }
      });
  }

  signOut(): void {
    firebase().auth().signOut();
    this.router.navigate(["auth"]);
  }
}
