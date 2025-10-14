"use client"
import React, { useEffect, useRef, useState } from 'react'
import sass from "../../dashboard.module.sass"
import Invoice from '@/modal/invoice/Invoice'
import { Loader2, Minus, Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'

const page = () => {
    const ref = useRef();
    const [tab, setTab] = useState(0);
    const [further, setFurther] = useState([{ label: "", value: "" }]);
    const [saving, setSaving] = useState(false);
    const [logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(true);
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
        }
    );
    useEffect(() => {
        setInvoice((prev) => ({ ...prev, further: further[0]?.label.length ? further : [{ label: "", value: "" }] }));
    }, [further]);
    const saveTemplate = async () => {
        try {
            if (!saving) {
                setSaving(true);
                const formdata = new FormData();
                formdata.append("invoice", JSON.stringify(invoice));
                formdata.append("logo", logo);
                const { data } = await axios.post("/api/invoice/template/save", formdata, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                data === 200 ? toast.success("Template saved successfully.") : toast.error("Something went wrong.");
                setSaving(false);
            }
        } catch (error) {
            toast.error("Something went wrong.");
            setSaving(false);
        }
    }
    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/api/invoice/template/fetch");
            data === 400 ? toast.error("Something went wrong.") : [setInvoice((prev) => ({ ...prev, ...data })), setLogo(data.advanced.logo), setFurther(data.further.length ? data.further : [{ label: "", value: "" }])];
            setLoading(false);
        })();
    }, []);
    return (
        <div className={sass.page}>
            <div className={sass.invoice_generator}>
                <div className={sass.form} style={loading ? { pointerEvents: "none" } : {}}>
                    <div className={sass.header}>
                        <h2>Template</h2>
                    </div>
                    <div className={sass.group}>
                        <div className={sass.childheader} onClick={() => { setTab(tab === 1 ? 0 : 1) }}>
                            <h3>Company</h3>
                            {tab === 1 ? <Minus /> : <Plus />}
                        </div>
                        <div className={sass.content} aria-current={tab === 1}>
                            <div className={sass.row}>
                                <div className={sass.input}>
                                    <input type="text" placeholder='placeholder' value={invoice.company.name} onChange={(e) => { setInvoice((prev) => ({ ...prev, company: { ...prev.company, name: e.target.value } })) }} />
                                    <p>Name</p>
                                </div>
                                <div className={sass.input}>
                                    <input type="text" placeholder='placeholder' value={invoice.company.email} onChange={(e) => { setInvoice((prev) => ({ ...prev, company: { ...prev.company, email: e.target.value } })) }} />
                                    <p>Email</p>
                                </div>
                                <div className={sass.input}>
                                    <input type="text" placeholder='placeholder' value={invoice.company.contact} onChange={(e) => { setInvoice((prev) => ({ ...prev, company: { ...prev.company, contact: e.target.value } })) }} />
                                    <p>Contact</p>
                                </div>
                                <div className={sass.input}>
                                    <input type="text" placeholder='placeholder' value={invoice.company.abn} onChange={(e) => { setInvoice((prev) => ({ ...prev, company: { ...prev.company, abn: e.target.value } })) }} />
                                    <p>ABN</p>
                                </div>
                            </div>
                            <div className={sass.input}>
                                <input type="text" placeholder='placeholder' value={invoice.company.address} onChange={(e) => { setInvoice((prev) => ({ ...prev, company: { ...prev.company, address: e.target.value } })) }} />
                                <p>Address</p>
                            </div>
                        </div>
                    </div>
                    <div className={sass.group}>
                        <div className={sass.childheader} onClick={() => { setTab(tab === 2 ? 0 : 2) }}>
                            <h3>Payment</h3>
                            {tab === 2 ? <Minus /> : <Plus />}
                        </div>
                        <div className={sass.content} aria-current={tab === 2}>
                            <div className={sass.row}>
                                <div className={sass.input}>
                                    <input type="text" placeholder='placeholder' value={invoice.payment.bankName} onChange={(e) => { setInvoice((prev) => ({ ...prev, payment: { ...prev.payment, bankName: e.target.value } })) }} />
                                    <p>Bank name</p>
                                </div>
                                <div className={sass.input}>
                                    <input type="text" placeholder='placeholder' value={invoice.payment.accountName} onChange={(e) => { setInvoice((prev) => ({ ...prev, payment: { ...prev.payment, accountName: e.target.value } })) }} />
                                    <p>Account name</p>
                                </div>
                                <div className={sass.input}>
                                    <input type="text" placeholder='placeholder' value={invoice.payment.accountNumber} onChange={(e) => { setInvoice((prev) => ({ ...prev, payment: { ...prev.payment, accountNumber: e.target.value } })) }} />
                                    <p>Account number</p>
                                </div>
                                <div className={sass.input}>
                                    <input type="text" placeholder='placeholder' value={invoice.payment.bsb} onChange={(e) => { setInvoice((prev) => ({ ...prev, payment: { ...prev.payment, bsb: e.target.value } })) }} />
                                    <p>BSB</p>
                                </div>
                            </div>
                            <div className={sass.input}>
                                <input type="text" placeholder='placeholder' value={invoice.payment.payId} onChange={(e) => { setInvoice((prev) => ({ ...prev, payment: { ...prev.payment, payId: e.target.value } })) }} />
                                <p>Pay Id</p>
                            </div>
                        </div>
                    </div>
                    <div className={sass.group}>
                        <div className={sass.childheader} onClick={() => { setTab(tab === 3 ? 0 : 3) }}>
                            <h3>Footer</h3>
                            {tab === 3 ? <Minus /> : <Plus />}
                        </div>
                        <div className={sass.content} aria-current={tab === 3}>
                            <div className={`${sass.input} ${sass.text}`}>
                                <textarea placeholder='placeholder' value={invoice.footer.notes} onChange={(e) => { setInvoice((prev) => ({ ...prev, footer: { ...prev.footer, notes: e.target.value } })) }}></textarea>
                                <p>Notes</p>
                            </div>
                            <div className={`${sass.input} ${sass.text}`}>
                                <textarea placeholder='placeholder' value={invoice.footer.terms} onChange={(e) => { setInvoice((prev) => ({ ...prev, footer: { ...prev.footer, terms: e.target.value } })) }}></textarea>
                                <p>Terms</p>
                            </div>
                        </div>
                    </div>
                    <div className={sass.group}>
                        <div className={sass.childheader} onClick={() => { setTab(tab === 4 ? 0 : 4) }}>
                            <h3>Advanced</h3>
                            {tab === 4 ? <Minus /> : <Plus />}
                        </div>
                        <div className={sass.content} aria-current={tab === 4}>
                            <div className={sass.row}>
                                <div className={sass.input}>
                                    <input type="text" placeholder='placeholder' value={invoice.advanced.heading} onChange={(e) => { setInvoice((prev) => ({ ...prev, advanced: { ...prev.advanced, heading: e.target.value } })) }} />
                                    <p>Heading</p>
                                </div>
                                <div className={sass.input}>
                                    {
                                        invoice.advanced.logo === "" ?
                                            <>
                                                <input type="file" hidden id='companyLogo' accept='image/*' value={invoice.advanced.logo} onChange={(e) => {
                                                    setLogo(e.target.files[0]);
                                                    setInvoice((prev) => ({ ...prev, advanced: { ...prev.advanced, logo: window.URL.createObjectURL(e.target.files[0]) } }));
                                                }} />
                                                <label htmlFor="companyLogo">Choose Logo</label>
                                            </>
                                            : <label onClick={() => { setInvoice((prev) => ({ ...prev, advanced: { ...prev.advanced, logo: "" } })); setLogo(null) }}> Remove Logo</label>
                                    }
                                </div>
                                <div className={sass.input}>
                                    <input type="text" placeholder='placeholder' value={invoice.advanced.currency} onChange={(e) => { setInvoice((prev) => ({ ...prev, advanced: { ...prev.advanced, currency: e.target.value } })) }} />
                                    <p>Currency</p>
                                </div>
                                <div className={sass.input}>
                                    <input type="text" placeholder='placeholder' value={invoice.advanced.gst} onChange={(e) => { setInvoice((prev) => ({ ...prev, advanced: { ...prev.advanced, gst: e.target.value } })) }} />
                                    <p>GST</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={sass.group}>
                        <div className={sass.childheader} onClick={() => { setTab(tab === 5 ? 0 : 5) }}>
                            <h3>Further</h3>
                            {tab === 5 ? <Minus /> : <Plus />}
                        </div>
                        <div className={sass.content} aria-current={tab === 5}>
                            {
                                further.map((item, i) => (
                                    <div key={i} className={sass.flex}>
                                        <div className={sass.input}>
                                            <input
                                                type="text"
                                                placeholder="Label"
                                                value={item.label}
                                                onChange={(e) => {
                                                    const updated = [...further];
                                                    updated[i] = { ...updated[i], label: e.target.value };
                                                    setFurther(updated);
                                                }}
                                            />
                                            <p>Field</p>
                                        </div>
                                        <div className={sass.input}>
                                            <input
                                                type="text"
                                                placeholder="Value"
                                                value={item.value}
                                                onChange={(e) => {
                                                    const updated = [...further];
                                                    updated[i] = { ...updated[i], value: e.target.value };
                                                    setFurther(updated);
                                                }}
                                            />
                                            <p>Value</p>
                                        </div>

                                        {i === 0 ? (
                                            <div
                                                className={sass.btn}
                                                onClick={() => {
                                                    setFurther((prev) => [...prev, { label: "", value: "" }]);
                                                }}
                                            >
                                                <Plus />
                                            </div>
                                        ) : (
                                            <div
                                                className={sass.btn}
                                                onClick={() => {
                                                    const updated = [...further];
                                                    updated.splice(i, 1);
                                                    setFurther(updated);
                                                }}
                                            >
                                                <X />
                                            </div>
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <button onClick={saveTemplate} style={saving ? { pointerEvents: "none" } : {}}>{saving ? <Loader2 /> : "Save"}</button>
                </div>
                <div className={sass.preview}>
                    {
                        loading ? <div className={sass.temploading}><Loader2 /><p>Loading template...</p></div> : <Invoice ref={ref} invoice={invoice} />
                    }
                </div>
            </div>
        </div >
    )
}

export default page