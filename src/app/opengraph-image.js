import { ImageResponse } from "next/og";

export const alt = "Manhaj Archive | বিশুদ্ধ ইসলামি জ্ঞান ও মানহাজ পোর্টাল";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "#0F1412",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "12px solid #14452F",
                    padding: "60px",
                }}
            >
                <div
                    style={{
                        color: "#C59B27",
                        fontSize: 28,
                        fontWeight: "bold",
                        letterSpacing: "4px",
                        marginBottom: 20,
                    }}
                >
                    MANHAJ ARCHIVE
                </div>
                <div
                    style={{
                        color: "#F8FAFC",
                        fontSize: 54,
                        fontWeight: "bold",
                        textAlign: "center",
                        lineHeight: 1.3,
                        maxWidth: "900px",
                    }}
                >
                    কুরআন, সহীহ সুন্নাহ ও সালাফে সালেহীনদের মানহাজের নির্ভরযোগ্য আর্কাইভ
                </div>
                <div
                    style={{
                        color: "#3CB371",
                        fontSize: 26,
                        marginTop: 30,
                    }}
                >
                    manhajarchive.com
                </div>
            </div>
        ),
        { ...size }
    );
}