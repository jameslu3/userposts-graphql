const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig.js');
const uuidv4 = require('uuid').v4;
var db = new JsonDB(new Config("myDataBase.json", true, true, '/'));
const resolvers = {
    Query: {

    },
    Mutation: {
        createUser(root, {user}){
            console.log(user);
            user.postcount = 0; 
            db.push("/user[]", user, true);
            return user; 
        },
        createPost(root, {post}){

        }
    }
}
module.export = {resolvers}