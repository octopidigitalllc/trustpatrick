import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/container";
import { Separator } from "@/components/ui/separator";
import { SITE_NAME } from "@/constants";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t bg-muted/40">
            <Container>
                <div className="py-12">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Brand */}
                        <div>
                            <Link href="/" className="mb-4 inline-flex items-center">
                                <span className="relative block h-10 w-41">
                                    <Image
                                        src="/asset/logo.png"
                                        alt={SITE_NAME}
                                        fill
                                        priority
                                        className="object-contain object-left"
                                        sizes="164px"
                                    />
                                </span>
                            </Link>
                            <p className="text-sm text-muted-foreground max-w-xs">
                                Find trusted, verified home service professionals near you.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/"
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/find-a-pro"
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Find a Pro
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-sm font-semibold mb-4">Contact</h3>
                            <ul className="space-y-2">
                                <li className="text-sm text-muted-foreground">
                                    support@trustpatrick.com
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="py-6 text-center text-sm text-muted-foreground">
                    &copy; {currentYear} {SITE_NAME}. All rights reserved.
                </div>
            </Container>
        </footer>
    );
}
