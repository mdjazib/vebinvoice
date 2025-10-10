"use client"
import { Loader2 } from "lucide-react"
import Logo from "../Logo"
import sass from "./auth.module.sass"
import React, { useEffect, useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { toast } from "sonner"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

const Content = () => {
    const router = useRouter();
    const url = useSearchParams();
    const token = url.get("token");
    const [loading, setLoading] = useState(false);
    const [deviceId, setDeviceId] = useState("");
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fpPromise = FingerprintJS.load();
        (async () => {
            const fp = await fpPromise
            const result = await fp.get()
            const visitorId = result.visitorId
            setDeviceId(visitorId);
            if (token) {
                (async () => {
                    const { data } = await axios.get(`/api/auth?token=${token}&device=${visitorId}`);
                    data === 200 ? router.push("/dashboard") : [toast.error("Something went wrong."), setError(true)];
                })()
            }
        })()
    }, []);
    const auth = async (e) => {
        e.preventDefault();
        try {
            if (deviceId.length) {
                setLoading(true);
                const formdata = new FormData();
                formdata.append("email", email);
                formdata.append("deviceId", deviceId);
                const { data } = await axios.post("/api/auth", formdata);
                data === 200 ? setSent(true) : toast.error("Something went wrong.");
                setLoading(false);
            } else {
                toast.error("Something went wrong.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
            setLoading(false);
        }
    }
    return (
        <div className={sass.auth}>
            <form onSubmit={auth}>
                <div className={sass.header}>
                    <Logo />
                    <h2>Veb Invoice</h2>
                    <p>Smart, Simple & Secure Invoice Management</p>
                </div>
                {
                    error ? <p className={sass.sent}><span>Sign-in failed. Your link may have expired, or we detected changes in your network or device.</span><Link href="/auth" onClick={() => { setError(false); }}>Try again</Link></p>
                        : token ?
                            <>
                                <div className={sass.loader}><Loader2 /> <p>Signing you in...</p></div>
                            </>
                            : sent ?
                                <p className={sass.sent}><span>A sign-in link has been sent to your email address. Please allow up to 5 minutes for it to arrive.</span><a href="https://mail.google.com/">Open Gmail</a></p>
                                : <>
                                    <div className={sass.input}>
                                        <input type="text" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} disabled={loading} />
                                        <p>Email</p>
                                    </div>
                                    {loading ? <div className={sass.loader}><Loader2 /></div> : <input type="submit" value="Next" disabled={!email.includes("@gmail.com")} />}
                                </>
                }
            </form>
        </div>
    )
}

export default Content