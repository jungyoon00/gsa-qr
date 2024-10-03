import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library';

import { database } from "./fbInstance";
import { setDoc, doc, getDoc } from "firebase/firestore";
import useZustandAuthStore from "./store/zustandAuthStore";

function PushData(text) {
  const currentDate = new Date();
  const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes}:${currentDate.getSeconds}`;

  const validID = "12345678";

  const username = useZustandAuthStore((state) => state.username);
  const email = useZustandAuthStore((state) => state.email);

  const data = {"username": username, "entertime": formattedTime}

  const checkUser = async (email) => {
      const userRef = doc(database, "Users", email);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) return false;
      return true;
  }

  const setData = async (email) => {
      if (text === validID) {
          if (checkUser(email)) await setDoc(doc(database, "Users", email), data);
      }
  }

  setData(email);
}


const Reader = () => {
const [localStream, setLocalStream] = useState();
const Camera = useRef(null);
const hints = new Map();
const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.DATA_MATRIX, BarcodeFormat.CODE_128, BarcodeFormat.CODABAR, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.CODE_39, BarcodeFormat.CODE_93];
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
const Scan = new BrowserMultiFormatReader(hints, 500);

useEffect(() => {
 navigator.mediaDevices.getUserMedia({
   // video: { facingMode: "user" }, //전면
   video: { facingMode: { exact: "environment" } }, //후면
 })
   .then(stream => {
     console.log(stream);
     setLocalStream(stream);
   })
 return () => {
   Stop();
 }
}, []);
useEffect(() => {
 if (!Camera.current)
   return;
 if (localStream && Camera.current) {
   Scanning();
 }
 return () => {
   Stop();
 }
}, [localStream]);
const req = useRef();
const Scanning = async () => {
 // const t = await Scan.decodeOnce();
 console.log('scan');
 if (localStream && Camera.current) {
   try {
     const data = await Scan.decodeFromStream(localStream, Camera.current, (data, err) => {
       if (data) {
         setText(data.getText());
         // Scan.stopContinuousDecode();
       } else {
         setText("");
       }
     });
   } catch (error) {
     console.log(error);
   }
 }

}
const Stop = () => {
 if (localStream) {
   const vidTrack = localStream.getVideoTracks();
   vidTrack.forEach(track => {
     localStream.removeTrack(track);
   });
 }
}
const [text, setText] = useState('')
useEffect(() => {
  PushData(text);
}, [text]);
return (
 <div>
   <video
     ref={Camera}
     id="video"
   />
   <span>{text}</span>
 </div>
);
};
export default Reader;