/** Two-letter US state abbreviation ↔ full name mapping */

const STATE_CODE_TO_NAME: Record<string, string> = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
    DC: "District of Columbia",
    AS: "American Samoa",
    GU: "Guam",
    MP: "Northern Mariana Islands",
    PR: "Puerto Rico",
    VI: "US Virgin Islands",
};

const STATE_NAME_TO_CODE: Record<string, string> = {};
for (const [code, name] of Object.entries(STATE_CODE_TO_NAME)) {
    STATE_NAME_TO_CODE[name.toLowerCase()] = code;
}

/**
 * Convert a state code (e.g. "tx") to full name (e.g. "Texas").
 * Returns the uppercased code if not found.
 */
export function stateCodeToName(code: string): string {
    return STATE_CODE_TO_NAME[code.toUpperCase()] ?? code.toUpperCase();
}

/**
 * Convert a full state name (e.g. "Texas") to its 2-letter code (e.g. "TX").
 * Returns the slugified input if not found.
 */
export function stateNameToCode(name: string): string {
    return STATE_NAME_TO_CODE[name.toLowerCase()] ?? name.toLowerCase();
}
