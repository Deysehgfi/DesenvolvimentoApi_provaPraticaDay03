import conn from "../config/conn.js"

const tableFeedBack = `
    CREATE TABLE IF NOT EXISTS feedback (
        id_feedback varchar(60) primary key not null,
        nota int not null,
        cometario varchar(500) not null,
        participante_id varchar(60) not null,
        evento_id varchar(60) not null,
        foreign key (participante_id) references participantes(id_participante),
        foreign key (evento_id) references eventos(id_evento)
    );
`
conn.query(tableFeedBack, (err) => {
    if (err) {
        console.error("error ao criar a tabela feedback")
        return;
    }
    console.log("Tabela [ feedback ] criada com sucesso")
})