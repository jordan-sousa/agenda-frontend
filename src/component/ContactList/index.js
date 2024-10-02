import { useEffect, useState } from 'react';
import ContactItem from '../ContactItem';
import './ContactList.css'
import axios from 'axios';
import NavBar from '../NavBar';
import ButtonLogout from '../ButtonLogout';

const ContactList = () => {

    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('token');

    const fetchContacts = async (keyword = '') => {
        try {
            const url = keyword 
                ? `http://localhost:8080/contacts/search?keyword=${keyword}`
                : 'http://localhost:8080/contacts';

            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setContacts(response.data.content || response.data);
        } catch (error) {
            console.error('Erro ao buscar contatos', error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        fetchContacts(value); 
    };

    const handleEdit = (id, updatedContact) => {
        setContacts(prevContacts =>
            prevContacts.map(contact =>
                contact.id === id ? updatedContact : contact
            )
        );
    };

    const handleDelete = (id) => {
        setContacts(prevContacts =>
            prevContacts.filter(contact => contact.id !== id)
        );
    };

    return (
        <div >
            <NavBar onSearchChange={handleSearchChange} searchTerm={searchTerm} />
            <ButtonLogout text='sair'/>
            <h2>Lista de Contatos</h2>
            <hr/>
             {contacts.map(contact => ( 
                <ContactItem
                    key={contact.id}  
                    contact={contact}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
             ))} 
        </div>
    )
}

export default ContactList;