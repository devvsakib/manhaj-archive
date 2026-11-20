import { alertsData } from "@/data/alertsData";

export default function sitemap() {
    const baseUrl = "https://manhajarchive.com";

    const alertUrls = alertsData.map((alert) => ({
        url: `${baseUrl}/alerts/${alert.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0,
        },
        ...alertUrls,
    ];
}