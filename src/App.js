import { useState } from 'react';
import './App.css';
import ContactList from './component/ContactList';
import NavBar from './component/NavBar';

function App() {

  const [contacts, setContacts] = useState([
    { id: 1, name: "John Doe", email: "johndoe@example.com", phone: "+1234567890" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com", phone: "+0987654321" },
    { id: 3, name: "Jordan Smith", email: "jordan@example.com", phone: "+6316588789" },
    { id: 4, name: "Julia Smith", email: "julia@example.com", phone: "+6546887988" },
    { id: 5, name: "Caua Smith", email: "caua@example.com", phone: "+1321326588" },
  ]);

  // Função para editar um contato
  const editContact = (id, updatedContact) => {
    setContacts(contacts.map(contact => (contact.id === id ? updatedContact : contact)));
  };

  // Função para excluir um contato
  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="App">
      <NavBar />

      <div className="App">
        <h1>Lista de Contatos</h1>
        <ContactList contacts={contacts} onEdit={editContact} onDelete={deleteContact} />
      </div>
    </div>
  );
}

export default App;
