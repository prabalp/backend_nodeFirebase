import firebase from "firebase/app";
import "firebase/database";

const db = firebase.database();

export const write_db = async (userId, name, email, imageUrl) => {
  // add new entry to the db
  // Using set() overwrites data at the specified location, including any child nodes
  await db.ref("users/" + userId).set(
    {
      username: name,
      email: email,
      profile_picture: imageUrl,
    },
    (error) => {
      if (error) {
        // The write failed...
      } else {
        // Data saved successfully!
      }
    }
  );
};

export const read_db = async () => {
  //read from db

  // listen for changes ex increasing rating

  var postId = "456";
  // post element is from front end
  var starCountRef = db.ref("posts/" + postId + "/starCount");
  await starCountRef.on("value", (snapshot) => {
    const data = snapshot.val();
    updateStarCount(postElement, data); //this code ment to be in front end
  });

  //for different type of data read pls refer to firebase docs
};

export const update_db = async (uid, username, picture, title, body) => {
  //update from db
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture,
  };

  // Get a key for a new Post.
  var newPostKey = db.ref().child("posts").push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates["/posts/" + newPostKey] = postData;
  updates["/user-posts/" + uid + "/" + newPostKey] = postData;

  return db.ref().update(updates);
};

export const delete_db = async () => {
  //delete from db
};
