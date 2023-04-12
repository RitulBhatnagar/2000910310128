const db = require("../db/connect");

 const createUser = (req, res) => {
    const {user_name,first_name, last_name, role, entity, client, email, mob, country, password, confirm_password} = req.body;
    if(!user_name || !first_name || !last_name || !role || !entity || !client|| !email || !password || !confirm_password){
      res.status(422).json("Please fill all the field")
    }
    else if(password!==confirm_password){
      res.status(422).json("password does not match")
    }
    try{
      db.query("SELECT * FROM userid WHERE user_name = ?", user_name, (err, result) => {
        if(result.length){
          res.status(422).json("The UserName already exist")
        }
        else{
          db.query("INSERT INTO userid SET ?", {user_name,first_name, last_name, role, entity, client, email, mob, country, password, confirm_password}, (err, result) => {
            if(err){
              res.status(400).json(err);
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

const getUser = (req, res) => {
   const q = 'SELECT * FROM userid';
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

const deleteUser = (req, res) => {
  const{id} = req.params;

  const q = 'DELETE FROM userid WHERE id =  ?';
  db.query(q, id, (error, result)=>{
       if(error){
        res.status(422).json(error);
       }
       else{
        res.status(201).json(result);
       }
  })
}

const singleUser = (req, res) => {
  const {id} = req.params;
  const q = 'SELECT * FROM userid WHERE id = ?';
  db.query(q, id, (error, result) => {
    if(error){
      res.status(422).json(error);
    }
    else{
      res.status(201).json(result);
    }
  })
}

const updateUser = (req, res) => {
  const {id} = req.params;
  const data = req.body;
  const q = 'UPDATE  userid SET ? WHERE id = ?';
  db.query(q, [data, id], (error, result)=>{
        if(error){
          res.status(422).json(error)
        }
        else{
          res.status(201).json(result);
        }
  })
}

module.exports = {createUser, getUser, deleteUser, updateUser, singleUser}