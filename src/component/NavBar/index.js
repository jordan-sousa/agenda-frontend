import Menu from '../Menu';
import './NavBar.css';
import { useState } from 'react';
import FormContact from '../FormContact';
import axios from 'axios';

const NavBar = ({ onChange, value }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [contacts, setContacts] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        const token = localStorage.getItem('token');
        setSearchTerm(value);

        if (value) {
            try {
                const response = await axios.get(`http://localhost:8080/contacts/search?keyword=${value}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setContacts(response.data);
            } catch (err) {
                console.error("Erro ao buscar contato:", err);
            }
        } else {
            setContacts([]);
        }
    }

    return (
        <header className="nav-header">
            <ul className="header-list">
                <li className="header-list__item">
                    <Menu />
                </li>

                <li className="header-list__item">
                    <input 
                        className="search" 
                        type="search" 
                        placeholder="Busque aqui" 
                        value={searchTerm} 
                        onChange={handleSearchChange}
                    />
                </li>

                <li className="header-list__item">
                    <a className='link_create' onClick={openModal}>
                        Criar contato
                    </a>
                </li>
            </ul>

            {isModalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={closeModal}> &times; </span>
                        <FormContact />
                    </div>
                </div>
            )}

            {contacts.length > 0 && (
                <ul className='search-results'>
                    {contacts.map(contact => (
                        <li key={contact.id} >
                            {contact.name} - {contact.email}
                        </li>
                    ))}
                </ul>
            )}
        </header>
    )
}

export default NavBar;


