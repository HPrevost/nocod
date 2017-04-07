// Modules =======================================

var compression = require('compression');
var express = require('express');
var mysql = require('mysql');
var sync = require('synchronize');


// GLobales =================================

//Chaînes sql, tableau resultats et trouve (true si présence d'enregistrements)
var sql = '';
var rows = [];
var trouve = false;


// Application ==================================

var app = express();


// Serveur web ===================================

app.listen(3000, function () {
  console.log('Server running on port 3000');
});


// Base de données ==============================

// Connexion ------
var cn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'JUG@ende4444',
  database: 'EDITO'
});


// Requêtes synchrones ------

sync.fiber(function () {

  cn.connect();

  var sql = "select * from CLIENT limit 20";
  rows = OPN(sql);

  if (trouve) {

    console.log(rows[0].NomCli);

    sql = "select * from PRODUIT limit 20";
    rows = OPN(sql);

    if (trouve) {
      console.log(rows[0].NomProd);
    }

  }

  cn.end();

});


//Fonctions ============================
//
//Lecture Data
function OPN(s) {
  /*
    s = chaîne de requête
  */
  var data = sync.await(cn.query(s, sync.defer()));

  if (data.length > 0) {
    trouve = true;
  } else {
    trouve = false;
  }

  return data;
}

//Ecriture Data

