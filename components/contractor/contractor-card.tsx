import Link from "next/link";
import { MapPin, Phone, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Contractor } from "@/types";
import { formatPhone, formatAddress } from "@/lib/helpers";
import { MEMBERSHIP_LEVELS } from "@/constants";

interface ContractorCardProps {
    contractor: Contractor;
}

export default function ContractorCard({ contractor }: ContractorCardProps) {
    const membershipLabel = contractor.membership_level_id
        ? MEMBERSHIP_LEVELS[contractor.membership_level_id]
        : null;

    return (
        <Link href={`/contractor/${contractor.slug}?id=${contractor.id}`}>
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            {/* Name & Badge */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-lg truncate">
                                    {contractor.name}
                                </h3>
                                {membershipLabel && (
                                    <Badge variant="secondary" className="shrink-0">
                                        <Award className="mr-1 h-3 w-3" />
                                        {membershipLabel}
                                    </Badge>
                                )}
                            </div>

                            {/* Phone */}
                            {contractor.telephone && (
                                <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                                    <Phone className="h-4 w-4 shrink-0" />
                                    <span>{formatPhone(contractor.telephone)}</span>
                                </div>
                            )}

                            {/* Location */}
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 shrink-0" />
                                <span className="truncate">{formatAddress(contractor)}</span>
                            </div>
                        </div>

                        {/* Company Initial Avatar */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg">
                            {contractor.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
