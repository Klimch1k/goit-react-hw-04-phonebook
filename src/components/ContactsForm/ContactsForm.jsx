import { useState } from 'react';
import { Input, Text, Button } from './ContactsForm.styled';
import { Container } from 'components/App.styled';
import PropTypes from 'prop-types';


 const ContactsForm = ({ onSubmit }) => {
   const [name, setName] = useState('');
   const [number, setNumber] = useState('');

   const handleChangeName = e => {
     const { value } = e.target;
     setName(value);
   };

   const handleChangeNumber = e => {
     const { value } = e.target;
     setNumber(value);
   };

   const handleSubmit = e => {
     e.preventDefault();
     onSubmit({ name, number });
     reset();
   };

   const reset = () => {
     setName('');
     setNumber('');
   };
   return (
     <form onSubmit={handleSubmit}>
       <Input>
         <label>
           <Text>Name</Text>
           <input
             type="text"
             name="name"
             value={name}
             onChange={handleChangeName}
             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
             required
           />
         </label>

         <label>
           <Text>Number</Text>
           <input
             type="tel"
             name="number"
             value={number}
             onChange={handleChangeNumber}
             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
             required
           />
         </label>
       </Input>

       <Container>
         <Button type="submit">Add contact</Button>
       </Container>
     </form>
   );
 };
  

export default ContactsForm;

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  name: PropTypes.string,
  number: PropTypes.string,
};

// import { Formik, Form, Field } from 'formik';

// const initialValues = {
//   name: '',
// };

// const ContactsForm = () => {
//   const handleSubmit = (value, { resetForm }) => {
//     console.log(value);
//     resetForm();
//   };

//   return (
//     <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//       <Form autoComplete="off">
//         <label htmlFor="name">
//           Name
//           <Field
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//           />
//         </label>

//         <button type="submit"> Add contact </button>
//       </Form>
//     </Formik>
//   );
// };

// export default ContactsForm;
