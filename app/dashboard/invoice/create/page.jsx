"use client"
import React, { useRef, useState } from 'react'
import sass from "../../dashboard.module.sass"
import Invoice from '@/modal/invoice/Invoice'
import domtoimage from "dom-to-image-more"
import { toast } from 'sonner'

const page = () => {
    const ref = useRef();
    const [invoiceId, setInvoiceId] = useState(0);
    const handleImageDownload = async () => {
        if (!ref.current) return;
        const scale = 3;
        ref.current.style.minHeight = "fit-content";
        const style = {
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${ref.current.offsetWidth}px`,
            height: `${ref.current.offsetHeight}px`,
        };
        const param = {
            width: ref.current.offsetWidth * scale,
            height: ref.current.offsetHeight * scale,
            style,
        };
        domtoimage.toPng(ref.current, param)
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = `#${invoiceId}-vebinvoice.png`;
                link.click();
            })
            .catch((err) => {
                toast.error("Something went wrong.");
            });
        setTimeout(() => {
            ref.current.style.minHeight = "unset";
        }, 0);
    };
    return (
        <div className={sass.page}>
            <div className={sass.invoice_generator}>
                <div className={sass.preview}><Invoice ref={ref} /></div>
                <div className={sass.form}>
                    <button onClick={handleImageDownload}>Download</button>
                </div>
            </div>
        </div>
    )
}

export default page