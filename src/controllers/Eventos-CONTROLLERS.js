import conn from "../config/conn.js"
import { v4 as uuidv4 } from "uuid"




export const getTodosEventos = (request, response) => {

    const getsql = `SELECT * FROM eventos`

    conn.query(getsql, (err, data) => {
        if (err) {
            response.status(500).json({ message: "Erro ao buscar eventos" })
            return;
        }
        const eventos = data
        response.status(200).json(eventos)
    })
}

export const criarEvento = (request, response) => {
    const { titulo, data, palestranteId } = request.body;

    if (!titulo) {
        response.status(400).json({ err: "O titulo do evento é obrigatório" })
        return;
    }

    if (!data) {
        response.status(400).json({ err: "A data do evento é obrigatório" })
        return;
    }

    if (!palestranteId) {
        response.status(400).json({ err: "O Id do palestrante é obrigatório" })
        return;
    }


    //se existir um evento 
    const checkSQL = `SELECT * FROM eventos WHERE ?? = ? AND ?? = ?`

    const DatacheckSQL = ["titulo", titulo, "data", data]

    conn.query(checkSQL, DatacheckSQL, (err, data) => {
        if (err) {
            response.status(500).json({ err: "Erro ao buscar evento" })
            return;
        }

        if (data.length > 0) {
            response.status(409).json({ err: "Evento já existe" })
            return
        }
    });

    const id = uuidv4()

    const insertSql = `INSERT INTO eventos(??,??,??,??) VALUES(?,?,?,?)`
    const DataInsertSQL = ["id_evento", "titulo", "data", "palestrante_id", id, titulo, data, palestranteId]

    conn.query(insertSql, DataInsertSQL, (err) => {
        if (err) {
            response.status(500).json({ message: "Erro ao inserir dados" });
        }
        response.status(201).json({ message: "Evento criado com sucesso ✨ " })
    })
}

export const listarEvento = (request, response) => {
    const { id } = request.params

    const sql = `SELECT eventos.titulo, palestrantes.nome, palestrantes.expertise  FROM eventos INNER JOIN palestrantes ON eventos.palestrante_id = palestrantes.id_palestrante WHERE id_evento = "${id}"`

    const getsql = `SELECT * FROM eventos WHERE id_evento = SELECT * FROM eventos WHERE id_evento = "${id}"`

    
    conn.query(sql, getsql, (err, dataPalestrante) => {
        if (err) {
            console.error(err)
            response.status(500).json({ message: "Erro ao buscar eventos" })
            return;
        }

        if (dataPalestrante.length === 0) {
            response.status(404).json({ message: "evento não encontrado" })
        }

        const palestrante = dataPalestrante
        response.status(200).json(palestrante)
    })
    console.log(sql)
}

export const editarEvento = (request, response) => {
    // const { id } = request.params

    const { eventoId, titulo, dataEvento, palestranteId } = request.body


    if (!eventoId) {
        response.status(400).json({ err: "O id do Evento que deseja atualizar é obrigatório" })
        return;
    }

    if (!titulo) {
        response.status(400).json({ err: 'O titulo do evento é obrigatório' })
        return;
    }
    if (!dataEvento) {
        response.status(400).json({ err: 'A data do evento é obrigatória' })
        return;
    }
    if (!palestranteId) {
        response.status(400).json({ err: 'O id do palestrante do evento é obrigatório' })
        return;
    }

    const checkSql = /*sql */ `SELECT * FROM eventos WHERE ?? = ?`

    const DatacheckSQL = ["id_evento", eventoId]


    conn.query(checkSql, DatacheckSQL, (err, data) => {
        if (err) {
            response.status(500).json({ err: "Erro ao buscar evento" })
            return;
        }

        if (data.length === 0) {
            response.status(404).json({ err: "evento não encontrada" })
            return;
        }

        const updateSql = /*sql */ `UPDATE eventos SET ?? = ? , ?? = ?, ?? = ? WHERE ?? = ?`

        const DataUpdateSql = ["titulo", titulo, "data", dataEvento, "palestrante_id", palestranteId, "id_evento", eventoId]

        conn.query(updateSql, DataUpdateSql, (err) => {
            if (err) {

                response.status(500).json({ err: "Erro ao atualizar evento" })
                return;
            }

            response.status(200).json({ message: "evento atualizado" })
        })
    })
}

export const cancelarEvento = (request, response) => {
    const { eventoId } = request.body;

    if (!eventoId) {
        response.status(400).json({ err: "O id do evento que deseja cancelar é obrigatório" })
        return;
    }

    const deleteSql = `DELETE FROM eventos WHERE ?? = ?`

    const DataDeleteSQL = ["id_evento", eventoId]

    conn.query(deleteSql, DataDeleteSQL, (err, info) => {
        if (err) {
            response.status(500).json({ message: "Erro ao deletar evento " })
            return
        }
        console.log(info)

        if (info.affectedRows === 0) {
            response.status(404).json({ message: "Evento não encontrado" })
            return
        }


        response.status(200).json({ message: "O evento selecionado foi deletado" })
    })
}


export const getEventoPopular = (request, response) => {

    const checkSQL = `SELECT participante_id , COUNT(*) FROM inscricao GROUP BY participante_id ORDER BY COUNT(*) DESC;`
    
    
    conn.query(checkSQL, (err, data) => {
        if(!err){
            response.status(500).json({err: "erro ao buscar eventos pupolar", data})
            return console.log(err);
     
        }

        const eventoPupular = data
        console.log(eventoPupular)
        response.status(200).json(eventoPupular)
    })
}