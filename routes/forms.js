var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const uri = process.env.URI;
const client = new MongoClient(uri);
const FormF1 = client.db("FormF1").collection("respostas");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('forms');
});

router.post('/submit', async (req, res) => {
  try {
    // Conectar ao MongoDB
    //await client.connect();
    //console.log('Conectado ao MongoDB');

    // const db = client.db('FormF1');
    // const FormF1 = db.collection('respostas');

    // Captura os dados do formulário
    const { nome, equipes, GP } = req.body;

    // Insere os dados no MongoDB
    const result = await FormF1.insertOne({ nome, equipes, GP });

    // Responde com sucesso
    res.render('submit', { 
      message: { type: 'success', text: 'Formulário enviado com sucesso', data: result }
    });
    } catch (error) {
    console.error('Erro ao enviar formulário:', error);

    // Renderiza a página inicial com a mensagem de erro
    res.render('submit', { 
      message: { type: 'error', text: 'Erro ao enviar formulário' }
    });
    } finally {
    await client.close();
  }
});

module.exports = router;