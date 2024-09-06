import './FormContact.css'
import TextField from '../TextField'
import { useState } from 'react'
import Button from '../Button'

const FormContact = () => {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("meus dados:", formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Criar contato</h2>

            <div className='text_field'>
                <label>Nome</label>
                <input
                    type='text'
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    placeholder="Digite seu nome"
                />
            </div>

            <div className='text_field'>
                <label>Telefone</label>
                <input
                    type='tel'
                    value={formData.phone}
                    onChange={handleChange}
                    name="phone"
                    placeholder="Digite seu telefone"
                />
            </div>

            <div className='text_field'>
                <label>Email</label>
                <input
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    placeholder="Digite seu email"
                />
            </div>
            <Button text='Criar contato'/>
        </form>

    )
}

export default FormContact;