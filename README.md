# Udacity Project 4: Natural Language Processing

## Running the server
- Clone this repo, cd into project dir
- Get a meaning cloud api key at https://www.meaningcloud.com/
- Create `.env`:
  ```
  PORT=8080
  NLP_API_KEY=<your meaningcloud api key> 
  ```
- Run `npm i && npm run dev`.
- In another terminal, run `npm run start`
- Open `localhost:8080` in a browser

## Project Requirements
- [x] Be set up with Webpack, Express, Node, and Sass, 
- [ ] and Service Workers
- [x] Have separate dev and prod configurations for Webpack
- [x] Have the developer environment set up with the Webpack dev server
- [x] Have a minimum of one form field
- [ ] Make one request to the ~~Aylien~~ Meaning Cloud API 
- [ ] Use Sass for styling
- [ ] Minify js and styles in the production environment
- [ ] Response from the API must be added to the view for a user to see 
- [ ] Be able to show content offline
