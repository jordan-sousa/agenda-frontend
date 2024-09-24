import { useState } from 'react';
import Button from '../../component/Button';
import TextField from '../../component/TextField';
import './Register.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate(); 

    // if (this.props.au) {
    //     return <Navigate to={{ pathname: "/", state: { from: location }}} />;
    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Dados do form', formData);

        try {
            const response = await fetch('http://localhost:8080/login/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                
                setSuccess('Usuario cadastrado com sucesso!');
                setError(null);
                navigate("/");
                console.log('Dados retornado do backend: ', data);
            } else {
                setError('Erro ao cadastrar usuario')
            }
        } catch (error) {
            console.error('Erro na requisiçao', error);
            setError('Erro com o servidor');
        }

    }

    return (
        <form onSubmit={handleSubmit} className='form_register'>
            <h1>Cadastre-se</h1>

            <TextField
                type='text'
                placeholder="Digite seu nome"
                name="name"
                onChange={handleChange}
                value={formData.name}
            />

            <TextField
                type='email'
                placeholder="Digite seu email"
                name="email"
                onChange={handleChange}
                value={formData.email}
            />

            <TextField
                type='password'
                placeholder="Digite sua senha"
                name="password"
                onChange={handleChange}
                value={formData.password}
            />

            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}

            <Button text='Cadastrar' />
            <p>ou</p>
            <div>
                <a href='/'>Logar</a>
            </div>
        </form>
    )
}

export default Register;