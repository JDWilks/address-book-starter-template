// Deliverables
// - A user can create a contact via a form when the "New Contact" button is clicked

// to CREATE - we need to send a POST request

//     - the created contact should have:
//         - first name
//         - last name
//         - street
//         - city
//         - post code
//         - an option to block the contact
//     - the created contact should be saved in the database
//     - the created contact should be added to the contacts list

// to UPDATE - we need to send a PATCH

// - A user can edit a contact via a form when the "Edit" button is clicked
//     - the updated contact should be saved in the database
//     - the updated contact should be viewable in the UI
//     - the selected contact can also be deleted from the edit contact form
// - When a user submits a form they should be redirected to see the changes
//     - Use renderContactView to do this.

// - Create fetch functions for create and edit
// - Create action functions to update state
// - Create render functions for your forms

// the below connects to the main within html
const viewSection = document.querySelector(".view-section");
// the below connects to the aside within body
const contactsSection = document.querySelector(".contacts-section");

const state = {
  contacts: [],
  selectedContact: null,
};

/* [START] NO NEED TO EDIT */

// the below function gets all contacts & stores in state.contacts
function getContacts() {
  fetch("http://localhost:3000/contacts")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.contacts = data;

      renderContactsList();
    });
}

// the below function is called above
// the below function creates ul element with a class of contacts-list
// the below function loops through the state.contacts.length adding each contact within state.contact to contact
// renderContractListItem is then called storing the result in listItemEl
// listItemEl is appended to listEl
// listEl is appended to contactsSection
// it doesn't return anything
function renderContactsList() {
  const listEl = document.createElement("ul");
  listEl.className = "contacts-list";

  for (let i = 0; i < state.contacts.length; i++) {
    const contact = state.contacts[i];
    const listItemEl = renderContactListItem(contact);

    listEl.append(listItemEl);
  }

  contactsSection.append(listEl);
}

// the below function creates elements & appends elements
// the below function returns containerEl
function renderAddressSection(address) {
  const containerEl = document.createElement("section");

  const headingEl = document.createElement("h2");
  headingEl.innerText = "Address";

  containerEl.append(headingEl);

  const streetText = document.createElement("p");
  streetText.innerText = address.street;

  containerEl.append(streetText);

  const cityText = document.createElement("p");
  cityText.innerText = address.city;

  containerEl.append(cityText);

  const postCodeText = document.createElement("p");
  postCodeText.innerText = address.postCode;

  containerEl.append(postCodeText);

  return containerEl;
}

// the below function creates a variable called contact = state.selectedContact
// if contact is not in selectedContact - clear inner html - not sure if thats correct ?
// creates elements and appends
// doens't return anything
function renderContactView() {
  const contact = state.selectedContact;

  if (!contact) return;

  viewSection.innerHTML = "";

  const containerEl = document.createElement("article");
  containerEl.className = "center light-shadow address-card";

  const headingEl = document.createElement("h1");

  const fullName = `${contact.firstName} ${contact.lastName}`;
  headingEl.innerText = fullName;

  containerEl.append(headingEl);

  const addressSectionEl = renderAddressSection(contact.address);

  containerEl.append(addressSectionEl);

  viewSection.append(containerEl);
}

// the below function created elements from the state and appends to the page
// NEED TO ADD CODE TO EVENT LISTENER - EDIT
// returns listItemEl
function renderContactListItem(contact) {
  const listItemEl = document.createElement("li");

  const headingEl = document.createElement("h3");

  const fullName = `${contact.firstName} ${contact.lastName}`;

  headingEl.innerText = fullName;

  listItemEl.append(headingEl);

  const viewBtn = document.createElement("button");
  viewBtn.className = "button grey";
  viewBtn.innerText = "View";

  viewBtn.addEventListener("click", function () {
    state.selectedContact = contact;

    renderContactView();
  });

  listItemEl.append(viewBtn);

  const editBtn = document.createElement("button");
  editBtn.className = "button blue";
  editBtn.innerText = "Edit";

  editBtn.addEventListener("click", function () {
    console.log("you clicked edit - good boy");
    editNewContact();
  });

  listItemEl.append(editBtn);

  return listItemEl;
}

function listenNewContactButton() {
  const btn = document.querySelector(".new-contact-btn");

  btn.addEventListener("click", function () {
    viewSection.innerHTML = "";
    createNewContact();
    console.log("hello you clicked new contact button");
  });
}

function createNewContact() {
  const formEl = document.createElement("form");
  formEl.setAttribute("class", "form-stack light-shadow center contact-form");

  const h1Heading = document.createElement("h1");
  h1Heading.innerText = "Create Contact";

  const firstNameLabel = document.createElement("label");
  firstNameLabel.setAttribute("for", "first-name-input");
  firstNameLabel.innerText = "First Name:";

  const firstNameInput = document.createElement("input");
  firstNameInput.setAttribute("id", "first-name-input");
  firstNameInput.setAttribute("name", "first-name-input");
  firstNameInput.setAttribute("type", "text");

  const lastNameLabel = document.createElement("label");
  lastNameLabel.setAttribute("for", "last-name-input");
  lastNameLabel.innerText = "Last Name:";

  const lastNameInput = document.createElement("input");
  lastNameInput.setAttribute("id", "last-name-input");
  lastNameInput.setAttribute("name", "last-name-input");
  lastNameInput.setAttribute("type", "text");

  const streetLabel = document.createElement("label");
  streetLabel.setAttribute("for", "street-input");
  streetLabel.innerText = "Street:";

  const streetInput = document.createElement("input");
  streetInput.setAttribute("id", "street-input");
  streetInput.setAttribute("name", "street-input");
  streetInput.setAttribute("type", "text");

  const cityLabel = document.createElement("label");
  cityLabel.setAttribute("for", "city-input");
  cityLabel.innerText = "City";

  const cityInput = document.createElement("input");
  cityInput.setAttribute("id", "city-input");
  cityInput.setAttribute("name", "city-input");
  cityInput.setAttribute("type", "text");

  const postCodeLabel = document.createElement("label");
  postCodeLabel.setAttribute("for", "post-code-input");
  postCodeLabel.innerText = "Post Code:";

  const postCodeInput = document.createElement("input");
  postCodeInput.setAttribute("id", "post-code-input");
  postCodeInput.setAttribute("name", "post-code-input");
  postCodeInput.setAttribute("type", "text");

  const checkBoxSection = document.createElement("div");

  const checkBoxInput = document.createElement("input");
  checkBoxInput.setAttribute("id", "block-checkbox");
  checkBoxInput.setAttribute("name", "block-checkbox");
  checkBoxInput.setAttribute("type", "checkbox");

  const checkBoxlabel = document.createElement("label");
  checkBoxlabel.setAttribute("for", "block-checkbox");
  checkBoxlabel.innerText = "Block";

  checkBoxSection.append(checkBoxInput, checkBoxlabel);

  const actionsSection = document.createElement("div");

  const createButton = document.createElement("button");
  createButton.setAttribute("class", "create button blue");
  createButton.setAttribute("type", "submit");
  createButton.innerText = "Create";

  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    // debugger;
    // console.log("you have clicked create button");
    // console.log(event.target);

    const dataObject = parseFormEvent(event);
    createAContact(dataObject);
  });

  actionsSection.append(createButton);

  formEl.append(
    h1Heading,
    firstNameLabel,
    firstNameInput,
    lastNameLabel,
    lastNameInput,
    streetLabel,
    streetInput,
    cityLabel,
    cityInput,
    postCodeLabel,
    postCodeInput,
    checkBoxSection,
    actionsSection
  );

  viewSection.append(formEl);
}

function createAContact(newContactObject) {
  const { street, city, postCode } = newContactObject;
  fetch("http://localhost:3000/addresses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      street,
      city,
      postCode,
    }),
  });
}

function parseFormEvent(event) {
  const form = event.target;
  const contactObject = {
    firstName: form["first-name-input"].value,
    lastName: form["last-name-input"].value,
    blockContact: form["block-checkbox"].checked,
    street: form["street-input"].value,
    city: form["city-input"].value,
    postCode: form["post-code-input"].value,
  };
  return contactObject;
}

// above to CREATE - we need to send a POST request
// i need this to update the server and then the state - somehow

function editNewContact() {
  const formEl = document.createElement("form");
  formEl.setAttribute("class", "form-stack light-shadow center contact-form");

  const h1Heading = document.createElement("h1");
  h1Heading.innerText = "Edit Contact";

  const firstNameLabel = document.createElement("label");
  firstNameLabel.setAttribute("for", "first-name-input");
  firstNameLabel.innerText = "First Name:";

  const firstNameInput = document.createElement("input");
  firstNameInput.setAttribute("id", "first-name-inpu");
  firstNameInput.setAttribute("name", "first-name-input");
  firstNameInput.setAttribute("type", "text");

  const lastNameLabel = document.createElement("label");
  lastNameLabel.setAttribute("for", "last-name-input");
  lastNameLabel.innerText = "Last Name:";

  const lastNameInput = document.createElement("input");
  lastNameInput.setAttribute("id", "last-name-inpu");
  lastNameInput.setAttribute("name", "first-name-input");
  lastNameInput.setAttribute("type", "text");

  const streetLabel = document.createElement("label");
  streetLabel.setAttribute("for", "street-input");
  streetLabel.innerText = "Street:";

  const streetInput = document.createElement("input");
  streetInput.setAttribute("id", "street-input");
  streetInput.setAttribute("name", "street-input");
  streetInput.setAttribute("type", "text");

  const cityLabel = document.createElement("label");
  cityLabel.setAttribute("for", "city-input");
  cityLabel.innerText = "City";

  const cityInput = document.createElement("input");
  cityInput.setAttribute("id", "city-input");
  cityInput.setAttribute("name", "city-input");
  cityInput.setAttribute("type", "text");

  const postCodeLabel = document.createElement("label");
  postCodeLabel.setAttribute("for", "post-code-input");
  postCodeLabel.innerText = "Post Code:";

  const postCodeInput = document.createElement("input");
  postCodeInput.setAttribute("id", "post-code-input");
  postCodeInput.setAttribute("name", "post-code-input");
  postCodeInput.setAttribute("type", "text");

  const actionsSection = document.createElement("div");

  const createButton = document.createElement("button");
  createButton.setAttribute("class", "update button blue");
  createButton.setAttribute("type", "submit");
  createButton.innerText = "Update";

  createButton.addEventListener("click", function (event) {
    viewSection.innerHTML = "";
    console.log("hello you clicked edit");
  });

  actionsSection.append(createButton);

  formEl.append(
    h1Heading,
    firstNameLabel,
    firstNameInput,
    lastNameLabel,
    lastNameInput,
    streetLabel,
    streetInput,
    cityLabel,
    cityInput,
    postCodeLabel,
    postCodeInput,
    actionsSection
  );

  viewSection.append(formEl);
}

// to UPDATE - we need to send a PATCH (or PUT) request

// The URL has the id of the person we want to change (http://localhost:3000/contacts/1  or http://localhost:3000/contacts/2)

// The body of the request only has the fields we want to update

// i need this to update the server and then the state - somehow

// fetch('http://localhost:3000/contacts${contacts.id}', {
//   method: 'PATCH',
//   headers: {
//       'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ name: "Borris" })
// })

function main() {
  getContacts();
  listenNewContactButton();
}

main();
