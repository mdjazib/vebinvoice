"use client"
import React, { useState } from 'react'
import sass from "../app/dashboard/dashboard.module.sass"
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CreateInvoice = ({ setCreateInvoiceModal }) => {
    const router = useRouter();
    const [isCustomerExist, setIsCustomerExist] = useState(false);
    return (
        <div className={sass.modal_overlay}>
            <div className={sass.create_invoice}>
                <div className={sass.header}>
                    <h2>{isCustomerExist ? "Customer details" : "Create Invoice"}</h2>
                    <X onClick={() => { setCreateInvoiceModal(false) }} />
                </div>
                <div className={sass.input}>
                    <p>Customer Email</p>
                    <input type="text" />
                </div>
                {
                    isCustomerExist ?
                        <>
                            <div className={sass.input}>
                                <p>Customer Name</p>
                                <input type="text" />
                            </div>
                            <div className={sass.input}>
                                <p>Customer Contact</p>
                                <input type="text" />
                            </div>
                            <div className={sass.input}>
                                <p>Customer Address</p>
                                <input type="text" />
                            </div>
                            <div className={sass.input}>
                                <p>Customer ABN</p>
                                <input type="text" />
                            </div>
                        </> : <></>
                }
                <div className={sass.cta}>
                    {isCustomerExist ? <></> : <button onClick={() => { setCreateInvoiceModal(false); router.push("/dashboard/invoice/create") }}>Walk-in Customer</button>}
                    <button onClick={() => { isCustomerExist ? [setCreateInvoiceModal(false), router.push("/dashboard/invoice/create")] : setIsCustomerExist(true) }}>Next</button>
                </div>
            </div>
        </div >
    )
}

export default CreateInvoice