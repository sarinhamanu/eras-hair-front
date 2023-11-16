import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from "../App.module.css"
import { cadastroProfissionalInterface } from '../Interfaces/CadastroProfissional';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListagemProfissional = () => {

    const [Profissionals, setProfissionals] = useState<cadastroProfissionalInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [error, setError] = useState("");

    const hadleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }

    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/Profissional/procurarNome',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "content-Type": "aplication/json"
                        }
                    }).then(function (response) {
                        console.log(response);
                        if (response.data.status == true) {
                            setProfissionals(response.data.data);
                        }
                        else {
                            setProfissionals([]);
                        }

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
                const response = await axios.get('http://127.0.0.1:8000/api/Profissional/retornarTodos');
                setProfissionals(response.data.data);


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
                                <form onSubmit={buscar} className='row'>
                                    <div className='col-10'>
                                        <input type="text" name='pesquisa' className='form-control' onChange={hadleState} />
                                    </div>

                                    <div className='col-1'>
                                        <button type='submit'
                                            className='btn btn-success'>Pesquisar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>
                                Listagem de Profissionals
                            </h5>
                            <table className='table table-hover table-bordered border-dark border border-success p-2 mb-2 border-opacity-25 '>
                                <thead>
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>Nome</th>
                                        <th>celular</th>
                                        <th>email</th>
                                        <th>cpf</th>
                                        {/* <th>dataNascimento</th> */}
                                        <th>cidade</th>
                                        {/* <th>estado</th> */}
                                        {/* <th>pais</th> */}
                                        {/* <th>rua</th> */}
                                        {/* <th>numero</th> */}
                                        {/* <th>bairro</th> */}
                                        {/* <th>cep</th> */}
                                        {/* <th>complemento</th> */}
                                        {/* <th>senha</th> */}
                                        <th>salario</th>
                                    </tr>


                                </thead>
                                <tbody>
                                    {Profissionals.map(Profissional => (
                                        <tr key={Profissional.id}>
                                            {/* <td>{Profissionals.id}</td> */}
                                            <td>{Profissional.nome}</td>
                                            <td>{Profissional.celular}</td>
                                            <td>{Profissional.email}</td>
                                            <td>{Profissional.cpf}</td>
                                            {/* <td>{Profissionals.dataNascimento}</td> */}
                                            <td>{Profissional.cidade}</td>
                                            {/* <td>{Profissional.estado}</td> */}
                                            {/* <td>{Profissional.pais}</td> */}
                                            {/* <td>{Profissional.rua}</td> */}
                                            {/* <td>{Profissional.numero}</td> */}
                                            {/* <td>{Profissional.bairro}</td> */}
                                            {/* <td>{Profissional.cep}</td> */}
                                            {/* <td>{Profissional.complemento}</td> */}
                                            {/* <td>{Profissional.senha}</td> */}
                                            <td>{Profissional.salario}</td>
                                            <td>
                                                <Link to={"/editarProfissional/" + Profissional.id} className='btn btn-primary btn-sm'>Editar</Link>
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

export default ListagemProfissional;