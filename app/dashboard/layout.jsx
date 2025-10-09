"use client"
import React, { useEffect, useState } from "react"
import sass from "./dashboard.module.sass"
import Logo from "../Logo"
import { BadgePlus, LayoutGrid, LogOut, Moon, ScanText, Scroll, ScrollText, Sun, TextAlignJustify, X } from "lucide-react"
import Link from "next/link"
import CreateInvoice from "@/modal/CreateInvoice"
import { usePathname } from "next/navigation"
import { Toaster } from "sonner"

const RootLayout = ({ children }) => {
    const pathname = usePathname();
    const [menu, setMenu] = useState(false);
    const [createInvoiceModal, setCreateInvoiceModal] = useState(false);
    const [appTheme, setAppTheme] = useState(true);
    const theme = {
        light: {
            "--base-color": "lch(100 0 0)",
            "--accent-color": "lch(36.94 59.85 9.8)",
            "--text-color": "lch(3.32 0 0)"
        },
        dark: {
            "--base-color": "lch(3.32 0 0)",
            "--accent-color": "lch(36.94 59.85 9.8)",
            "--text-color": "lch(90 0 0)"
        }
    }
    const updateTheme = () => {
        const theme = !appTheme;
        localStorage.setItem("vebinvoice.theme", theme);
        setAppTheme(theme);
    }
    useEffect(() => {
        setAppTheme(localStorage.getItem("vebinvoice.theme") === "false" ? false : true);
    }, []);
    return (
        <>
            <Toaster position="top-center" />
            <div id={sass.dashboard} aria-description={appTheme ? "--light" : "--dark"} style={appTheme ? theme.light : theme.dark}>
                {createInvoiceModal && <CreateInvoice setCreateInvoiceModal={setCreateInvoiceModal} />}
                <header>
                    <div className={sass.cta}>
                        <div className={sass.theme_switch} onClick={() => { setMenu(!menu) }}>{menu ? <X /> : <TextAlignJustify />}</div>
                    </div>
                    <div className={sass.logo}>
                        <Logo />
                        <h1>Veb Invoice</h1>
                    </div>
                    <div className={sass.search}>
                        <input type="text" placeholder="Search everything ( Ctrl + K )" />
                        <ScanText />
                    </div>
                    <div className={sass.cta}>
                        <div className={sass.create_invoice} onClick={() => { setCreateInvoiceModal(!createInvoiceModal) }}>Create Invoice</div>
                        <div className={sass.theme_switch} onClick={updateTheme}>{appTheme ? <Moon /> : <Sun />}</div>
                    </div>
                </header>
                <main>
                    <nav aria-current={menu}>
                        <ul>
                            <li><h5>Menu</h5></li>
                            <li><Link href="/dashboard" className={pathname === "/dashboard" ? sass.active : sass.inactive}><LayoutGrid /><span>Dashboard</span></Link></li>
                        </ul>
                        <ul>
                            <li><h5>Invoice</h5></li>
                            <li><Link href="javascript:void(0)" className={pathname === "/dashboard/invoice/create" ? sass.active : sass.inactive} onClick={() => { setCreateInvoiceModal(!createInvoiceModal) }}><BadgePlus /><span>New Invoice</span></Link></li>
                            <li><Link href="/dashboard/invoice/view"><ScrollText /><span>All Invoices</span></Link></li>
                            <li><Link href="/dashboard/template"><Scroll /><span>Template</span></Link></li>
                        </ul>
                        <ul>
                            <li><h5>Account</h5></li>
                            <li><Link href="javascript:void(0)"><LogOut /><span>Log out</span></Link></li>
                        </ul>
                    </nav>
                    <div className={sass.viewport}>
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}

export default RootLayout