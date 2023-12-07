import React from "react";

import styles from "./Header.module.css"
const Header= ( )=>{
    return(
        <header className={styles.header}>
                <img src="ERAS-hair.png" width="166,5" height="93,75" />
          {/* <h1>Cadastro servico</h1> */}
        </header>
    );
}


export default Header;