  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "zahra5596864625",
    database: "studentsinfo"
  });
  
  con.connect((err) => {
    if (err) throw err;
    else 
    console.log("Connected!");
  });

  const show = (req,res) => {
      var sql = "select * from students;"
      con.query(sql,(err,result) => {
       res.render('index',{users : result,title:'HOME'})   
      })
    
  }

  const search = (req,res) => {
    var id =req.body.sID
      res.redirect('/edit/' + id)
  }


  const form = (req,res) => {
    res.render('create',{title:'ADD USER'})
  }
  const save = (req,res) => {
    console.log(req.body)
    var sql = 'INSERT INTO students VALUES ?';
    var values = [[,req.body.name,req.body.age,req.body.phone,req.body.score]]
    con.query(sql,[values],(err,result) =>{
    if(err) throw err
    else
    console.log('data inserted')
    })
    res.redirect('/')
  }
 
 const editForm = (req,res) => {
    const id =req.params.id
    var sql = "select * from students where id = "+id
    con.query(sql,(err,result) => {
      if(err) throw err
    res.render('edit',{users : result,title:'EDIT USER'})
    })
    
  }

  const edit = (req,res) => {
    var id = req.body.id
    var value = [req.body.name,req.body.age,req.body.phone,req.body.score]
    var sql = "UPDATE students SET name = ?, age = ?,phone = ?, score = ? WHERE id = "+id
    con.query(sql,value,(err,result) => {
      if(err) throw err
      res.redirect('/')
    })
    
  }

  const deletinfo = (req,res) => {
    const id = req.params.id
    var sql = "DELETE FROM students WHERE id = " +id
    con.query(sql,(err,result) => {
      if(err) throw err
   else
    res.redirect('/')
    })
  }
  
  module.exports ={
    show,
    save,
    edit,
    form,
    editForm,
    deletinfo,
    search
  
   
}