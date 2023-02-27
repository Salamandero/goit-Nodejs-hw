const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.resolve(__dirname, ".", "db", "contacts.json");
console.log("contactsPath", contactsPath);

const listContacts = async () => {
  try {
    const rawData = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const listCont = await listContacts();
    return listCont.find((contact) => String(contact.id) === String(contactId));
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const id = crypto.randomUUID();
    const listCont = await listContacts();
    const newContact = { id, name, email, phone };
    listCont.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(listCont, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const listCont = await listContacts();
    const newContList = listCont.filter(
      (contact) => String(contact.id) !== String(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContList, null, 2));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
