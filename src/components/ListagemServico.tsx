import  React, {
    Component, useState,
    ChangeEvent, FormEvent, useEffect 
 } from 'react';
import styles from "../App.module.css"
import  {cadastroServicoInterface} from '../Interfaces/CadastroServicoInterFace'
import axios from 'axios';

const ListagemServico = () => {

    const [servicos, setServicos] = useState<cadastroServicoInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [error, setError] = useState("");

    const hadleState =(e: ChangeEvent<HTMLInputElement>)=>{
        if(e.target.name === "pesquisa"){
            setPesquisa(e.target.value);
        }
    }

    const buscar = (e:FormEvent)=>{
        e.preventDefault();

        async function fetchData(){
            try{
                const response = await axios.post('http://127.0.0.1:8000/api/nome',
                {nome:pesquisa},
                {
                    headers:{
                        "Accept":"application/json",
                        "content-Type":"aplication/json"
                    }
                }).then(function(response){
                    setServicos(response.data.data);
                }).catch(function(error){
                    console.log(error);
                });

            }catch(error){
                console.log(error);
            }
        }
        fetchData();
    }
    useEffect(() =>{
        async function fetchData(){
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/servico/retornarTodos');
                setServicos(response.data.data);
                

            }catch(error){
                setError("Ocorreu um erro");
                console.log(error);

            }

        }

        fetchData();
    }, []);
    return(
        <div>
            <main className={styles.main}>
                <div className='container'>

                    <div className='col-md mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Pesquisar</h5>
                                <form onSubmit={buscar}className='row'>
                                    <div className='col-10'>
                                        <input type="text" name='pesquisa' className='form-control' onChange={hadleState}/>
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
                                Listagem de Serviços
                            </h5>
                            <table className='table table-hover table-bordered border-dark border border-success p-2 mb-2 border-opacity-25'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Duração</th>
                                        <th>Preço</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicos.map(servicos =>(
                                    <tr key={servicos.id}>
                                        <td>{servicos.id}</td>
                                        <td>{servicos.nome}</td>
                                        <td>{servicos.descricao}</td>
                                        <td>{servicos.duracao}</td>
                                        <td>{servicos.preco}</td>
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

export default ListagemServico;