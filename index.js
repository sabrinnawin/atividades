const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();

// Configuração da conexão com o banco de dados
const db = pgp({
    connectionString: 'postgres://qnukciqd:n88GDk4Zu5Tykm90Z12QshOo9cinJkNr@babar.db.elephantsql.com/qnukciqd'
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint para obter todos os currículos
app.get('/curriculum', async (req, res) => {
    try {
        // Consulta todos os currículos na tabela 'curriculum'
        const curriculos = await db.any('SELECT * FROM curriculum');
        res.json(curriculos);
    } catch (error) {
        // Em caso de erro, retorna uma resposta com status 500 e a mensagem de erro
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
