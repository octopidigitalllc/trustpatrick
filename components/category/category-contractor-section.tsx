"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Award, Users, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useContractors } from "@/features/contractor/hooks/use-contractors";
import type { Contractor } from "@/types";
import { formatPhone, formatAddress } from "@/lib/helpers";
import { MEMBERSHIP_LEVELS } from "@/constants";

interface CategoryContractorSectionProps {
    categoryName: string;
    cityName: string;
    stateCode: string;
    mainCategoryId: number;
    defaultServiceId: number;
    services: { id: number; title: string; slug: string }[];
}

export default function CategoryContractorSection({
    categoryName,
    cityName,
    stateCode,
    mainCategoryId,
    defaultServiceId,
    services,
}: CategoryContractorSectionProps) {
    const [selectedServiceId, setSelectedServiceId] =
        useState(defaultServiceId);

    const { data, isLoading, isError } = useContractors(
        cityName,
        stateCode,
        mainCategoryId,
        selectedServiceId
    );

    const contractors = data?.company_details || [];

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="border rounded-xl p-6 flex items-start gap-4"
                    >
                        <Skeleton className="h-14 w-14 rounded-full shrink-0" />
                        <div className="flex-1 space-y-3">
                            <Skeleton className="h-5 w-52" />
                            <Skeleton className="h-4 w-36" />
                            <Skeleton className="h-4 w-72" />
                            <Skeleton className="h-4 w-full max-w-md" />
                        </div>
                        <Skeleton className="h-10 w-28 rounded-lg shrink-0 hidden sm:block" />
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">
                    Unable to load contractors. Please try again later.
                </p>
            </div>
        );
    }

    if (contractors.length === 0) {
        return (
            <div className="text-center py-12">
                <Users className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                <h3 className="font-semibold text-lg">No Pros Found Yet</h3>
                <p className="text-muted-foreground mt-1 max-w-sm mx-auto">
                    We&apos;re building our network of{" "}
                    {categoryName.toLowerCase()} pros in {cityName}. Check back
                    soon!
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Filter / count bar */}
            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium text-foreground">
                        {contractors.length}
                    </span>{" "}
                    result{contractors.length !== 1 ? "s" : ""}
                </p>
                {services.length > 1 && (
                    <select
                        value={selectedServiceId}
                        onChange={(e) =>
                            setSelectedServiceId(Number(e.target.value))
                        }
                        className="text-sm border rounded-lg px-3 py-2 bg-background"
                    >
                        {services.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.title}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Contractor cards */}
            <div className="space-y-4">
                {contractors.map((contractor) => (
                    <ContractorAngiCard
                        key={contractor.id}
                        contractor={contractor}
                        categoryName={categoryName}
                        cityName={cityName}
                    />
                ))}
            </div>
        </div>
    );
}

function ContractorAngiCard({
    contractor,
    categoryName,
    cityName,
}: {
    contractor: Contractor;
    categoryName: string;
    cityName: string;
}) {
    const membershipLabel = contractor.membership_level_id
        ? MEMBERSHIP_LEVELS[contractor.membership_level_id]
        : null;

    const handleClick = () => {
        try {
            sessionStorage.setItem(
                `tp:contractor:${contractor.slug}`,
                String(contractor.id)
            );
            if (contractor.zip_codes) {
                sessionStorage.setItem(
                    `tp:contractor-zips:${contractor.slug}`,
                    contractor.zip_codes
                );
            }
        } catch {
            /* ignored */
        }
    };

    return (
        <Link
            href={`/contractor/${contractor.slug}`}
            onClick={handleClick}
            className="block rounded-xl border bg-card p-5 transition-all hover:border-[#003E74]/30 hover:shadow-md sm:p-6"
        >
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#003E74] text-white font-bold text-xl">
                    {contractor.name.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-base sm:text-lg">
                            {contractor.name}
                        </h3>
                        {membershipLabel && (
                            <Badge
                                variant="secondary"
                                className="text-xs shrink-0"
                            >
                                <Award className="mr-1 h-3 w-3" />
                                {membershipLabel}
                            </Badge>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                        {contractor.address && (
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate max-w-62.5">
                                    {formatAddress(contractor)}
                                </span>
                            </div>
                        )}
                        {contractor.telephone && (
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Phone className="h-3.5 w-3.5 shrink-0" />
                                <span>
                                    {formatPhone(contractor.telephone)}
                                </span>
                            </div>
                        )}
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                        Providing quality {categoryName.toLowerCase()} services
                        in {cityName} and surrounding areas. Licensed, insured,
                        and committed to customer satisfaction.
                    </p>
                </div>

                {/* CTA button - desktop */}
                <div className="shrink-0 hidden sm:block">
                    <span className="inline-flex items-center justify-center rounded-lg bg-[#003E74] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#002d55]">
                        Contact Pro
                    </span>
                </div>
            </div>

            {/* CTA button - mobile */}
            <div className="mt-4 sm:hidden">
                <span className="inline-flex w-full items-center justify-center rounded-lg bg-[#003E74] px-5 py-2.5 text-sm font-semibold text-white">
                    Contact Pro
                </span>
            </div>
        </Link>
    );
}
