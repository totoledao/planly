import firebaseServer from '../../config/firebase/server';

const db = firebaseServer.firestore();
const timeTable = db.collection("timeTable");

/* eslint-disable import/no-anonymous-default-export */
export default async (req, res) => {
  const [bearer, token] = req.headers.authorization.split(" ");
  
  if(!token){
    return res.status(401);
  }

  try {    
    const { user_id } = await firebaseServer.auth().verifyIdToken(token);    
    const snapshot = await timeTable
      .where('user_id', '==', user_id)
      .where('when', '==', req.query.when)
      .get();

    return res.status(200).json(snapshot.docs);

  } catch (error) {
    console.log("FB ERROR:", error);
    return res.status(401);  
  }  
  
}