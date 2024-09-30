import { useState } from 'react';
import Button from '../../component/Button';
import TextField from '../../component/TextField';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });
// console.log(formData);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.login || !formData.password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                
                localStorage.setItem('token', data.token);
                setSuccess('Login realizado com sucesso!');
                setError(null);
                navigate("/contacts"); 
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Erro ao realizar login'); 
            }
        
        } catch (error) {
            console.error('Erro na requisição', error);
            setError('Erro de comunicação com o servidor'); 
        }
    }

    return (
        <form className='form_login' onSubmit={handleSubmit}>
            <h1>Faça login em sua conta</h1>
            <TextField
                type='email'
                placeholder="Digite seu email"
                name="login"
                onChange={handleChange}
                value={formData.login}
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

            <Button text='Entrar' />

            <div>
                <p>Esqueceu sua senha?</p>
                <p>Ainda não tem conta?</p>
                <a href="/register">Faça seu cadastro!</a>
            </div>
        </form>
    );
};

export default Login;
