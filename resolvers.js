const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig.js');
const uuidv4 = require('uuid').v4;
var db = new JsonDB(new Config("myDataBase.json", true, true, '/'));

const resolvers = {
    Query: {
        getUser(root, {username}){
            var json = db.getData("/user");
            console.log(username);
            for(var i = 0; i<json.length; i++)
            {
                if(json[i].username==username)
                {
                    var userfile = json[i];
                }
            }
            return userfile;
        },
        getPostsByUsername(root, {username}){
            var posts = db.getData("/post");
            var usercontent = []; 
            console.log(username); 
            for(var i = 0; i<posts.length; i++)
            {
                if(posts[i].createdBy == username)
                {
                    usercontent.push(posts[i]);
                }
            }
            return usercontent;
        }
    },
    Mutation: {
        createUser(root, {user}){
            console.log(user);
            user.postcount = 0; 
            db.push("/user[]", user, true);
            return user; 
        },
        createPost(root, {post}){
            console.log(post);
            post.id = uuidv4();
            db.push("/post[]", post, true);
            var json2 = db.getData("/user");
            for(var i = 0; i<json2.length; i++)
            {
                if(json2[i].username==post.createdBy)
                {
                    var x = db.getData(`/user[${i}]/postcount`);
                    x++; 
                    db.push(`/user[${i}]`, {postcount: x}, false);
                    console.log(x)
                }
            }
            return post;
        },
        deletePost(root, {delpost}){
            var posts2 = db.getData("/post").filter((post)=>post.id!=delpost.id);
            db.push("/post", posts2);
            return posts2;
        }
    }
}
module.exports = {resolvers}