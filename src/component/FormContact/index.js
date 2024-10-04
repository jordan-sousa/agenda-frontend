import './FormContact.css'
import { useState } from 'react'
import Button from '../Button'

const FormContact = () => {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    })

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8080/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if(response.ok) {
                setSuccess('Contato criado com sucesso!');
                setError(null);
                setFormData({
                    name: '',
                    phone: '',
                    email: ''
                });
            }else {
                const errorData = await response.json();
                setError(errorData.message || 'Erro ao criar contato');
            }
        }catch (error) {
            console.error('Erro ao criar contato:', error);
            setError('Erro de comunicação com o servidor');
        }
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
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}
            <Button text='Criar contato'/>
        </form>

    )
}

export default FormContact;