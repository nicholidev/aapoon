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
        type:"instant",
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
    const {meetingDescription="",meetingTopic,estimatedDuration,scheduleAt,timeZone,password=""}=req.body
   const uid = new ShortUniqueId({ length: 10 });

    let meetingDb=admin.firestore().collection("meeting")
 
    const timestamp = admin.firestore.Timestamp.fromDate(new Date(scheduleAt));
    console.log(timestamp,meetingDescription,meetingTopic,estimatedDuration,scheduleAt,timeZone,password,uid(),req.user)
    let data={   uid: uid(),
        description:meetingDescription,
        scheduledAt:timestamp,
    endAt:admin.firestore.Timestamp.fromDate(new Date(scheduleAt+(Number(estimatedDuration)*60*1000))),
        timezone:timeZone, 
        duration:"",
        type:"scheduled",
        title:meetingTopic,
        password:password,
        createdAt:timestamp,
        createdBy:admin.firestore().collection("users").doc(req.user.user_id),
        joinedBy:[]}
   meetingDb.add(data).then(meetting=>{
  
       res.status(200).send({id:meetting.id,...data});
   }).catch(err=>{
       console.log(err);
       res.status(500).send({message:"error in creating meeting"})
   })
};

const joinMeeting=async (req, res) => {
    try{

  
    let meeting = (
        await admin.firestore().collection("meeting").doc(req.body.id).get()
      ).data();
     
      if (meeting.password && req.body.password != meeting.password) {
        return res.status(403).send();
      }
      return res.status(200).send();
    }catch(err){
        return res.status(500).send();
    }
}
 
 module.exports = {
    instantMeeting,
    scheduleMeeting,
    joinMeeting
  
 };
 