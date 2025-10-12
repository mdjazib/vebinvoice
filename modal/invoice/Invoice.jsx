"use client"
import React, { useEffect, useState } from 'react'
import sass from "./invoice.module.sass"
import Image from 'next/image'

const Invoice = ({ ref, invoice = {
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
} }) => {
    const [subtotal, setSubTotal] = useState(0);
    useEffect(() => {
        if (invoice.data.length) {
            const sum = (a, b) => { return a + b };
            setSubTotal(invoice.data.map(e => e.price * e.qty).reduce(sum, 0));
        }
    }, [invoice.data]);
    return (
        <div ref={ref} className={sass.veb_invoice_preview}>
            <div className={sass.header}>
                <div className={sass.col}>
                    {invoice.advanced.logo === "" ? <></> : <Image src={invoice.advanced.logo} alt='Company Logo' width={100} height={100} />}
                    <div className={sass.text}>
                        <b>{invoice.advanced.heading}</b>
                        <h1>{invoice.company.name}</h1>
                    </div>
                </div>
                <div className={sass.col}>
                    <b>INV #{Date.now()}</b>
                </div>
            </div>
            {
                invoice.company.name.length ?
                    <div className={sass.details}>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Invoice Date:</th>
                                    <td>{new Date().toLocaleDateString()}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Payment Due Date:</th>
                                    <td>{new Date().toLocaleDateString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> : <></>
            }
            {
                invoice.company.name.length || !invoice.customer.walkIn ?
                    <div className={sass.details}>
                        {
                            invoice.company.name.length ?
                                <table>
                                    <tbody>
                                        <tr>
                                            <th colSpan={2}>Business details</th>
                                        </tr>
                                        {
                                            invoice.company.name.length ?
                                                <tr>
                                                    <th>Name:</th>
                                                    <td>{invoice.company.name}</td>
                                                </tr> : <></>
                                        }
                                        {
                                            invoice.company.email.length ?
                                                <tr>
                                                    <th>Email:</th>
                                                    <td>{invoice.company.email}</td>
                                                </tr> : <></>
                                        }
                                        {
                                            invoice.company.contact.length ?
                                                <tr>
                                                    <th>Contact:</th>
                                                    <td>{invoice.company.contact}</td>
                                                </tr> : <></>
                                        }
                                        {
                                            invoice.company.abn.length ?
                                                <tr>
                                                    <th>ABN:</th>
                                                    <td>{invoice.company.abn}</td>
                                                </tr> : <></>
                                        }
                                        {
                                            invoice.company.address.length ?
                                                <tr>
                                                    <th>Address:</th>
                                                    <td>{invoice.company.address}</td>
                                                </tr> : <></>
                                        }
                                    </tbody>
                                </table> : <></>
                        }
                        {
                            invoice.customer.walkIn ? <></> :
                                <table>
                                    <tbody>
                                        <tr>
                                            <th colSpan={2}>Customer details</th>
                                        </tr>
                                        {
                                            invoice.customer.name.length ?
                                                <tr>
                                                    <th>Name:</th>
                                                    <td>{invoice.customer.name}</td>
                                                </tr> : <></>
                                        }
                                        {
                                            invoice.customer.email.length ?
                                                <tr>
                                                    <th>Email:</th>
                                                    <td>{invoice.customer.email}</td>
                                                </tr> : <></>
                                        }
                                        {
                                            invoice.customer.name.length ?
                                                <tr>
                                                    <th>Contact:</th>
                                                    <td>{invoice.customer.contact}</td>
                                                </tr> : <></>
                                        }
                                        {
                                            invoice.customer.abn.length ?
                                                <tr>
                                                    <th>ABN:</th>
                                                    <td>{invoice.customer.abn}</td>
                                                </tr> : <></>
                                        }
                                        {
                                            invoice.customer.address.length ?
                                                <tr>
                                                    <th>Address:</th>
                                                    <td>{invoice.customer.address}</td>
                                                </tr> : <></>
                                        }
                                    </tbody>
                                </table>
                        }
                    </div> : <></>
            }
            {
                invoice.further[0]?.label.length ?
                    <div className={sass.further}>
                        <h2>Further details</h2>
                        <div className={sass.grid}>
                            {
                                invoice.further.map((item, i) => (
                                    <p key={i}><b>{item.label}:</b> <span>{item.value}</span></p>
                                ))
                            }
                        </div>
                    </div> : <></>
            }
            <div className={sass.description}>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>GST</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    {
                        invoice.data.length ?
                            <tbody>
                                {
                                    invoice.data.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.description}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.price}</td>
                                            <td>{(item.price * item.qty) * invoice.advanced.gst / 100}</td>
                                            <td>{item.qty * (item.price + (item.price * invoice.advanced.gst / 100))}</td>
                                        </tr>
                                    ))
                                }
                            </tbody> : <></>
                    }
                    <tfoot>
                        <tr>
                            <td colSpan={3}></td>
                            <td>Subtotal:</td>
                            <td>{subtotal}</td>
                        </tr>
                        <tr>
                            <td colSpan={3}></td>
                            <td>{invoice.advanced.gst}% GST:</td>
                            <td>{subtotal * invoice.advanced.gst / 100}</td>
                        </tr>
                        <tr>
                            <td colSpan={3}></td>
                            <th>Total:</th>
                            <th>{subtotal + (subtotal * invoice.advanced.gst / 100)} {invoice.advanced.currency}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {
                invoice.payment.bankName.length ?
                    <div className={sass.details}>
                        <table>
                            <tbody>
                                <tr>
                                    <th colSpan={2}>Payment Instructions</th>
                                </tr>
                                {
                                    invoice.payment.bankName ?
                                        <tr>
                                            <th>Bank:</th>
                                            <td>{invoice.payment.bankName}</td>
                                        </tr> : <></>
                                }
                                {
                                    invoice.payment.accountName ?
                                        <tr>
                                            <th>Account Name:</th>
                                            <td>{invoice.payment.accountName}</td>
                                        </tr> : <></>
                                }
                                {
                                    invoice.payment.accountNumber ?
                                        <tr>
                                            <th>Account Number:</th>
                                            <td>{invoice.payment.accountNumber}</td>
                                        </tr> : <></>
                                }
                                {
                                    invoice.payment.payId ?
                                        <tr>
                                            <th>Pay Id:</th>
                                            <td>{invoice.payment.payId}</td>
                                        </tr> : <></>
                                }
                                {
                                    invoice.payment.bsb ?
                                        <tr>
                                            <th>BSB:</th>
                                            <td>{invoice.payment.bsb}</td>
                                        </tr> : <></>
                                }
                            </tbody>
                        </table>
                    </div> : <></>
            }
            {
                invoice.footer.notes.length ?
                    <div className={sass.note}>
                        <b>Notes:</b>
                        <p>{invoice.footer.notes}</p>
                    </div> : <></>
            }
            {
                invoice.footer.terms.length ?
                    <div className={sass.note}>
                        <b>Terms & conditions:</b>
                        <p>{invoice.footer.terms}</p>
                    </div> : <></>
            }
        </div>
    )
}

export default Invoice