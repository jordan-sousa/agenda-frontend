import { useState } from 'react';
import './Menu.css'

const Menu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return(
        <section className='menu-container'>
            <div className='hanburguer' onClick={toggleMenu}>
                <div className={`line ${isOpen ? 'open' : ''}`}></div>
                <div className={`line ${isOpen ? 'open' : ''}`}></div>
                <div className={`line ${isOpen ? 'open' : ''}`}></div>
            </div>

            {isOpen && (
                <div className='menu'>
                    <ul>
                        <li>Home</li>
                        <li>Sobre</li>
                        <li>Serviços</li>
                        <li>Contato</li>
                    </ul>
                </div>
            )}

            
        </section>
    )
}

export default Menu;