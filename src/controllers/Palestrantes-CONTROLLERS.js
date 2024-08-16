import conn from "../config/conn.js"
import { v4 as uuidv4 } from "uuid"
import { request, response } from "express"


export const getTodosPalestrantes = (request, response) => {

    const getsql = `SELECT * FROM palestrantes`

    conn.query(getsql, (err, data) => {
        if (err) {
            response.status(500).json({ message: "Erro ao buscar palestrantes" })
            return;
        }
        const palestrantes = data
        response.status(200).json(palestrantes)
    })
}

export const cadastrarPalestrante = (request, response) => {
    const { nome, expertise } = request.body;

    if (!nome) {
        response.status(400).json({ err: "O nome do palestrante é obrigatório" })
        return;
    }

    if (!expertise) {
        response.status(400).json({ err: "A área de especialização do palestrantes é obrigatória" })
        return;
    }

    
    //verificar se o palestrante já existe
    const checkSQL = `SELECT * FROM palestrantes WHERE ?? = ?
 AND  ?? = ?`

    const DatacheckSQL = ["nome", nome, "expertise", expertise]

    conn.query(checkSQL, DatacheckSQL, (err, data) => {
        if (err) {
            response.status(500).json({ err: "Erro ao buscar palestrantes" })
            return;
        }

        if (data.length > 0) {
            response.status(409).json({ err: "Palestrante já existe" })
            return;
        }

        const id = uuidv4()


        //inserir dados na tabela paletrantes
        const insertSQL = `INSERT INTO palestrantes(??, ??, ??) VALUES(?, ?, ?)`

        const DataInsertSQL = ["id_palestrante", "nome", "expertise", id, nome, expertise]


        conn.query(insertSQL, DataInsertSQL, (err) => {
            if (err) {
                response.status(500).json({ err: "Erro ao inserir dados" })
            }
            response.status(201).json({ message: "Palestrante cadastrado com sucesso" })
        })


    })
}
