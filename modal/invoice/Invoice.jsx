"use client"
import React from 'react'
import sass from "./invoice.module.sass"
import Image from 'next/image'

const Invoice = ({ ref }) => {
    return (
        <div ref={ref} className={sass.veb_invoice_preview}>
            <div className={sass.header}>
                <div className={sass.col}>
                    <Image src={"/company.png"} alt='Company Logo' width={100} height={100} />
                    <div className={sass.text}>
                        <b>tax invoice</b>
                        <h1>V WEB</h1>
                    </div>
                </div>
                <div className={sass.col}>
                    <b>#008403804</b>
                    <p>Invoice Number</p>
                </div>
            </div>
            <div className={sass.details}>
                <table>
                    <tbody>
                        <tr>
                            <th>Invoice Date:</th>
                            <td>10/8/2025</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th>Payment Due Date:</th>
                            <td>10/8/2025</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={sass.details}>
                <table>
                    <tbody>
                        <tr>
                            <th colSpan={2}>Business details</th>
                        </tr>
                        <tr>
                            <th>Name:</th>
                            <td>V WEB</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>invoice@website.com</td>
                        </tr>
                        <tr>
                            <th>Contact:</th>
                            <td>+92 321 4310717</td>
                        </tr>
                        <tr>
                            <th>ABN:</th>
                            <td>1234 5678 4321</td>
                        </tr>
                        <tr>
                            <th>Address:</th>
                            <td>Pakistan, Lahore, Shahdara</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th colSpan={2}>Customer details</th>
                        </tr>
                        <tr>
                            <th>Name:</th>
                            <td>Muhammad Jazib</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>mjxdex@gmail.com</td>
                        </tr>
                        <tr>
                            <th>Contact:</th>
                            <td>+92 321 4310717</td>
                        </tr>
                        <tr>
                            <th>ABN:</th>
                            <td>1234 5678 4321</td>
                        </tr>
                        <tr>
                            <th>Address:</th>
                            <td>Pakistan, Lahore, Shahdara</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={sass.further}>
                <h2>Further details</h2>
                <div className={sass.grid}>
                    <p><b>Feild:</b> <span>Data</span></p>
                    <p><b>Feild:</b> <span>Data</span></p>
                </div>
            </div>
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
                    <tbody>
                        <tr>
                            <td>Service</td>
                            <td>1</td>
                            <td>100</td>
                            <td>10</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>Service</td>
                            <td>1</td>
                            <td>100</td>
                            <td>10</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>Service</td>
                            <td>1</td>
                            <td>100</td>
                            <td>10</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>Service</td>
                            <td>1</td>
                            <td>100</td>
                            <td>10</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>Service</td>
                            <td>1</td>
                            <td>100</td>
                            <td>10</td>
                            <td>100</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}></td>
                            <td>Subtotal:</td>
                            <td>400</td>
                        </tr>
                        <tr>
                            <td colSpan={3}></td>
                            <td>10% GST:</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td colSpan={3}></td>
                            <th>Total:</th>
                            <th>440 AUD</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className={sass.details}>
                <table>
                    <tbody>
                        <tr>
                            <th colSpan={2}>Payment Instructions</th>
                        </tr>
                        <tr>
                            <th>Bank:</th>
                            <td>Meezan</td>
                        </tr>
                        <tr>
                            <th>Account Name:</th>
                            <td>Muhammad Jazib</td>
                        </tr>
                        <tr>
                            <th>BSB:</th>
                            <td>123 456</td>
                        </tr>
                        <tr>
                            <th>Account Number:</th>
                            <td>1234 5678 4321 8765</td>
                        </tr>
                        <tr>
                            <th>Pay Id:</th>
                            <td>43543543503</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={sass.note}>
                <b>Notes:</b>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium odit dicta debitis atque temporibus neque numquam maxime voluptate eveniet ipsum!</p>
            </div>
            <div className={sass.note}>
                <b>Terms & conditions:</b>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium odit dicta debitis atque temporibus neque numquam maxime voluptate eveniet ipsum!</p>
            </div>
        </div>
    )
}

export default Invoice