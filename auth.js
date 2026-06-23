import {
 auth,
 db
}
from "./firebase.js";

import {

 createUserWithEmailAndPassword,

 signInWithEmailAndPassword

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {

 doc,
 setDoc,
 getDoc

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.register =
async function(){

 const username =
 document.getElementById(
 "username"
 ).value;

 const email =
 document.getElementById(
 "email"
 ).value;

 const password =
 document.getElementById(
 "password"
 ).value;

 if(
 !username ||
 !email ||
 !password
 ){
  alert(
   "Lengkapi data"
  );
  return;
 }

 try{

 const result =

 await createUserWithEmailAndPassword(

 auth,
 email,
 password

 );

 const uid =
 result.user.uid;

 await setDoc(

 doc(
 db,
 "users",
 uid
 ),

 {

 username,

 email,

 role:"user",

 banned:false,

 suspended:false,

 verified:false,

 createdAt:
 Date.now()

 }

 );

 alert(
 "Register berhasil"
 );

 location.href =
 "index.html";

 }catch(err){

 alert(
 err.message
 );

 }
};

window.login =
async function(){

 const email =
 document.getElementById(
 "email"
 ).value;

 const password =
 document.getElementById(
 "password"
 ).value;

 try{

 const result =

 await signInWithEmailAndPassword(

 auth,
 email,
 password

 );

 const uid =
 result.user.uid;

 const snap =
 await getDoc(

 doc(
 db,
 "users",
 uid
 )

 );

 const data =
 snap.data();

 if(data.banned){

 alert(
 "Akun dibanned"
 );

 return;
 }

 if(
 data.role ===
 "admin"
 ){

 location.href =
 "admin.html";

 }else{

 location.href =
 "dashboard.html";

 }

 }catch(err){

 alert(
 err.message
 );

 }
};