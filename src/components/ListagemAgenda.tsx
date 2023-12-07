import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from "../App.module.css"
import { AgendaInterface } from '../Interfaces/AgendaInterface';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { cadastroProfissionalInterface } from '../Interfaces/CadastroProfissional';
import Header from './HeaderServico';
import Swal from 'sweetalert2';
import Footer from './FooterServico';

const ListagemAgenda = () => {

    const [agendas, setAgendas] = useState<AgendaInterface[]>([]);
    const [profissionais, setProfissionais] = useState<cadastroProfissionalInterface[]>([]);

    const [pesquisa, setPesquisa] = useState<string>('');
    const [profissional, setProfissional] = useState<string>('');

    const [error, setError] = useState("");

    const hadleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }

    const hadleStateSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        //console.log(e.target)
        //if (e.target.name === "selectProfissional") {
            setProfissional(e.target.value);
        //}
    }

    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {
                console.log(profissional)
                console.log(pesquisa)
                const response = await axios.post('http://127.0.0.1:8000/api/procurarAgenda',
                    {
                        profissional_id: profissional,
                        data_hora: pesquisa
                    },
                    {
                        headers: {
                            "Accept": "application/json",
                            "content-Type": "aplication/json"
                        }
                    }).then(function (response) {
                        console.log(response);
                        if (response.data.status == true) {
                            setAgendas(response.data.data);
                        }
                        else {
                            setAgendas([]);
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

    const excluir = (id: number)=>{
        async function fetchData(){
            try{
                const response = await axios.delete('http://127.0.0.1:8000/api/excluirAgenda/'+ id);
                if(response.data.status === true){

                    const response = await axios.get('http://127.0.0.1:8000/api/retornarTodosAgenda/');
                    setAgendas(response.data.data);
                   
                }
                else{
                    console.log(error);
                }
            }catch(error){
                setError("ocorreu um erro");
                console.log(error);
            }

        }
        fetchData();
    }

    const confirmacao = (id: number) => {
        Swal.fire({
            title: "Tem certeza que quer excluir?",
            text: "Você não vai poder reverter isso depois!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir"
        }).then((result) => {
            if (result.isConfirmed) {

                excluir(id);

                Swal.fire({
                    title: "Excluido com sucesso!",
                    text: "seu cadastro foi excluido.",
                    icon: "success"


                });

            }

        });

    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/profissional/retornarTodos');
                setProfissionais(response.data.data);


            } catch (error) {
                setError("Ocorreu um erro");
                console.log(error);

            }

        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/retornarTodosAgenda/');
                setAgendas(response.data.data);


            } catch (error) {
                setError("Ocorreu um erro");
                console.log(error);

            }

        }

        fetchData();
    }, []);

    return (
        <div>
             <nav className=" bg-white">
                <ul className="nav nav-tabs">

                <li className="nav-item dropdown btn-warning">
                        <a className="nav-link dropdown-toggle text-dark" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Cadastros</a>
                        <ul className="dropdown-menu">
                            <li><Link to={"/CadastroServico"} className="dropdown-item" >Cadastro Serviço</Link></li>
                            <li><Link to={"/cadastroProfissional"} className="dropdown-item">Cadastro Profissional</Link></li>
                            <li><Link to={"/CadastroCliente"} className="dropdown-item">Cadastro Cliente</Link></li>

                        </ul>
                    </li>



                    <li className="nav-item dropdown btn-warning">
                        <a className="nav-link dropdown-toggle text-dark" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Listagens</a>
                        <ul className="dropdown-menu">
                            <li><Link to={"/ListagemProfissional"} className="dropdown-item" >Listagem Profissional</Link></li>
                            <li><Link to={"/ListagemCliente"} className="dropdown-item">Listagem Cliente</Link></li>
                            <li><Link to={"/ListagemServico"} className="dropdown-item">Listagem Serviço</Link></li>


                        </ul>
                    </li>

                    


                </ul>

            </nav>
            <Header />
            <main className={styles.main}>
                <div className='container'>

                    <div className='col-md mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Pesquisar</h5>
                                <form onSubmit={buscar} className='row'>
                                    <div className='col-5'>
                                        <select name="selectProfissional" value={profissional} onChange={hadleStateSelect} >
                                            <option selected value="0">Selecione um Profissional</option>
                                            {profissionais.map(profissional => (
                                                <option value={profissional.id}>{profissional.nome}</option>
                                            ))}

                                        </select>

                                    </div>
                                    <div className='col-5'>
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
                                Listagem Agenda
                            </h5>
                            <table className='table table-hover table-bordered border-dark border border-success p-2 mb-2 border-opacity-25 '>
                                <thead>
                                    <tr>
                                        {/* <th>ID</th> */}
                                        <th>profisional_id</th>
                                        <th>data_hora</th>
                                        <th>Ações</th>

                                    </tr>


                                </thead>
                                <tbody>
                                    {agendas.map(agendas => (
                                        <tr key={agendas.id}>
                                            <td>{agendas.profissional_id}</td>
                                            <td>{agendas.data_hora}</td>
                                            <td>
                                            <button onClick={()=> confirmacao(agendas.id)} className='btn btn-danger btn-sm'>Excluir</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </main>
            <Footer />
        </div>
    );
}

export default ListagemAgenda;