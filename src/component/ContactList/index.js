import { useEffect, useState } from 'react';
import ContactItem from '../ContactItem';
import './ContactList.css'
import axios from 'axios';

const ContactList = ({ onEdit, onDelete }) => {

    const [contacts, setContacts] = useState([]);
    const token = localStorage.getItem('token');

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/contacts', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            setContacts(response.data.content);            
        } catch (error) {
            console.error('Erro ao buscar contatos', error);
        }
    }

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="contact-list">
             {contacts.map(contact => ( 
                <ContactItem
                    key={contact.id}  
                    contact={contact}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
             ))} 
        </div>
    )
}

export default ContactList;