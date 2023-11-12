import { useState } from "react"
import { Link } from "react-router-dom"

export function Login(){
    const [ data, setData] = useState([]);
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    console.log(data);

    const validarLogin = () => {
        
        const dataForm = {
            email, senha
        }
        console.log(dataForm)
    }

    return(
        <>
            <input type="text" placeholder="email" name={email} onChange={ e => setEmail(e.target.value) } value={email} />
            <input type="text" placeholder="senha" name={senha} onChange={ e => setSenha(e.target.value) } value={senha} />
            
            <Link to={ `/home/${email}` }  >
                <button onClick={validarLogin}>Entrar</button>
            </Link>
        </>
    )
}