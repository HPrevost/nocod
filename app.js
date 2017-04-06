//Modules =======================================
var compression = require('compression');
var express = require('express');
var mysql = require('mysql');
var sync = require('synchronize');



//Application ==================================
var app = express();



//Base de données ==============================

//Variables globales sql
 
//Cahaînes sql
var sql = '';
var sql1 = '';
var sql2 = '';

//Recordsets
var rst1 = [];
var rst2 = [];
var rst3 = [];


var trouve = false;

//Connexion ------
var cn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'JUG@ende4444',
  database : 'EDITO'
});

cn.connect();


//Requêtes  ------
var sql = "select * from CLIENT limit 20";
/*sync.fiber(
  rst1 = OPN(sql),
  console.log(rst1)
);*/

console.log('one');

 sync.fiber(function() {
 
  var sql = "select * from CLIENT limit 20";
  var rst1 = OPN(sql);
  if (trouve) {
    console.log(rst1[0].NomCli);
    sql = "select * from PRODUIT limit 20";
    rst1 = OPN(sql);
    if (trouve) {
      console.log(rst1[0].NomProd);
    }
  }
  cn.end();
 });
console.log('three');
//Fin Connexion ------




//Serveur web ============================
app.listen(3000,function() {
  console.log('Server running on port 3000');
});


//Fonctions ============================

//Lecture Data
function OPN(s) {
  /*
    s = chaîne de requête
  */
 

    var data = sync.await(cn.query(s, sync.defer()));

    if (data.length>0) {
      trouve = true;
    } else {
      trouve = false;
    }

    return data;

  
}

//Ecriture Data

