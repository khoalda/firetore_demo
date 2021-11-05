// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyCivPyidtXFNDOBvTsf0H2fW9NtSPPMebw",
    authDomain: "database-d931d.firebaseapp.com",
    projectId: "database-d931d",
    storageBucket: "database-d931d.appspot.com",
    messagingSenderId: "613550257035",
    appId: "1:613550257035:web:6da9f48ded23b6237bb58e",
    measurementId: "G-ED57X5NBJX"
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
    let rating = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc_.id);
    name.textContent = doc_.data().name;
    city.textContent = doc_.data().city;
    rating.textContent = doc_.data().rating;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(rating);
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
        city: form.city.value,
        rating: form.rating.value
    });

    form.name.value = '';
    form.city.value = '';
    form.rating.value = '';
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


