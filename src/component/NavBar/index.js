import { Link } from 'react-router-dom';
import Menu from '../Menu';
import './NavBar.css';

const NavBar = () => {
    return (
        <header className="nav-header">
            <ul className="header-list">

                <li className="header-list__item">
                    <Menu />
                </li>

                <li className="header-list__item">
                    <input className="search" type="search" placeholder="Busque aqui" />
                </li>

                <li className="header-list__item">
                    <a className='link_create'>
                        Criar contato
                    </a>
                </li>
            </ul>
        </header>
    )
}

export default NavBar;