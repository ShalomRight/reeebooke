module.exports = [
"[project]/lib/rbac.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/currentUserClient.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>currentUserClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$13_$40$auth$2b$core$40$0$2e$34$2e$3_next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.13_@auth+core@0.34.3_next@16.0.1_react-dom@19.2.4_react@19.2.4/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rbac$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rbac.ts [app-ssr] (ecmascript)");
"use client";
;
;
function currentUserClient() {
    const { data: session, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$13_$40$auth$2b$core$40$0$2e$34$2e$3_next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSession"])();
    if (status === "loading" || status === "unauthenticated" || !session?.user?.email) {
        return null;
    }
    // cast role safely
    const role = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rbac$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeRole"])(session.user.role);
    return {
        ...session.user,
        role,
        isSuperAdmin: role === "SUPER_ADMIN",
        isAdmin: role === "ADMIN",
        isStaff: role === "STAFF",
        isClient: role === "CLIENT"
    };
}
}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatBookingDate",
    ()=>formatBookingDate,
    "formatBookingDateTime",
    ()=>formatBookingDateTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$5$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tailwind-merge@3.5.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$5$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
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
}),
"[project]/lib/swr/fetcher.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/swr/hooks/bookings.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBookingStats",
    ()=>useBookingStats,
    "useBookings",
    ()=>useBookings,
    "useUserBookings",
    ()=>useUserBookings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/swr@2.4.1_react@19.2.4/node_modules/swr/dist/index/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/swr/fetcher.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useBookings(params) {
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(url, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetcher"], {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 10000,
        keepPreviousData: true,
        refreshInterval: 0
    });
}
function useUserBookings(userId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(userId ? `/api/v1/bookings?userId=${userId}&limit=1000` : null, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetcher"], {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 10000,
        keepPreviousData: true,
        refreshInterval: 0
    });
}
function useBookingStats() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])("/api/v1/bookings/stats", __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetcher"], {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 30000,
        keepPreviousData: true,
        refreshInterval: 0
    });
}
}),
"[project]/lib/swr/hooks/services.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useServices",
    ()=>useServices
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/swr@2.4.1_react@19.2.4/node_modules/swr/dist/index/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/swr/fetcher.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useServices(params) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sort) queryParams.append("sort", params.sort);
    const url = `/api/v1/services?${queryParams.toString()}`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(url, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetcher"], {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 60000,
        keepPreviousData: true,
        refreshInterval: 0
    });
}
}),
"[project]/lib/swr/hooks/users.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStaff",
    ()=>useStaff,
    "useUsers",
    ()=>useUsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/swr@2.4.1_react@19.2.4/node_modules/swr/dist/index/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/swr/fetcher.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useUsers(params) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sort) queryParams.append("sort", params.sort);
    if (params?.role) queryParams.append("role", params.role);
    if (params?.search) queryParams.append("search", params.search);
    const url = `/api/v1/admin/users?${queryParams.toString()}`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(url, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetcher"]);
}
function useStaff(params) {
    const queryParams = new URLSearchParams();
    queryParams.append("role", "STAFF");
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    const url = `/api/v1/admin/users?${queryParams.toString()}`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$swr$40$2$2e$4$2e$1_react$40$19$2e$2$2e$4$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(url, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetcher"]);
}
}),
"[project]/lib/swr/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * SWR Hooks Library
 * Centralized data fetching hooks for the application
 */ // Export fetcher
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$fetcher$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/swr/fetcher.ts [app-ssr] (ecmascript)");
// Export booking hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$hooks$2f$bookings$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/swr/hooks/bookings.ts [app-ssr] (ecmascript)");
// Export service hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$hooks$2f$services$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/swr/hooks/services.ts [app-ssr] (ecmascript)");
// Export user hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$swr$2f$hooks$2f$users$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/swr/hooks/users.ts [app-ssr] (ecmascript)");
;
;
;
;
}),
"[project]/hooks/use-favorites.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFavorites",
    ()=>useFavorites
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$13_$40$auth$2b$core$40$0$2e$34$2e$3_next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-auth@4.24.13_@auth+core@0.34.3_next@16.0.1_react-dom@19.2.4_react@19.2.4/node_modules/next-auth/react/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_react-dom@19.2.4_react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@1.7.4_react-dom@19.2.4_react@19.2.4/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
function useFavorites() {
    const [favorites, setFavorites] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$4$2e$24$2e$13_$40$auth$2b$core$40$0$2e$34$2e$3_next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSession"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadFavorites = async ()=>{
            if (session?.user?.email) {
                try {
                    const response = await fetch("/api/v1/favorites");
                    if (response.ok) {
                        const data = await response.json();
                        setFavorites(data.map((fav)=>fav.serviceId));
                    }
                } catch (error) {
                // Silently fail for loading favorites - not critical
                }
            }
            setIsLoading(false);
        };
        loadFavorites();
    }, [
        session?.user?.email
    ]);
    const addFavorite = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (serviceId)=>{
        if (!session?.user?.email) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Please log in to add favorites");
            return;
        }
        try {
            const response = await fetch("/api/v1/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    serviceId
                })
            });
            if (response.ok) {
                setFavorites((prev)=>[
                        ...new Set([
                            ...prev,
                            serviceId
                        ])
                    ]);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Added to favorites");
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to add to favorites");
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to add to favorites");
        }
    }, [
        session?.user?.email
    ]);
    const removeFavorite = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (serviceId)=>{
        if (!session?.user?.email) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Please log in to remove favorites");
            return;
        }
        try {
            const response = await fetch(`/api/v1/favorites?serviceId=${serviceId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setFavorites((prev)=>prev.filter((id)=>id !== serviceId));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Removed from favorites");
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to remove from favorites");
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$1$2e$7$2e$4_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to remove from favorites");
        }
    }, [
        session?.user?.email
    ]);
    const isFavorite = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((serviceId)=>favorites.includes(serviceId), [
        favorites
    ]);
    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        isLoading
    };
}
}),
"[project]/hooks/use-disclosure.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDisclosure",
    ()=>useDisclosure
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.1_react-dom@19.2.4_react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useDisclosure(initialState = false) {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialState);
    const onOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setIsOpen(true), []);
    const onClose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setIsOpen(false), []);
    const onToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$1_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setIsOpen((prev)=>!prev), []);
    return {
        isOpen,
        onOpen,
        onClose,
        onToggle
    };
}
}),
];

//# sourceMappingURL=_f455cb6f._.js.map