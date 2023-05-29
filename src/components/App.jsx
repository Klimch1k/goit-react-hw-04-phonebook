import React, { Component } from 'react';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { Container, Title } from './App.styled';
import shortid from 'shortid';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLocalStorage = localStorage.getItem('contacts');

    if (contactsFromLocalStorage) {
      this.setState({ contacts: JSON.parse(contactsFromLocalStorage) });
    }
  }

  formFilter = filter => {
    this.setState({ filter });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  formSubmitHandler = data => {
    const contains = this.state.contacts.some(({ name }) => {
      return name.toLowerCase() === data.name.toLowerCase();
    });
    if (contains) {
      return alert(`${data.name} is already exist!`);
    }
    
    const newContact = {
      id: shortid(),
      name: data.name,
      number: data.number,
    };
   
    const updatedContacts = [...this.state.contacts, newContact];

    this.setState({
      contacts: updatedContacts,
    });

    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  onDeleteContacts = contactsId => {
    const { contacts } = this.state;

    const updatedContacts = contacts.filter(
      contact => contact.id !== contactsId
    );

    this.setState({ contacts: updatedContacts });

    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  render() {
    const { filter } = this.state;
    const {
      filteredContacts,
      formFilter,
      formSubmitHandler,
      onDeleteContacts,
    } = this;

    return (
      <>
        <Container>
          <Title>Phonebook</Title>

          <ContactsForm onSubmit={formSubmitHandler} />
        </Container>
        <Container>
          <Title>Contacts</Title>

          <h3>Find contacts by name</h3>
          <Filter filter={filter} formFilter={formFilter} />
          <ContactList
            contacts={filteredContacts()}
            onDeleteContacts={onDeleteContacts}
          />
        </Container>
      </>
    );
  }
}
