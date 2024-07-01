import express from "express";
let router = express.Router();
import { client } from "./../mongodb.mjs";
import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken';

import { stringToHash, verifyHash, validateHash } from "bcrypt-inzi";


const db = client.db("officeTack");
const adminCol = db.collection("webAdmin");

router.post("/signup", async (req, res, next) => {
  console.log("this is signup!", new Date());

  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(403).send(`required parameter missing, 
            example body, 
            {
           firstName: req.body.firstName
           lastName:  req.body.lastName
           email:     req.body.email 
           password:  req.body.password

            }`);
    return;
  }

  req.body.email = req.body.email.toLowerCase();
  
  try {
      let result = await adminCol.findOne({ email: req.body.email });
        console.log("result", result);

    if (!result) {
        const passwordHash = await stringToHash(req.body.password)

      const newCard = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash
      };

      // Insert the documents into the specified collection

      const insertResponse = await adminCol.insertOne(newCard);

      console.log("insertResponse", insertResponse);

      res.send({ message: "signup successfully" });
    } else {
      res.status(403).send({ message: "user already exist with this email" });
    }
  } catch (e) {
    console.log("error inserting mongodb", e);
    res.status(500).send("server error, please try later");
  }

//   res.send("this is signup v1" + new Date());
});

router.post("/login", async (req, res, next) => {
  console.log("this is login!", new Date());

  if (
    !req.body.email ||
    !req.body.password
  ) {
    res.status(403).send(`required parameter missing, 
            example body, 
            {
           email:     req.body.email 
           password:  req.body.password

            }`);
    return;
  }

  req.body.email = req.body.email.toLowerCase();

  try {
    let result = await adminCol.findOne({ email: req.body.email });
    console.log("result", result)

    if (!result) {
        res.status(403).send({ message: "email or password incorrect" });

        return;
    } else {

        const isMatch = await verifyHash(req.body.password, result.password)
        if(isMatch){

            // const dateAfter24HInMili = (new Date().getTime() + (24 * 60 * 60 * 1000));
            // const dateAfter2MInMili = (new Date().getTime() + (2 * 60 * 1000));


            var token = jwt.sign({ 
                email: req.body.email,
                firstName: result.firstName,
                lastName: result.lastName,
                isAdmin: false,
                // createdOn: new Date().getTime(),
                // expires: dateAfter24HInMili
             }, process.env.SECRET, {
                // expiresIn: '1h'
             });

             res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                // expires: new Date(dateAfter24HInMili)
             })


            res.send({message: "login succesful"})
            return;
        }else{
            res.status(401).send({message: "incorrect email or password"})
        }
        return;
    }
  } catch (e) {
    console.log("error inserting mongodb", e);
    res.status(500).send("server error, please try later");
  }



//   res.send("this is login v1" + new Date());
});

export default router;
