"use client"
import React, { useEffect, useRef, useState } from 'react'
import sass from "../../../dashboard.module.sass"
import Invoice from '@/modal/invoice/Invoice'
import domtoimage from "dom-to-image-more"
import { toast } from 'sonner'
import axios from 'axios'
import { Copy, ImageDown, Loader2, Mail, Plus, Printer, X } from 'lucide-react'
import { useStore } from '@/useStore'
import copy from 'copy-to-clipboard'

const page = () => {
    const ref = useRef();
    const { customer, inv } = useStore();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([{ description: "", qty: 1, price: 0 }]);
    const [generating, setGenerating] = useState(false);
    const [generated, setGenerated] = useState(0);
    const [sending, setSending] = useState(false);
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
            data: [],
            void: false,
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
                link.download = `#${generated}-vebinvoice.png`;
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
    const generateInvoice = async () => {
        try {
            if (!generating) {
                setGenerating(true);
                const formdata = new FormData();
                formdata.append("inv", inv);
                formdata.append("invoice", JSON.stringify(invoice));
                const { data } = await axios.post("/api/invoice/generate", formdata, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                setGenerating(false);
                if (data === 400) {
                    toast.error("Something went wrong.");
                } else {
                    setGenerated(Number(data));
                }
            }
        } catch (error) {
            toast.error("Something went wrong.");
            setGenerating(false);
        }
    }
    const sendMail = async () => {
        try {
            if (!sending) {
                setSending(true);
                const formdata = new FormData();
                formdata.append("email", invoice.customer.email);
                formdata.append("company", invoice.company.name.length ? invoice.company.name : "Veb Invoice");
                formdata.append("url", `${window.location.origin}/${generated}`);
                formdata.append("id", generated);
                const { data } = await axios.post("/api/invoice/send", formdata, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                data === 200 ? toast.success("Invoice has been sent. Delivery may take up to 5 minutes.") : toast.error("Something went wrong.");
                setSending(false);
            }
        } catch (error) {
            toast.error("Something went wrong.");
            setSending(false);
        }
    }
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
                    {
                        loading ? <></> :
                            <>
                                {
                                    generated === inv ? <div className={sass.cta}>
                                        <button onClick={handleImageDownload}><ImageDown /><span>Download</span></button>
                                        <button onClick={() => { window.print() }}><Printer /><span>Print</span></button>
                                        <button onClick={() => { copy(`${window.location.origin}/${generated}`); toast.success("Invoice link copied!") }}><Copy /><span>Copy Link</span></button>
                                        {invoice.customer.walkIn ? <></> : <button onClick={sendMail}>{sending ? <><Loader2 /><span>Sending...</span></> : <><Mail /><span>Send Mail</span></>}</button>}
                                    </div> : <button onClick={generateInvoice}>{generating ? "Generating..." : "Generate Invoice"}</button>
                                }
                            </>
                    }
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