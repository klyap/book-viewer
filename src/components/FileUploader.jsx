import '../App.css'
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { initializeApp } from "@firebase/app";
import { useState } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set the configuration for your app
const firebaseConfig = {
    apiKey: "AIzaSyCiCbpZlEkeHNL6QhnOkNEnDZ16N8TjwP0",
    authDomain: "book-viewer-87150.firebaseapp.com",
    projectId: "book-viewer-87150",
    storageBucket: "book-viewer-87150.appspot.com",
    messagingSenderId: "735011482681",
    appId: "1:735011482681:web:0351d42abb3eee4fa031e8"
};
const firebaseApp = initializeApp(firebaseConfig);


export const FileUploader = () => {
    let [files, setFile] = useState(null);
    let [downloadLink, setDownloadLink] = useState(null);

    const handleUpload = () => {
        const file = files[0];
        const storage = getStorage();
        const fileUuid = new Date().getTime().toString();
        const storageRef = ref(storage, fileUuid);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log('Error')
                // Handle unsuccessful uploads
            },
            () => {
                console.log(uploadTask.snapshot.ref.name);
                setDownloadLink(`/view/${uploadTask.snapshot.ref.name}`);
                // Handle successful uploads on complete
                // getDownloadURL(uploadTask.snapshot.ref).then((downloadLink) => {
                //     console.log('File available at', downloadLink);
                //     setDownloadLink(downloadLink);
                // });
            }
        );

        // uploadBytes(storageRef, file).then((snapshot) => {
        //     getDownloadURL(snapshot.ref).then((downloadLink) => {
        //         setDownloadLink(downloadLink);
        //     });
        // }
    };

    return (
        <div>
            <input type="file" id="file" onChange={e => setFile(e.target.files)} /><br /><br />
            <button id="upload" onClick={handleUpload}>Upload</button>
            <br />
            {downloadLink ? <a href={downloadLink}>See your file here</a> : null}
        </div>
    )
}
