This is a web application that is used to generate PKCE verifier and challenge for the OAuth to PKCE Authorization Code grant flow.

## Getting Started

Running in local
```
npm run dev
```

Building for Prod
```
npm run build
```

## Features

- The application can generate random PKCE code verifier and its corresponding challenge.
- It can generate them in bulk CSV which can be later used for automation testing.
- It can be publicly accessed at http://api.pixie.suriyaprakhash.com, which returns the verfier and challenge which can then used on demand 

## URL

The application can be found live at https://pixie.suriyaprakhash.com