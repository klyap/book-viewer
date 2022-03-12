import '../App.css'
import { useParams } from "react-router-dom";
import * as PDFJS from 'pdfjs-dist';

var url = 'https://firebasestorage.googleapis.com/v0/b/book-viewer-87150.appspot.com/o/1646951819473?alt=media&token=f7700e33-6a1b-4098-99b5-e4a1b493710b';

export const ViewPage = () => {
    let { fileId } = useParams();
    PDFJS.GlobalWorkerOptions.workerSrc = "../../node_modules/pdfjs-dist/build/pdf.worker.js";
    PDFJS.getDocument(url).promise.then(
        function getPdfHelloWorld(pdf) {
            //
            // Fetch the first page
            //
            pdf.getPage(1).then(
                function getPageHelloWorld(page) {
                    var scale = 1.5;
                    var viewport = page.getViewport(scale);
                    //
                    // Prepare canvas using PDF page dimensions
                    //
                    var canvas = document.getElementById('canvas');
                    var context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width / 2;

                    // Render PDF page into canvas context
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    var renderTask = page.render(renderContext);
                    renderTask.promise.then(function () {
                        console.log('Page rendered');
                    });

                }
            );
        }
    );
    return (
        <div>
            <h1>View your PDF!</h1>
            <canvas id="canvas" />
        </div>
    )
}