import express from 'express'
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve();
import "dotenv/config"
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'





// let router = express.Router()





import authRouter from './routes/auth.mjs'
import commentRouter from './routes/comment.mjs'
import feedRouter from './routes/feed.mjs'
import postRouter from './routes/post.mjs'


const app = express();
app.use(express.json())
app.use(cookieParser())
// app.use(cors());

app.use(authRouter)


//     /static/vscode_windows.exe
app.use("/static", express.static(path.join(__dirname, 'static')))

app.use(express.static(path.join(__dirname, 'public')))



app.use((req, res, next) => {
    console.log("cookies", req.cookies)

    const token = req.cookies.token
    try {
        let decoded = jwt.verify(token, process.env.SECRET);
        console.log('decoded: ', decoded)

        const now = new Date().getTime()

        // if(decoded.expires > now){
            req.body.decoded ={
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                email: decoded.email,
                isAdmin: decoded.isAdmin,
            }    
            next()
        // }else{
    
        //     res.send({ message: "invalid token" })
        // }

      } catch(err) {
        // err  
        res.send({ message: "invalid token" })
      }  

})      



app.use(feedRouter)
app.use(postRouter)




//     /static/vscode_windows.exe
app.use("/static", express.static(path.join(__dirname, 'static')))

app.use(express.static(path.join(__dirname, 'public')))



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})