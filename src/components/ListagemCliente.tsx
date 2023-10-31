import React,{ Component, useState,ChangeEvent,FormEvent, useEffect}from'react';
import styles from "../App.module.css";
import { cadastroClienteInterface } from '../Interfaces/CadastroClienteInterface';
import axios from 'axios';

const ListagemClientes= () => {

    const [clientes, setClientes] = useState<cadastroClienteInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [error, setError] = useState("");

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }


    }
    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/cliente/procurarNome',
                    { nome: pesquisa },
                    {

                        headers: {
                            "Accept": "application/json",
                            "content-Type": "aplication/json"
                        }
                    }).then(function (response) {
                        setClientes(response.data.data);
                    }).catch(function (error) {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cliente/retornarTodos');
                setClientes(response.data.data);


            } catch (error) {
                setError("Ocorreu um erro");
                console.log(error);

            }

        }

        fetchData();
    }, []);
    return (
        <div>
            <main className={styles.main}>
                <div className='container'>

                    <div className='col-md mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Pesquisar</h5>
                                <form onSubmit={buscar} className="row"  >
                                    <div className='col-10'>
                                        <input type="text" name='pesquisa'
                                            className='form-control' onChange={handleState} />
                                    </div>
                                    <div className='col-1'>
                                        <button type='submit' className='btn btn-success'>Pesquisar</button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>
                                Listagem de Servicos
                            </h5>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>celular</th>
                                        <th>email</th>
                                        <th>cpf</th>
                                        <th>dataNascimento</th>
                                        <th>cidade</th>
                                        <th>estado</th>
                                        <th>pais</th>
                                        <th>numero</th>
                                        <th>bairro</th>
                                        <th>cep</th>
                                        <th>complemento</th>
                                      
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map(clientes=> (
                                        <tr key={clientes.id}>
                                            <td>{clientes.id}</td>
                                            <td>{clientes.nome}</td>
                                            <td>{clientes.celular}</td>
                                            <td>{clientes.email}</td>
                                            <td>{clientes.cpf}</td>
                                            <td>{clientes.dataNascimento}</td>
                                            <td>{clientes.cidade}</td>
                                            <td>{clientes.estado}</td>
                                            <td>{clientes.pais}</td>
                                            <td>{clientes.numero}</td>
                                            <td>{clientes.bairro}</td>
                                            <td>{clientes.cep}</td>
                                            <td>{clientes.complemento}</td>
                                            <td>{clientes.senha}</td>
                                            <td>
                                                <a href="#" className='btn btn-primary btn-sm'>Editar</a>
                                                <a href="#" className='btn btn-danger btn-sm'>Excluir</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}

export default ListagemClientes;