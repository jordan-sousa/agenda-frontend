import { useState } from 'react';
import './ContactItem.css'


const ContactItem = ({ contact, onEdit, onDelete }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState(contact);

    const saveEdit = () => {
        onEdit(contact.id, editedContact);
        setIsEditing(false);
    };

    return (
        <div className="contact-item">
            {isEditing ? (
                <>
                    <section>
                        <input
                            type="text"
                            value={editedContact.name}
                            onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })}
                        />
                        <input
                            type="email"
                            value={editedContact.email}
                            onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })}
                        />
                        <input
                            type="tel"
                            value={editedContact.phone}
                            onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })}
                        />
                        <button onClick={saveEdit}>Salvar</button>
                    </section>
                </>
            ) : (
                <>
                    <section>
                        <ul>
                            <li>
                                <span>
                                    <img src={process.env.PUBLIC_URL + '/icon-contact.png'} alt="Icone de contato" style={{ width: '20px', marginRight: '8px' }} /> 
                                    {contact.name}
                                </span>
                            </li>
                            <li>
                                <img src={process.env.PUBLIC_URL + '/icon-phone.png'} alt="Icone telefone" style={{ width: '20px', marginRight: '8px' }} />
                                <span>
                                    {contact.email}
                                </span>
                            </li>
                            <li>
                                <span>
                                    <img src={process.env.PUBLIC_URL + '/icon-email.png'} alt="Icone email" style={{ width: '20px', marginRight: '8px' }} />
                                    {contact.phone}
                                </span>
                            </li>
                        </ul>
                        <div>
                            <button onClick={() => setIsEditing(true)}>Editar</button>
                            <button onClick={() => onDelete(contact.id)}>Excluir</button>
                        </div>
                    </section>
                </>
            )}
        </div>
    )
}

export default ContactItem;