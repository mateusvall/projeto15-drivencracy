import db from "../db.js";
import dayjs from "dayjs";
import { choiceSchema } from "../schemas/schemas.js";
import { ObjectId } from "mongodb";

export async function postChoice(req, res){

    const newChoice = req.body;

    

    try{
        const poll = await db.collection('poll').findOne({_id: new ObjectId(newChoice.pollId)});

        if(!poll){
            return res.sendStatus(404)
        } 

        const validation = choiceSchema.validate(newChoice);

        if (validation.error) {
            return res
                .status(422)
                .send(validation.error.details.map(detail => detail.message));
        }
        
        const choiceExists = await db.collection('choice').findOne({title: newChoice.title});

        if(choiceExists){
            return res.sendStatus(409)
        }

        if(dayjs().isAfter(poll.expireAt)){
            return res.sendStatus(403)
        }

        await db.collection('choice').insertOne(newChoice);
        return res.sendStatus(201);
        
    } catch(error){
        console.log(error);
        return res.sendStatus(500);
    }  

}

export async function getChoice(req, res){

    const { id } = req.params;

    try{
        const choices = await db.collection('choice').find({pollId: id}).toArray();

        if(!choices.length){
            return res.sendStatus(404)
        } 

        return res.send(choices);



        
    }
    catch(error){
        console.log(error);
        return res.sendStatus(500);
    }  

}