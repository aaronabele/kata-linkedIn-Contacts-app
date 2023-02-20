const list = document.querySelector("#list");
const overallWrapper = document.querySelector(".overall-card-wrapper");
let persons = [];
let id = 1;
let counterPeople = 0;
let contactCounter = 8;

//GET
function getPersonData() {
  for (let i = counterPeople; i < contactCounter; i++) {
    fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=1")
      .then((request) => request.json())
      .then((people) => {
        people.forEach((typ) => {
          typ.id = id++;
          typ.done = false;
          persons.push(typ.id, typ.done);
          counterPeople++;
        });
        persons = people;
        renderPersons();
      });
  }
}
getPersonData();

//RENDER PEOPLE
function renderPersons() {
  persons.forEach((person) => {
    const newPerson = document.createElement("li");

    const personWrapper = document.createElement("div");
    personWrapper.classList.add("card-wrapper");

    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card-people-wrapper");

    const backgroundWrapper = document.createElement("div");
    backgroundWrapper.classList.add("div-for-backgroundimg");
    if (person.backgroundImage) {
      backgroundWrapper.style.setProperty(
        "--set-background-image",
        "url('" + person.backgroundImage + "')"
      );
    } else {
      backgroundWrapper.style.setProperty(
        "--set-background-image",
        "url(/default-bg.jpg)"
      );
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn-delete");
    deleteBtn.innerText = "x";
    deletePerson(deleteBtn, newPerson);

    const profilePic = document.createElement("img");
    profilePic.classList.add("profile-picture");
    profilePic.src = person.picture;

    const restWrapper = document.createElement("div");
    restWrapper.classList.add("div-for-rests");

    const setFirstname = document.createElement("span");
    setFirstname.classList.add("set-firstname");
    setFirstname.innerHTML =
      person.name.title +
      "." +
      " " +
      person.name.first +
      " " +
      person.name.last;

    const setJob = document.createElement("span");
    setJob.classList.add("set-job");
    setJob.innerHTML = person.title;

    const setConnections = document.createElement("span");
    setConnections.classList.add("set-connections");
    setConnections.innerHTML = person.mutualConnections + " mutual connections";

    const connectBtn = document.createElement("button");
    connectBtn.classList.add("btn-connect");
    connectBtn.classList.add("invisible");
    connectBtn.innerHTML = "Connect";
    changePending(connectBtn, deleteBtn);

    newPerson.appendChild(personWrapper);
    personWrapper.appendChild(cardWrapper);
    cardWrapper.appendChild(backgroundWrapper);
    backgroundWrapper.appendChild(deleteBtn);
    personWrapper.appendChild(profilePic);
    cardWrapper.appendChild(restWrapper);
    restWrapper.appendChild(setFirstname);
    restWrapper.appendChild(setJob);
    restWrapper.appendChild(setConnections);
    restWrapper.appendChild(connectBtn);

    list.append(newPerson);
  });
}

let visible = false;
let counter = 0;
const pendingInvs = document.querySelector(".text-pending-invitations");

//CHANGE PENDING AND CONNECT INCL COUNTER
function changePending(connectBtn) {
  connectBtn.addEventListener("click", () => {
    visible = !visible;
    if (connectBtn.classList.value === "btn-connect invisible") {
      connectBtn.innerHTML = "Pending";
      connectBtn.value = "Pending";
      connectBtn.classList.remove("invisible");
      counter++;
      pendingInvs.innerHTML = counter + " Pending invitations";
    } else {
      connectBtn.innerHTML = "Connect";
      connectBtn.value = "Connect";
      connectBtn.classList.add("invisible");
      counter--;
      if (counter === 0) {
        pendingInvs.innerHTML = "No Pending invitations";
      } else {
        pendingInvs.innerHTML = counter + " Pending invitations";
      }
    }
  });
}

//DELETING AND ADDING NEW PEOPLE
function deletePerson(deleteBtn, newPerson) {
  deleteBtn.addEventListener("click", () => {
    newPerson.remove();
    counterPeople--;
    for (let i = counterPeople; i < contactCounter; i++) {
      getPersonData();
    }
  });
}
