import React from "react";

import {
    BrowserRouter,Route,Routes
}from "react-router-dom";
import CadastroServico from "../components/CadastroServico";
import ListagemServico from "../components/ListagemServico";
import CadastroCliente from "../components/CadastroCliente";
import ListagemCliente from "../components/ListagemCliente";
import CadastroProfissional from "../components/CadatroProfissional";
import ListagemProfissional from "../components/ListagemProfissional";
import EditarSevico from "../components/EditarServico";
import EditarCliente from "../components/EditarCliente";
import EditarProfissional from "../components/EditarProfissional";



const AppRouter = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="cadastroServico" element={<CadastroServico/>}/>
            <Route path="listagemServico" element={<ListagemServico/>}/>
            <Route path="/editarServico/:id" element={<EditarSevico/>}/>
            <Route path="cadastroCliente" element={<CadastroCliente/>}/>
            <Route path="listagemCliente" element={<ListagemCliente/>}/>
            <Route path="/editarCliente/:id" element={<EditarCliente/>}/>
            <Route path="cadastroProfissional" element={<CadastroProfissional/>}/> 
            <Route path="listagemProfissional" element={<ListagemProfissional/>}/> 
            <Route path="/editarProfissional/:id" element={<EditarProfissional/>}/>
            
          </Routes>
        </BrowserRouter>

    );

}

export default AppRouter;