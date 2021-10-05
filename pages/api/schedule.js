import firebaseServer from '../../config/firebase/server';
import { addHours, differenceInHours, format } from 'date-fns';

const db = firebaseServer.firestore();
const profile = db.collection("profile");
const timeTable = db.collection("timeTable");

const startAt = new Date(2021, 1, 1, 8, 0);
const endAt = new Date(2021, 1, 1, 17, 0);
const totalHours = differenceInHours(endAt, startAt);

const timeBlocks = [];
for (let index = 0; index <= totalHours; index++) {

  const time = format(addHours(startAt, index), 'HH:mm');
  timeBlocks.push(time);

}

/* eslint-disable import/no-anonymous-default-export */
export default async (req, res) => {
  try {    
    // const profileDoc = await profile
    //   .where('user_name', '==', req.query.username)
    //   .get();

    // const snapshot = await timeTable
    //   .where('user_id', '==', profileDoc.userId)
    //   .where('when', '==', req.query.when)
    //   .get();

    return res.status(200).json(timeBlocks);

  } catch (error) {
    console.log("FB ERROR:", error);
    return res.status(401);  
  }  
  
}