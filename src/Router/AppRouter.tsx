import React from "react";

import {
    BrowserRouter,Route,Routes
}from "react-router-dom";
import CadastroServico from "../components/CadastroServico";
import ListagemServico from "../components/ListagemServico";
import CadastroCliente from "../components/CadastroCliente";
import ListagemCliente from "../components/ListagemCliente";
import CadastroProfissional from "../components/CadastroCliente";
import ListagemProfissional from "../components/ListagemProfissional";



const AppRouter = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="cadastroServico" element={<CadastroServico/>}/>
            <Route path="listagemServico" element={<ListagemServico/>}/>
            <Route path="cadastroCliente" element={<CadastroCliente/>}/>
            <Route path="listagemCliente" element={<ListagemCliente/>}/>
             <Route path="cadastroProfissional" element={<CadastroProfissional/>}/> 
             <Route path="listagemProfissional" element={<ListagemProfissional/>}/> 
            
          </Routes>
        </BrowserRouter>

    );

}

export default AppRouter;