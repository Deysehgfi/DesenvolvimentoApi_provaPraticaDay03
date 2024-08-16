import conn from "../config/conn.js"

const tableParticipante = `
    CREATE TABLE IF NOT EXISTS participantes (
        id_participante varchar(60) primary key not null,
        nome varchar(255) not null,
        email varchar(255) not null
    );
`
conn.query(tableParticipante, (err) => {
    if (err) {
        console.error("error ao criar a tabela participantes")
        return;
    }
    console.log("Tabela [ participantes ] criada com sucesso")
})