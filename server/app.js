const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/clanakDB");

const clanakSchema = {
    title: String,
    content: String,
    imageURL: String
}

const Clanak = mongoose.model("Article", clanakSchema);

app.route("/articles")
    .get((req, res) => {
        Clanak.find((err, foundClanak) => {
            if (err) {
                res.send(err);
            } else {
                res.send(foundClanak)
            }
        })
    })
    .post((req, res) => {
        const newArticle = new Clanak({
            title: req.body.title,
            content: req.body.content,
            imageURL: req.body.imageURL,
        });

        newArticle.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Novi članak je uspješno dodan");
            }
        })
    })
    .delete((req, res) => {
        Clanak.deleteMany((err) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Uspješno brisanje svih podataka.")
            }
        })
    });

app.route("/articles/:articleTitle")
    .get((req, res) => {
        Clanak.findOne({ title: req.params.articleTitle }, (err, foundArticle) => {
            if (err) {
                res.send("Nema članaka u bazi");
            } else {
                res.send(foundArticle);
            }
        })
    })
    .put((req, res) => {
        Clanak.findOneAndUpdate(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content, imageURL: req.body.imageURL },
            { overwrite: true },
            (err) => {
                if (err) {
                    res.send("Članak nije update-ovan");
                } else {
                    res.send("Članak uspješno update-ovan.")
                }
            }
        )
    })
    .patch((req, res) => {
        Clanak.findOneAndUpdate(
            { title: req.params.articleTitle },
            { $set: req.body },
            (err) => {
                if (err) {
                    res.send("Članak nije update-ovan.");
                } else {
                    res.send("Update članka je uspješan.")
                }
            }
        )
    })
    .delete((req, res) => {
        Clanak.deleteOne(
            { title: req.params.articleTitle },
            (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Članak uspješno obrisan.");
                }
            }
        )
    });

const userSchema = {
        name: String,
        surname: String,
        username: String,
        password: String
    }
    
const User = mongoose.model("User", userSchema);
    
    app.route("/users")
        .get((req, res) => {
            User.find((err, foundUsers) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(foundUsers);
                }
            })
        })
        .post((req, res) => {
            const newUser = new User({
                name: req.body.name,
                surname: req.body.surname,
                username: req.body.username,
                password: req.body.password
            });
    
            User.find({ username: req.body.username }, (err, foundUsers) => {
                if (err) {
                    res.send(err);
                } else {
                    if (foundUsers.length === 0) {
                        newUser.save((err) => {
                            if (err) {
                                res.send(err);
                            } else {
                                res.send("Korisnik uspješno dodan.");
                            }
                        })
                    } else {
                        res.send("Korisnik s tim username već postoji.")
                    }
                }
            })
        })
        .delete((req, res) => {
            User.deleteMany((err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Svi korisnici uspješno obrisani.")
                }
            })
        });
    
    app.route("/users/:username")
        .get((req, res) => {
            User.find({ username: req.params.username }, (err, foundUser) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(foundUser);
                }
            })
        })
        .put((req, res) => {
            User.findOneAndUpdate(
                { username: req.params.username },
                { name:req.body.name, surname: req.body.surname, username: req.body.username, password: req.body.password },
                { overwrite: true },
                (err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("Korisnik uspješno update-ovan.");
                    }
                }
            )
        })
        .patch((req, res) => {
            User.findOneAndUpdate(
                { username: req.params.username },
                { $set: req.body },
                (err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("Uspješan update korisnika.");
                    }
                }
            )
        })
        .delete((req, res) => {
            User.deleteOne(
                { username: req.params.username },
                (err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("Korisnik uspješno obrisan.");
                    }
                }
            )
        });

app.listen(8080, () => {
    console.log("Server started on port 8080");
})