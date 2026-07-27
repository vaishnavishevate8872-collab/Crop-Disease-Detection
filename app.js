const diseases = [
    "Healthy",
    "Leaf Spot",
    "Early Blight",
    "Late Blight",
    "Powdery Mildew",
    "Rust Disease",
    "Bacterial Wilt"
];
// History Code
function saveHistory(disease) {
    let history = JSON.parse(localStorage.getItem("diseaseHistory")) || [];

    history.push({
        disease: disease,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("diseaseHistory", JSON.stringify(history));
}


function showHistory() {
    let history = JSON.parse(localStorage.getItem("diseaseHistory")) || [];

    let historyBox = document.getElementById("history");

    historyBox.innerHTML = "";

    history.forEach(item => {
        historyBox.innerHTML += `
            <p>
            localStorage.removeItem("diseaseHistory")
                Disease: ${item.disease}<br>
                Date: ${item.date}
            </p>
        `;
    });
}

saveHistory(result);
showHistory();

const imageInput = document.getElementById("imageInput");

function predictDisease() {
    // code here
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

// ---------- Firebase Configuration ----------
const firebaseConfig = {
  apiKey: "AIzaSyCKx2erbKt3y9ss5U4EN78yvTV_WG1Banc",
  authDomain: "crop-disease-detection-a2a2e.firebaseapp.com",
  databaseURL: "https://crop-disease-detection-a2a2e-default-rtdb.firebaseio.com",
  projectId: "crop-disease-detection-a2a2e",
  storageBucket: "crop-disease-detection-a2a2e.firebasestorage.app",
  messagingSenderId: "783903883660",
  appId: "1:783903883660:web:6cbac73944bdc6ed65d6a9",
  measurementId: "G-LS09K5Z7GM"
};
// ---------- Initialize Firebase ----------
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// =====================================
// Navigation
// =====================================

window.showPage = function (pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}

// Default Page
showPage("home");

// =====================================
// Register User
// =====================================

window.registerUser = async function () {

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;

    if (name === "" || email === "" || password === "") {

        alert("Please fill all fields");
        return;
    }

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        await set(
            ref(db, "users/" + user.uid),
            {
                name: name,
                email: email,
                createdAt: new Date().toLocaleString()
            }
        );

        alert("Registration Successful");

        document.getElementById("regName").value = "";
        document.getElementById("regEmail").value = "";
        document.getElementById("regPassword").value = "";

        showPage("login");

    }

    catch (error) {

        alert(error.message);

    }

}

// =====================================
// Login User
// =====================================

window.loginUser = async function () {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    if (email === "" || password === "") {

        alert("Enter Email and Password");

        return;
    }

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Login Successful");

        showPage("dashboard");

    }

    catch (error) {

        alert(error.message);

    }

}

// =====================================
// Logout
// =====================================

window.logout = async function () {

    try {

        await signOut(auth);

        alert("Logged Out Successfully");

        showPage("home");

    }

    catch (error) {

        alert(error.message);

    }

}

// =====================================
// Auth State
// =====================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log("Logged In :", user.email);

        loadHistory();

    }

    else {

        console.log("No User Logged In");

    }

});
