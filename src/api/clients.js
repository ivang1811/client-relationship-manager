// Get a full list of clients
async function getClientsList() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  let response = await fetch("http://localhost:5000/clients", requestOptions);
  let data = await response.json();
  return data;
}

// delete a cleint using the client id
const deleteClientById = (clientid) => {
  var requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };
  fetch(`http://localhost:5000/clients/${clientid}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

// Get specific client by clientid
async function getSpecificClient(clientid) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  let response = await fetch(
    `http://localhost:5000/clients/${clientid}`,
    requestOptions
  );
  let data = await response.json();
  return data;
}

// Api call to add a client

const addClient = (clientName, tags, description) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: clientName,
    tags: tags,
    description: description,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:5000/clients", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

// Edit Cleint
const editClient = (clientid, clientName, tags, description) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: clientName,
    tags: tags,
    description: description,
  });
  console.log(raw);
  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`http://localhost:5000/clients/${clientid}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
export {
  getClientsList,
  deleteClientById,
  getSpecificClient,
  addClient,
  editClient,
};
