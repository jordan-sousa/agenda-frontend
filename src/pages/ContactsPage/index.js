import { useNavigate } from 'react-router-dom';
import ContactList from '../../component/ContactList';
import NavBar from '../../component/NavBar';
import ButtonLogout from '../../component/ButtonLogout';

const ContactsPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  if (!token) {
    navigate("/");
  }

  return (
    <div>
      <NavBar/>
      <ButtonLogout text='sair'/>
      <h1>Lista de Contatos</h1>
      <ContactList />
    </div>
  );
};

export default ContactsPage;