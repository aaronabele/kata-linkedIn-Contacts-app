//BTN
let visible = false;
const btnConnect = document.querySelectorAll(".btn-connect");
const pendingInvs = document.querySelector(".text-pending-invitations");
let counter = 0;

function setFirstState() {
  for (let i = 0; i < btnConnect.length; i++) {
    if (btnConnect[i]) {
      btnConnect[i].classList.add("invisible");
    }
  }
}
setFirstState();

function changeState() {
  for (let i = 0; i < btnConnect.length; i++) {
    btnConnect[i].addEventListener("click", () => {
      if (btnConnect[i].classList.value === "btn-connect invisible") {
        btnConnect[i].innerHTML = "Pending";
        btnConnect[i].value = "Pending";
        btnConnect[i].classList.remove("invisible");
        counter++;
        pendingInvs.innerHTML = counter + " Pending invitations";
      } else {
        btnConnect[i].innerHTML = "Connect";
        btnConnect[i].value = "Connect";
        btnConnect[i].classList.add("invisible");
        counter--;
        if (counter === 0) {
          pendingInvs.innerHTML = "No Pending invitations";
        } else {
          pendingInvs.innerHTML = counter + " Pending invitations";
        }
      }
    });
  }
}
changeState();

//GET
const singlePerson = document.querySelectorAll(".div-for-backgroundimg");
const setFirstname = document.querySelectorAll(".set-firstname");
const setJob = document.querySelectorAll(".set-job");
const setConnections = document.querySelectorAll(".set-connections");
const profilePicture = document.querySelectorAll(".profile-picture");
const cards = document.querySelectorAll(".card-people-wrapper");
let persons = [];

function getPersonData() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=1")
    .then((request) => request.json())
    .then((people) => {
      persons = people;
      renderPersons(persons);
    });
}
getPersonData();

function renderPersons(persons) {
  for (let i = 0; i < persons.length; i++) {
    setFirstname[i].innerHTML =
      persons[i].name.title +
      " " +
      persons[i].name.first +
      " " +
      persons[i].name.last;

    setJob[i].innerHTML = persons[i].title;

    setConnections[i].innerHTML =
      persons[i].mutualConnections + " mutual connections";

    profilePicture[i].src = persons[i].picture;

    singlePerson[i].style.setProperty(
      "--set-background-image",
      "url('" + persons[i].backgroundImage
    );
  }
}
renderPersons();
