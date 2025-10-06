"use client"
import React from 'react'
import sass from "./dashboard.module.sass"
import { BanknoteArrowDown, BanknoteArrowUp, HandCoins, ScrollText } from 'lucide-react'
import Link from 'next/link'

const page = () => {
    return (
        <div className={sass.page}>
            <div className={sass.overview}>
                <div className={sass.header}>
                    <h2>Overview</h2>
                    <div className={sass.switches}>
                        <p className={sass.active}>Overall</p>
                        <p>Monthly</p>
                        <p>Weekly</p>
                    </div>
                </div>
                <div className={sass.cards}>
                    <div className={sass.card}>
                        <p><BanknoteArrowDown /> <span>Revenue</span></p>
                        <h1>$50,000.90</h1>
                    </div>
                    <div className={sass.card}>
                        <p><HandCoins /> <span>Profit</span></p>
                        <h1>$45000</h1>
                    </div>
                    <div className={sass.card}>
                        <p><BanknoteArrowUp /> <span>GST</span></p>
                        <h1>$500</h1>
                    </div>
                    <div className={sass.card}>
                        <p><ScrollText /> <span>Invoices</span></p>
                        <h1>784</h1>
                    </div>
                </div>
            </div>
            <div className={sass.collxb}>
                <div className={sass.recents}>
                    <div className={sass.header}>
                        <h2>Recent Invoices</h2>
                        <Link href="/dashboard/invoice/view">See all</Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Invoice Id</th>
                                <th>Client Name</th>
                                <th>Email</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>#09435435</td>
                                <td>Muhammad Jazib</td>
                                <td>mjxdex@gmail.com</td>
                                <td>$2,400</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>#09435436</td>
                                <td>Sarah Ahmed</td>
                                <td>sarah.ahmed@outlook.com</td>
                                <td>$1,250</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>#09435437</td>
                                <td>Daniel Khan</td>
                                <td>daniel.khan@gmail.com</td>
                                <td>$3,780</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>#09435438</td>
                                <td>Ayesha Malik</td>
                                <td>ayesha.malik@yahoo.com</td>
                                <td>$890</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>#09435439</td>
                                <td>Rizwan Sheikh</td>
                                <td>rizwan.sheikh@protonmail.com</td>
                                <td>$1,540</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>#09435440</td>
                                <td>Fatima Noor</td>
                                <td>fatima.noor@gmail.com</td>
                                <td>$420</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={sass.more}>
                    <div className={sass.dcoll}>
                        <div className={sass.header}>
                            <h2>Company details</h2>
                            <Link href="/dashboard/template">Edit</Link>
                        </div>
                        <div className={sass.details}>
                            <p><span>Name:</span> <span>Veb Edge</span></p>
                            <p><span>Email:</span> <span>invoice@vebedge.com</span></p>
                            <p><span>Website:</span> <span>vebedge.com</span></p>
                        </div>
                    </div>
                    <div className={sass.dcoll}>
                        <div className={sass.ads}>
                            <span>Advertisement</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={sass.powered}>
                <div className={sass.col}>
                    <span>Country: Australia</span>
                    <span>Currency: AUD</span>
                    <span>GST: 10%</span>
                </div>
                <div className={sass.col}>
                    <span>Powered by: Veb Edge</span>
                    <span>Version: 1.0.0</span>
                </div>
            </div>
        </div>
    )
}

export default page