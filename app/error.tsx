"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section className="py-24">
            <Container>
                <div className="text-center">
                    <AlertCircle className="h-16 w-16 text-destructive/60 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8">
                        An unexpected error occurred. Please try again or go back to the
                        homepage.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Button onClick={reset} variant="default">
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>
                        <Button variant="outline" render={<Link href="/" />}>
                            Go Home
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}
