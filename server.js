var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');


const schema = buildSchema(`
  type Query {
    hello: String
    user(id: Int!): User
    users(name: String,email: String): [User]
  }
  type User {
    id: Int
    name: String
    phone: String
    email: String
    address: String
    postalZip: String
    region: String
    country: String
  }
`);

const usersData = [
  {
    id: 1,
    name: "Lucy Murphy",
    phone: "(102) 879-1453",
    email: "eu.arcu@mattis.edu",
    address: "200-8571 Nunc Street",
    postalZip: "45825",
    region: "Limón",
    country: "Indonesia"
  },
  {
    id: 2,
    name: "Audrey Mcgee",
    phone: "(792) 152-3622",
    email: "eu.enim@loremacrisus.ca",
    address: "P.O. Box 331, 1444 Quisque St.",
    postalZip: "16833",
    region: "Jönköpings län",
    country: "Colombia"
  },
  {
    id: 3,
    name: "Cherokee Whitehead",
    phone: "(356) 694-1463",
    email: "nunc.quisque.ornare@torquent.net",
    address: "Ap #763-394 Urna St.",
    postalZip: "985447",
    region: "British Columbia",
    country: "Canada"
  },
  {
    id: 4,
    name: "Colt Carr",
    phone: "1-348-839-5518",
    email: "nec.cursus@volutpatnullafacilisis.com",
    address: "P.O. Box 701, 8807 Ullamcorper Ave",
    postalZip: "30-594",
    region: "Pará",
    country: "Indonesia"
  },
  {
    id: 5,
    name: "Adrienne Huffman",
    phone: "(172) 450-5428",
    email: "consequat.purus.maecenas@curabiturconsequatlectus.org",
    address: "P.O. Box 186, 1461 Risus. Road",
    postalZip: "06521",
    region: "Luxemburg",
    country: "United Kingdom"
  }
]

const getUser = ({id}) => {
  return usersData.filter(user => user.id === id)[0]
}

const getUsers = ({name,email}) => {
  if (!!name || !!email) {
    return usersData.filter(user => user.name.includes(name) || user.email.includes(email))
  }
  return usersData
}

const root = {
  hello: () => {
    return 'Hello world!';
  },
  user: getUser,
  users: getUsers
};

const app = express()

app.use('/graphql',graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

const port = 4000

app.listen(port)
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
