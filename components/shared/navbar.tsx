"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import Container from "@/components/shared/container";
import { NAV_LINKS, SITE_NAME } from "@/constants";

function SocialBar() {
    return (
        <div className="bg-[#001B33] text-white">
            <Container>
                <div className="flex min-h-10 items-center justify-between gap-3 py-2">
                    <div className="hidden items-center gap-6 text-xs font-semibold text-white sm:flex md:text-sm">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://homeowner.trustpatrick.com/register"
                            className="transition-opacity hover:opacity-80"
                        >
                            Homeowner: Create Account
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://pros.trustpatrick.com/get-listed/"
                            className="transition-opacity hover:opacity-80"
                        >
                            Contractor: Get Listed
                        </a>
                    </div>

                    <div className="ml-auto flex items-center gap-3 sm:gap-5">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.facebook.com/trustpatrick101"
                            className="transition-opacity hover:opacity-80"
                            aria-label="Facebook"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.6562 0H2.34375C1.05151 0 0 1.05151 0 2.34375V13.6562C0 14.9485 1.05151 16 2.34375 16H7.0625V10.3438H5.1875V7.53125H7.0625V5.625C7.0625 4.0741 8.3241 2.8125 9.875 2.8125H12.7188V5.625H9.875V7.53125H12.7188L12.25 10.3438H9.875V16H13.6562C14.9485 16 16 14.9485 16 13.6562V2.34375C16 1.05151 14.9485 0 13.6562 0Z" fill="currentColor"></path></svg>
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.linkedin.com/company/trust-patrick-referral-network/"
                            className="transition-opacity hover:opacity-80"
                            aria-label="LinkedIn"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.4326 0.249992H1.56758C1.21447 0.250564 0.876001 0.391175 0.626432 0.640979C0.376862 0.890783 0.236568 1.22938 0.236328 1.58249V14.4175C0.23657 14.7706 0.376864 15.1092 0.626433 15.359C0.876003 15.6088 1.21447 15.7494 1.56758 15.75H14.4326C14.7857 15.7494 15.1242 15.6088 15.3737 15.359C15.6233 15.1092 15.7636 14.7706 15.7638 14.4175V1.58249C15.7636 1.22938 15.6233 0.890783 15.3737 0.640979C15.1242 0.391175 14.7857 0.250564 14.4326 0.249992ZM2.81383 3.37999C2.81429 3.19659 2.88743 3.02084 3.01724 2.89127C3.14704 2.7617 3.32292 2.68887 3.50633 2.68874H4.57883C4.76211 2.68892 4.93783 2.7618 5.06742 2.8914C5.19702 3.02099 5.2699 3.19671 5.27008 3.37999V4.45374C5.2699 4.63702 5.19702 4.81274 5.06742 4.94234C4.93783 5.07193 4.76211 5.14482 4.57883 5.14499H3.50633C3.32292 5.14487 3.14704 5.07204 3.01724 4.94247C2.88743 4.81289 2.81429 4.63715 2.81383 4.45374V3.37999ZM5.54633 13.0975C5.54642 13.154 5.52411 13.2082 5.48427 13.2483C5.44443 13.2884 5.39033 13.311 5.33383 13.3112H2.75883C2.70233 13.311 2.64822 13.2884 2.60839 13.2483C2.56855 13.2082 2.54623 13.154 2.54633 13.0975V5.57624C2.54623 5.51974 2.56855 5.46551 2.60839 5.42543C2.64822 5.38536 2.70233 5.36273 2.75883 5.36249H5.33383C5.39033 5.36273 5.44443 5.38536 5.48427 5.42543C5.52411 5.46551 5.54642 5.51974 5.54633 5.57624V13.0975ZM13.4538 13.0975C13.4539 13.154 13.4316 13.2082 13.3918 13.2483C13.3519 13.2884 13.2978 13.311 13.2413 13.3112H11.1613C11.1048 13.311 11.0507 13.2884 11.0109 13.2483C10.971 13.2082 10.9487 13.154 10.9488 13.0975V9.00374C10.9488 8.64124 10.9088 8.12999 10.5613 7.87499C10.1088 7.54124 9.51883 7.69999 9.17008 8.02749C8.93508 8.24624 8.82133 8.58249 8.82133 9.05499V13.0975C8.82114 13.1541 8.79856 13.2084 8.75851 13.2484C8.71847 13.2885 8.66421 13.3111 8.60758 13.3112H6.52883C6.4722 13.3111 6.41794 13.2885 6.37789 13.2484C6.33784 13.2084 6.31526 13.1541 6.31508 13.0975V5.57624C6.31526 5.51961 6.33784 5.46535 6.37789 5.4253C6.41794 5.38526 6.4722 5.36268 6.52883 5.36249H8.60758C8.66421 5.36268 8.71847 5.38526 8.75851 5.42531C8.79856 5.46535 8.82114 5.51961 8.82133 5.57624V5.73374C8.83758 5.72374 8.85383 5.71249 8.87008 5.70249C9.33617 5.41202 9.87463 5.25866 10.4238 5.25999C11.3163 5.25999 12.0526 5.55499 12.6151 6.13749C13.3088 6.85624 13.4538 7.85624 13.4538 8.56749V13.0975Z" fill="currentColor"></path></svg>
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.instagram.com/trustpatrick101"
                            className="transition-opacity hover:opacity-80"
                            aria-label="Instagram"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.40625 7.99994C9.40625 8.77655 8.77661 9.40619 8 9.40619C7.22339 9.40619 6.59375 8.77655 6.59375 7.99994C6.59375 7.22333 7.22339 6.59369 8 6.59369C8.77661 6.59369 9.40625 7.22333 9.40625 7.99994Z" fill="currentColor"></path><path d="M10.375 3.75005H5.625C4.59106 3.75005 3.75 4.59111 3.75 5.62505V10.375C3.75 11.409 4.59106 12.25 5.625 12.25H10.375C11.4089 12.25 12.25 11.409 12.25 10.375V5.62505C12.25 4.59111 11.4089 3.75005 10.375 3.75005ZM8 10.3438C6.70764 10.3438 5.65625 9.2924 5.65625 8.00005C5.65625 6.70769 6.70764 5.6563 8 5.6563C9.29236 5.6563 10.3438 6.70769 10.3438 8.00005C10.3438 9.2924 9.29236 10.3438 8 10.3438ZM10.6875 5.7813C10.4286 5.7813 10.2188 5.57146 10.2188 5.31255C10.2188 5.05363 10.4286 4.8438 10.6875 4.8438C10.9464 4.8438 11.1562 5.05363 11.1562 5.31255C11.1562 5.57146 10.9464 5.7813 10.6875 5.7813Z" fill="currentColor"></path><path d="M11.7812 0H4.21875C1.89258 0 0 1.89258 0 4.21875V11.7812C0 14.1074 1.89258 16 4.21875 16H11.7812C14.1074 16 16 14.1074 16 11.7812V4.21875C16 1.89258 14.1074 0 11.7812 0ZM13.1875 10.375C13.1875 11.9258 11.9258 13.1875 10.375 13.1875H5.625C4.07422 13.1875 2.8125 11.9258 2.8125 10.375V5.625C2.8125 4.07422 4.07422 2.8125 5.625 2.8125H10.375C11.9258 2.8125 13.1875 4.07422 13.1875 5.625V10.375Z" fill="currentColor"></path></svg>
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.youtube.com/@trustpatrick_101"
                            className="transition-opacity hover:opacity-80"
                            aria-label="YouTube"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.00391 9.49875L9.6062 7.99997L7.00391 6.50119V9.49875Z" fill="currentColor"></path><path d="M8 0C3.5824 0 0 3.5824 0 8C0 12.4176 3.5824 16 8 16C12.4176 16 16 12.4176 16 8C16 3.5824 12.4176 0 8 0ZM12.9988 8.00818C12.9988 8.00818 12.9988 9.63062 12.793 10.413C12.6776 10.8412 12.34 11.1788 11.9117 11.2941C11.1294 11.5 8 11.5 8 11.5C8 11.5 4.87878 11.5 4.08826 11.2859C3.66003 11.1707 3.32239 10.8329 3.20703 10.4047C3.0011 9.63062 3.0011 8 3.0011 8C3.0011 8 3.0011 6.37769 3.20703 5.59534C3.32227 5.16711 3.66821 4.82117 4.08826 4.70593C4.87061 4.5 8 4.5 8 4.5C8 4.5 11.1294 4.5 11.9117 4.71411C12.34 4.82935 12.6776 5.16711 12.793 5.59534C13.0071 6.37769 12.9988 8.00818 12.9988 8.00818Z" fill="currentColor"></path></svg>
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://rumble.com/c/c-5685309"
                            className="transition-opacity hover:opacity-80"
                            aria-label="Podcast"
                        >
                            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M9.06979 8.77184C9.21724 8.66113 9.33693 8.51764 9.41939 8.35271C9.50185 8.18778 9.54482 8.00593 9.54491 7.82153C9.54481 7.63715 9.50183 7.45532 9.41937 7.29041C9.33691 7.1255 9.21723 6.98202 9.06979 6.87131C8.11954 6.15859 7.16925 5.54094 6.12397 5.11331C5.41129 4.78072 4.60357 5.20831 4.50854 6.01606C4.31847 7.20388 4.27097 8.43922 4.4135 9.57953C4.45769 10.1716 4.95704 10.6348 5.5505 10.6348C5.71582 10.6348 5.87882 10.5992 6.02894 10.5298C7.11256 10.0942 8.13479 9.51919 9.06979 8.81934V8.77184ZM13.8211 5.30338C15.1885 6.72875 15.1885 9.00938 13.8211 10.4348C11.3504 12.953 8.30957 14.711 4.88863 15.5187C3.09407 15.9758 1.23394 14.9186 0.707474 13.143C-0.267121 9.68991 -0.234159 6.03013 0.802474 2.59513C1.26719 0.807157 3.08269 -0.311281 4.88863 0.0769068C8.21457 0.837157 11.3979 2.78516 13.7736 5.30341H13.8211L13.8211 5.30338Z" fill="currentColor"></path></svg>
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://x.com/TrustPatrick101"
                            className="transition-opacity hover:opacity-80"
                            aria-label="X"
                        >
                            <svg width="16" height="16" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_tp_x)"><path d="M16.0014 14.4872L22.7525 24.1437H19.9818L14.4728 16.264V16.2635L13.664 15.1067L7.22852 5.90137H9.99918L15.1926 13.3305L16.0014 14.4872Z" fill="#F9F9F9" /><path d="M26.7584 0H3.24156C1.45134 0 0 1.45134 0 3.24156V26.7584C0 28.5487 1.45134 30 3.24156 30H26.7584C28.5487 30 30 28.5487 30 26.7584V3.24156C30 1.45134 28.5487 0 26.7584 0ZM19.135 25.4406L13.5601 17.3271L6.58044 25.4406H4.77653L12.7592 16.1619L4.77653 4.54401H10.865L16.144 12.2269L22.7533 4.54401H24.5572L16.9452 13.3924H16.9447L25.2235 25.4406H19.135Z" fill="#F9F9F9" /></g><defs><clipPath id="clip0_tp_x"><rect width="30" height="30" fill="white" /></clipPath></defs></svg>
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.tiktok.com/@trust.patrick.101"
                            className="transition-opacity hover:opacity-80"
                            aria-label="TikTok"
                        >
                            <svg width="16" height="16" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_tp_tiktok)"><path d="M5.1875 0.494141C11.3764 -0.166135 17.6187 -0.166135 23.8076 0.494141C25.0092 0.621116 26.1313 1.15598 26.9863 2.00977C27.8414 2.86361 28.3782 3.98503 28.5068 5.18652C29.1671 11.3754 29.1671 17.6178 28.5068 23.8066C28.3799 25.0083 27.8441 26.1303 26.9902 26.9854C26.1363 27.8403 25.015 28.3773 23.8135 28.5059C17.6247 29.1661 11.3831 29.1661 5.19434 28.5059C3.99257 28.3789 2.87073 27.8432 2.01562 26.9893C1.16059 26.1353 0.623708 25.0141 0.495117 23.8125C-0.165118 17.6237 -0.165145 11.3821 0.495117 5.19336C0.622055 3.9917 1.15696 2.86972 2.01074 2.01465C2.86459 1.15961 3.98601 0.622821 5.1875 0.494141ZM15.2803 5.4375V17.7842C15.2802 18.3706 15.107 18.944 14.7812 19.4316C14.4554 19.9193 13.992 20.2999 13.4502 20.5244C12.9083 20.7489 12.3116 20.8068 11.7363 20.6924C11.161 20.5779 10.6326 20.2956 10.2178 19.8809C9.803 19.4661 9.52069 18.9376 9.40625 18.3623C9.29185 17.787 9.34976 17.1903 9.57422 16.6484C9.79872 16.1066 10.1793 15.6432 10.667 15.3174C11.1546 14.9916 11.728 14.8184 12.3145 14.8184H13.7266V11.9951H12.3145C10.7808 11.9952 9.31011 12.605 8.22559 13.6895C7.14096 14.7741 6.53125 16.2454 6.53125 17.7793C6.53133 19.3131 7.14104 20.7836 8.22559 21.8682C9.31013 22.9527 10.7807 23.5624 12.3145 23.5625C13.847 23.5599 15.3162 22.9494 16.3994 21.8652C17.4826 20.7811 18.0924 19.3118 18.0938 17.7793V11.8076C18.9885 12.3479 20.0143 12.6333 21.0596 12.6318H22.4814V9.81348H21.0693C20.2827 9.81348 19.5279 9.50153 18.9717 8.94531C18.4155 8.3891 18.1035 7.63424 18.1035 6.84766V5.4375H15.2803Z" fill="white" /></g><defs><clipPath id="clip0_tp_tiktok"><rect width="29" height="29" fill="white" /></clipPath></defs></svg>
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#f9f9f9] shadow-sm">
            <SocialBar />
            <Container>
                <div className="flex min-h-16 items-center justify-between py-2.5 md:min-h-19 md:py-3">
                    <Link href="/" className="shrink-0">
                        <span className="relative block h-7 w-36 md:h-10 md:w-52">
                            <Image
                                src="/asset/logo.png"
                                alt={SITE_NAME}
                                fill
                                priority
                                sizes="(min-width: 768px) 208px, 144px"
                                className="object-contain object-left"
                            />
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-4">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={
                                    link.label === "Find a Pro"
                                        ? `inline-flex h-11 items-center justify-center rounded-full bg-[#003E74] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#002d55] ${isActive(link.href)
                                            ? "shadow-[0_0_0_2px_rgba(0,62,116,0.18)]"
                                            : ""
                                        }`
                                        : `px-3 py-2 text-sm font-semibold text-[#003E74] transition-colors hover:text-[#002d55] ${isActive(link.href)
                                            ? "text-[#002d55]"
                                            : ""
                                        }`
                                }
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Nav */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger
                            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#003E74] transition-colors hover:bg-black/5"
                        >
                            {open ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                            <span className="sr-only">Toggle menu</span>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-75 border-l-0 bg-[#001B33] text-white"
                        >
                            <SheetTitle className="sr-only">
                                {SITE_NAME}
                            </SheetTitle>
                            <div className="mt-6 px-2">
                                <span className="relative block h-10 w-45">
                                    <Image
                                        src="/asset/logo.png"
                                        alt={SITE_NAME}
                                        fill
                                        sizes="180px"
                                        className="object-contain object-left"
                                    />
                                </span>
                            </div>
                            <nav className="mt-8 flex flex-col gap-2 px-2">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className={
                                            link.label === "Find a Pro"
                                                ? "inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[#003E74] transition-colors hover:bg-white/90"
                                                : `rounded-xl px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-white/8 ${isActive(link.href)
                                                    ? "bg-white/10"
                                                    : ""
                                                }`
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </Container>
        </header>
    );
}
