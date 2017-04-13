# README

This repo contains an android app that allows the user to create and modify a list (think a grocery or to-do list). The app is built using [react-native](https://facebook.github.io/react-native/) and connected to Firebase database. The contruction follows closely [this blog post](https://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html) with small modifications for android adaptation.

Notice: it is an android app, the index.io.js file does not perform the same task, but rather is just initialized to whatever react-native initialize it to.

The main part of the code is in index.android.js. The styles.js file contains the style for each element in the app, so you will need to go there to modify what the app looks like. In the components folder are the .js files that define the three main components the app is made of, namely a button, a list view and a status bar. Please check those out to modify them or to add components as needed.

Make sure to insert your Firebase database credentials in the index.android.js file and to add the google-services.json with your database info in the android/app/ folder in order to connect the app to the database. You will need to modify the app.json and package.json files with your app name too.