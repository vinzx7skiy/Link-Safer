import {
auth,
db
}
from "./firebase.js";

import {
signOut,
updatePassword
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
getDoc,
updateDoc,
onSnapshot,
collection
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let userData;

async function loadUser(){

if(!auth.currentUser){
return;
}

const uid =
auth.currentUser.uid;

const snap =
await getDoc(
doc(db,"users",uid)
);

userData =
snap.data();
}

loadUser();

window.openMenu =
function(){

document.getElementById(
"sidebar"
).style.left =
"0";
}

window.closeMenu =
function(){

document.getElementById(
"sidebar"
).style.left =
"-300px";
}

window.logout =
async function(){

await signOut(auth);

location.href =
"index.html";
}

window.changeUsername =
async function(){

const username =
prompt(
"Username baru"
);

if(!username){
return;
}

await updateDoc(

doc(
db,
"users",
auth.currentUser.uid
),

{
username
}

);

alert(
"Username berhasil diganti"
);
}

window.changePassword =
async function(){

const pass =
prompt(
"Password baru"
);

if(!pass){
return;
}

await updatePassword(
auth.currentUser,
pass
);

alert(
"Password berhasil diganti"
);
}

window.scanLink =
function(){

const url =
document.getElementById(
"urlInput"
).value
.toLowerCase();

const result =
document.getElementById(
"result"
);

const blacklist = [

"phishing",
"free-robux",
"hack",
"malware",
"scam"

];

let dangerous =
false;

blacklist.forEach(word=>{

if(
url.includes(word)
){

dangerous =
true;
}

});

if(dangerous){

result.innerHTML =

`

  <div class="danger">⚠️ Link Berbahaya

  </div>
  `;}else{

result.innerHTML =

`

  <div class="safe">✅ Link Aman

  </div>
  `;
 }
};onSnapshot(

doc(
db,
"system",
"announcement"
),

snap=>{

if(snap.exists()){

document.getElementById(
"announcementBar"
).innerText =

snap.data().text;
}

}

);

onSnapshot(

collection(
db,
"ads"
),

snapshot=>{

let html = "";

snapshot.forEach(docSnap=>{

const data =
docSnap.data();

if(
data.type === "text"
){

html +=

`
<div class="ad-card">

 <h3>

  ${data.text}

 </h3>

</div>
`;

}

if(
data.type === "image"
||
data.type === "gif"
){

html +=

`
<div class="ad-card">

 <img
  src="${data.url}"
  style="
  width:100%;
  border-radius:12px;
  ">

</div>
`;

}

if(
data.type === "video"
){

html +=

`
<div class="ad-card">

 <video
  controls
  width="100%">

  <source
   src="${data.url}"
   type="video/mp4">

 </video>

</div>
`;

}

});

document.getElementById(
"adsContainer"
).innerHTML =
html;

}

);