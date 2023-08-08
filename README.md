# Udacity Project 4: Natural Language Processing
I'm using typescript and a modern webpack config, hope that's alright.

## Cloning and running the code
You will need a meaningcloud api key.

```
git clone https://github.com/lincore81/udct4-nlp.git
cd udct4-nlp
ENV="
PORT=8080
NLP_API_KEY=<your meaningcloud api key>"
echo ${ENV} > .env
npm i && npm run start
# open localhost:8080
```


## Project Requirements
- [x] Be set up with Webpack, Express, Node, and Sass, 
- [ ] and Service Workers
- [x] Have separate dev and prod configurations for Webpack
- [x] Have the developer environment set up with the Webpack dev server
- [x] Have a minimum of one form field
- [x] Make one request to the ~~Aylien~~ Meaning Cloud API 
- [x] Use Sass for styling
- [ ] Minify js and styles in the production environment
- [ ] Response from the API must be added to the view for a user to see 
- [ ] Be able to show content offline
