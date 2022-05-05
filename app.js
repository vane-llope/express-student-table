const express = require('express')
const app = express()
const controller = require('./controllers/controller.js')

//to uodate dynomic data without refresh we use view engine
app.set('view engine','ejs')
app.listen(3000,() => {
    console.log('listen on port 3000')
})

app.use(express.urlencoded({ extended : true}))
app.use(express.static('public'))

app.get('/',controller.show)
app.post('/',controller.search)

app.get('/edit/:id',controller.editForm)
app.post('/edit/:id',controller.edit)

app.get('/delete-user/:id',controller.deletinfo)


app.get('/create',controller.form)
app.post('/create',controller.save)


app.use( (req,res) => {
    res.status(404).render('404',{title:'not Found'})
})
