import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Button } from 'components/ContactsForm/ContactsForm.styled';
import { Container } from 'components/App.styled';
import { List, WrapperButtonDelete } from './ContactsList.styled';

const ContactList = ({ contacts, onDeleteContacts }) => {
  return (
    <Container>
      <List>
        {contacts.map(({ name, number, id }) => {;
          return (
            <li key={shortid()}>
              {name} {number}
              <WrapperButtonDelete>
                <Button onClick={() => onDeleteContacts(id)}>Delete</Button>
              </WrapperButtonDelete>
            </li>
          );
        })}
      </List>
    </Container>
  );
};

export default ContactList;

ContactList.propTypes = {
  onDeleteContacts: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
