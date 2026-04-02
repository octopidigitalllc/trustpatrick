import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="my-3">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">

                {/* Home */}
                <li>
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 hover:text-foreground transition-colors leading-none"
                    >
                        <Home className="h-4 w-4 shrink-0" />
                        <span className="leading-none">Home</span>
                    </Link>
                </li>

                {/* Dynamic Items */}
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-1.5 leading-none">

                        {/* Divider */}
                        <ChevronRight className="h-4 w-4 text-muted-foreground/60 shrink-0" />

                        {/* Link or Text */}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="hover:text-foreground transition-colors leading-none"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-foreground font-medium leading-none">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
