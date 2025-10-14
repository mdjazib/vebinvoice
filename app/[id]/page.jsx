"use client"
import Invoice from '@/modal/invoice/Invoice'
import { useStore } from '@/useStore';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const page = () => {
    const { id } = useParams();
    const { setINV } = useStore();
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
            void: false
        }
    );
    useEffect(() => {
        setINV(id);
        (async () => {
            try {
                const { data } = await axios.get(`/api/invoice/${id}`);
                setInvoice((prev) => ({ ...prev, ...data }));
                setLoading(false);
            } catch (error) {
                toast.error("Something went wrong.");
            }
        })();
    }, []);
    return (
        <div className="inv-customer-preview">
            {loading ? <div className="loading"><Loader2 /> <span>Loading...</span></div> : <Invoice invoice={invoice} />}
        </div>
    )
}

export default page