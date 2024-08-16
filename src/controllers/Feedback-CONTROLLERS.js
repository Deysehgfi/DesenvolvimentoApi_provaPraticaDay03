import conn from "../config/conn.js"
import { v4 as uuidv4 } from "uuid"




export const criarFeedback = (request, response) => {
    const { nota, comentario, participanteId, eventoId} = request.body;

    if (!nota) {
        response.status(400).json({ err: "A nota do feedback  é obrigatória" })
        return;
    }

    if (!comentario) {
        response.status(400).json({ err: "O comentario pro feedback é obrigatório" })
        return;
    }

    if (!participanteId) {
        response.status(400).json({ err: "O Id do participantes é obrigatório" })
        return;
    }

    if (!eventoId) {
        response.status(400).json({ err: "O Id do evento é obrigatório" })
        return;
    }


    const checkSQL = `SELECT * FROM feedback WHERE ?? = ? AND ?? = ?`

    const DatacheckSQL = ["participante_id", participanteId, "evento_id", eventoId]

    conn.query(checkSQL, DatacheckSQL, (err, data) => {
        if (err) {
            response.status(500).json({ err: "Erro ao buscar feedback" })
            return console.error(err)
        }

        if (data.length > 0) {
            response.status(409).json({ err: "Feedback já existe" })
            return;
        }
    });

    const id = uuidv4()

    const insertSql = `INSERT INTO feedback(??,??,??,??,??) VALUES(?,?,?,?,?)`
    const DataInsertSQL = ["id_feedback", "nota", "cometario", "participante_id","evento_id", id, nota, comentario, participanteId, eventoId]

    conn.query(insertSql, DataInsertSQL, (err) => {
        if (err) {
            response.status(500).json({err: "Erro ao inserir dados" });
            return;
        }
        response.status(201).json({ message: "Feedback criado com sucesso ✨"})
    })
}