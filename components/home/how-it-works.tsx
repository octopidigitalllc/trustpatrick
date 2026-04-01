import { MapPin, List, UserCheck } from "lucide-react";
import Container from "@/components/shared/container";

const steps = [
    {
        icon: MapPin,
        title: "Enter Your Address",
        description:
            "Start by entering your home address. We'll find contractors available in your area.",
    },
    {
        icon: List,
        title: "Choose a Service",
        description:
            "Select a service category and specific service type to narrow down your search.",
    },
    {
        icon: UserCheck,
        title: "Find a Pro",
        description:
            "Browse verified contractors, view their details, and connect with the right professional.",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-16 sm:py-24 bg-muted/40">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        How It Works
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Finding a trusted home service professional is easy with
                        TrustPatrick.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={step.title} className="relative text-center">
                            {/* Step number connector */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-muted-foreground/30" />
                            )}

                            <div className="relative inline-flex items-center justify-center h-24 w-24 rounded-full bg-primary/5 mb-6">
                                <step.icon className="h-10 w-10 text-primary" />
                                <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                                    {index + 1}
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
