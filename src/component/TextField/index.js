import './TextField.css'

const TextField = ({ label, type = 'text', value, onChange, placeholder, name }) => {


    return(
        <div className='text_field'>
            <label>{label}</label>
            <input 
                value={value} 
                type={type} 
                onChange={onChange} 
                placeholder={placeholder}
                name={name}
            />
        </div>
    )
}

export default TextField;
