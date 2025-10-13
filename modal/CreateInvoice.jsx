"use client"
import React, { useEffect, useState } from 'react'
import sass from "../app/dashboard/dashboard.module.sass"
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import { useStore } from '@/useStore'

const CreateInvoice = ({ setCreateInvoiceModal }) => {
    const router = useRouter();
    const { setCustomer: setCustomerInStore } = useStore();
    const [isCustomerExist, setIsCustomerExist] = useState(false);
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState({ name: "", address: "", contact: "", abn: "", walkin: false, email: "" });
    const [email, setEmail] = useState("");
    const findCustomer = async () => {
        try {
            if (!loading) {
                if (email.includes("@gmail.com")) {
                    setLoading(true);
                    const formdata = new FormData();
                    formdata.append("email", email);
                    const { data } = await axios.post("/api/customer/find/one", formdata, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    setLoading(false);
                    if (data === 400) {
                        toast.error("Something went wrong.");
                    } else {
                        setCustomer((prev) => ({ ...prev, ...data }))
                        setIsCustomerExist(true);
                    }
                } else {
                    toast.error("Email can't be empty.");
                }
            }
        } catch (error) {
            toast.error("Something went wrong.");
            setLoading(false);
        }
    }
    useEffect(() => {
        setCustomer((prev) => ({ ...prev, email }));
    }, [email]);
    const saveCustomer = async () => {
        try {
            if (!loading) {
                if (email.includes("@gmail.com")) {
                    setLoading(true);
                    const formdata = new FormData();
                    formdata.append("email", email);
                    formdata.append("name", customer.name);
                    formdata.append("contact", customer.contact);
                    formdata.append("address", customer.address);
                    formdata.append("abn", customer.abn);
                    const { data } = await axios.post("/api/customer/save", formdata, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    setLoading(false);
                    if (data === 400) {
                        toast.error("Something went wrong.");
                    } else {
                        setCustomerInStore(customer);
                        router.push("/dashboard/invoice/create");
                        setCreateInvoiceModal(false);
                    }
                } else {
                    toast.error("Email can't be empty.");
                }
            }
        } catch (error) {
            toast.error("Something went wrong.");
            setLoading(false);
        }
    }
    return (
        <div className={sass.modal_overlay}>
            <div className={sass.create_invoice}>
                <div className={sass.header}>
                    <h2>{isCustomerExist ? "Customer details" : "Create Invoice"}</h2>
                    <X onClick={() => { setCreateInvoiceModal(false) }} />
                </div>
                <div className={sass.input}>
                    <p>Customer Email</p>
                    <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} disabled={isCustomerExist} />
                </div>
                {
                    isCustomerExist ?
                        <>
                            <div className={sass.input}>
                                <p>Customer Name</p>
                                <input type="text" value={customer.name} onChange={(e) => { setCustomer((prev) => ({ ...prev, name: e.target.value })) }} />
                            </div>
                            <div className={sass.input}>
                                <p>Customer Contact</p>
                                <input type="text" value={customer.contact} onChange={(e) => { setCustomer((prev) => ({ ...prev, contact: e.target.value })) }} />
                            </div>
                            <div className={sass.input}>
                                <p>Customer Address</p>
                                <input type="text" value={customer.address} onChange={(e) => { setCustomer((prev) => ({ ...prev, address: e.target.value })) }} />
                            </div>
                            <div className={sass.input}>
                                <p>Customer ABN</p>
                                <input type="text" value={customer.abn} onChange={(e) => { setCustomer((prev) => ({ ...prev, abn: e.target.value })) }} />
                            </div>
                        </> : <></>
                }
                <div className={sass.cta}>
                    {isCustomerExist ? <></> : <button onClick={() => { setCreateInvoiceModal(false); router.push("/dashboard/invoice/create"); setCustomerInStore({ walkIn: true }) }}>Walk-in Customer</button>}
                    <button onClick={() => { isCustomerExist ? saveCustomer() : findCustomer() }}>{loading ? "Loading..." : "Next"}</button>
                </div>
            </div>
        </div >
    )
}

export default CreateInvoice