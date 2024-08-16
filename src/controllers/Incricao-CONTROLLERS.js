import conn from "../config/conn.js";
import {v4 as uuidv4} from "uuid"


export const criarInscricao = (request, response) => {
    const {participanteId, eventoId} = request.body;


    if(!participanteId){
        response.status(400).json({err: "O Id do pparticipante é obrigatório"})
        return;
    }

    if(!eventoId){
        response.status(400).json({err: "O Id do evento é obrigatório"})
        return;
    }


    //se existir um evento 
    const checkSQL = `SELECT * FROM inscricao WHERE ?? = ? AND ?? = ?`

    const DatacheckSQL = ["participante_id", participanteId, "evento_id", eventoId]

    conn.query(checkSQL, DatacheckSQL, (err, data) => {
        if (err) {
            response.status(500).json({ err: "Erro ao buscar inscricao" })
            return;
        }

        if (data.length > 0) {
            response.status(409).json({ err: "Inscricao já existe" })
            return;
        }
        });

        const id = uuidv4()

        const insertSql = `INSERT INTO inscricao(??,??,??) VALUES(?,?,?)`
        const DataInsertSQL = ["id_inscricao","participante_id","evento_id",id ,participanteId, eventoId]
    
            conn.query(insertSql, DataInsertSQL, (err) => {
                if (err) {
                    response.status(500).json({ message: "Erro ao inserir dados" });
                }
                response.status(201).json({ message: "Inscricao criado com sucesso ✨ " })
            })
}
