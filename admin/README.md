# AdminAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Issue Upgrading All Dependencies version

For this project do not upgrade `perfect-scrollbar` dependencies to the latest version. Please used this dependencies with `^0.8.1` version.
Reason? The latest version for `perfect-scrollbar` dependencies got different folder structure which means there is no `js` folder inside `dist` folder while `^0.8.1` version got `js` folder inside `dist` folder
If upgrade to latest version will return error if you run `ng serve`.
The error will show something like this =>
```
92% recordingError: ENOENT: no such file or directory, open '/usr/share/nginx/html/SAAS1/admin/node_modules/perfect-scrollbar/dist/js/perfect-scrollbar.jquery.min.js' at Error (native)
```
