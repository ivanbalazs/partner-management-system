# Partner Management System

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the development server for the React front-end.
By default, it will be available on [http://localhost:3006](http://localhost:3006).

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `node index.js`
Runs the server in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This server will create a file to handle SQLite data in its root folder called `db.sqlite` (next to index.js). If you want to use an existing database file, specify it as a parameter:\
`node index.js path/to/existing/sqlite/file`\
If you let the server create a file, then the file will be **deleted** each time the server starts!

The page will reload if you make edits.\
You will also see any lint errors in the console.

Make sure to build the front-end for production with `npm run build` first!

## Environment variables

### `REACT_APP_SERVER_URL`

This sets the URL of the server for the React app.
