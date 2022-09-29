# How to Run!

1. Download the source code.
2. Open up a terminal on the downloaded directory (The root directory which have the `index.js` and `schema.js`)
3. `npm install`
4. `npm start`

Server will be ready at http://localhost:4000

# Sample Queries

```
{
  records(message: "@chris you around?") {
    mentions
  }
}
```
```
{
  records(message: "Good morning! (megusta) (coffee)") {
    emoticons
  }
}
```
 ```
{
  records(message: "Olympics are starting soon; http://www.nbcolympics.com") {
    mentions, links
  }
}
```

 ```
{
  records(message: "@ZettaBlock @Data (test) (smiley) Olympics are starting soon; http://www.nbcolympics.com https://google.com https://www.zettablock.com") {
    mentions, emoticons, links{
      url, title
    }
  }
}
```

