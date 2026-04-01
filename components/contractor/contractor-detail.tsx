"use client";

import { MapPin, Phone, Award, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useContractorDetail } from "@/features/contractor/hooks/use-contractor-detail";
import { formatPhone, formatAddress } from "@/lib/helpers";
import { MEMBERSHIP_LEVELS } from "@/constants";
import { generateLocalBusinessJsonLd } from "@/lib/seo";

interface ContractorDetailProps {
    id: number;
}

export default function ContractorDetail({ id }: ContractorDetailProps) {
    const { data, isLoading, isError, error } = useContractorDetail(id);
    const contractor = data?.company_details;

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-8 w-64" />
                <Card>
                    <CardContent className="p-8 space-y-6">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-72" />
                        <Skeleton className="h-4 w-56" />
                        <Skeleton className="h-4 w-40" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isError || !contractor) {
        return (
            <div className="text-center py-16">
                <AlertCircle className="h-12 w-12 text-destructive/60 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">Contractor Not Found</h3>
                <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                    {error?.message ||
                        "This contractor could not be found or is no longer active."}
                </p>
                <Button
                    variant="outline"
                    className="mt-6"
                    render={<Link href="/" />}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Button>
            </div>
        );
    }

    const membershipLabel = contractor.membership_level_id
        ? MEMBERSHIP_LEVELS[contractor.membership_level_id]
        : null;

    const localBusinessJsonLd = generateLocalBusinessJsonLd(contractor);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessJsonLd),
                }}
            />

            <div className="space-y-6">
                {/* Back button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Results
                </Button>

                {/* Main Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-2xl">
                                    {contractor.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">
                                        {contractor.name}
                                    </CardTitle>
                                    {membershipLabel && (
                                        <Badge variant="secondary" className="mt-2">
                                            <Award className="mr-1 h-3 w-3" />
                                            {membershipLabel} Member
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Separator />

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Phone */}
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Phone
                                </p>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-primary" />
                                    <span className="font-medium">
                                        {formatPhone(contractor.telephone)}
                                    </span>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Location
                                </p>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span className="font-medium">
                                        {formatAddress(contractor)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Full Address */}
                        {contractor.address && (
                            <>
                                <Separator />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Full Address
                                    </p>
                                    <p className="font-medium">{formatAddress(contractor)}</p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
