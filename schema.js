const { gql } = require('apollo-server-express');
const axios = require('axios');
let cheerio = require('cheerio');

const typeDefs = gql` 
type Inputs {
    mentions: [String!]
    emoticons: [String!]
    links: [LinkTypes!]!
}

type LinkTypes {
    url: String!
    title: String
}
  
 type Query { 
   records(message: String!): Inputs
 } 
`

const resolvers = {

    Query: {
        records: (parent, args, context, info) => {
            return args
        }
    },
    Inputs: {
        mentions: (args) => {
            return extractMentions(args.message.split(' '))
        },
        emoticons: (args) => {
            return extractEmoticons(args.message.split(' '))
        },
        links: (args) => {
            return extractLinks(args.message.split(' '))
        }
    }
}

const getTitle = async (url) => {
    return axios.get(`${url}`)
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                //only works if their is a title tag on the web page
                const title = $('title').text()
                console.log(title)
                return title.toString();
            }
        })
};

const extractMentions = (words) => {
    let result = []
    for (let wordIndex in words) {
        console.log(words[wordIndex])
        if (words[wordIndex][0] == "@") {
            result.push(words[wordIndex].slice(1));
        }
    }
    return result
}

const extractEmoticons = (words) => {
    let result = []

    for (let wordIndex in words) {
        const endIndex = words[wordIndex].length - 1;
        if (words[wordIndex][0] == "(" && words[wordIndex][endIndex] == ")") {
            result.push(words[wordIndex].slice(1, endIndex));
        }
    }
    return result
}

const extractLinks = async (words) => {
    let result = []

    for (let wordIndex in words) {
        const linkRegex = /(?:(?:https?:\/\/)|(?:www\.))[^\s]+/g
        if (words[wordIndex].match(linkRegex)) {
            const title = await getTitle(words[wordIndex]);
            result.push({ url: words[wordIndex], title: title })
        }
    }
    return result
}

module.exports = { typeDefs, resolvers };