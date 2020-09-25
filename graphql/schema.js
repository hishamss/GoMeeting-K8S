const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Guest {
    _id: ID!
    email: String!
    meeting: Meeting
}

type Meeting {
    _id: ID!
    name: String!
    host: String!
    date: String!
    guests: [Guest!]
    
}

type deleteGuest {
    n: Int
    ok: Int
    deletedCount: Int
}

input GuestInput {
    meetingId: ID!
    email: String!   
}
input MeetingInput {
    name: String!
    host: String!
    date: String!
}


type RootQuery {
    guests(email: String!): [Guest!]!
    meetings: [Meeting!]!  
}



type RootMutation {
    createMeeting(meetingInput: MeetingInput): Meeting
    addGuest(guestInput: GuestInput): Guest
    deleteGuest(meetingId: String!, email: String!): deleteGuest
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
