"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
    interface Window {
        fbq: any;
        _fbq: any;
    }
}

export default function FacebookPixel() {
    const [pixelId, setPixelId] = useState<string | null>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Fetch Pixel ID from settings
        fetch("/api/admin/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    const setting = data.settings.find((s: any) => s.key === "facebook_pixel_id");
                    if (setting) {
                        setPixelId(setting.value);
                    }
                }
            })
            .catch((err) => console.error("Error fetching Pixel ID:", err));
    }, []);

    useEffect(() => {
        if (!pixelId || typeof window.fbq !== "function") return;

        // Track PageView on route change
        window.fbq("track", "PageView");
    }, [pathname, searchParams, pixelId]);

    if (!pixelId) return null;

    return (
        <>
            <Script
                id="fb-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
                }}
            />
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                    alt=""
                />
            </noscript>
        </>
    );
}

// Helper to track custom events from any component
export const trackFBEvent = (event: string, data?: any) => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", event, data);
    }
};
