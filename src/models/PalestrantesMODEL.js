import conn from "../config/conn.js"

const tablePalestrante = `
    CREATE TABLE IF NOT EXISTS palestrantes (
        id_palestrante varchar(60) primary key not null,
        nome varchar(255) not null,
        expertise varchar(255) not null
    );
`
conn.query(tablePalestrante, (err) => {
    if (err) {
        console.error("error ao criar a tabela palestrantes")
        return;
    }
    console.log("Tabela [ palestrantes ] criada com sucesso")
})