// window URL
// Blob

import React from "react";

function PdfDownload() {
    const res = axios.get("http://localhost:5000/test/generate");
    const blob = window.URL.createObjectURL(new Blob(res.data));
    const handleView = () => {
        window.open(pdfUrl, "_blank");
    };
    const handleDownload = () => {};
    return (
        <>
            <section>
                <h1>Download & View PDF</h1>
                <button onClick={handleView}>view</button>
                <button onClick={handleDownload}>download</button>
            </section>
        </>
    );
}

export default PdfDownload;
