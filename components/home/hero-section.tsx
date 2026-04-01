import AddressSearchBar from "@/components/home/address-search-bar";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Find Trusted Home Service
                        <span className="block text-primary-foreground/90 mt-2">
                            Pros Near You
                        </span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
                        Search by your address to find rated, verified contractors in your
                        area. From roofing to plumbing, we connect you with the best local
                        professionals.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-10" id="search">
                        <AddressSearchBar />
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-400" />
                            <span>Verified Contractors</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-400" />
                            <span>Free to Search</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-amber-400" />
                            <span>Nationwide Coverage</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
