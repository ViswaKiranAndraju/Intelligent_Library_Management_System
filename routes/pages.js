const express = require("express");
const router = express.Router();
const userController = require("../controllers/users"); 


router.get("/",(req,res)=>{
    res.render("vis");
});

router.get("/login",(req,res)=>{
    res.render("login");
});

router.get("/register",(req,res)=>{
    res.render("register");
});

// router.get("/std_dash",(req,res)=>{
//     res.render("std_dash");
// });

router.get("/std_dash",userController.isLoggedIn,(req,res)=>{
    if(req.user){
        res.render("std_dash",{user:req.user});
    }else{
        res.redirect("/login");
    }
});


router.get("/admin_dash",(req,res)=>{
    res.render("admin_dash");
});
router.get("/admin_dash_profile",(req,res)=>{
    res.render("admin_dash_profile");
});

router.get("/addstudent",(req,res)=>{
    res.render("addstudent");
});

router.get("/issue_fine",(req,res)=>{
    res.render("issue_fine");
});

router.get("/search_student",(req,res)=>{
    res.render("search_student");
});

router.get("/add_books",(req,res)=>{
    res.render("add_books");
});

router.get("/issue_books",(req,res)=>{
    res.render("issue_books");
});

router.get("/return_books",(req,res)=>{
    res.render("return_books");
});

// router.get("/view_books",(req,res)=>{
//     res.render("view_books");
// });

router.get("/remove_students",(req,res)=>{
    res.render("remove_students");
});

router.get("/remove_books",(req,res)=>{
    res.render("remove_books");
});

// router.get("/view_students",(req,res)=>{
//     res.render("view_students");
// });

// router.get("/view_student",(req,res)=>{
//     res.render("view_student");
// });

// router.get("/home_std",(req,res)=>{
//     res.render("home_std");
// });

router.get("/adminLogin",(req,res)=>{
    res.render("adminLogin");
});

router.get("/RemoveFines",(req,res)=>{
    res.render("RemoveFines");
});

router.get("/home_std",userController.isLoggedIn,(req,res)=>{
    if(req.user){
        res.render("home_std",{user:req.user});
    }else{
        res.redirect("/login");
    }
});

router.get("/enter_library",(req,res)=>{
    res.render("enter_library");
});
router.get("/exit_library",(req,res)=>{
    res.render("exit_library");
});


module.exports = router;