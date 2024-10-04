import { useNavigate } from 'react-router-dom';
import ContactList from '../../component/ContactList';

const ContactsPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  if (!token) {
    navigate("/");
  }

  return (
      
      <ContactList />
      
  );
};

export default ContactsPage;