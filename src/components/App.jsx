import  { useState, useEffect } from 'react';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { Container, Title } from './App.styled';
import shortid from 'shortid';


export default function App() {
const [contacts, setContacts] = useState(() => {
  return (
    JSON.parse(window.localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
});
  const [filter, setFilter] = useState('');

  

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

const formFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);}

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()))

  const formSubmitHandler = data => {
    const contains = contacts.some(({ name }) => {
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
   
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
   
  };

  const onDeleteContacts = contactsId => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactsId
    );

    setContacts(updatedContacts);

    
  };

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
            contacts={filteredContacts}
            onDeleteContacts={onDeleteContacts}
          />
        </Container>
      </>
    );
}
