import { useState, useEffect } from 'react';
import './ContactItem.css';

const ContactItem = ({ contact, onEdit, onDelete }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState({
        name: contact.name || '',
        phone: contact.phone || ''
    });
    const[error, setError] = useState(null);
    
    useEffect(() => {
        setEditedContact({
            name: contact.name || '',
            phone: contact.phone || ''
        });
    }, [contact]);

    if(!contact) {
        return <div> Carregando ...</div>;
    }

    const saveEdit = async () => {
        if(!editedContact.name || !editedContact.phone) {
            setError("Todos os campos devem ser preenchidas");
            return;
        }

        setError(null);
        const token = localStorage.getItem('token');

        try{
            const response = await fetch(`http://localhost:8080/contacts/${contact.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editedContact)
            });

            if(response.ok) {
                const updatedContact = await response.json();
                onEdit(contact.id, updatedContact);

                setIsEditing(false);
            } else{
                const errorData = await response.json();
                setError(`Falha ao atualizar o contato: ${errorData.message || 'Erro desconhecido'}`);
            }
        } catch(err) {
            setError('Erro de conexão com o servidor.');
        }
    };

    const cancelEdit = () => {
        setEditedContact(contact);
        setIsEditing(false);
    };

    const handleDelete = async () => {

        const token = localStorage.getItem('token');

        try{
            const response = await fetch(`http://localhost:8080/contacts/${contact.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if(response.ok) {
                onDelete(contact.id);
            } else{
                setError('Falhar ao excluir contato!');
            }
        } catch(err) {
            setError('Erro de conexão com o servidor.');
        }
    };

    return (
        <div className="contact-item">
            {isEditing ? (
                <section>
                    <input
                        type="text"
                        className='input_edit'
                        value={editedContact.name}
                        onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })}
                    />

                    <input
                        type="tel"
                        className='input_edit'
                        value={editedContact.phone}
                        onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })}
                    />

                    <div className='box_button_edit'>
                        <button onClick={saveEdit}>Salvar</button>
                        <button onClick={cancelEdit}>Cancelar</button>
                    </div>
                </section>
            ) : (
                <section>
                    <ul>
                        <li>
                            <span>
                                <img src={process.env.PUBLIC_URL + '/icon-contact.png'} alt="Ícone de contato" style={{ width: '20px', marginRight: '8px' }} />
                                {contact.name}
                            </span>
                        </li>
                        <li>
                            <img src={process.env.PUBLIC_URL + '/icon-email.png'} alt="Ícone email" style={{ width: '20px', marginRight: '8px' }} />
                            <span>{contact.email}</span>
                        </li>
                        <li>
                            <img src={process.env.PUBLIC_URL + '/icon-phone.png'} alt="Ícone telefone" style={{ width: '20px', marginRight: '8px' }} />
                            <span>{contact.phone}</span>
                        </li>
                    </ul>
                    <div className='box_edit_delet'>
                        <button onClick={() => setIsEditing(true)}>Editar</button>
                        <button className='button_delet' onClick={handleDelete}>Excluir</button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ContactItem;
