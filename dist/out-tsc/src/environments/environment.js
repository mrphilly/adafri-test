// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
    production: false
};
export const SERVER = {
    url: "http://127.0.0.1:5000",
    //url: "https://adafri.comparez.co",
    //url_redirect: "/dist/#",
    url_redirect: "/#",
    confidentialite: "http://localhost:4200/#/confidentialite",
    chrome: "localhost:4200",
    opera: "localhost:4200",
    safari1: "localhost:4200",
    safari2: "localhost:4200",
    protocol: "http://",
    intouch: "http://164.68.124.77:5151/orders/"
};
export const CURRENCY = {
    /* EUR: 656.10, */
    DOLLAR: 588,
};
export const SMTP = {
    url: "http://localhost:3000/sendFormData",
    email: "adafri.dev@gmail.com",
    password: "Ad@fri2019"
};
export const FIREBASE_CREDENTIALS = {
    apiKey: "AIzaSyCpC7FjiILozY9z5990DcnIw7IoJdA8E2g",
    authDomain: "adafri-e5ceb.firebaseapp.com",
    databaseURL: "https://adafri-e5ceb.firebaseio.com",
    projectId: "adafri-e5ceb",
    storageBucket: "gs://adafri-e5ceb.appspot.com/",
    messagingSenderId: "702910555148",
    appId: "1:702910555148:web:0e2506edd3602e5f"
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
//# sourceMappingURL=environment.js.map