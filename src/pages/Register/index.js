import { useState } from 'react';
import Button from '../../component/Button';
import TextField from '../../component/TextField';
import './Register.css'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        login: '',
        password: ''
    });

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
        console.log('Dados do form', formData);
    
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const contentType = response.headers.get('content-type');
            if (response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    
                    setSuccess('Usuário cadastrado com sucesso!');
                    setError(null);
                    navigate("/");
                    console.log('Dados retornados do backend: ', data);
                } else {
                    const textData = await response.text();
                    console.log('Resposta de texto do backend:', textData);
                    setSuccess('Usuário cadastrado com sucesso!');
                }
            } else {
                const errorMessage = contentType && contentType.includes('application/json') 
                    ? await response.json() 
                    : await response.text();
                setError(`Erro ao cadastrar usuário: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Erro na requisição', error);
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

            <Button text='Cadastrar' />
            <p>ou</p>
            <div>
                <a href='/'>Logar</a>
            </div>
        </form>
    )
}

export default Register;