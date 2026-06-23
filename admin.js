import {
 auth,
 db
}
from "./firebase.js";

import {
 signOut
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {

 doc,
 setDoc,
 updateDoc,
 collection,
 getDocs

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.logout =
async function(){

 await signOut(auth);

 location.href =
 "index.html";
}

window.saveAnnouncement =
async function(){

 const text =
 document.getElementById(
 "announcementInput"
 ).value;

 await setDoc(

  doc(
   db,
   "system",
   "announcement"
  ),

  {
   text
  }

 );

 alert(
  "Announcement disimpan"
 );
}

window.saveAds =
async function(){

 const text =
 document.getElementById(
 "adsInput"
 ).value;

 await setDoc(

  doc(
   db,
   "system",
   "ads"
  ),

  {
   text
  }

 );

 alert(
  "Iklan disimpan"
 );
}

async function loadUsers(){

 const snap =
 await getDocs(
  collection(
   db,
   "users"
  )
 );

 document.getElementById(
 "totalUsers"
 ).innerText =
 snap.size;

 const list =
 document.getElementById(
 "userList"
 );

 list.innerHTML = "";

 snap.forEach(docSnap=>{

  const data =
  docSnap.data();

  const div =
  document.createElement("div");

  div.className =
  "user-card";

  div.innerHTML =

  `
  <b>${data.username}</b>

  <br>

  ${data.email}

  <br><br>

  Role:
  ${data.role}

  <br><br>

  <button
  onclick="banUser('${docSnap.id}')">

  Ban

  </button>

  <button
  onclick="unbanUser('${docSnap.id}')">

  Unban

  </button>

  <button
  onclick="suspendUser('${docSnap.id}')">

  Suspend 1 Hari

  </button>
  `;

  list.appendChild(div);
 });
}

window.banUser =
async function(uid){

 await updateDoc(

  doc(
   db,
   "users",
   uid
  ),

  {
   banned:true
  }

 );

 alert(
  "User dibanned"
 );

 loadUsers();
}

window.unbanUser =
async function(uid){

 await updateDoc(

  doc(
   db,
   "users",
   uid
  ),

  {
   banned:false
  }

 );

 alert(
  "User diunban"
 );

 loadUsers();
}

window.suspendUser =
async function(uid){

 const oneDay =

 24*60*60*1000;

 await updateDoc(

  doc(
   db,
   "users",
   uid
  ),

  {

   suspended:true,

   suspendUntil:
   Date.now() +
   oneDay

  }

 );

 alert(
  "User disuspend"
 );

 loadUsers();
}

loadUsers();