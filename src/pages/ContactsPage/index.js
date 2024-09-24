import { useNavigate } from 'react-router-dom';
import ContactList from '../../component/ContactList';
import NavBar from '../../component/NavBar';

const ContactsPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  if (!token) {
    navigate("/");
  }

  return (
    <div>
      <NavBar/>
      <h1>Lista de Contatos</h1>
      <ContactList />
    </div>
  );
};

export default ContactsPage;
