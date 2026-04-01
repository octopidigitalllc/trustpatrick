import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";

export default function NotFound() {
    return (
        <section className="py-24">
            <Container>
                <div className="text-center">
                    <FileQuestion className="h-16 w-16 text-muted-foreground/40 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8">
                        The page you&apos;re looking for doesn&apos;t exist or may have been
                        moved.
                    </p>
                    <Button render={<Link href="/" />}>
                        Back to Home
                    </Button>
                </div>
            </Container>
        </section>
    );
}
