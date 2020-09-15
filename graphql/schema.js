const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Guest {
    _id: ID!
    email: String!
}

type Meeting {
    _id: ID!
    name: String!
    host: String!
    date: String!
    
}

input MeetingInput {
    name: String!
    host: String!
    date: String!
}


type RootQuery {
    guests: [Guest!]!
    meetings: [Meeting!]!
}

type RootMutation {
    createMeeting(meetingInput: MeetingInput): Meeting
    addGuest(email: String!, meetingId: ID!): Guest!
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
