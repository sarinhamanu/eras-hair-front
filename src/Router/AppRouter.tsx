import  React from "react";

import {
    BrowserRouter,
    Route,
    Routes
 } from "react-router-dom";
 

import Cadastro from "../components/CadastroServico";
import Listagem from "../components/ListagemServico";

    const AppRouter =() => {
        return(
            <BrowserRouter>
            <Routes>
              
                 <Route path="cadastroServico" element={<Cadastro/>}/>    
                 <Route path="ListagemServico" element={<Listagem/>}/>        
               </Routes>
            </BrowserRouter>
        )
    }

    export default AppRouter;