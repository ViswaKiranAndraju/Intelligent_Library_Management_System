const express = require('express');
const mysql = require("mysql");
const doenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const app = express();

doenv.config({
    path:'./.env'
});

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Mysql Connection Success");
    }
});

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));


const loc= path.join(__dirname,"./public");
app.use(express.static(loc));
app.set('view engine','hbs');

app.use(express.urlencoded());
app.use(express.json());

// app.get("/",(req,res)=>{
//     //res.send("<h1>HELLO World </h1>");
//     res.render("index");
// });

app.use('/',require("./routes/pages")); 

app.use('/auth',require("./routes/auth"));

app.listen(5000,()=>{
    console.log("Server Started @ Port 5000");
});


app.get("/add", (req, res) => {
    // fetching data from form
    // const { std_id,name,email,phone,address,gender } = req.body

    // Sanitization XSS...
    const{std_id,name,email,phone,gender} = req.query;
   db.query("select email from users where email=?",
   [email],
    async (error,result)=>{
        if(error){
            console.log(error);
        }
      
        // console.log(hashedPassword);

            db.query('insert into students set ?',
                    {std_id:std_id,name:name,email:email,phone:phone,gender:gender},
                    (error,result)=>{
                        if(error){
                            console.log(error);
                        }else{
                            console.log(result);
                            return res.render("addstudent", { mesg: true }); 
                        }
                    }
            );

    }
   )
});

app.get("/addbook", (req, res) => {
    // fetching data from form
    // const { std_id,name,email,phone,address,gender } = req.body

    // Sanitization XSS...
    const{book_id,title,author,category,quantity,availability,rack_number} = req.query;
   db.query("select title from books where title=?",
   [title],
    async (error,result)=>{
        if(error){
            console.log(error);
        }
      
        // console.log(hashedPassword);

            db.query('insert into books set ?',
                    {book_id:book_id,title:title,author:author,category:category,quantity:quantity,availability:availability,rack_number:rack_number},
                    (error,result)=>{
                        if(error){
                            console.log(error);
                        }else{
                            console.log(result);
                            return res.render("add_books", { mesg: true }); 
                        }
                    }
            );

    }
   )
});

app.get("/issuebook", (req, res) => {
    // fetching data from form
    // const { std_id,name,email,phone,address,gender } = req.body

    // Sanitization XSS...
    const{issue_id,std_id,book_id,issued_date,due_date} = req.query;
   db.query("select issue_id from issuing where issue_id=?",
   [issue_id],
    async (error,result)=>{
        if(error){
            console.log(error);
        }
      
        // console.log(hashedPassword);

            db.query('insert into issuing set ?',
                    {issue_id:issue_id,std_id:std_id,book_id:book_id,issued_date:issued_date,due_date:due_date},
                    (error,result)=>{
                        if(error){
                            console.log(error);
                        }else{
                            console.log(result);
                            return res.render("issue_books", { mesg: true }); 
                        }
                    }
            );

    }
   )
});

app.get("/returnbook", (req, res) => {
    // fetching data from form
    // const { std_id,name,email,phone,address,gender } = req.body

    // Sanitization XSS...
    const{return_id,std_id,book_id,returned_date} = req.query;
   db.query("select return_id from returning where return_id=?",
   [return_id],
    async (error,result)=>{
        if(error){
            console.log(error);
        }
      
        // console.log(hashedPassword);

            db.query('insert into returning set ?',
                    {return_id:return_id,std_id:std_id,book_id:book_id,returned_date:returned_date},
                    (error,result)=>{
                        if(error){
                            console.log(error);
                        }else{
                            console.log(result);
                            return res.render("return_books", { mesg: true }); 
                        }
                    }
            );

    }
   )
});

app.get("/issuefine", (req, res) => {
    // fetching data from form
    // const { std_id,name,email,phone,address,gender } = req.body

    // Sanitization XSS...
    const{fine_id,issue_id,fine_amount} = req.query;
   db.query("select fine_id from fines where fine_id=?",
   [fine_id],
    async (error,result)=>{
        if(error){
            console.log(error);
        }
      
        // console.log(hashedPassword);

            db.query('insert into fines set ?',
                    {fine_id:fine_id,issue_id:issue_id,fine_amount:fine_amount},
                    (error,result)=>{
                        if(error){
                            console.log(error);
                        }else{
                            console.log(result);
                            return res.render("issue_fine", { mesg: true }); 
                        }
                    }
            );

    }
   )
});

app.get("/searchstudent", (req, res) => {
    // fetch data from the form


    const { std_id } = req.query;

    let qry = "select * from students where std_id=?";
    db.query(qry, [std_id], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("search_student", { mesg1: true, mesg2: false })
            } else {

                res.render("search_student", { mesg1: false, mesg2: true })

            }

        }
    });
})

app.get("/removestudent", (req, res) => {

    // fetch data from the form


    const { std_id } = req.query;

    let qry = "delete from students where std_id=?";
    db.query(qry, [std_id], (err, results) => {
        if (err) console.log(err);
        else {
            if (results.affectedRows > 0) {
                res.render("remove_students", { mesg1: true, mesg2: false })
            } else {

                res.render("remove_students", { mesg1: false, mesg2: true })

            }

        }
    });
});

app.get("/removebooks", (req, res) => {

    // fetch data from the form


    const { book_id } = req.query;

    let qry = "delete from books where book_id=?";
    db.query(qry, [book_id], (err, results) => {
        if (err) console.log(err);
        else {
            if (results.affectedRows > 0) {
                res.render("remove_books", { mesg1: true, mesg2: false })
            } else {

                res.render("remove_books", { mesg1: false, mesg2: true })

            }

        }
    });
});

app.get("/removeFines", (req, res) => {

    // fetch data from the form


    const { fine_id } = req.query;

    let qry = "delete from fines where fine_id=?";
    db.query(qry, [fine_id], (err, results) => {
        if (err) console.log(err);
        else {
            if (results.affectedRows > 0) {
                res.render("RemoveFines", { mesg1: true, mesg2: false })
            } else {

                res.render("RemoveFines", { mesg1: false, mesg2: true })

            }

        }
    });
});

app.get("/view_students",(req,res) => {
    let qry = "Select * from students";
    db.query(qry,(err,results)=>{
        if(err) console.log(err);
        else{
            res.render("view_students",{students: results});
        }
    })
})


app.get("/view_books",(req,res) => {
    let qry = "Select * from books";
    db.query(qry,(err,results)=>{
        if(err) console.log(err);
        else{
            res.render("view_books",{books: results});
        }
    })
})

app.get("/viewIssuedBooks",(req,res) => {
    let qry = "Select * from books where book_id IN (1,4,7,9)";
    db.query(qry,(err,results)=>{
        if(err) console.log(err);
        else{
            res.render("viewIssuedBooks",{books: results});
        }
    })
})

app.get('/enterLibrary', (req, res) => {
    
    const { std_id } = req.query;

    let qry = "INSERT INTO student_log (std_id) VALUES (?)";
    db.query(qry, [std_id], (err, results) => {
        if (err) console.log(err);
        else {
            if (results.affectedRows > 0) {
                res.render("enter_library", { mesg1: true, mesg2: false })
            } else {

                res.render("enter_library", { mesg1: false, mesg2: true })

            }

        }
    });
  });

  app.get('/exitLibrary', (req, res) => {
    const { std_id } = req.query;
    let qry = "UPDATE student_log SET exit_time = CURRENT_TIMESTAMP WHERE std_id = ?";
    db.query(qry, [std_id], (err, results) => {
        if (err) console.log(err);
        else {
            if (results.affectedRows > 0) {
                res.render("exit_library", { mesg1: true, mesg2: false })
            } else {

                res.render("exit_library", { mesg1: false, mesg2: true })

            }

        }
    });
  });

app.get("/viewFines",(req,res) => {
    let qry = "Select * from fines";
    db.query(qry,(err,results)=>{
        if(err) console.log(err);
        else{
            res.render("viewFines",{fines: results});
        }
    })
})

app.get("/viewStdLog",(req,res) => {
    let qry = "Select * from student_log";
    db.query(qry,(err,results)=>{
        if(err) console.log(err);
        else{
            res.render("viewStdLog",{student_log: results});
        }
    })
})

app.get("/viewStdLog421",(req,res) => {
    let qry = "Select * from student_log where std_id = 421273";
    db.query(qry,(err,results)=>{
        if(err) console.log(err);
        else{
            res.render("viewStdLog421",{student_log: results});
        }
    })
})