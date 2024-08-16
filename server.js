import dotenv from "dotenv/config"
import express from "express"

const PORT = process.env.PORT

//criação de tabelas 
import "./src/models/PalestrantesMODEL.js"
import "./src/models/ParticipantesMODEL.js"
import "./src/models/EventosMODEL.js"
import "./src/models/IncricaoEventoMODElS.js"
import "./src/models/FeedBackMODEL.js"



//rotas
import palestrantesRoutes from "./src/routes/Palestrantes-ROUTES.js"
import participantesRoutes from "./src/routes/ParticipantesROUtES.js"
import eventosRoutes from "./src/routes/EventosRoutes.js"
import IncricaoRoutes from "./src/routes/IncricaoRoute.js"
import feedbackRoutes from "./src/routes/FeedBackROUTES.js"


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//utilização das routas
app.use("/eventos/palestrantes", palestrantesRoutes)
app.use("/eventos/participantes" , participantesRoutes)
app.use("/eventos", eventosRoutes)
app.use("/eventos/inscrever" , IncricaoRoutes)
app.use("/eventos/feedback" , feedbackRoutes)


app.listen(PORT, () => {
    console.log("✨ servidor on PORT:", PORT)
})