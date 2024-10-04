import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library';

import { database } from "./fbInstance";
import { setDoc, doc, getDoc } from "firebase/firestore";
import useZustandAuthStore from "./store/zustandAuthStore";
import "./Main.css";

async function PushData(text) {
  
  const currentDate = new Date();
  const formattedTime = `${String(currentDate.getHours()).padStart(2, "0")}:${String(currentDate.getMinutes()).padStart(2, "0")}:${String(currentDate.getSeconds()).padStart(2, "0")}`;

  const validID = "12345678";
  alert("1")

  // testing environment.
  const username = useZustandAuthStore((state) => state.username);
  const email = useZustandAuthStore((state) => state.email);

  alert(username);

  //const username = "2514정윤";
  //const email = "23083@gsa.hs.kr";

  const data = {"username": username, "entertime": formattedTime}
  alert(formattedTime);

  if (text === validID) {
    const userRef = doc(database, "Users", email);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists() !== true) {
      if (formattedTime > "15:30:00") {
        alert("지정 시간보다 늦게 출입");
      } else {
        alert("출입 확인");
      }
      alert("Scanned");
      setDoc(doc(database, "Users", email), data);
    } else {
      alert("이미 출입한 사용자");
    }
  }

  //if (scanState !== "") alert(scanState);
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

const [text, setText] = useState('');
//const [currentState]

let scanState = "QR코드를 스캔";
useEffect(() => {
  PushData(text);
}, [text]);

return (
 <div class="video-container">
   <video
     ref={Camera}
     id="video"
   />
   <span class="video-text">{scanState}</span>
 </div>
);
};
export default Reader;