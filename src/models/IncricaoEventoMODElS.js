import conn from "../config/conn.js"

const tableEventos = `
    CREATE TABLE IF NOT EXISTS inscricao (
        id_inscricao varchar(60) primary key not null,
        participante_id varchar(60) not null,
        evento_id varchar(60) not null,
        foreign key (participante_id) references participantes(id_participante),
        foreign key (evento_id) references eventos(id_evento)
    );
`
conn.query(tableEventos, (err) => {
    if (err) {
        console.error("error ao criar a tabela inscricao")
        return;
    }
    console.log("Tabela [ inscricao ] criada com sucesso")
})