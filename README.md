# 8Bits1CafeFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Google OAuth2 Login Integration

This app supports login and registration with Google via OAuth2. The flow is as follows:

1. User clicks the **Google** button on the login page.
2. The app redirects to the backend OAuth2 endpoint (`/api/v1/oauth2/authorization/google`).
3. After Google authentication, the backend issues a JWT and redirects to `/login-success?token=...`.
4. The Angular app captures the token, stores it in `localStorage`, and redirects the user to the home page.
5. All API requests automatically include the JWT via an HTTP interceptor.

**Note:** For production, update the backend URL in the Google button handler.

## Discord OAuth2 Login Integration

This app now supports login and registration with Discord via OAuth2. The flow is as follows:

1. User clicks the **Discord** button on the login page.
2. The app redirects to the backend OAuth2 endpoint (`/api/v1/oauth2/authorization/discord`).
3. After Discord authentication, the backend issues a JWT and redirects to `/login-success?token=...`.
4. The Angular app captures the token, stores it in `localStorage`, and redirects the user to the home page.
5. All API requests automatically include the JWT via an HTTP interceptor.

**Note:** The backend must be configured to support Discord as an OAuth2 provider. For production, update the backend URL in the Discord button handler if needed.

---

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
