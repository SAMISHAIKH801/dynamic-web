
import express from 'express';
import { nanoid } from 'nanoid'
import { client } from './../mongodb.mjs';
import { ObjectId } from 'mongodb';


const db = client.db("officeTack");
const col = db.collection("cardPosts");


let router = express.Router()



let posts = [{
    id: nanoid(),
    title: 'hello',
    text: 'shaikh'

}]

// POST    /api/v1/post
router.post('/api/v1/post', async (req, res, next) => {
    console.log('this is signup!', new Date());

    if( 
        !req.body.title 
        || !req.body.text
        || !req.body.price
    ) {
        res.status(403).send(`required parameter missing, 
            example body, 
            {
              id: 'sami',
              title: 'hello',
              text: 'shaikh',
              price: '33.34'

            }`)
            return;
    }

    const newCard = {
                    // id: nanoid(),
                    title: req.body.title,
                    text: req.body.text,
                    price: req.body.price,
                    from: req.body.decoded.email
                }
        
    
      // Insert the documents into the specified collection        
      try { 
        const insertResponse = await col.insertOne(newCard);

      console.log('insertResponse', insertResponse)
 
      res.send('post created');
            }catch (e) {
              console.log('error inserting mongodb', e)
              res.status(500).send('server error')
            }
   

})



// GET     /api/v1/posts/:userId
router.get('/api/v1/posts', async (req, res, next) => {
    console.log('this is signup!', new Date());

    try{
        const cursor = col.find({}).sort({_id: -1}).limit(100);
    let result = await cursor.toArray()

    console.log('result', result)

    res.send(result);
    } catch (e) {
        console.log('error getting data mongodb', e)
        res.status(500).send('server error')
      }
})
// GET     /api/v1/post/:userId/:postId
router.get('/api/v1/post/:postId', async (req, res, next) => {
    console.log('this is signup!', new Date());

    if(!ObjectId.isValid(req.params.postId)){
        res.status(403).send(`invalid post`)
        return;
    }

    try{
        // const cursor = col.findOne({_id: new ObjectId(req.params.postId)});
    let result = await col.findOne({_id: new ObjectId(req.params.postId)});

    console.log('result', result)

    res.send(result);
    } catch (e) {
        console.log('error getting data mongodb', e)
        res.status(500).send('server error')
      }

   
})

// PUT     /api/v1/post/:userId/:postId
router.put('/api/v1/post/:postId', async (req, res, next) => {
    console.log('this is signup!', new Date());

    if(!req.body.title
       && !req.body.text 
    ){
        res.status(403).send(`post id must be a valid number`)
    }

    let updatedPost = {}

    if(req.body.title){
        updatedPost.title = req.body.title
    }
    if(req.body.text){
        updatedPost.text = req.body.text
    }

    try{
    let updatedResponse = await col.updateOne({
        _id: new ObjectId(req.params.postId)
    },{
        $set: updatedPost
    });

    console.log('result', updatedResponse)

    res.send('post updated');
    } catch (e) {
        console.log('error getting data mongodb', e)
        res.status(500).send('server error')
      }

})
// DELETE  /api/v1/post/:userId/:postId
router.delete('/api/v1/post/:postId', async (req, res, next) => {
    console.log('this is signup!', new Date());

    if(!ObjectId.isValid(req.params.postId)){
        res.status(403).send(`invalid post`)
        return;
    }

    try{
    let deleteResponse = await col.deleteOne({
        _id: new ObjectId(req.params.postId)
    });

    console.log('deleteResponse', deleteResponse)

    res.send('Post Deleted');
    } catch (e) {
        console.log('error deleting mongodb', e)
        res.status(500).send('server error')
      }
})


    

export default router


