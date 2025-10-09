"use client"
import { Loader2 } from "lucide-react"
import Logo from "../Logo"
import sass from "./auth.module.sass"
import React, { useState } from 'react'
import { toast } from "sonner"
import axios from "axios"

const Content = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const auth = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formdata = new FormData();
            formdata.append("email", email);
            const { data } = await axios.post("/api/auth", formdata);
            setLoading(false);
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
                <div className={sass.input}>
                    <input type="text" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value) }} disabled={loading} />
                    <p>Email</p>
                </div>
                {loading ? <div className={sass.loader}><Loader2 /></div> : <input type="submit" value="Next" disabled={!email.includes("@gmail.com")} />}
            </form>
        </div>
    )
}

export default Content