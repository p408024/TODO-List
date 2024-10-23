// Hamburger code
const hamburgerContainer = document.querySelector('.hamburger-container');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');

hamburgerContainer.addEventListener('click', () => {
  hamburgerContainer.classList.toggle('open'); // Añade o quita la clase 'open' al contenedor
  menu.classList.toggle('open'); // Abre o cierra el menú al hacer clic
  overlay.classList.toggle('open'); // Muestra u oculta el fondo
});// Cierra el menú y el fondo al hacer clic en el fondo

overlay.addEventListener('click', () => {
  hamburgerContainer.classList.remove('open');
  menu.classList.remove('open');
  overlay.classList.remove('open');
});

// [REUSED TASK EDIT WINDOW CODE - MODIFIED] Html references
let modPopup = document.getElementById("login-popup")
let cancelButton = document.getElementById("cancel-button")


// [REUSED TASK EDIT WINDOW CODE - MODIFIED] Opens the task data entry popup
let enableLoginWindow = () => {
  cancelButton.style.display = "none";
  modPopup.style.display = "flex";
}
enableLoginWindow();

// Accounts management code
let accounts
let currentaccount
function getAccounts() {
  if (localStorage.UserAccounts != undefined) {
    accounts = JSON.parse(localStorage.UserAccounts);
    console.log("Account data retrieved from local storage")
  } else {
    accounts = [{ un: "Default User", pw: "DefPw123" }];
    localStorage.setItem("UserAccounts", JSON.stringify(accounts));
    console.log("No account data found, created default user")
  }
  if (localStorage.CurrentAccount != undefined) {
    currentaccount = localStorage.CurrentAccount;
    console.log("Logged in as Account #" + currentaccount)
  } else {
    currentaccount = 0;
    localStorage.setItem("CurrentAccount", currentaccount);
    console.log("No current account found, defaulting to default user")
  }
}

// Register screen code
function registeraccount() {
  let namedupecheck = 0;
  // Checks if Username field is empty
  if (userInput.value != "") {
    // Checks Username for duplicates
    for (let i = 0; i < accounts.length; i++) {
      console.log("Checking input against username #" + i)
      if (accounts[i].un != userInput.value) {
        console.log("Checked that the input doesn't match username #" + i)
      } else {
        namedupecheck++
        console.log("Input matches username #" + i)
      }
    }
    // If Username duplicate check has passed (no duplicates), validates password - if that passes the check it gets pushed to the accounts array which updates to the local storage
    // If Username duplicate is found, notifies the user and doesn't do anything with the password or accounts array, then resets the duplicate check variable
    if (namedupecheck == 0) {
      passwordInput.reportValidity();
      if (passwordInput.checkValidity() == true) {
        accounts.push({ un: userInput.value, pw: passwordInput.value });
        localStorage.removeItem("UserAccounts");
        localStorage.setItem("UserAccounts", JSON.stringify(accounts));
        currentaccount = accounts.lenght - 1;
        localStorage.removeItem("CurrentAccount");
        localStorage.setItem("CurrentAccount", currentaccount);
        console.log("Switched to Account #" + j)
        alert("Account " + userInput.value + " has been successfully registered!")
      }
    } else {
      alert("Username " + userInput.value + " is already taken.")
      namedupecheck = 0;
    }
  } else {
    alert("Please enter a username.")
  }
}

// Login screen code
function switchaccount() {
  // Checks if Username field is empty
  if (userInput.value != "") {
    let namematchcheck = 0;
    // Checks each saved Username against the input for matches, if any is found, the check passes
    for (let i = 0; i < accounts.length; i++) {
      console.log("Checking input against username #" + i)
      if (accounts[i].un == userInput.value) {
        console.log("Input matches username #" + i)
        namematchcheck++
        j = i;
        i = i + accounts.length;
        // Checks the password value for the matched Username, if it matches, sets that account as the current one
        if (accounts[j].pw == passwordInput.value) {
          alert("Welcome back, " + userInput.value + "!")
          currentaccount = j;
          localStorage.removeItem("CurrentAccount");
          localStorage.setItem("CurrentAccount", currentaccount);
          console.log("Switched to Account #" + j)
        } else {
          alert("Incorrect password, try again.")
        }
      }
    }
    // If the check was never passed, notifies the user that no such account exists
    if (namematchcheck == 0) {
      alert(userInput.value + " isn't a registered account.")
    }
  } else {
    alert("Please enter a username.")
  }
}

