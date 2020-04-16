const express = require('express');
const app = express();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });

mongoose.connection.on("error", function(error) {
  console.error('ERROR', error);
});


// definimos el schema
const VisitantesSchema = mongoose.Schema({
  date: { type: Date },
  name: String,
});

const Person = mongoose.model("Visitor", VisitantesSchema); // definimos el modelo

let dateString = Date();
let good = 'El visitante fue almacenado con éxito';

app.get('/', (req, res) => {
  var name = req.query.name;

  if (!name) {
    name = 'Anónimo';
  }

  const person = new Visitor ({
    name,
    date: dateString,
  });

  person.save((error) => {
    if (error) {
      return res.send(`error`);
    }

    return res.send(`<h1> ${good} </h1>`);
  });

});


app.listen('3000', () => console.log('Visitantes! Puerto 3000'));




//
// var person = new Article({
//   date: fecha,
//   name: nombre
// });
//
// person.save((error) => {
//   if (error) {
//     return res.send (`Something Happened, ERROR ${error}`);
//   }
//
//   return res.send(`Record Database in database for ${name}`);
// });
//
