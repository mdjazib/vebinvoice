"use client"
import React, { useEffect, useRef, useState } from 'react'
import sass from "../../dashboard.module.sass"
import Invoice from '@/modal/invoice/Invoice'
import domtoimage from "dom-to-image-more"
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2, Plus, X } from 'lucide-react'
import { useStore } from '@/useStore'

const page = () => {
    const ref = useRef();
    const { customer } = useStore();
    const [invoiceId, setInvoiceId] = useState(0);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([{ description: "", qty: 1, price: 0 }]);
    const [invoice, setInvoice] = useState(
        {
            company: {
                name: "",
                email: "",
                contact: "",
                address: "",
                abn: ""
            },
            customer: {
                walkIn: true,
                name: "",
                email: "",
                contact: "",
                address: "",
                abn: ""
            },
            payment: {
                bankName: "",
                accountName: "",
                accountNumber: "",
                bsb: "",
                payId: ""
            },
            footer: {
                notes: "",
                terms: ""
            },
            advanced: {
                heading: "TAX INVOICE",
                logo: "",
                currency: "AUD",
                gst: "10"
            },
            further: [],
            data: []
        }
    );
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
    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/invoice/template/fetch");
            data === 400 ? toast.error("Something went wrong.") : setInvoice((prev) => ({ ...prev, ...data }));
            setLoading(false);
        })();
    }, []);
    useEffect(() => {
        setInvoice((prev) => ({ ...prev, data: items }));
    }, [items]);
    useEffect(() => {
        setInvoice((prev) => ({ ...prev, customer: { ...customer } }));
    }, [customer]);
    return (
        <div className={sass.page}>
            <div className={sass.invoice_generator}>
                <div className={sass.form} style={loading ? { pointerEvents: "none" } : {}}>
                    <div className={sass.header}>
                        <h2>New Invoice</h2>
                    </div>
                    <div className={sass.group}>
                        <div className={sass.childheader}>
                            <h3>Items</h3>
                        </div>
                        <div className={sass.content} aria-current={true}>
                            {
                                items.map((item, i) => (
                                    <div key={i} className={sass.flex}>
                                        <div className={sass.input}>
                                            <input type="text" placeholder='placeholder' value={item.description}
                                                onChange={(e) => {
                                                    const updated = [...items];
                                                    items[i].description = e.target.value;
                                                    setItems(updated)
                                                }}
                                            />
                                            <p>Description</p>
                                        </div>
                                        <div className={sass.input} style={{ maxWidth: "51px" }}>
                                            <input type="text" placeholder='placeholder' value={item.qty}
                                                onChange={(e) => {
                                                    const updated = [...items];
                                                    items[i].qty = Number(e.target.value);
                                                    setItems(updated)
                                                }} />
                                            <p>Qty</p>
                                        </div>
                                        <div className={sass.input} style={{ maxWidth: "100px" }}>
                                            <input type="text" placeholder='placeholder' value={item.price}
                                                onChange={(e) => {
                                                    const updated = [...items];
                                                    items[i].price = Number(e.target.value);
                                                    setItems(updated)
                                                }} />
                                            <p>Price</p>
                                        </div>
                                        {
                                            i === 0 ?
                                                <div className={sass.btn} onClick={() => { setItems((prev) => ([...prev, { description: "", qty: 1, price: 0 }])); }}>
                                                    <Plus />
                                                </div> :
                                                <div className={sass.btn} onClick={() => {
                                                    const updated = [...items];
                                                    updated.splice(i, 1);
                                                    setItems(updated);
                                                }}>
                                                    <X />
                                                </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <button onClick={handleImageDownload}>Download</button>
                </div>
                <div className={sass.preview}>
                    {
                        loading ? <div className={sass.temploading}><Loader2 /><p>Loading template...</p></div> : <Invoice ref={ref} invoice={invoice} />
                    }
                </div>
            </div>
        </div>
    )
}

export default page