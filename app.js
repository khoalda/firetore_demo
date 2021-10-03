// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyBH8uZqaZblVoVTAZWEJ25WsUyTl7m1XZ8",
    authDomain: "fir-2dd5c.firebaseapp.com",
    projectId: "fir-2dd5c",
    storageBucket: "fir-2dd5c.appspot.com",
    messagingSenderId: "12997023014",
    appId: "1:12997023014:web:110fbd54ff439cba479de7",
    measurementId: "G-T2X38N0WEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(doc_) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc_.id);
    name.textContent = doc_.data().name;
    city.textContent = doc_.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    //deleting date
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        deleteDoc(doc(db, "cafes", id));
    });
}

// getting data
// var querySnapshot = await getDocs(collection(db, "cafes"));

// querySnapshot.forEach((doc) => {
//     renderCafe(doc);
// });



// // simple query
// var querySnapshot = collection(db, "cafes");
// // var quer = await getDocs(query(querySnapshot, where("city", "==", "Ha Noi")));
// var quer = await getDocs(query(querySnapshot, orderBy("city"), limit(3)));


// quer.forEach((doc) => {
//     renderCafe(doc);
// });


// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();

    addDoc(collection(db, "cafes"), {
        name: form.name.value,
        city: form.city.value
    });

    form.name.value = '';
    form.city.value = '';
})


// real-time listener
var querySnapshot = collection(db, "cafes");

onSnapshot(querySnapshot, snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});


