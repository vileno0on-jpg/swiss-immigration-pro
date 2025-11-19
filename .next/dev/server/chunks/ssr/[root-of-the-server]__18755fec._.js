module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Downloads/New folder/components/ErrorBoundary.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorBoundary",
    ()=>ErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-red-600 dark:text-red-400 mb-4",
                            children: "Something went wrong"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/New folder/components/ErrorBoundary.tsx",
                            lineNumber: 33,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 dark:text-gray-400 mb-4",
                            children: this.state.error?.message || 'An unexpected error occurred'
                        }, void 0, false, {
                            fileName: "[project]/Downloads/New folder/components/ErrorBoundary.tsx",
                            lineNumber: 36,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                this.setState({
                                    hasError: false,
                                    error: undefined
                                });
                                window.location.reload();
                            },
                            className: "btn-primary",
                            children: "Reload Page"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/New folder/components/ErrorBoundary.tsx",
                            lineNumber: 39,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/New folder/components/ErrorBoundary.tsx",
                    lineNumber: 32,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/New folder/components/ErrorBoundary.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
}
}),
"[project]/Downloads/New folder/components/providers/SessionProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SessionProvider",
    ()=>SessionProvider,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)");
'use client';
;
;
function SessionProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SessionProvider"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/New folder/components/providers/SessionProvider.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = SessionProvider;
;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/New folder/lib/geolocation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// IP-based geolocation for automatic region detection
// Replaces the quiz system with automatic region detection
__turbopack_context__.s([
    "createGeolocationData",
    ()=>createGeolocationData,
    "detectRegionFromIP",
    ()=>detectRegionFromIP,
    "getRegionDescription",
    ()=>getRegionDescription,
    "getRegionDisplayName",
    ()=>getRegionDisplayName,
    "getRegionFromCountryCode",
    ()=>getRegionFromCountryCode,
    "getRegionRoute",
    ()=>getRegionRoute,
    "getRegionTagline",
    ()=>getRegionTagline,
    "getStoredRegion",
    ()=>getStoredRegion,
    "storeRegionDetection",
    ()=>storeRegionDetection
]);
const EU_COUNTRIES = new Set([
    'AT',
    'BE',
    'BG',
    'HR',
    'CY',
    'CZ',
    'DK',
    'EE',
    'FI',
    'FR',
    'DE',
    'GR',
    'HU',
    'IE',
    'IT',
    'LV',
    'LT',
    'LU',
    'MT',
    'NL',
    'PL',
    'PT',
    'RO',
    'SK',
    'SI',
    'ES',
    'SE',
    'IS',
    'LI',
    'NO'
]);
const US_COUNTRIES = new Set([
    'US'
]);
async function detectRegionFromIP(ip) {
    try {
        if (!ip) {
            console.warn('No IP provided, defaulting to other region');
            return 'other';
        }
        const response = await fetch(`https://ipapi.co/${ip}/json/`, {
            headers: {
                'User-Agent': 'Swiss-Immigration-App/1.0'
            }
        });
        if (!response.ok) {
            console.warn('Geolocation API failed, defaulting to other');
            return 'other';
        }
        const data = await response.json();
        if (data.error) {
            console.warn('Geolocation API error:', data.error);
            return 'other';
        }
        const countryCode = data.country_code?.toUpperCase();
        if (!countryCode) {
            console.warn('No country code in geolocation response');
            return 'other';
        }
        if (US_COUNTRIES.has(countryCode)) {
            return 'us';
        }
        if (EU_COUNTRIES.has(countryCode)) {
            return 'eu';
        }
        return 'other';
    } catch (error) {
        console.error('Error detecting region from IP:', error);
        return 'other';
    }
}
function getRegionFromCountryCode(countryCode) {
    const code = countryCode.toUpperCase().trim();
    if (US_COUNTRIES.has(code)) {
        return 'us';
    }
    if (EU_COUNTRIES.has(code)) {
        return 'eu';
    }
    return 'other';
}
function getRegionRoute(region) {
    return `/${region}`;
}
function getRegionDisplayName(region) {
    switch(region){
        case 'us':
            return 'United States';
        case 'eu':
            return 'Europe';
        case 'other':
            return 'International';
        default:
            return 'International';
    }
}
function getRegionTagline(region) {
    switch(region){
        case 'us':
            return 'From Stars & Stripes to Swiss Precision';
        case 'eu':
            return 'Easy EU Mobility to Swiss Bliss';
        case 'other':
            return 'Global Pathways to Switzerland';
        default:
            return 'Your Swiss Immigration Journey';
    }
}
function getRegionDescription(region) {
    switch(region){
        case 'us':
            return 'Navigate non-EU work visas, sponsorships, and salary thresholds. Expert guidance for US and Canadian professionals seeking Swiss opportunities.';
        case 'eu':
            return 'Leverage your EU/EFTA freedom of movement rights for fast-track Swiss residency. No quotas, simplified processes, and 5-year path to citizenship.';
        case 'other':
            return 'Comprehensive support for international nationals: quotas, lotteries, embassy guides, and strategic pathways to Swiss residency and citizenship.';
        default:
            return 'Your personalized Swiss immigration platform';
    }
}
function createGeolocationData(ip, countryCode, countryName) {
    const region = getRegionFromCountryCode(countryCode);
    return {
        ip,
        country_code: countryCode.toUpperCase(),
        country_name: countryName,
        region,
        detected_at: Date.now()
    };
}
function storeRegionDetection(region, geolocationData) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function getStoredRegion() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/Downloads/New folder/components/RegionDetector.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegionDetector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$New__folder$2f$lib$2f$geolocation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/New folder/lib/geolocation.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function RegionDetector() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isDetecting, setIsDetecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const detectRegion = async ()=>{
            try {
                // Check if user has already been detected
                const storedRegion = localStorage.getItem('userRegion');
                if (storedRegion && [
                    'us',
                    'eu',
                    'other'
                ].includes(storedRegion)) {
                    setIsDetecting(false);
                    return;
                }
                // Get user's IP (this would typically come from an API route)
                const response = await fetch('/api/region/detect');
                const data = await response.json();
                if (data.region) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$New__folder$2f$lib$2f$geolocation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["storeRegionDetection"])(data.region);
                }
            } catch (error) {
                console.error('Error detecting region:', error);
            } finally{
                setIsDetecting(false);
            }
        };
        detectRegion();
    }, [
        router
    ]);
    // This component doesn't render anything, it just handles region detection
    return null;
}
}),
"[project]/Downloads/New folder/components/providers/LocalePreferenceProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LocalePreferenceProvider,
    "useLocalePreference",
    ()=>useLocalePreference
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const LocalePreferenceContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function useLocalePreference() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LocalePreferenceContext);
    if (context === undefined) {
        throw new Error('useLocalePreference must be used within a LocalePreferenceProvider');
    }
    return context;
}
function LocalePreferenceProvider({ children }) {
    const [locale, setLocaleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('en');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Load saved locale preference from localStorage
        const savedLocale = localStorage.getItem('preferredLocale');
        if (savedLocale && [
            'en',
            'de',
            'fr',
            'it'
        ].includes(savedLocale)) {
            setLocaleState(savedLocale);
        }
    }, []);
    const setLocale = (newLocale)=>{
        setLocaleState(newLocale);
        localStorage.setItem('preferredLocale', newLocale);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LocalePreferenceContext.Provider, {
        value: {
            locale,
            setLocale
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/New folder/components/providers/LocalePreferenceProvider.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__18755fec._.js.map