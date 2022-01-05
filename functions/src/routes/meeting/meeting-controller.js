/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
 const admin = require("firebase-admin");
 const ShortUniqueId=require("short-unique-id")
 

 
 const instantMeeting = async (req, res) => {
     const {description=""}=req.body
    const uid = new ShortUniqueId({ length: 10 });
     let meetingDb=admin.firestore().collection("meeting")
     const timestamp = admin.firestore.Timestamp.now();
   
    meetingDb.add({ 
        uid: uid(),
        description:description,
        createdAt:timestamp,
        scheduledAt:timestamp,
        createdBy:admin.firestore().collection("users").doc(req.user.user_id),
        joinedBy:[]
    }).then(meetting=>{
        res.status(200).send({id:meetting.id});
    }).catch(err=>{
        console.log(err);
        res.status(500).send({message:"error in creating meeting",err})
    })

 };
 
 const scheduleMeeting = async (req, res) => {
    const {description=""}=req.body
   const uid = new ShortUniqueId({ length: 10 });
    let meetingDb=admin.firestore().collection("meeting")
    const timestamp = admin.firestore.Timestamp.now();
   meetingDb.add({ 
       uid: uid,
       description:description,
       scheduledAt:timestamp,
       timezone:"", 
       duration:"",
       title:"", isAuthenticated,
       password:"",
       createdAt:timestamp,
       createdBy:admin.firestore().collection("user").doc(req.user.id),
       joinedBy:[]
   }).then(meetting=>{
       res.status(200).send({id:meetting.id});
   }).catch(err=>{
       res.status(500).send({message:"error in creating meeting"})
   })
};
 
 module.exports = {
    instantMeeting,
    scheduleMeeting
  
 };
 