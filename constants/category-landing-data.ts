/**
 * Category landing page dummy data.
 * Replace with real API calls when the backend endpoint is ready.
 */

export interface CategoryLandingData {
    heroImage: string;
    description: string;
    features: string[];
    faqs: { question: string; answer: string }[];
}

/** Fallback data used when a category has no specific entry below. */
const DEFAULT_DATA: CategoryLandingData = {
    heroImage: "/images/categories/default-hero.jpg",
    description:
        "Connect with trusted, verified professionals in your area. Compare ratings, read reviews, and hire the right pro for your project.",
    features: [
        "Verified & licensed professionals",
        "Free quotes from multiple pros",
        "Read real customer reviews",
        "Satisfaction guaranteed",
    ],
    faqs: [
        {
            question: "How do I find the right pro?",
            answer: "Enter your ZIP code to see top-rated pros near you. Compare profiles, reviews, and ratings to choose the best match for your project.",
        },
        {
            question: "Is there a cost to use TrustPatrick?",
            answer: "Searching for and connecting with pros on TrustPatrick is completely free for homeowners.",
        },
        {
            question: "Are the pros verified?",
            answer: "All pros on our platform go through a verification process to ensure they meet our quality standards.",
        },
    ],
};

/**
 * Category-specific data for ALL main categories.
 * Keyed by category slug.
 */
const CATEGORY_DATA: Record<string, Partial<CategoryLandingData>> = {
    // ── Additions ──
    additions: {
        heroImage: "/images/categories/additions.jpg",
        description:
            "Expand your living space with professional home additions. Find experienced contractors for room additions, second stories, and more.",
        features: [
            "Room & second-story additions",
            "Licensed general contractors",
            "Permit handling & code compliance",
            "Custom design & build services",
        ],
        faqs: [
            { question: "How much does a home addition cost?", answer: "Costs vary widely based on size, complexity, and location. Enter your ZIP to get free estimates from local pros." },
            { question: "Do I need a permit for a home addition?", answer: "Yes, most home additions require building permits. Your contractor will typically handle the permitting process." },
            { question: "How long does a home addition take?", answer: "A typical room addition takes 3-6 months depending on size and complexity." },
        ],
    },

    // ── Asphalt ──
    "asphalt-installation": {
        heroImage: "/images/categories/asphalt.jpg",
        description:
            "Get matched with top-rated asphalt installation professionals. From driveways to parking lots, find experienced contractors who deliver quality results.",
        features: [
            "Expert driveway & parking lot installation",
            "Licensed & insured contractors",
            "Free on-site estimates",
            "Quality materials & workmanship",
        ],
        faqs: [
            { question: "How much does asphalt installation cost?", answer: "Costs vary based on project size and location. Enter your ZIP to get free estimates from local pros." },
            { question: "How long does asphalt installation take?", answer: "Most residential driveways can be completed in 1-3 days depending on size and weather conditions." },
            { question: "How long does new asphalt last?", answer: "Well-installed and maintained asphalt can last 15-20 years or more." },
        ],
    },
    "asphalt-maintenance-repair": {
        heroImage: "/images/categories/asphalt.jpg",
        description:
            "Keep your asphalt surfaces in top condition. Find trusted pros for sealcoating, crack repair, patching, and ongoing maintenance.",
        features: [
            "Sealcoating & crack filling",
            "Pothole & surface repair",
            "Preventive maintenance plans",
            "Licensed & insured contractors",
        ],
        faqs: [
            { question: "How often should asphalt be sealcoated?", answer: "Experts recommend sealcoating every 2-3 years to extend the life of your asphalt surfaces." },
            { question: "Can cracks in asphalt be repaired?", answer: "Yes, most cracks can be filled and sealed to prevent further damage and water infiltration." },
            { question: "How much does asphalt repair cost?", answer: "Repair costs depend on the extent of damage. Get free quotes by entering your ZIP code." },
        ],
    },

    // ── Cabinets ──
    "cabinet-installation": {
        heroImage: "/images/categories/cabinets.jpg",
        description:
            "Upgrade your kitchen or bathroom with expert cabinet installation. Find verified cabinet installers in your area.",
        features: [
            "Kitchen & bathroom cabinets",
            "Custom & semi-custom options",
            "Professional measurement & fitting",
            "Licensed & insured installers",
        ],
        faqs: [
            { question: "How much does cabinet installation cost?", answer: "Costs depend on cabinet type, size, and layout. Enter your ZIP for free estimates from local pros." },
            { question: "How long does cabinet installation take?", answer: "Most kitchen cabinet installations are completed in 1-3 days." },
            { question: "Should I refinish or replace my cabinets?", answer: "If cabinets are structurally sound, refinishing can save 50% or more. A pro can help you decide." },
        ],
    },
    "cabinet-renovation-refinish": {
        heroImage: "/images/categories/cabinets.jpg",
        description:
            "Give your cabinets a fresh look with professional refinishing and renovation services. Save money while transforming your space.",
        features: [
            "Cabinet refacing & refinishing",
            "Paint & stain options",
            "Hardware upgrades",
            "Cost-effective alternative to replacement",
        ],
        faqs: [
            { question: "What is cabinet refinishing?", answer: "Refinishing involves sanding and applying new stain or paint to existing cabinet surfaces for a fresh look." },
            { question: "How long does cabinet refinishing take?", answer: "Most kitchen refinishing projects are completed in 3-5 days." },
            { question: "Is refinishing cheaper than replacing?", answer: "Yes, refinishing typically costs 30-50% less than full cabinet replacement." },
        ],
    },
    "cabinet-repair": {
        heroImage: "/images/categories/cabinets.jpg",
        description:
            "Fix damaged, loose, or worn cabinets with skilled repair professionals. Restore functionality and appearance quickly.",
        features: [
            "Door & drawer repair",
            "Hinge & hardware replacement",
            "Water damage restoration",
            "Structural reinforcement",
        ],
        faqs: [
            { question: "What cabinet issues can be repaired?", answer: "Common repairs include loose hinges, broken drawers, water damage, and worn finishes." },
            { question: "How much does cabinet repair cost?", answer: "Minor repairs typically cost $100-$500. Enter your ZIP for accurate local estimates." },
            { question: "When should I repair vs. replace cabinets?", answer: "If the cabinet boxes are solid and the layout works, repair is usually the better value." },
        ],
    },

    // ── Carpet ──
    "carpet-cleaning": {
        heroImage: "/images/categories/carpet.jpg",
        description:
            "Professional carpet cleaning to remove stains, allergens, and odors. Find trusted carpet cleaners near you.",
        features: [
            "Deep steam & dry cleaning",
            "Stain & odor removal",
            "Eco-friendly cleaning options",
            "Fast drying times",
        ],
        faqs: [
            { question: "How often should carpets be professionally cleaned?", answer: "Most experts recommend professional carpet cleaning every 12-18 months, or more frequently for high-traffic areas." },
            { question: "How long does carpet cleaning take?", answer: "A typical home takes 1-3 hours depending on the number of rooms." },
            { question: "How long until I can walk on cleaned carpet?", answer: "Most carpets are dry and walkable within 6-12 hours after cleaning." },
        ],
    },
    "carpet-installation-replacement": {
        heroImage: "/images/categories/carpet.jpg",
        description:
            "Transform your floors with new carpet installation. Browse verified installers for bedrooms, living rooms, and whole-home projects.",
        features: [
            "Wide selection of carpet styles",
            "Professional measurement & installation",
            "Old carpet removal & disposal",
            "Warranty-backed workmanship",
        ],
        faqs: [
            { question: "How much does carpet installation cost?", answer: "Costs depend on carpet quality, room size, and location. Enter your ZIP for free estimates." },
            { question: "How long does carpet installation take?", answer: "Most rooms can be carpeted in a few hours. A whole home typically takes 1-2 days." },
            { question: "Do installers remove old carpet?", answer: "Yes, most professional installers include old carpet removal and disposal in their service." },
        ],
    },
    "carpet-repair": {
        heroImage: "/images/categories/carpet.jpg",
        description:
            "Fix tears, burns, wrinkles, and other carpet damage with expert repair services. Extend the life of your carpet without full replacement.",
        features: [
            "Patch & seam repair",
            "Restretching & wrinkle removal",
            "Burn & stain spot repair",
            "Threshold & transition fixes",
        ],
        faqs: [
            { question: "Can carpet burns be repaired?", answer: "Yes, small burns can often be patched with matching carpet from a closet or spare piece." },
            { question: "Why does my carpet have wrinkles?", answer: "Wrinkles are usually caused by improper installation or humidity. Professional restretching fixes this." },
            { question: "How much does carpet repair cost?", answer: "Repairs typically range from $100-$300 depending on the issue. Get estimates by entering your ZIP." },
        ],
    },

    // ── Concrete ──
    "concrete-installation": {
        heroImage: "/images/categories/concrete.jpg",
        description:
            "Find trusted concrete contractors for driveways, patios, sidewalks, and more. Quality installation from verified professionals.",
        features: [
            "Driveways, patios & sidewalks",
            "Stamped & decorative concrete",
            "Foundation work",
            "Licensed & insured contractors",
        ],
        faqs: [
            { question: "How much does a concrete driveway cost?", answer: "Concrete driveways typically cost $4-$15 per square foot. Enter your ZIP for local estimates." },
            { question: "How long does concrete take to cure?", answer: "Concrete reaches working strength in about 7 days and full strength in 28 days." },
            { question: "What types of concrete finishes are available?", answer: "Options include broom finish, stamped, exposed aggregate, stained, and polished concrete." },
        ],
    },
    "concrete-maintenance-repair": {
        heroImage: "/images/categories/concrete.jpg",
        description:
            "Restore and maintain your concrete surfaces. Expert repair, leveling, and sealing services from trusted pros.",
        features: [
            "Crack & spalling repair",
            "Concrete leveling & mudjacking",
            "Sealing & waterproofing",
            "Surface resurfacing",
        ],
        faqs: [
            { question: "Can cracked concrete be repaired?", answer: "Yes, most cracks can be filled and sealed. Severely damaged concrete may need full replacement." },
            { question: "What is concrete leveling?", answer: "Leveling raises sunken concrete slabs back to their original position using foam or grout injection." },
            { question: "How often should concrete be sealed?", answer: "Concrete should be resealed every 2-3 years to protect against moisture and weather damage." },
        ],
    },

    // ── Cooling / HVAC ──
    cooling: {
        heroImage: "/images/categories/hvac.jpg",
        description:
            "Stay cool with expert AC installation and replacement services. Find certified HVAC technicians near you.",
        features: [
            "Central AC & ductless systems",
            "Energy-efficient upgrades",
            "Certified HVAC technicians",
            "Free in-home estimates",
        ],
        faqs: [
            { question: "How much does AC installation cost?", answer: "Central AC installation typically costs $3,000-$7,000 depending on system size and home layout." },
            { question: "How long does a new AC system last?", answer: "Modern AC systems last 15-20 years with proper maintenance." },
            { question: "What size AC do I need?", answer: "A certified HVAC technician can calculate the right size based on your home's square footage and insulation." },
        ],
    },
    "cooling-service-repair": {
        heroImage: "/images/categories/hvac.jpg",
        description:
            "Get your AC repaired fast by certified technicians. Same-day service available from trusted local pros.",
        features: [
            "Emergency & same-day repairs",
            "Refrigerant recharge",
            "Preventive maintenance plans",
            "Certified HVAC technicians",
        ],
        faqs: [
            { question: "Why is my AC not cooling?", answer: "Common causes include low refrigerant, a dirty filter, or a faulty compressor. A pro can diagnose the issue." },
            { question: "How much does AC repair cost?", answer: "Repairs typically range from $150-$600 depending on the issue. Enter your ZIP for local estimates." },
            { question: "How often should I service my AC?", answer: "Annual maintenance is recommended, ideally in spring before the cooling season begins." },
        ],
    },

    // ── Countertops ──
    "countertop-installation": {
        heroImage: "/images/categories/countertops.jpg",
        description:
            "Install beautiful new countertops. Granite, quartz, marble, and more — find trusted countertop pros near you.",
        features: [
            "Granite, quartz & marble options",
            "Professional templating & fabrication",
            "Precise cut & fit installation",
            "Sink & fixture cutouts included",
        ],
        faqs: [
            { question: "What countertop materials are available?", answer: "Popular options include granite, quartz, marble, butcher block, laminate, and solid surface materials." },
            { question: "How long does countertop installation take?", answer: "Most countertop installations are completed in 1-2 days after fabrication." },
            { question: "How much do new countertops cost?", answer: "Costs range from $20-$200+ per square foot depending on material. Get quotes by entering your ZIP." },
        ],
    },
    "countertop-repair": {
        heroImage: "/images/categories/countertops.jpg",
        description:
            "Repair chips, cracks, and damage to your countertops. Restore your surfaces without the cost of full replacement.",
        features: [
            "Chip & crack repair",
            "Surface polishing & restoration",
            "Seam repair",
            "Sealing & protection",
        ],
        faqs: [
            { question: "Can chipped countertops be repaired?", answer: "Yes, most chips in granite, quartz, and marble can be filled and polished to near-invisible results." },
            { question: "How much does countertop repair cost?", answer: "Minor repairs typically cost $100-$400. Major damage may require section replacement." },
            { question: "How do I maintain my countertops?", answer: "Regular sealing (for natural stone), gentle cleaning, and using cutting boards will keep countertops looking new." },
        ],
    },

    // ── Doors ──
    "doors-installation-replacement": {
        heroImage: "/images/categories/doors.jpg",
        description:
            "Upgrade your home with professional door installation. Interior, exterior, patio, and entry doors from verified pros.",
        features: [
            "Interior & exterior doors",
            "Entry & patio door installation",
            "Frame & hardware included",
            "Energy-efficient options",
        ],
        faqs: [
            { question: "How much does door installation cost?", answer: "Interior doors cost $200-$500 installed. Exterior doors range from $500-$2,000+ depending on type and material." },
            { question: "How long does door installation take?", answer: "A single door installation typically takes 2-4 hours." },
            { question: "Should I replace my door or just the hardware?", answer: "If the door is warped, damaged, or drafty, replacement is recommended. Otherwise, new hardware can refresh the look." },
        ],
    },
    "doors-repair-adjust": {
        heroImage: "/images/categories/doors.jpg",
        description:
            "Fix sticking, squeaking, or misaligned doors with professional repair services. Quick and affordable solutions.",
        features: [
            "Door adjustment & alignment",
            "Hinge & lock repair",
            "Weather stripping replacement",
            "Frame repair",
        ],
        faqs: [
            { question: "Why does my door stick?", answer: "Doors stick due to humidity changes, foundation settling, or worn hinges. A pro can diagnose and fix the issue." },
            { question: "How much does door repair cost?", answer: "Most door repairs cost $75-$250 depending on the issue." },
            { question: "Can a damaged door frame be repaired?", answer: "Yes, most frame damage from weather or forced entry can be repaired without full replacement." },
        ],
    },

    // ── Drywall ──
    "drywall-installation": {
        heroImage: "/images/categories/drywall.jpg",
        description:
            "Professional drywall installation for new construction and renovations. Find skilled drywall contractors near you.",
        features: [
            "New construction & renovation",
            "Hanging, taping & finishing",
            "Texture matching",
            "Soundproofing & fire-rated options",
        ],
        faqs: [
            { question: "How much does drywall installation cost?", answer: "Drywall installation typically costs $1.50-$3.50 per square foot including materials and labor." },
            { question: "How long does drywall installation take?", answer: "A typical room takes 1-2 days for hanging and finishing, plus drying time between coats." },
            { question: "What drywall thickness should I use?", answer: "Standard walls use 1/2-inch drywall. Ceilings and fire-rated walls may require 5/8-inch." },
        ],
    },
    "drywall-repair-patching": {
        heroImage: "/images/categories/drywall.jpg",
        description:
            "Fix holes, cracks, and water damage in your drywall. Professional repair and patching services with seamless results.",
        features: [
            "Hole & crack repair",
            "Water damage restoration",
            "Texture matching",
            "Seamless finishing",
        ],
        faqs: [
            { question: "Can large holes in drywall be repaired?", answer: "Yes, holes of any size can be patched. Large holes require a new piece of drywall and seam taping." },
            { question: "How much does drywall repair cost?", answer: "Small patches cost $75-$200. Larger repairs range from $200-$500+." },
            { question: "How long does drywall repair take?", answer: "Most repairs take a few hours plus drying time. Multiple coats of compound may extend the timeline." },
        ],
    },

    // ── Electrical ──
    "electrical-installation": {
        heroImage: "/images/categories/electrical.jpg",
        description:
            "Hire licensed electricians for safe, code-compliant installations. From panel upgrades to full rewiring, find the right pro.",
        features: [
            "Panel upgrades & rewiring",
            "Outlet & switch installations",
            "Licensed & certified electricians",
            "Code-compliant work guaranteed",
        ],
        faqs: [
            { question: "How much does an electrical panel upgrade cost?", answer: "Panel upgrades typically cost $1,500-$4,000 depending on amperage and complexity." },
            { question: "Do I need a permit for electrical work?", answer: "Yes, most electrical installations require a permit and inspection to ensure code compliance." },
            { question: "How do I know if I need rewiring?", answer: "Signs include flickering lights, frequently tripped breakers, and outlets that feel warm to the touch." },
        ],
    },
    "electrical-repair-troubleshooting": {
        heroImage: "/images/categories/electrical.jpg",
        description:
            "Experienced electricians for troubleshooting and repairs. Get your electrical issues resolved safely and efficiently.",
        features: [
            "Circuit troubleshooting",
            "Outlet & switch repair",
            "Breaker panel diagnostics",
            "Emergency electrical service",
        ],
        faqs: [
            { question: "Why do my breakers keep tripping?", answer: "Frequent tripping can indicate overloaded circuits, short circuits, or faulty wiring. A licensed electrician can diagnose the issue." },
            { question: "How much does electrical troubleshooting cost?", answer: "Diagnostic visits typically cost $75-$200. Actual repairs are quoted separately." },
            { question: "Is it safe to reset a tripped breaker?", answer: "Yes, if it trips once. If it trips repeatedly, stop using the circuit and call an electrician." },
        ],
    },

    // ── Exterior Carpentry ──
    "exterior-carpentry": {
        heroImage: "/images/categories/carpentry.jpg",
        description:
            "Find skilled carpenters for exterior projects. Decks, pergolas, trim, soffits, fascia, and more from trusted professionals.",
        features: [
            "Decks & pergolas",
            "Trim, soffit & fascia",
            "Exterior framing & repairs",
            "Weather-resistant materials",
        ],
        faqs: [
            { question: "What exterior carpentry services are available?", answer: "Services include decks, pergolas, railings, trim, soffits, fascia, skirting, and structural repairs." },
            { question: "How much does deck building cost?", answer: "Deck costs range from $15-$35 per square foot depending on materials and complexity." },
            { question: "How long does exterior carpentry last?", answer: "Quality exterior carpentry with treated or composite materials can last 20-30+ years." },
        ],
    },

    // ── Fencing ──
    "fencing-rentals": {
        heroImage: "/images/categories/fencing.jpg",
        description:
            "Temporary fence rentals for construction sites, events, and property protection. Fast delivery and professional setup.",
        features: [
            "Construction site fencing",
            "Event & crowd control",
            "Fast delivery & pickup",
            "Various sizes & styles",
        ],
        faqs: [
            { question: "How much does temporary fencing cost?", answer: "Rental fencing typically costs $1-$5 per linear foot per month depending on type and duration." },
            { question: "How quickly can temporary fencing be installed?", answer: "Most temporary fences can be delivered and set up within 1-2 business days." },
            { question: "What types of temporary fencing are available?", answer: "Options include chain link panels, barricades, privacy screening, and safety fencing." },
        ],
    },
    "fencing-new-installation-replace-existing": {
        heroImage: "/images/categories/fencing.jpg",
        description:
            "Install the perfect fence for your property. Wood, vinyl, chain link, or custom — find verified fence contractors near you.",
        features: [
            "Wood, vinyl & chain link options",
            "Privacy & decorative fencing",
            "Gate installation included",
            "Licensed & insured installers",
        ],
        faqs: [
            { question: "How much does fence installation cost?", answer: "Fencing costs $15-$45 per linear foot depending on material. Enter your ZIP for local estimates." },
            { question: "How long does fence installation take?", answer: "Most residential fences are installed in 1-3 days depending on length and terrain." },
            { question: "Do I need a permit to build a fence?", answer: "Permit requirements vary by locality. Your contractor can help determine what's needed." },
        ],
    },
    "fencing-repair-existing": {
        heroImage: "/images/categories/fencing.jpg",
        description:
            "Repair damaged, leaning, or rotting fences with professional repair services. Restore security and curb appeal.",
        features: [
            "Post & panel replacement",
            "Leaning fence correction",
            "Gate repair & adjustment",
            "Storm damage restoration",
        ],
        faqs: [
            { question: "Can a leaning fence be repaired?", answer: "Yes, leaning fences can often be straightened by replacing damaged posts or adding support." },
            { question: "How much does fence repair cost?", answer: "Repairs typically cost $150-$500 depending on the extent of damage and materials." },
            { question: "Should I repair or replace my fence?", answer: "If more than 20-30% of the fence is damaged, full replacement is usually more cost-effective." },
        ],
    },

    // ── Flooring ──
    "floor-refinishing": {
        heroImage: "/images/categories/flooring.jpg",
        description:
            "Restore the beauty of your hardwood floors with professional refinishing. Sanding, staining, and sealing services.",
        features: [
            "Hardwood sanding & refinishing",
            "Custom stain colors",
            "Polyurethane sealing",
            "Dustless sanding options",
        ],
        faqs: [
            { question: "How much does floor refinishing cost?", answer: "Hardwood refinishing typically costs $3-$8 per square foot depending on condition and finish." },
            { question: "How long does refinishing take?", answer: "Most projects take 2-5 days including sanding, staining, and drying time between coats." },
            { question: "How often should hardwood floors be refinished?", answer: "Hardwood floors typically need refinishing every 7-10 years depending on traffic and wear." },
        ],
    },
    "flooring-installation-replacement": {
        heroImage: "/images/categories/flooring.jpg",
        description:
            "Transform your space with beautiful new flooring. Find vetted installers for hardwood, tile, laminate, and more.",
        features: [
            "Hardwood, laminate & vinyl",
            "Tile & stone flooring",
            "Professional subfloor preparation",
            "Old flooring removal included",
        ],
        faqs: [
            { question: "What type of flooring is best for my home?", answer: "The best option depends on your budget, lifestyle, and room use. A pro can help you choose." },
            { question: "How long does flooring installation take?", answer: "Most rooms can be completed in 1-2 days. Whole-home projects may take 3-5 days." },
            { question: "How much does new flooring cost?", answer: "Costs range from $2-$15+ per square foot depending on material. Enter your ZIP for estimates." },
        ],
    },
    "flooring-repair": {
        heroImage: "/images/categories/flooring.jpg",
        description:
            "Fix scratches, water damage, squeaks, and other flooring issues. Professional repair services for all flooring types.",
        features: [
            "Scratch & gouge repair",
            "Water damage restoration",
            "Squeak elimination",
            "Board & tile replacement",
        ],
        faqs: [
            { question: "Can scratched hardwood be repaired?", answer: "Yes, minor scratches can be buffed out. Deeper gouges may need board replacement or refinishing." },
            { question: "How do I fix squeaky floors?", answer: "Squeaks are usually caused by loose subfloor or joists. A pro can secure them from above or below." },
            { question: "How much does flooring repair cost?", answer: "Most repairs cost $150-$500 depending on the issue and flooring type." },
        ],
    },

    // ── Foundation ──
    "foundation-installation": {
        heroImage: "/images/categories/foundation.jpg",
        description:
            "Expert foundation installation for new construction. Find licensed contractors specializing in residential and commercial foundations.",
        features: [
            "Slab, crawl space & basement foundations",
            "Licensed structural contractors",
            "Soil testing & engineering",
            "Permit handling & inspections",
        ],
        faqs: [
            { question: "What types of foundations are available?", answer: "Common types include concrete slab, crawl space, pier and beam, and full basement foundations." },
            { question: "How much does a foundation cost?", answer: "Foundation costs range from $5,000-$30,000+ depending on type and size." },
            { question: "How long does foundation installation take?", answer: "Most residential foundations take 1-3 weeks to pour and cure." },
        ],
    },
    "foundation-repair": {
        heroImage: "/images/categories/foundation.jpg",
        description:
            "Protect your home's structural integrity with professional foundation repair. Find experienced contractors for cracks, settling, and more.",
        features: [
            "Crack & leak repair",
            "Pier & beam leveling",
            "Waterproofing & drainage",
            "Structural engineering assessments",
        ],
        faqs: [
            { question: "What are signs of foundation problems?", answer: "Look for cracks in walls/floors, sticking doors, uneven floors, and gaps around windows." },
            { question: "How much does foundation repair cost?", answer: "Repairs range from $2,000-$15,000+ depending on severity. Get a free inspection by entering your ZIP." },
            { question: "Is foundation repair covered by insurance?", answer: "Most homeowner policies don't cover foundation repair unless caused by a covered event like plumbing failure." },
        ],
    },

    // ── Garage ──
    "garage-finish": {
        heroImage: "/images/categories/garage.jpg",
        description:
            "Convert your garage into a finished, functional space. Find contractors for insulation, drywall, flooring, and more.",
        features: [
            "Garage to living space conversion",
            "Insulation & climate control",
            "Epoxy flooring & finishes",
            "Electrical & lighting upgrades",
        ],
        faqs: [
            { question: "How much does it cost to finish a garage?", answer: "Garage finishing typically costs $5,000-$15,000 depending on scope and finishes." },
            { question: "Do I need a permit to finish my garage?", answer: "Yes, converting a garage to living space usually requires building permits and inspections." },
            { question: "Can I convert my garage back later?", answer: "Yes, most garage conversions can be reversed, but it's important to plan for that possibility." },
        ],
    },
    "garage-new-build": {
        heroImage: "/images/categories/garage.jpg",
        description:
            "Build a new garage — attached or detached. Find licensed contractors for custom garage construction projects.",
        features: [
            "Attached & detached garages",
            "Custom sizes & designs",
            "Foundation to finish construction",
            "Permit handling included",
        ],
        faqs: [
            { question: "How much does a new garage cost?", answer: "A new garage costs $15,000-$40,000+ depending on size, type, and finishes." },
            { question: "How long does garage construction take?", answer: "Most garages are built in 2-6 weeks depending on size and complexity." },
            { question: "Do I need a permit to build a garage?", answer: "Yes, new garage construction requires building permits in virtually all jurisdictions." },
        ],
    },
    "garage-overhead-door-openers": {
        heroImage: "/images/categories/garage.jpg",
        description:
            "Install or replace garage door openers. Find certified technicians for belt-drive, chain-drive, and smart openers.",
        features: [
            "Belt, chain & screw drive openers",
            "Smart & WiFi-enabled systems",
            "Safety sensor installation",
            "Remote & keypad programming",
        ],
        faqs: [
            { question: "How much does a garage door opener cost?", answer: "Opener installation typically costs $250-$600 including the unit and labor." },
            { question: "What type of opener is quietest?", answer: "Belt-drive openers are the quietest option, ideal for garages attached to living spaces." },
            { question: "How long do garage door openers last?", answer: "A quality garage door opener lasts 10-15 years with regular maintenance." },
        ],
    },
    "garage-overhead-doors-install-replace": {
        heroImage: "/images/categories/garage.jpg",
        description:
            "Install or replace your garage door with a professional. Steel, wood, fiberglass, and insulated options available.",
        features: [
            "Steel, wood & composite doors",
            "Insulated & windstorm-rated options",
            "Custom sizes & designs",
            "Old door removal & disposal",
        ],
        faqs: [
            { question: "How much does a new garage door cost?", answer: "Garage doors cost $800-$4,000+ installed depending on material, size, and insulation." },
            { question: "How long does garage door installation take?", answer: "Most single-door installations are completed in 3-5 hours." },
            { question: "Should I get an insulated garage door?", answer: "Insulated doors improve energy efficiency and are recommended for attached garages." },
        ],
    },
    "garage-overhead-doors-repair": {
        heroImage: "/images/categories/garage.jpg",
        description:
            "Fix broken springs, cables, panels, and tracks. Fast, reliable garage door repair from trusted local pros.",
        features: [
            "Spring & cable replacement",
            "Track alignment & repair",
            "Panel replacement",
            "Emergency repair service",
        ],
        faqs: [
            { question: "How much does garage door repair cost?", answer: "Common repairs cost $150-$400. Spring replacement costs $200-$350." },
            { question: "Is it dangerous to repair garage door springs?", answer: "Yes, springs are under extreme tension. Always hire a professional for spring repairs." },
            { question: "How do I know if my garage door needs repair?", answer: "Signs include unusual noises, uneven movement, slow response, and visible damage." },
        ],
    },

    // ── General Contractor ──
    "general-contractor-new-construction": {
        heroImage: "/images/categories/general-contractor.jpg",
        description:
            "Find licensed general contractors for new home construction and major projects. Full project management from foundation to finish.",
        features: [
            "New home construction",
            "Full project management",
            "Subcontractor coordination",
            "Permit & inspection handling",
        ],
        faqs: [
            { question: "What does a general contractor do?", answer: "A GC manages all aspects of construction including hiring subs, scheduling, permits, and quality control." },
            { question: "How much does new construction cost?", answer: "New home construction costs $100-$400+ per square foot depending on location and finishes." },
            { question: "How do I choose the right general contractor?", answer: "Check licenses, insurance, references, and past projects. Get at least 3 quotes." },
        ],
    },

    // ── Grading / Gravel ──
    "grading-gravel-crushed-stone-maintenance": {
        heroImage: "/images/categories/grading.jpg",
        description:
            "Maintain and repair gravel driveways, paths, and surfaces. Professional grading and stone maintenance services.",
        features: [
            "Gravel driveway maintenance",
            "Grading & leveling",
            "Stone replenishment",
            "Drainage improvement",
        ],
        faqs: [
            { question: "How often does a gravel driveway need maintenance?", answer: "Gravel driveways typically need grading and replenishment every 1-2 years." },
            { question: "How much does gravel maintenance cost?", answer: "Annual maintenance typically costs $200-$600 depending on driveway size." },
            { question: "Can grading fix drainage issues?", answer: "Yes, proper grading directs water away from structures and prevents pooling." },
        ],
    },
    "grading-gravel-stone-installation": {
        heroImage: "/images/categories/grading.jpg",
        description:
            "Professional grading and gravel installation for driveways, walkways, and landscaping. Find experienced local contractors.",
        features: [
            "Driveway & walkway installation",
            "Site grading & preparation",
            "Various stone & aggregate options",
            "Drainage solutions",
        ],
        faqs: [
            { question: "How much does a gravel driveway cost?", answer: "Gravel driveways cost $1-$3 per square foot depending on stone type and depth." },
            { question: "What type of gravel is best for driveways?", answer: "Crushed stone or gravel with angular edges compacts well and provides a stable surface." },
            { question: "How deep should driveway gravel be?", answer: "A properly installed gravel driveway should have 4-6 inches of base material and 2-3 inches of surface gravel." },
        ],
    },

    // ── Gutters ──
    "gutter-installation-repair-maintenance": {
        heroImage: "/images/categories/gutters.jpg",
        description:
            "Keep water away from your foundation with quality gutters. Find trusted gutter installation pros in your area.",
        features: [
            "Seamless gutter installation",
            "Gutter guard systems",
            "Downspout routing",
            "Various materials & colors",
        ],
        faqs: [
            { question: "How much do new gutters cost?", answer: "Gutter installation costs $4-$12 per linear foot depending on material and style." },
            { question: "What gutter material is best?", answer: "Aluminum is most popular for its balance of cost, durability, and appearance. Copper is premium." },
            { question: "Should I add gutter guards?", answer: "Gutter guards reduce maintenance and prevent clogs. They're recommended for homes near trees." },
        ],
    },
    "gutter-repair-maintenance": {
        heroImage: "/images/categories/gutters.jpg",
        description:
            "Fix leaks, sagging, and clogs in your gutters. Professional maintenance to protect your home from water damage.",
        features: [
            "Leak & seam repair",
            "Gutter cleaning & flushing",
            "Fascia & bracket repair",
            "Downspout clearing",
        ],
        faqs: [
            { question: "How often should gutters be cleaned?", answer: "Gutters should be cleaned at least twice a year — in spring and fall." },
            { question: "How much does gutter repair cost?", answer: "Most gutter repairs cost $100-$350. Full cleaning runs $100-$250 for an average home." },
            { question: "What causes gutters to sag?", answer: "Sagging is usually caused by clogged gutters (water weight), damaged fascia, or loose brackets." },
        ],
    },

    // ── Heating ──
    heating: {
        heroImage: "/images/categories/hvac.jpg",
        description:
            "Keep your home warm with professional heating installation and replacement. Find certified HVAC pros near you.",
        features: [
            "Furnace & heat pump installation",
            "Boiler installation & replacement",
            "Energy-efficient upgrades",
            "Ductwork installation",
        ],
        faqs: [
            { question: "How much does a new furnace cost?", answer: "Furnace installation typically costs $3,000-$8,000 depending on type, size, and efficiency rating." },
            { question: "What type of heating system is most efficient?", answer: "Heat pumps are the most efficient option in moderate climates. High-efficiency furnaces work best in cold regions." },
            { question: "How long does a furnace last?", answer: "A well-maintained furnace lasts 15-20 years. Heat pumps last 10-15 years." },
        ],
    },
    "heating-service-repair": {
        heroImage: "/images/categories/hvac.jpg",
        description:
            "Expert heating repair and maintenance services. Get your furnace, heat pump, or boiler fixed by verified pros.",
        features: [
            "Furnace & boiler repair",
            "Heat pump troubleshooting",
            "Emergency heating service",
            "Preventive maintenance plans",
        ],
        faqs: [
            { question: "Why is my furnace blowing cold air?", answer: "Common causes include a dirty filter, pilot light issues, or a faulty thermostat. A pro can diagnose the problem." },
            { question: "How much does heating repair cost?", answer: "Heating repairs typically cost $150-$500 depending on the issue and system type." },
            { question: "When should I replace vs. repair my furnace?", answer: "If your furnace is over 15 years old and needs frequent repairs, replacement is usually more cost-effective." },
        ],
    },

    // ── Insulation ──
    "insulation-new-installation": {
        heroImage: "/images/categories/insulation.jpg",
        description:
            "Insulate your home for energy savings and comfort. Find professional insulation installers for attics, walls, and basements.",
        features: [
            "Attic, wall & basement insulation",
            "Fiberglass, spray foam & blown-in",
            "Energy efficiency improvements",
            "Sound dampening options",
        ],
        faqs: [
            { question: "What type of insulation is best?", answer: "The best type depends on your home and budget. Spray foam offers the highest R-value; blown-in is versatile and affordable." },
            { question: "How much does insulation cost?", answer: "Insulation costs $1-$4 per square foot for standard options. Spray foam costs $3-$7 per square foot." },
            { question: "How much can insulation save on energy bills?", answer: "Proper insulation can reduce heating and cooling costs by 15-30% or more." },
        ],
    },
    "insulation-upgrade-existing": {
        heroImage: "/images/categories/insulation.jpg",
        description:
            "Upgrade your home's insulation for better energy efficiency. Find pros to add or replace insulation in your attic, walls, and crawl spaces.",
        features: [
            "Insulation assessment & recommendation",
            "Old insulation removal",
            "Upgrade to modern materials",
            "Energy audit services",
        ],
        faqs: [
            { question: "How do I know if I need more insulation?", answer: "Signs include high energy bills, uneven temperatures, and drafts. An energy audit can tell you exactly what's needed." },
            { question: "Can new insulation go over old?", answer: "In many cases, yes. A pro will assess whether the old insulation should be removed first." },
            { question: "What R-value do I need?", answer: "R-value requirements vary by climate zone and location in the home. A pro can recommend the right level." },
        ],
    },

    // ── Interior Carpentry ──
    "interior-carpentry": {
        heroImage: "/images/categories/carpentry.jpg",
        description:
            "Custom interior carpentry for trim, built-ins, shelving, and more. Find skilled carpenters for any interior woodwork project.",
        features: [
            "Crown molding & baseboards",
            "Custom built-ins & shelving",
            "Staircase & railing work",
            "Finish carpentry & millwork",
        ],
        faqs: [
            { question: "What is finish carpentry?", answer: "Finish carpentry includes trim, molding, mantels, wainscoting, and other visible interior woodwork." },
            { question: "How much does interior carpentry cost?", answer: "Costs vary by project. Trim installation runs $2-$8 per linear foot. Custom built-ins start at $1,000+." },
            { question: "How long does a custom built-in take?", answer: "Custom built-in projects typically take 3-7 days depending on complexity." },
        ],
    },

    // ── Landscaping ──
    "landscaping-services": {
        heroImage: "/images/categories/landscaping.jpg",
        description:
            "Create your dream outdoor space. Find top landscaping professionals for design, installation, and maintenance.",
        features: [
            "Landscape design & planning",
            "Planting & garden installation",
            "Hardscape features",
            "Irrigation system integration",
        ],
        faqs: [
            { question: "How much does landscaping cost?", answer: "Landscaping projects range from $1,500-$15,000+ depending on scope and materials." },
            { question: "What's the best time to landscape?", answer: "Spring and fall are ideal for most landscaping projects due to moderate temperatures and rainfall." },
            { question: "Do landscapers handle hardscaping too?", answer: "Many landscaping companies offer hardscaping services like patios, retaining walls, and walkways." },
        ],
    },
    "landscaping-grounds-maintenance": {
        heroImage: "/images/categories/landscaping.jpg",
        description:
            "Keep your property looking its best with professional grounds maintenance. Mowing, trimming, fertilization, and more.",
        features: [
            "Regular mowing & edging",
            "Seasonal cleanups",
            "Fertilization & weed control",
            "Tree & shrub trimming",
        ],
        faqs: [
            { question: "How much does lawn maintenance cost?", answer: "Regular lawn service costs $30-$80 per visit for an average-sized yard." },
            { question: "How often should my lawn be mowed?", answer: "During the growing season, most lawns should be mowed weekly or bi-weekly." },
            { question: "What does a seasonal cleanup include?", answer: "Seasonal cleanups include leaf removal, bed edging, mulching, pruning, and debris clearing." },
        ],
    },

    // ── Pavers ──
    "paver-installation": {
        heroImage: "/images/categories/pavers.jpg",
        description:
            "Enhance your outdoor space with professionally installed pavers. Patios, walkways, and driveways by verified pros.",
        features: [
            "Patio & walkway installation",
            "Driveway pavers",
            "Brick, stone & concrete options",
            "Custom patterns & designs",
        ],
        faqs: [
            { question: "How much do pavers cost?", answer: "Paver installation typically costs $10-$30 per square foot including materials and labor." },
            { question: "Are pavers better than poured concrete?", answer: "Pavers offer more design flexibility and are easier to repair. Poured concrete is often less expensive." },
            { question: "How long do pavers last?", answer: "Quality pavers can last 25-50+ years with minimal maintenance." },
        ],
    },
    "paver-repair": {
        heroImage: "/images/categories/pavers.jpg",
        description:
            "Repair sunken, shifted, or damaged pavers. Restore your patio, walkway, or driveway to like-new condition.",
        features: [
            "Releveling & resetting",
            "Individual paver replacement",
            "Joint sand refilling",
            "Sealing & protection",
        ],
        faqs: [
            { question: "Why are my pavers sinking?", answer: "Sinking is usually caused by poor base preparation, erosion, or drainage issues beneath the pavers." },
            { question: "How much does paver repair cost?", answer: "Repairs typically cost $5-$15 per square foot. Minor joint sand refilling costs $200-$500." },
            { question: "Can individual pavers be replaced?", answer: "Yes, that's one of the biggest advantages of pavers — individual units can be lifted and replaced." },
        ],
    },

    // ── Plumbing ──
    "plumbing-emergency-services": {
        heroImage: "/images/categories/plumbing.jpg",
        description:
            "24/7 emergency plumbing service from trusted pros. Get immediate help for burst pipes, severe leaks, and other urgent problems.",
        features: [
            "24/7 emergency response",
            "Burst pipe repair",
            "Severe leak mitigation",
            "Water heater emergencies",
        ],
        faqs: [
            { question: "What qualifies as a plumbing emergency?", answer: "Burst pipes, sewage backups, gas leaks, and uncontrollable water flow are all plumbing emergencies." },
            { question: "How much does emergency plumbing cost?", answer: "Emergency calls typically cost $150-$500+ depending on the issue and time of day." },
            { question: "What should I do while waiting for the plumber?", answer: "Shut off the main water valve if possible and move valuables away from the affected area." },
        ],
    },
    "plumbing-installation-replacement": {
        heroImage: "/images/categories/plumbing.jpg",
        description:
            "From pipe installations to fixture replacements, find experienced plumbers ready to tackle your project with precision and care.",
        features: [
            "Pipe installation & replacement",
            "Fixture upgrades & installations",
            "Licensed & certified plumbers",
            "Upfront pricing with no surprises",
        ],
        faqs: [
            { question: "How much does plumbing installation cost?", answer: "Costs depend on the scope. Fixture installations cost $150-$500. Repiping costs $2,000-$15,000." },
            { question: "Should I replace old galvanized pipes?", answer: "Yes, galvanized pipes corrode over time and should be replaced with copper or PEX for better water quality." },
            { question: "How long does a plumbing installation take?", answer: "Single fixture installations take 1-3 hours. Larger projects like repiping take 2-5 days." },
        ],
    },
    "plumbing-repair": {
        heroImage: "/images/categories/plumbing.jpg",
        description:
            "Fix plumbing issues fast with verified repair specialists. From leaky faucets to broken pipes, get reliable service near you.",
        features: [
            "Leak detection & repair",
            "Drain cleaning & unclogging",
            "Toilet & faucet repair",
            "Water heater troubleshooting",
        ],
        faqs: [
            { question: "How much does a plumbing repair cost?", answer: "Common repairs cost $150-$400. Drain cleaning runs $100-$300." },
            { question: "How do I find a hidden leak?", answer: "Signs include unexplained water bills, damp spots, and mold. A pro uses leak detection equipment to pinpoint the source." },
            { question: "Why is my water heater not heating?", answer: "Common causes include a failed heating element, thermostat issue, or sediment buildup." },
        ],
    },

    // ── Pool ──
    "pool-construction-and-installation": {
        heroImage: "/images/categories/pool.jpg",
        description:
            "Build the pool of your dreams. Find experienced pool contractors for in-ground, above-ground, and custom pool installations.",
        features: [
            "In-ground & above-ground pools",
            "Custom designs & finishes",
            "Plumbing & electrical included",
            "Decking & landscaping integration",
        ],
        faqs: [
            { question: "How much does pool construction cost?", answer: "In-ground pools cost $25,000-$80,000+. Above-ground pools cost $3,000-$15,000 depending on size." },
            { question: "How long does pool construction take?", answer: "In-ground pools take 6-12 weeks. Above-ground pools can be installed in 1-3 days." },
            { question: "Do I need a permit to build a pool?", answer: "Yes, pool construction requires permits in virtually all municipalities." },
        ],
    },
    "pool-maintenance-service-and-repair": {
        heroImage: "/images/categories/pool.jpg",
        description:
            "Keep your pool clean, safe, and running smoothly. Find trusted pool maintenance and repair professionals near you.",
        features: [
            "Regular cleaning & chemical balancing",
            "Equipment repair & replacement",
            "Leak detection & repair",
            "Pool opening & closing services",
        ],
        faqs: [
            { question: "How much does pool maintenance cost?", answer: "Regular pool service costs $80-$200 per month depending on pool size and service level." },
            { question: "How often should a pool be serviced?", answer: "Weekly service is ideal for maintaining water chemistry. At minimum, bi-weekly during swim season." },
            { question: "How do I know if my pool has a leak?", answer: "If you're adding water more than once a week, or notice wet spots around the pool, you may have a leak." },
        ],
    },

    // ── Remodeling & Renovations ──
    remodeling: {
        heroImage: "/images/categories/remodeling.jpg",
        description:
            "Bring your remodeling vision to life with experienced contractors. Kitchen, bathroom, and whole-home remodels.",
        features: [
            "Kitchen & bathroom remodeling",
            "Whole-home renovations",
            "Licensed general contractors",
            "Design & build services",
        ],
        faqs: [
            { question: "How much does a kitchen remodel cost?", answer: "Kitchen remodels range from $15,000-$75,000+ depending on size and scope." },
            { question: "How long does a bathroom remodel take?", answer: "Most bathroom remodels take 2-4 weeks depending on the extent of changes." },
            { question: "Do I need a contractor for a remodel?", answer: "A licensed contractor is recommended for any project involving structural, plumbing, or electrical work." },
        ],
    },
    renovations: {
        heroImage: "/images/categories/remodeling.jpg",
        description:
            "Update and improve your home with professional renovation services. From cosmetic upgrades to full-scale renovations.",
        features: [
            "Interior & exterior renovations",
            "Structural modifications",
            "Historic home restoration",
            "Energy efficiency upgrades",
        ],
        faqs: [
            { question: "What's the difference between renovation and remodeling?", answer: "Renovation restores or updates existing features. Remodeling involves changing the structure or layout." },
            { question: "How much does a home renovation cost?", answer: "Costs vary widely. Minor renovations start at $5,000; major projects can exceed $100,000." },
            { question: "How do I plan a renovation?", answer: "Start with a clear scope, set a realistic budget (add 10-20% contingency), and get multiple contractor quotes." },
        ],
    },

    // ── Roofing ──
    "roofing-install-replace": {
        heroImage: "/images/categories/roofing.jpg",
        description:
            "Find the best roofing contractors for installation and replacement. Protect your home with quality roofing from verified professionals.",
        features: [
            "Full roof replacement & new installation",
            "Licensed & insured roofers",
            "Free roof inspections & estimates",
            "Warranty-backed workmanship",
        ],
        faqs: [
            { question: "How much does a new roof cost?", answer: "Roof replacement costs depend on size, materials, and location. Get free quotes by entering your ZIP code." },
            { question: "How long does a roof replacement take?", answer: "Most residential roof replacements are completed in 1-3 days depending on the scope of work." },
            { question: "What roofing materials are available?", answer: "Common options include asphalt shingles, metal roofing, tile, and flat roofing systems." },
        ],
    },
    "roofing-repair": {
        heroImage: "/images/categories/roofing.jpg",
        description:
            "Get fast, reliable roof repairs from verified professionals. From leaks to storm damage, find trusted roofers near you.",
        features: [
            "Emergency & scheduled repairs",
            "Leak detection & repair",
            "Storm damage restoration",
            "Licensed & insured professionals",
        ],
        faqs: [
            { question: "How much does roof repair cost?", answer: "Minor repairs cost $200-$600. Major repairs like large sections of damage cost $1,000-$3,000+." },
            { question: "Can a roof leak be repaired without full replacement?", answer: "Yes, most leaks can be repaired if the overall roof structure is sound. A pro can assess the best approach." },
            { question: "Does insurance cover roof repair?", answer: "Most homeowner policies cover storm damage repairs. Normal wear and tear is typically not covered." },
        ],
    },

    // ── Siding ──
    "siding-new-install-replace": {
        heroImage: "/images/categories/siding.jpg",
        description:
            "Protect and beautify your home with new siding. Compare qualified siding contractors near you.",
        features: [
            "Vinyl, fiber cement & wood siding",
            "Full house or partial replacement",
            "Insulated siding options",
            "Color & style variety",
        ],
        faqs: [
            { question: "How much does new siding cost?", answer: "Siding costs $5-$15 per square foot installed depending on material. Full house siding runs $7,000-$20,000+." },
            { question: "What siding material is most durable?", answer: "Fiber cement (like Hardie board) offers excellent durability, fire resistance, and low maintenance." },
            { question: "How long does siding installation take?", answer: "Most homes can be sided in 1-2 weeks depending on size and complexity." },
        ],
    },
    "siding-repair-existing": {
        heroImage: "/images/categories/siding.jpg",
        description:
            "Repair damaged, rotting, or loose siding. Protect your home from the elements with professional siding repair services.",
        features: [
            "Section & panel replacement",
            "Rot & water damage repair",
            "Color matching",
            "Caulking & sealing",
        ],
        faqs: [
            { question: "Can damaged siding be patched?", answer: "Yes, individual panels or sections can be replaced without redoing the entire exterior." },
            { question: "How much does siding repair cost?", answer: "Minor repairs cost $200-$500. Larger sections of replacement cost $1,000-$3,000." },
            { question: "What causes siding to warp?", answer: "Warping is typically caused by heat exposure, moisture behind the siding, or improper installation." },
        ],
    },

    // ── Solar ──
    "solar-panel-design-installation": {
        heroImage: "/images/categories/solar.jpg",
        description:
            "Go solar with confidence. Find certified solar installers who can design and install the perfect system for your home.",
        features: [
            "Custom solar system design",
            "Roof & ground mount options",
            "Battery storage integration",
            "Tax credit & incentive guidance",
        ],
        faqs: [
            { question: "How much do solar panels cost?", answer: "Residential solar systems cost $15,000-$30,000 before tax credits. Federal credits can reduce this by 30%." },
            { question: "How long does solar installation take?", answer: "Physical installation takes 1-3 days. The full process including permits and inspection takes 2-3 months." },
            { question: "How much can solar save on my electric bill?", answer: "Most homeowners save 50-90% on electricity. Exact savings depend on system size, energy use, and local rates." },
        ],
    },
    "solar-service-repair": {
        heroImage: "/images/categories/solar.jpg",
        description:
            "Keep your solar system performing at peak efficiency. Find pros for panel cleaning, inverter repair, and system diagnostics.",
        features: [
            "Panel cleaning & maintenance",
            "Inverter repair & replacement",
            "System performance monitoring",
            "Warranty claim assistance",
        ],
        faqs: [
            { question: "How often do solar panels need maintenance?", answer: "Solar panels are low-maintenance. Annual cleaning and inspection are recommended." },
            { question: "How long do solar panels last?", answer: "Most solar panels are warranted for 25 years and can produce energy for 30+ years." },
            { question: "What if my solar production drops?", answer: "Reduced output can indicate dirty panels, inverter issues, or shading. A diagnostic can pinpoint the cause." },
        ],
    },

    // ── Sprinkler / Irrigation ──
    "sprinkler-irrigation-services": {
        heroImage: "/images/categories/irrigation.jpg",
        description:
            "Install, repair, and maintain sprinkler and irrigation systems. Find certified irrigation pros to keep your landscape green.",
        features: [
            "Sprinkler system installation",
            "Drip irrigation setup",
            "Repair & winterization",
            "Smart controller upgrades",
        ],
        faqs: [
            { question: "How much does sprinkler installation cost?", answer: "Sprinkler systems cost $2,500-$5,000 for an average yard depending on zones and complexity." },
            { question: "How often should I service my sprinkler system?", answer: "Annual spring startup and fall winterization are recommended, plus mid-season checks." },
            { question: "Can I add smart controls to my existing system?", answer: "Yes, most systems can be upgraded with WiFi-enabled smart controllers for water savings and scheduling." },
        ],
    },

    // ── Tile & Stone ──
    "tile-stone-installation": {
        heroImage: "/images/categories/tile.jpg",
        description:
            "Expert tile and stone installation for floors, walls, showers, and backsplashes. Find skilled tile setters near you.",
        features: [
            "Floor & wall tile installation",
            "Shower & backsplash work",
            "Natural stone & porcelain",
            "Custom patterns & mosaics",
        ],
        faqs: [
            { question: "How much does tile installation cost?", answer: "Tile installation costs $5-$15 per square foot for labor, plus material costs." },
            { question: "How long does tile installation take?", answer: "A bathroom floor typically takes 1-2 days. A full kitchen backsplash takes 1 day." },
            { question: "What tile is best for showers?", answer: "Porcelain tile is the most popular shower option due to its low water absorption and durability." },
        ],
    },
    "tile-stone-repair": {
        heroImage: "/images/categories/tile.jpg",
        description:
            "Repair cracked, loose, or damaged tiles. Professional tile repair services to restore your floors and walls.",
        features: [
            "Cracked tile replacement",
            "Grout repair & regrouting",
            "Loose tile resetting",
            "Color & pattern matching",
        ],
        faqs: [
            { question: "Can a single cracked tile be replaced?", answer: "Yes, individual tiles can be carefully removed and replaced if matching tile is available." },
            { question: "How much does tile repair cost?", answer: "Minor tile repairs cost $100-$300. Regrouting a bathroom runs $200-$500." },
            { question: "How do I know if grout needs replacing?", answer: "Crumbling, discolored, or missing grout should be repaired to prevent moisture damage." },
        ],
    },

    // ── Windows ──
    "window-installation-replacement": {
        heroImage: "/images/categories/windows.jpg",
        description:
            "Upgrade your windows for better energy efficiency and curb appeal. Licensed window installers in your area.",
        features: [
            "Double & triple pane windows",
            "Energy Star certified options",
            "Custom sizes & styles",
            "Old window removal & disposal",
        ],
        faqs: [
            { question: "How much does window replacement cost?", answer: "Window replacement costs $300-$1,200 per window installed depending on type and size." },
            { question: "How many windows can be replaced in a day?", answer: "Most installers can replace 10-15 windows in a single day." },
            { question: "Do new windows really save energy?", answer: "Yes, Energy Star windows can reduce heating and cooling costs by 10-25% compared to single-pane windows." },
        ],
    },
    "window-repair": {
        heroImage: "/images/categories/windows.jpg",
        description:
            "Fix broken glass, foggy panes, stuck sashes, and drafty seals. Professional window repair to save money vs. full replacement.",
        features: [
            "Glass replacement",
            "Foggy/failed seal repair",
            "Sash & hardware repair",
            "Weather stripping & sealing",
        ],
        faqs: [
            { question: "Can foggy windows be repaired?", answer: "In some cases, failed seals can be repaired. Otherwise, the glass unit (IGU) can be replaced without changing the frame." },
            { question: "How much does window repair cost?", answer: "Glass replacement costs $100-$400 per window. Hardware repairs cost $75-$200." },
            { question: "Should I repair or replace old windows?", answer: "If frames are solid and only glass or hardware is damaged, repair is often the better value." },
        ],
    },
};

/**
 * Retrieve landing-page data for a category slug.
 * Merges category-specific data on top of defaults.
 */
export function getCategoryLandingData(categorySlug: string): CategoryLandingData {
    const overrides = CATEGORY_DATA[categorySlug];
    if (!overrides) return { ...DEFAULT_DATA };
    return { ...DEFAULT_DATA, ...overrides };
}
