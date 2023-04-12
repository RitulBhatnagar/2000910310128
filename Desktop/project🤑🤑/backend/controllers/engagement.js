const db = require("../db/connect");

 const createEngage = (req, res) => {
    const {engagement_code, engage, client_name} = req.body;
    if(!engagement_code || !engage || !client_name){
      res.status(422).json("Please fill all the field")
    }
    try{
      db.query("SELECT * FROM engagement WHERE engagement_code = ?", engagement_code, (err, result) => {
        if(result.length){
          res.status(422).json("This code already exisit")
        }
        else{
          db.query("INSERT INTO engagement SET ?", {engagement_code, engage, client_name}, (err, result) => {
            if(err){
              console.log(err)
            }
            else{
              res.status(201).json(result);
            }
          })
        }
      })
    }catch(error){
      res.status(500).json(error);
    }
};

const getEngage = (req, res) => {
   const q = 'SELECT * FROM engagement';
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

const deleteEngage = (req, res) => {
  const{id} = req.params;

  const q = 'DELETE FROM engagement WHERE id =  ?';
  db.query(q, id, (error, result)=>{
       if(error){
        res.status(422).json(error);
       }
       else{
        res.status(201).json(result);
       }
  })
}

const singleEngage = (req, res) => {
  const {id} = req.params;
  const q = 'SELECT * FROM engagement WHERE id = ?';
  db.query(q, id, (error, result) => {
    if(error){
      res.status(422).json(error);
    }
    else{
      res.status(201).json(result);
    }
  })
}

const updateEngage = (req, res) => {
  const {id} = req.params;
  const data = req.body;
  const q = 'UPDATE  engagement SET ? WHERE id = ?';
  db.query(q, [data, id], (error, result)=>{
        if(error){
          res.status(422).json("error")
        }
        else{
          res.status(201).json(result);
        }
  })
}

module.exports = {createEngage, getEngage, deleteEngage, updateEngage, singleEngage}