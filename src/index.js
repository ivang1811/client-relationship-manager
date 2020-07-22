import {
  getClientsList,
  getSpecificClient,
  addClient,
  deleteClientById,
  editClient,
} from "./api/clients";
import "./styles/main.scss";

function getdat() {
  let html = "";
  let counter = 0;
  const cardData = document.getElementById("cards-data");
  let clientids = [];

  getClientsList().then((data) => {
    let clientList = [];
    data.forEach((item) => {
      clientList.push(item);
      if (counter == 0 || counter % 3 == 0) {
        if (counter == 0) {
          html += `<section class="cardRow">`;
        } else {
          html += `</section><section class="cardRow">`;
        }
      }

      counter += 1;
      html += `<div class="card">
        <div class="card__header">
          <div class="card__circle">${item.relationship_score}</div>
          <i id="icon_${item._id}" class="fa fa-ellipsis-h fa-2x"></i>
        </div>
        <div class="card__body">
          <div class="card__circle">ILG</div>
          <h2>${item.name}</h2>
          <p>Tags: ${item.tags}</p>
          <p>Last Contacted : 18/06/2017</p>
          <p>Assignees : ${item.assignees}</p>
          <a href="/client.html?id=${item._id}">More Info</a>
        </div>
        <div class="card__submenu" id="cardmenu_${item._id}">
          <button type="button" id="delete_${item._id}">Delete</button>
          <button type="button" id="edit_${item._id}">Edit</button>
        </div>
      </div>`;
      if (item == data[data.length - 1]) {
        html += `</section>`;
      }
      clientids.push(item._id);
      cardData.innerHTML = html;
    });
    let menuArray = [];
    let deleteArray = [];
    let editArray = [];
    const editForm = document.getElementById("editForm");
    const overlay = document.getElementById("overlay");
    const editExit = document.getElementById("editExit");
    clientids.forEach((item) => {
      menuArray.push(document.getElementById(`icon_${item}`));
      deleteArray.push(document.getElementById(`delete_${item}`));
      editArray.push(document.getElementById(`edit_${item}`));
    });

    for (let i = 0; i < menuArray.length; i++) {
      menuArray[i].addEventListener("click", function () {
        let Submenu = document.getElementById(`cardmenu_${clientids[i]}`);
        if (Submenu.style.display == "block") {
          Submenu.style.display = "none";
        } else {
          Submenu.style.display = "block";
        }

        // let notHov = 1;
        // document.onclick = function (e) {
        //   if ((notHov && Submenu.style.display == "block") || e.which == 27)
        //     Submenu.style.display = "none";
        // };
      });
    }
    for (let i = 0; i < deleteArray.length; i++) {
      deleteArray[i].addEventListener("click", function () {
        const clientid = clientids[i];
        let confirmDelte = confirm("Are you sure you want to delete this user");
        if (confirmDelte == true) {
          deleteClientById(clientid);
          location.reload();
        }
      });
    }
    const clientId = document.getElementById("editClientId");
    const clientName = document.getElementById("editClientName");
    const clientTags = document.getElementById("editClientTags");
    const ClientDescription = document.getElementById("editClientDescription");
    const clientAssignes = document.getElementById("editAssignees");
    for (let i = 0; i < editArray.length; i++) {
      editArray[i].addEventListener("click", function () {
        clientId.value = clientids[i];
        clientName.value = clientList[i].name;
        let Tags = "";
        clientList[i].tags.forEach((item) => (Tags += `${item},`));
        clientTags.value = Tags;
        ClientDescription.value = clientList[i].description;
        editForm.style.display = "block";
        overlay.style.display = "block";
      });
    }
    editExit.addEventListener("click", (event) => {
      editForm.style.display = "none";
      overlay.style.display = "none";
    });
  });
}

function createClient(clientid) {
  getSpecificClient(clientid).then((client) => {
    const main = document.getElementById("mainContent");
    let tags = "";
    client.tags.forEach((item) => {
      tags += `<div>${item}</div>`;
    });
    const html = ` <section class="details">
    <h1 class="clientName">${client.name}</h1>
    <section class="tags">
      <h2>Tags:</h2>
      ${tags}
    </section>
    <h3 class="clientSubheading">Description:</h3>
    <p class="descriptionText">
    ${client.description}
    </p>
    <h3 class="clientSubheading">Client Interactions:</h3>
    <section class="option">
      Show:
      <button type="button" id="interactionInput">Input</button>
      <button type="button" id="interactionHistory">History</button>
    </section>
    <section class="interactions">
      <h1>Interaction Name</h1>
      <section>
        <h3><b>Date:</b> 20/11/2000</h3>
        <h3><b>Score:</b> 73</h3>
  
        <h3><b>Description</b></h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          libero ante, convallis sit amet dui ac, dictum convallis felis.
          Mauris elementum tellus mattis, varius neque vitae, laoreet eros.
        </p>
      </section>
    </section>
    <h3 class="clientSubheading">Project History:</h3>
    <section class="option">
      Show:
      <button type="button" id="interactionInput">Input</button>
      <button type="button" id="interactionHistory">History</button>
    </section>
    <section class="projects"></section>
  </section>
  <section class="values">
    <h4>Assignees</h4>
    <div class="assignees">
      Ivan Golemdzhiyski
    </div>
    <h4>Current Relationship Score</h4>
    <div class="score">${client.relationship_score}</div>
    <h4>Last Interaction</h4>
    <p>Date: 19/12/2000 Score: 18</p>
    <h4>Active Projects</h4>
    <p>Project Name: Project Name</p>
    <p>Due date: 14/03/2018</p>
    <h4>Reminders</h4>
    <div class="clientReminders"></div>
  </section>`;
    main.innerHTML = html;
  });
}

function AddNewClient() {
  const clientName = document.getElementById("clientName").value;
  const clientTags = document.getElementById("ClientTags").value;
  const ClientDescription = document.getElementById("ClientDescription").value;
  const clientAssignes = document.getElementById("Assignees");
  let tagsarr = clientTags.split(",");
  addClient(clientName, tagsarr, ClientDescription);
  return false;
}
function editClientDetails() {
  const clientName = document.getElementById("editClientName").value;
  const clientTags = document.getElementById("editClientTags").value;
  const ClientDescription = document.getElementById("editClientDescription")
    .value;
  const clientId = document.getElementById("editClientId").value;
  const clientAssignes = document.getElementById("editAssignees").value;
  let tagsarr = clientTags.split(",");
  editClient(clientId, clientName, tagsarr, ClientDescription);
}
window.addEventListener("load", (event) => {
  const sourceSplit = event.srcElement.URL.split("/");
  const route = sourceSplit[sourceSplit.length - 1];
  const source = route.split("?")[0];
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const clientid = urlParams.get("id");
  if (source === "") {
    getdat();
    const cardIcon = document.getElementById("addNewClient");
    const form = document.getElementById("clientForm");
    const overlay = document.getElementById("overlay");
    const exitAddClient = document.getElementById("exitCard");
    const createNewClient = document.getElementById("createNewClient");
    const editClientForm = document.getElementById("editForm");
    createNewClient.addEventListener("submit", (event) => {
      AddNewClient();
    });
    cardIcon.addEventListener("click", (event) => {
      form.style.display = "block";
      overlay.style.display = "block";
    });
    exitAddClient.addEventListener("click", (event) => {
      form.style.display = "none";
      overlay.style.display = "none";
    });
    editClientForm.addEventListener("submit", (event) => {
      editClientDetails();
    });
  }

  if (source === "client.html") {
    createClient(clientid);
  }
});
