import '../App.css'
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import { getDownloadURL, ref, getStorage } from "@firebase/storage";

// var url = "https://firebasestorage.googleapis.com/v0/b/book-viewer-87150.appspot.com/o/1646965043148?alt=media&token=ba7a30a0-28d2-49d3-a794-f1e793acb55c";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const ViewPage = () => {
    let { fileId } = useParams();
    const storage = getStorage();
    let [numPages, setNumPages] = useState(0);
    let [url, setUrl] = useState(null);

    getDownloadURL(ref(storage, fileId)).then((downloadLink) => {
        setUrl(downloadLink);
    });

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
    }

    return (
        <div>
            <h1>View your PDF!</h1>
            <div>
                <Document file={url} onLoadError={(error) => console.log(error)} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages), (_, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={0.5} />
                    ))}
                </Document>

            </div>
        </div>
    )
}