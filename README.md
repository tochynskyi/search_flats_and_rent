# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

0. Login via firebase CLI `firebase login`

1. In the files `.firebaserc` and `firebase.json` replace `test-project-20210119` with **your** Firebase project name 

2. In the file `src/common/firebaseConfig.ts` replace the `firebaseConfig` value with the config of the web app you created inside **your** firebase Project

3. Ensure that email authentication is enabled inside Firebase Auth

4. Install dependencies:

```sh
yarn
```

5. Deploy Firestore rules:

```sh
yarn deploy-rules
```

6. Run the project:

```sh
yarn start
```

7. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running the app locally

```sh
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

