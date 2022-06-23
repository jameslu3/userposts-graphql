const { gql } = require("apollo-server-core");
const typeDefs = gql`type User {
	username: String!
	email: String!
	postcount: Int!
}

type Post {
	title: String!
	createdBy: String!
	content: String!
	id: String! 
}

input UserInput {
	username: String!
	email: String!
}

input PostInput {
	title: String!
	createdBy: String!
	content: String!
}

type Query {
	#You can name your queries anything. Usually a descriptive name
	getUser(username: String!): User
	getPostsByUsername(username: String!): [Post!]!
}

type Mutation {
	createUser(user: UserInput!): User
	createPost(post: PostInput!): Post
	deletePost(postId: String!): Post
}`
module.exports = {typeDefs}