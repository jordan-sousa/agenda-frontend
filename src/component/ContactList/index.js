import { useEffect, useState } from 'react';
import ContactItem from '../ContactItem';
import './ContactList.css'
import axios from 'axios';

const ContactList = ({ contacts, onEdit, onDelete }) => {

    // const [contacts, setContacts] = useState([]);

    // const fetchContacts = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/contacts');
    //         setContacts(response.data);
    //     } catch (error) {
    //         console.error('Erro ao buscar contatos', error);
    //     }
    // }

    // useEffect(() => {
    //     fetchContacts();
    // }, []);

    return (
        <div className="contact-list">
            {/* {contacts.map(contact => ( */}
                <ContactItem  />
            {/* ))} */}
        </div>
    )
}

export default ContactList;