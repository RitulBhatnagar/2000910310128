const db = require("../db/connect");

 const createClient = (req, res) => {
    const {client_code, client_name, name_of_industry, size, growth_cagr, genral_overview, competetors, latest_news_snippets, entity_name} = req.body;
    if(!client_code || !client_name || !entity_name || !size || !growth_cagr){
      res.status(422).json({message : "Please fill all the field"})
    }
    try{
      db.query("SELECT * FROM client WHERE client_code = ?", client_code, (err, result) => {
        if(result.length){
          res.status(422).json({message : "This code already exisit"})
        }
        if(err){
          res.status(421).json({message : err})
        }
        else{
          db.query("INSERT INTO client SET ?", {client_code, client_name, client_code, client_name, name_of_industry, size, growth_cagr, genral_overview, competetors, latest_news_snippets, entity_name}, (err, result) => {
            if(err){
              res.status(400).json({message : err})
            }
            else{
              res.status(201).json(result);
            }
          })
        }
      })
    }catch(error){
      res.status(500).json({message : "Internal server error"});
    }
};

const getClient = (req, res) => {
   const q = 'SELECT * FROM client';
  try{
     db.query(q, (error, result) => {
      if(error){
        res.status(422).json({message : "Clients cannot get selected"})
      }
      res.status(201).json(result);
     })
  }catch(error){
    res.status(500).json({message : "Internal server error"});
  }
}

const deleteClient = (req, res) => {
  const{id} = req.params;

  const q = 'DELETE FROM client WHERE id =  ?';
  db.query(q, id, (error, result)=>{
       if(error){
        res.status(422).json({message : error});
       }
       else{
        res.status(201).json(result);
       }
  })
}

const singleClient = (req, res) => {
  const {id} = req.params;
  const q = 'SELECT * FROM client WHERE id = ?';
  db.query(q, id, (error, result) => {
    if(error){
      res.status(422).json({message : error});
    }
    else{
      res.status(201).json(result);
    }
  })
}

const updateClient = (req, res) => {
  const {id} = req.params;
  const data = req.body;
  const q = 'UPDATE  client SET ? WHERE id = ?';
  db.query(q, [data, id], (error, result)=>{
        if(error){
          res.status(422).json({message : error})
        }
        else{
          res.status(201).json(result);
        }
  })
}

module.exports = {createClient, getClient, deleteClient, updateClient, singleClient}