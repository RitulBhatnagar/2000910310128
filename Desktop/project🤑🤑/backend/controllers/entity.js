const db = require("../db/connect");

 const createEntity = (req, res) => {
  const {entity_code, entity_name} = req.body
    if(!entity_code || !entity_name){
      res.status(402).json({message : "please fill all the filed"})
    }
    try{
      db.query("SELECT * FROM entity WHERE entity_code = ?", entity_code, (err, result) => {
        if(result.length){
          res.status(401).json({message : "This Entity code already exist"})
        }
        else{
          db.query("INSERT INTO entity SET ?", {entity_code, entity_name}, (err, result) => {
            if(err){
              res.status(400).json({message : err})
            }
            else{
              res.status(201).json({message : "Data added successfully"});
            }
          })
        }
      })
    }catch(error){
      res.status(500).json(error);
    }
};

const getEntity = (req, res) => {
   const q = 'SELECT * FROM entity';
  try{
     db.query(q, (error, result) => {
      if(error){
        res.status(422).json("Plz fill all the field")
      }
      res.status(201).json(result);
     })
  }catch(error){
    res.stauts(500).json(error);
  }
}

const deleteEntity = (req, res) => {
  const{id} = req.params;

  const q = 'DELETE FROM entity WHERE id =  ?';
  db.query(q, id, (error, result)=>{
       if(error){
        res.status(422).json({message : error});
        console.log(error);
       }
       else{
        res.status(201).json(result);
       }
  })
}

const singleUser = (req, res) => {
  const {id} = req.params;
  const q = 'SELECT * FROM entity WHERE id = ?';
  db.query(q, id, (error, result) => {
    if(error){
      res.status(422).json(error);
    }
    else{
      res.status(201).json(result);
    }
  })
}

const updateEntity = (req, res) => {
  const {id} = req.params;
  const data = req.body;
  const q = 'UPDATE  entity SET ? WHERE id = ?';
  db.query(q, [data, id], (error, result)=>{
        if(error){
          res.status(422).json("error")
        }
        else{
          res.status(201).json(result);
        }
  })
}

module.exports = {createEntity, getEntity, deleteEntity, updateEntity, singleUser}