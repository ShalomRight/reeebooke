(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatBookingDate",
    ()=>formatBookingDate,
    "formatBookingDateTime",
    ()=>formatBookingDateTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$5$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tailwind-merge@3.5.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$5$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatBookingDateTime(date, time) {
    try {
        // Convert to Date object if it's a string
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        // Check if date is valid
        if (isNaN(dateObj.getTime())) {
            return `${date} at ${time}`;
        }
        // Format date as "January 15, 2024"
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return `${formattedDate} at ${time}`;
    } catch (error) {
        // Fallback to original format if parsing fails
        return `${date} at ${time}`;
    }
}
function formatBookingDate(date) {
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        if (isNaN(dateObj.getTime())) {
            return String(date);
        }
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return String(date);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/swr/fetcher.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Centralized SWR fetcher function
 * Handles all API requests with consistent error handling
 */ __turbopack_context__.s([
    "fetcher",
    ()=>fetcher
]);
const fetcher = async (url)=>{
    const response = await fetch(url);
    if (!response.ok) {
        const error = new Error("An error occurred while fetching the data.");
        error.status = response.status;
        error.info = await response.json().catch(()=>({}));
        throw error;
    }
    return response.json();
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/swr/hooks/bookings.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBookingStats",
    ()=>useBookingStats,
    "useBookings",
    ()=>useBookings,
    "useUserBookings",
    ()=>useUserBookings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/swr@2.4.1_react@19.2.4/node_modules/swr/dist/index/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/swr/fetcher.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
function useBookings(params) {
    _s();
    const queryParams = new URLSearchParams();
    if (params?.startDate) queryParams.append("startDate", params.startDate);
    if (params?.endDate) queryParams.append("endDate", params.endDate);
    if (params?.date) queryParams.append("date", params.date);
    if (params?.serviceId) queryParams.append("serviceId", params.serviceId);
    if (params?.userId) queryParams.append("userId", params.userId);
    if (params?.status) queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sort) queryParams.append("sort", params.sort);
    const url = queryParams.toString() ? `/api/v1/bookings?${queryParams.toString()}` : `/api/v1/bookings`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(url, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetcher"], {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 10000,
        keepPreviousData: true,
        refreshInterval: 0
    });
}
_s(useBookings, "7xERTuQa/rCStZtEZdi0LgBAmUk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
function useUserBookings(userId) {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(userId ? `/api/v1/bookings?userId=${userId}&limit=1000` : null, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetcher"], {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 10000,
        keepPreviousData: true,
        refreshInterval: 0
    });
}
_s1(useUserBookings, "7xERTuQa/rCStZtEZdi0LgBAmUk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
function useBookingStats() {
    _s2();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])("/api/v1/bookings/stats", __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetcher"], {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 30000,
        keepPreviousData: true,
        refreshInterval: 0
    });
}
_s2(useBookingStats, "7xERTuQa/rCStZtEZdi0LgBAmUk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/swr/hooks/services.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useServices",
    ()=>useServices
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/swr@2.4.1_react@19.2.4/node_modules/swr/dist/index/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/swr/fetcher.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useServices(params) {
    _s();
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sort) queryParams.append("sort", params.sort);
    const url = `/api/v1/services?${queryParams.toString()}`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(url, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetcher"], {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 60000,
        keepPreviousData: true,
        refreshInterval: 0
    });
}
_s(useServices, "7xERTuQa/rCStZtEZdi0LgBAmUk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/swr/hooks/users.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStaff",
    ()=>useStaff,
    "useUsers",
    ()=>useUsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/swr@2.4.1_react@19.2.4/node_modules/swr/dist/index/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/swr/fetcher.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
function useUsers(params) {
    _s();
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sort) queryParams.append("sort", params.sort);
    if (params?.role) queryParams.append("role", params.role);
    if (params?.search) queryParams.append("search", params.search);
    const url = `/api/v1/admin/users?${queryParams.toString()}`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(url, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetcher"]);
}
_s(useUsers, "7xERTuQa/rCStZtEZdi0LgBAmUk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
function useStaff(params) {
    _s1();
    const queryParams = new URLSearchParams();
    queryParams.append("role", "STAFF");
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    const url = `/api/v1/admin/users?${queryParams.toString()}`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(url, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetcher"]);
}
_s1(useStaff, "7xERTuQa/rCStZtEZdi0LgBAmUk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/swr/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * SWR Hooks Library
 * Centralized data fetching hooks for the application
 */ // Export fetcher
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/swr/fetcher.ts [app-client] (ecmascript)");
// Export booking hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$hooks$2f$bookings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/swr/hooks/bookings.ts [app-client] (ecmascript)");
// Export service hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$hooks$2f$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/swr/hooks/services.ts [app-client] (ecmascript)");
// Export user hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$hooks$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/swr/hooks/users.ts [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/square-calendar-mock-data/events.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addEvent",
    ()=>addEvent,
    "events",
    ()=>events,
    "getEventsForDate",
    ()=>getEventsForDate,
    "getEventsForWeek",
    ()=>getEventsForWeek,
    "getTodayEvents",
    ()=>getTodayEvents
]);
const events = [
    {
        id: "1",
        title: "Daily checkin",
        startTime: "09:00",
        endTime: "10:00",
        date: "2024-02-04",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "2",
        title: "Call with Leonel Ngoya - UX Designer",
        startTime: "10:00",
        endTime: "11:30",
        date: "2024-02-04",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "3",
        title: "Quick Sync",
        startTime: "12:00",
        endTime: "12:15",
        date: "2024-02-04",
        participants: [
            "user1"
        ]
    },
    {
        id: "4",
        title: "Lunch Meeting",
        startTime: "13:00",
        endTime: "14:00",
        date: "2024-02-04",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "5",
        title: "Team Standup",
        startTime: "14:00",
        endTime: "14:30",
        date: "2024-02-04",
        participants: [
            "user1",
            "user2",
            "user3",
            "user4"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "6",
        title: "Design Review",
        startTime: "15:00",
        endTime: "15:45",
        date: "2024-02-04",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "7",
        title: "Product Review",
        startTime: "16:00",
        endTime: "17:00",
        date: "2024-02-04",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "8",
        title: "Client Call",
        startTime: "17:30",
        endTime: "18:00",
        date: "2024-02-04",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "9",
        title: "Evening Standup",
        startTime: "19:00",
        endTime: "19:15",
        date: "2024-02-04",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "10",
        title: "Night Sync",
        startTime: "22:00",
        endTime: "22:30",
        date: "2024-02-04",
        participants: [
            "user1"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "11",
        title: "Early Morning Check",
        startTime: "06:00",
        endTime: "06:30",
        date: "2024-02-05",
        participants: [
            "user1"
        ]
    },
    {
        id: "12",
        title: "Daily checkin",
        startTime: "09:00",
        endTime: "10:00",
        date: "2024-02-05",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "13",
        title: "Call with James Brown - UX Designer",
        startTime: "10:00",
        endTime: "11:00",
        date: "2024-02-05",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "14",
        title: "Quick Update",
        startTime: "11:30",
        endTime: "11:45",
        date: "2024-02-05",
        participants: [
            "user1"
        ]
    },
    {
        id: "15",
        title: "Design Workshop",
        startTime: "13:00",
        endTime: "15:00",
        date: "2024-02-05",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "16",
        title: "Coffee Break",
        startTime: "15:30",
        endTime: "15:45",
        date: "2024-02-05",
        participants: []
    },
    {
        id: "17",
        title: "Sprint Review",
        startTime: "16:00",
        endTime: "17:00",
        date: "2024-02-05",
        participants: [
            "user1",
            "user2",
            "user3",
            "user4"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "18",
        title: "Client Meeting",
        startTime: "18:00",
        endTime: "19:00",
        date: "2024-02-05",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "19",
        title: "Dinner Meeting",
        startTime: "20:00",
        endTime: "21:00",
        date: "2024-02-05",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "20",
        title: "Late Night Work",
        startTime: "23:00",
        endTime: "23:30",
        date: "2024-02-05",
        participants: [
            "user1"
        ]
    },
    {
        id: "21",
        title: "Morning Exercise",
        startTime: "07:00",
        endTime: "07:30",
        date: "2024-02-06",
        participants: []
    },
    {
        id: "22",
        title: "Daily checkin",
        startTime: "09:00",
        endTime: "10:00",
        date: "2024-02-06",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "23",
        title: "Intro call with Nova - Product Manager",
        startTime: "10:00",
        endTime: "11:30",
        date: "2024-02-06",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "24",
        title: "Intro call with Chris - Bubble Developer",
        startTime: "12:00",
        endTime: "13:30",
        date: "2024-02-06",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "25",
        title: "Afternoon Break",
        startTime: "14:00",
        endTime: "14:15",
        date: "2024-02-06",
        participants: []
    },
    {
        id: "26",
        title: "Sprint Planning",
        startTime: "15:00",
        endTime: "16:30",
        date: "2024-02-06",
        participants: [
            "user1",
            "user2",
            "user3",
            "user4"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "27",
        title: "Code Review",
        startTime: "17:00",
        endTime: "17:30",
        date: "2024-02-06",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "28",
        title: "Team Dinner",
        startTime: "19:00",
        endTime: "20:30",
        date: "2024-02-06",
        participants: [
            "user1",
            "user2",
            "user3"
        ]
    },
    {
        id: "29",
        title: "Evening Review",
        startTime: "21:00",
        endTime: "21:30",
        date: "2024-02-06",
        participants: [
            "user1"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "30",
        title: "Midnight Check",
        startTime: "00:00",
        endTime: "00:30",
        date: "2024-02-07",
        participants: [
            "user1"
        ]
    },
    {
        id: "31",
        title: "Early Bird Meeting",
        startTime: "05:00",
        endTime: "05:30",
        date: "2024-02-07",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "32",
        title: "Morning Standup",
        startTime: "08:00",
        endTime: "08:30",
        date: "2024-02-07",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "33",
        title: "Daily checkin",
        startTime: "09:00",
        endTime: "10:00",
        date: "2024-02-07",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "34",
        title: "Weekly recruiter sync",
        startTime: "11:30",
        endTime: "12:30",
        date: "2024-02-07",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "35",
        title: "Lunch Break",
        startTime: "13:00",
        endTime: "14:00",
        date: "2024-02-07",
        participants: []
    },
    {
        id: "36",
        title: "Code Review Session",
        startTime: "14:00",
        endTime: "15:00",
        date: "2024-02-07",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "37",
        title: "Quick Sync",
        startTime: "15:30",
        endTime: "15:45",
        date: "2024-02-07",
        participants: [
            "user1"
        ]
    },
    {
        id: "38",
        title: "Product Demo",
        startTime: "16:00",
        endTime: "17:00",
        date: "2024-02-07",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "39",
        title: "Evening Sync",
        startTime: "20:00",
        endTime: "20:30",
        date: "2024-02-07",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "40",
        title: "Night Standup",
        startTime: "22:00",
        endTime: "22:15",
        date: "2024-02-07",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "41",
        title: "Early Morning Call",
        startTime: "06:30",
        endTime: "07:00",
        date: "2024-02-08",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "42",
        title: "Daily checkin",
        startTime: "09:00",
        endTime: "10:00",
        date: "2024-02-08",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "43",
        title: "Call with Leonel Ngoya - UX Designer",
        startTime: "10:00",
        endTime: "11:30",
        date: "2024-02-08",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "44",
        title: "Lunch Break",
        startTime: "12:00",
        endTime: "13:00",
        date: "2024-02-08",
        participants: []
    },
    {
        id: "45",
        title: "Afternoon Meeting",
        startTime: "13:30",
        endTime: "14:00",
        date: "2024-02-08",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "46",
        title: "Design Critique",
        startTime: "14:30",
        endTime: "15:30",
        date: "2024-02-08",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "47",
        title: "Quick Check",
        startTime: "16:00",
        endTime: "16:15",
        date: "2024-02-08",
        participants: [
            "user1"
        ]
    },
    {
        id: "48",
        title: "Team Retrospective",
        startTime: "17:00",
        endTime: "18:00",
        date: "2024-02-08",
        participants: [
            "user1",
            "user2",
            "user3",
            "user4"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "49",
        title: "Evening Planning",
        startTime: "19:00",
        endTime: "19:30",
        date: "2024-02-08",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "50",
        title: "Late Night Review",
        startTime: "23:00",
        endTime: "23:45",
        date: "2024-02-08",
        participants: [
            "user1"
        ]
    },
    {
        id: "51",
        title: "Morning Coffee Chat",
        startTime: "08:00",
        endTime: "08:30",
        date: "2024-02-09",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "52",
        title: "Daily checkin",
        startTime: "09:00",
        endTime: "10:00",
        date: "2024-02-09",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "53",
        title: "Project Kickoff",
        startTime: "11:00",
        endTime: "12:00",
        date: "2024-02-09",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "54",
        title: "Quick Update",
        startTime: "12:30",
        endTime: "12:45",
        date: "2024-02-09",
        participants: [
            "user1"
        ]
    },
    {
        id: "55",
        title: "Lunch Meeting",
        startTime: "13:00",
        endTime: "14:00",
        date: "2024-02-09",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "56",
        title: "Afternoon Standup",
        startTime: "14:30",
        endTime: "15:00",
        date: "2024-02-09",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "57",
        title: "Client Presentation",
        startTime: "15:30",
        endTime: "16:30",
        date: "2024-02-09",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "58",
        title: "Team Sync",
        startTime: "17:00",
        endTime: "17:30",
        date: "2024-02-09",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "59",
        title: "Evening Review",
        startTime: "18:30",
        endTime: "19:00",
        date: "2024-02-09",
        participants: [
            "user1"
        ]
    },
    {
        id: "60",
        title: "Night Work Session",
        startTime: "21:00",
        endTime: "22:00",
        date: "2024-02-09",
        participants: [
            "user1"
        ]
    },
    {
        id: "61",
        title: "Midnight Standup",
        startTime: "00:30",
        endTime: "00:45",
        date: "2024-02-10",
        participants: [
            "user1"
        ]
    },
    {
        id: "62",
        title: "Early Morning Work",
        startTime: "04:00",
        endTime: "05:00",
        date: "2024-02-10",
        participants: [
            "user1"
        ]
    },
    {
        id: "63",
        title: "Sunrise Meeting",
        startTime: "07:30",
        endTime: "08:00",
        date: "2024-02-10",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "64",
        title: "Daily checkin",
        startTime: "09:00",
        endTime: "10:00",
        date: "2024-02-10",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "65",
        title: "Weekend Planning",
        startTime: "10:00",
        endTime: "11:00",
        date: "2024-02-10",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "66",
        title: "Quick Sync",
        startTime: "11:30",
        endTime: "11:45",
        date: "2024-02-10",
        participants: [
            "user1"
        ]
    },
    {
        id: "67",
        title: "Lunch Break",
        startTime: "12:00",
        endTime: "13:00",
        date: "2024-02-10",
        participants: []
    },
    {
        id: "68",
        title: "Afternoon Review",
        startTime: "13:30",
        endTime: "14:30",
        date: "2024-02-10",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "69",
        title: "Team Building",
        startTime: "15:00",
        endTime: "16:00",
        date: "2024-02-10",
        participants: [
            "user1",
            "user2",
            "user3",
            "user4"
        ]
    },
    {
        id: "70",
        title: "Evening Standup",
        startTime: "18:00",
        endTime: "18:15",
        date: "2024-02-10",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "71",
        title: "Dinner Meeting",
        startTime: "19:30",
        endTime: "20:30",
        date: "2024-02-10",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "72",
        title: "Late Night Sync",
        startTime: "22:30",
        endTime: "23:00",
        date: "2024-02-10",
        participants: [
            "user1"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "73",
        title: "Night Check",
        startTime: "01:00",
        endTime: "01:15",
        date: "2024-02-04",
        participants: [
            "user1"
        ]
    },
    {
        id: "74",
        title: "Early Work",
        startTime: "02:00",
        endTime: "03:00",
        date: "2024-02-05",
        participants: [
            "user1"
        ]
    },
    {
        id: "75",
        title: "Night Sync",
        startTime: "03:00",
        endTime: "03:30",
        date: "2024-02-06",
        participants: [
            "user1"
        ]
    },
    {
        id: "76",
        title: "Quick Check",
        startTime: "01:30",
        endTime: "01:45",
        date: "2024-02-08",
        participants: [
            "user1"
        ]
    },
    {
        id: "77",
        title: "Night Work",
        startTime: "02:30",
        endTime: "03:30",
        date: "2024-02-09",
        participants: [
            "user1"
        ]
    },
    {
        id: "78",
        title: "Early Standup",
        startTime: "01:00",
        endTime: "01:30",
        date: "2024-02-10",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "79",
        title: "Night Review",
        startTime: "03:00",
        endTime: "03:45",
        date: "2024-02-04",
        participants: [
            "user1"
        ]
    },
    {
        id: "80",
        title: "Early Morning Sync",
        startTime: "01:00",
        endTime: "01:15",
        date: "2024-02-05",
        participants: [
            "user1"
        ]
    },
    {
        id: "81",
        title: "Quick Standup",
        startTime: "02:00",
        endTime: "02:15",
        date: "2024-02-06",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "82",
        title: "Night Meeting",
        startTime: "01:30",
        endTime: "02:00",
        date: "2024-02-07",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "83",
        title: "Early Check",
        startTime: "03:00",
        endTime: "03:30",
        date: "2024-02-08",
        participants: [
            "user1"
        ]
    },
    {
        id: "84",
        title: "Night Standup",
        startTime: "02:00",
        endTime: "02:30",
        date: "2024-02-09",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "85",
        title: "Early Review",
        startTime: "03:30",
        endTime: "04:00",
        date: "2024-02-10",
        participants: [
            "user1"
        ]
    },
    {
        id: "86",
        title: "Morning Brief",
        startTime: "07:00",
        endTime: "07:30",
        date: "2024-02-04",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "87",
        title: "Breakfast Meeting",
        startTime: "08:00",
        endTime: "08:45",
        date: "2024-02-04",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "88",
        title: "Quick Update",
        startTime: "11:00",
        endTime: "11:15",
        date: "2024-02-04",
        participants: [
            "user1"
        ]
    },
    {
        id: "89",
        title: "Afternoon Break",
        startTime: "15:30",
        endTime: "15:45",
        date: "2024-02-04",
        participants: []
    },
    {
        id: "90",
        title: "Evening Call",
        startTime: "18:30",
        endTime: "19:00",
        date: "2024-02-04",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "91",
        title: "Night Review",
        startTime: "21:00",
        endTime: "21:30",
        date: "2024-02-04",
        participants: [
            "user1"
        ]
    },
    {
        id: "92",
        title: "Late Night Work",
        startTime: "23:00",
        endTime: "23:30",
        date: "2024-02-04",
        participants: [
            "user1"
        ]
    },
    {
        id: "93",
        title: "Sunrise Standup",
        startTime: "07:30",
        endTime: "08:00",
        date: "2024-02-05",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "94",
        title: "Morning Sync",
        startTime: "08:30",
        endTime: "09:00",
        date: "2024-02-05",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "95",
        title: "Quick Check",
        startTime: "12:00",
        endTime: "12:15",
        date: "2024-02-05",
        participants: [
            "user1"
        ]
    },
    {
        id: "96",
        title: "Afternoon Standup",
        startTime: "14:00",
        endTime: "14:30",
        date: "2024-02-05",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "97",
        title: "Evening Review",
        startTime: "19:30",
        endTime: "20:00",
        date: "2024-02-05",
        participants: [
            "user1"
        ]
    },
    {
        id: "98",
        title: "Night Standup",
        startTime: "21:30",
        endTime: "22:00",
        date: "2024-02-05",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "99",
        title: "Early Morning Standup",
        startTime: "08:00",
        endTime: "08:30",
        date: "2024-02-06",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "100",
        title: "Quick Sync",
        startTime: "11:00",
        endTime: "11:15",
        date: "2024-02-06",
        participants: [
            "user1"
        ]
    },
    {
        id: "101",
        title: "Afternoon Meeting",
        startTime: "16:00",
        endTime: "16:30",
        date: "2024-02-06",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "102",
        title: "Evening Standup",
        startTime: "18:00",
        endTime: "18:30",
        date: "2024-02-06",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "103",
        title: "Night Work",
        startTime: "22:00",
        endTime: "23:00",
        date: "2024-02-06",
        participants: [
            "user1"
        ]
    },
    {
        id: "104",
        title: "Late Night Check",
        startTime: "23:30",
        endTime: "23:45",
        date: "2024-02-06",
        participants: [
            "user1"
        ]
    },
    {
        id: "105",
        title: "Early Work Session",
        startTime: "06:00",
        endTime: "07:00",
        date: "2024-02-07",
        participants: [
            "user1"
        ]
    },
    {
        id: "106",
        title: "Quick Update",
        startTime: "10:00",
        endTime: "10:15",
        date: "2024-02-07",
        participants: [
            "user1"
        ]
    },
    {
        id: "107",
        title: "Afternoon Sync",
        startTime: "15:00",
        endTime: "15:30",
        date: "2024-02-07",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "108",
        title: "Evening Call",
        startTime: "17:30",
        endTime: "18:00",
        date: "2024-02-07",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "109",
        title: "Night Review",
        startTime: "21:00",
        endTime: "21:30",
        date: "2024-02-07",
        participants: [
            "user1"
        ]
    },
    {
        id: "110",
        title: "Late Night Standup",
        startTime: "23:00",
        endTime: "23:15",
        date: "2024-02-07",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "111",
        title: "Early Morning Call",
        startTime: "07:00",
        endTime: "07:30",
        date: "2024-02-08",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "112",
        title: "Morning Standup",
        startTime: "08:00",
        endTime: "08:30",
        date: "2024-02-08",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "113",
        title: "Quick Check",
        startTime: "11:00",
        endTime: "11:15",
        date: "2024-02-08",
        participants: [
            "user1"
        ]
    },
    {
        id: "114",
        title: "Afternoon Review",
        startTime: "15:00",
        endTime: "15:45",
        date: "2024-02-08",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "115",
        title: "Evening Standup",
        startTime: "18:30",
        endTime: "19:00",
        date: "2024-02-08",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "116",
        title: "Night Meeting",
        startTime: "20:00",
        endTime: "20:30",
        date: "2024-02-08",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "117",
        title: "Late Night Review",
        startTime: "22:00",
        endTime: "22:30",
        date: "2024-02-08",
        participants: [
            "user1"
        ]
    },
    {
        id: "118",
        title: "Early Standup",
        startTime: "07:00",
        endTime: "07:30",
        date: "2024-02-09",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "119",
        title: "Quick Sync",
        startTime: "10:00",
        endTime: "10:15",
        date: "2024-02-09",
        participants: [
            "user1"
        ]
    },
    {
        id: "120",
        title: "Afternoon Break",
        startTime: "16:00",
        endTime: "16:15",
        date: "2024-02-09",
        participants: []
    },
    {
        id: "121",
        title: "Evening Sync",
        startTime: "20:00",
        endTime: "20:30",
        date: "2024-02-09",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "122",
        title: "Night Standup",
        startTime: "22:30",
        endTime: "23:00",
        date: "2024-02-09",
        participants: [
            "user1",
            "user2"
        ]
    },
    {
        id: "123",
        title: "Early Morning Work",
        startTime: "05:30",
        endTime: "06:00",
        date: "2024-02-10",
        participants: [
            "user1"
        ]
    },
    {
        id: "124",
        title: "Morning Call",
        startTime: "08:30",
        endTime: "09:00",
        date: "2024-02-10",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
        timezone: "UTC"
    },
    {
        id: "125",
        title: "Quick Update",
        startTime: "11:00",
        endTime: "11:15",
        date: "2024-02-10",
        participants: [
            "user1"
        ]
    },
    {
        id: "126",
        title: "Afternoon Standup",
        startTime: "14:00",
        endTime: "14:30",
        date: "2024-02-10",
        participants: [
            "user1",
            "user2",
            "user3"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "127",
        title: "Evening Review",
        startTime: "17:00",
        endTime: "17:30",
        date: "2024-02-10",
        participants: [
            "user1"
        ]
    },
    {
        id: "128",
        title: "Night Sync",
        startTime: "21:00",
        endTime: "21:30",
        date: "2024-02-10",
        participants: [
            "user1",
            "user2"
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij"
    },
    {
        id: "129",
        title: "Late Night Work",
        startTime: "23:30",
        endTime: "23:45",
        date: "2024-02-10",
        participants: [
            "user1"
        ]
    }
];
function getEventsForDate(date) {
    return events.filter((event)=>event.date === date);
}
function getEventsForWeek(startDate) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    return events.filter((event)=>{
        const eventDate = new Date(event.date);
        return eventDate >= startDate && eventDate <= endDate;
    });
}
function getTodayEvents() {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1;
    const baseWeekStart = new Date("2024-02-04");
    const baseDayOfWeek = baseWeekStart.getDay() === 0 ? 6 : baseWeekStart.getDay() - 1;
    return events.filter((event)=>{
        const eventDate = new Date(event.date);
        const eventDayOfWeek = eventDate.getDay() === 0 ? 6 : eventDate.getDay() - 1;
        return eventDayOfWeek === dayOfWeek;
    });
}
function addEvent(event) {
    const newId = String(events.length + 1);
    events.push({
        ...event,
        id: newId
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/square-calendar-store/calendar-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCalendarStore",
    ()=>useCalendarStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$12_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$4$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zustand@5.0.12_@types+react@19.2.14_react@19.2.4/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeek.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addWeeks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addWeeks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$subWeeks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/subWeeks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addDays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$getDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDay.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$square$2d$calendar$2d$mock$2d$data$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/square-calendar-mock-data/events.ts [app-client] (ecmascript)");
;
;
;
const BASE_WEEK_START = new Date("2024-02-04");
function getDayOfWeek(date) {
    const day = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$getDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDay"])(date);
    return day === 0 ? 6 : day - 1;
}
function getEventsForWeek(startDate, allEvents) {
    const weekEvents = [];
    for(let i = 0; i < 7; i++){
        const currentDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(startDate, i);
        const currentDayOfWeek = getDayOfWeek(currentDay);
        allEvents.forEach((event)=>{
            const eventDate = new Date(event.date);
            const eventDayOfWeek = getDayOfWeek(eventDate);
            if (eventDayOfWeek === currentDayOfWeek) {
                const eventDateStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(currentDay, "yyyy-MM-dd");
                weekEvents.push({
                    ...event,
                    id: `${event.id}-${eventDateStr}`,
                    date: eventDateStr
                });
            }
        });
    }
    return weekEvents;
}
const useCalendarStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$12_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$4$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        events: [],
        setEvents: (events)=>set({
                events
            }),
        currentWeekStart: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfWeek"])(new Date(), {
            weekStartsOn: 1
        }),
        searchQuery: "",
        eventTypeFilter: "all",
        participantsFilter: "all",
        goToNextWeek: ()=>set((state)=>({
                    currentWeekStart: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addWeeks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addWeeks"])(state.currentWeekStart, 1)
                })),
        goToPreviousWeek: ()=>set((state)=>({
                    currentWeekStart: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$subWeeks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subWeeks"])(state.currentWeekStart, 1)
                })),
        goToToday: ()=>set({
                currentWeekStart: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfWeek"])(new Date(), {
                    weekStartsOn: 1
                })
            }),
        goToDate: (date)=>set({
                currentWeekStart: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfWeek$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfWeek"])(date, {
                    weekStartsOn: 1
                })
            }),
        setSearchQuery: (query)=>set({
                searchQuery: query
            }),
        setEventTypeFilter: (filter)=>set({
                eventTypeFilter: filter
            }),
        setParticipantsFilter: (filter)=>set({
                participantsFilter: filter
            }),
        addEvent: (event)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$square$2d$calendar$2d$mock$2d$data$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEvent"])(event);
        },
        getCurrentWeekEvents: ()=>{
            const state = get();
            let weekEvents = getEventsForWeek(state.currentWeekStart, state.events);
            if (state.searchQuery) {
                const query = state.searchQuery.toLowerCase();
                weekEvents = weekEvents.filter((event)=>event.title.toLowerCase().includes(query) || event.participants.some((p)=>p.toLowerCase().includes(query)));
            }
            if (state.eventTypeFilter === "with-meeting") {
                weekEvents = weekEvents.filter((event)=>event.meetingLink);
            } else if (state.eventTypeFilter === "without-meeting") {
                weekEvents = weekEvents.filter((event)=>!event.meetingLink);
            }
            if (state.participantsFilter === "with-participants") {
                weekEvents = weekEvents.filter((event)=>event.participants.length > 0);
            } else if (state.participantsFilter === "without-participants") {
                weekEvents = weekEvents.filter((event)=>event.participants.length === 0);
            }
            return weekEvents;
        },
        getWeekDays: ()=>{
            const state = get();
            const days = [];
            for(let i = 0; i < 7; i++){
                days.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addDays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDays"])(state.currentWeekStart, i));
            }
            return days;
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/rbac.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ROLE_HIERARCHY",
    ()=>ROLE_HIERARCHY,
    "ROLE_PERMISSIONS",
    ()=>ROLE_PERMISSIONS,
    "canAccessResource",
    ()=>canAccessResource,
    "getRoleLabel",
    ()=>getRoleLabel,
    "hasPermission",
    ()=>hasPermission,
    "isValidUserRole",
    ()=>isValidUserRole,
    "normalizeRole",
    ()=>normalizeRole
]);
const ROLE_HIERARCHY = {
    SUPER_ADMIN: 4,
    ADMIN: 3,
    STAFF: 2,
    CLIENT: 1
};
const ROLE_PERMISSIONS = {
    SUPER_ADMIN: [
        "manage_users",
        "manage_roles",
        "manage_services",
        "manage_bookings",
        "view_analytics",
        "manage_staff",
        "view_reports",
        "system_settings"
    ],
    ADMIN: [
        "manage_services",
        "manage_bookings",
        "view_analytics",
        "manage_staff",
        "view_reports"
    ],
    STAFF: [
        "view_bookings",
        "update_booking_status",
        "view_services"
    ],
    CLIENT: [
        "book_services",
        "view_own_bookings",
        "cancel_own_bookings"
    ]
};
function hasPermission(role, permission) {
    return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
function canAccessResource(userRole, requiredRole) {
    return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}
function getRoleLabel(role) {
    const labels = {
        SUPER_ADMIN: "Super Admin",
        ADMIN: "Admin",
        STAFF: "Staff",
        CLIENT: "Client"
    };
    return labels[role] || role;
}
const isValidUserRole = (role)=>{
    return [
        "SUPER_ADMIN",
        "ADMIN",
        "STAFF",
        "CLIENT"
    ].includes(role);
};
const normalizeRole = (role)=>{
    if (isValidUserRole(role)) return role;
    return "CLIENT" // fallback role
    ;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_79914a41._.js.map