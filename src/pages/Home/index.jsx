import './styles.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export function Home( ) {
    // console.log( props.email )
    const [ data, setData] = useState([]);

    /***  Pegando dados da url */
    let { name } = useParams();

    const [ id, setId ]   = useState("")
    const [ nome, setNome ]   = useState("")
    const [ email, setEmail ] = useState("")
    const [ senha, setSenha ] = useState("")

    const [ classBtnInserir, setClassBtnInserir] = useState('');
    const [ classBtnAlterar, setClassBtnAlterar] = useState('sumir');

    /** Metodo Carregar dados  */
    useEffect( () => {
        axios.get('http://localhost:2020/users?_sort=nome')
          .then(response => setData(response.data));
    }, [data]);

    /** Metodo Inser  */
    const Inserir = (e) => {
        e.preventDefault()

        axios.post("http://localhost:2020/users", {
            nome,
            email,
            senha
        })

        .then( () => {
                alert(nome + " Cadastrado com sucesso")
                setNome(''), setEmail(''), setSenha('')
            }
        )

        .catch( (error) => {
            console.log('erro: ' + error)
        })
    
    }

    /** Metodo Remover  */
    const Remover =(id, nome) => {
        const res = window.confirm('Deseja realmente excluir? ' + nome)
        if(res === true){
            axios.delete(`http://localhost:2020/users/${id}`)
            return false
        }
    }

    /** Metodo Carregar campos para editar  */
    const CarregaCampos = (nome, email, senha, id) => {
            setClassBtnInserir('sumir')
            setClassBtnAlterar('')

        setNome(nome), setEmail(email), setSenha(senha), setId(id)
    }

    /** Metodo Alterar  */
    function Alterar(e){
        e.preventDefault()

        axios.put(`http://localhost:2020/users/${id}`, {
            nome,
            email,
            senha
        })
        .then( () => {
                alert(nome + " Atualizado com sucesso");
                
                setNome(''), setEmail(''), setSenha(''), setId('');

                setClassBtnInserir('')
                setClassBtnAlterar('sumir')
            }
        )
        .catch( (error) => {
            console.log('erro: ' + error)
        })
    }

    /** View */
    return(
        <div className="container">
            <h3 className='header'>Bem vindo, { name }</h3>
            <h1 className="mt-5 mb-5">Controle de Usuários  </h1>
            
            <form className="mb-5">

                <div className="row mb-2">
                        <div className="col">
                            <label>Nome</label>
                            <input type="text" className="inputs form-control" value={nome} onChange={ e => setNome(e.target.value)} />
                        </div>
                        <div className="col">
                            <label>E-mail</label>
                            <input type="text" className="inputs form-control" value={email} onChange={ e => setEmail(e.target.value)} />
                        </div>
                        <div className="col">
                            <label>Senha</label>
                            <input type="password" className="inputs form-control" value={senha} onChange={ e => setSenha(e.target.value)} />
                        </div>
                </div>

                <input type="hidden" value={id} name="id" onChange={ e => setId(e.target.value)} />

                    <button className={`btn btn-primary ${classBtnInserir}`} onClick={Inserir}>Inserir</button>
                    <button className={`btn btn-warning ml-3 ${classBtnAlterar}`} onClick={Alterar}>Editar</button>
            </form>

            <div className="fixTableHead">

                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th hidden>Senha</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        { data.map((item) => (
                            <tr key={item.id}>
                                <td >{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.email}</td>
                                <td hidden>{item.senha}</td>
                                <td className="fild-btn">
                                    <button onClick={ () => CarregaCampos(item.nome, item.email, item.senha, item.id) } className="btn btn-outline-warning">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </button>
                                    <button onClick={ () => Remover(item.id, item.nome) }  className="btn btn-outline-danger">
                                        <i className="fa-regular fa-trash-can">
                                    </i></button>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}