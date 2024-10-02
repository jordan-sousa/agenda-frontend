import Menu from '../Menu';
import './NavBar.css';
import { useState } from 'react';
import FormContact from '../FormContact';

const NavBar = ({ onSearchChange, searchTerm }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        onSearchChange(value); 
    };

    

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
                        onChange={handleInputChange}
                    />
                </li>

                <li className="header-list__item">
                    <button className='link_create' onClick={openModal}>
                        Criar contato
                    </button>
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
        </header>
    )
}

export default NavBar;


