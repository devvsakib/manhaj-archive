import { ImageResponse } from "next/og";

export const alt = "Manhaj Archive | Pure Salafi Methodology & Research Portal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(135deg, #0F1412 0%, #14261E 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "14px solid #14452F",
                    padding: "60px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #C59B27",
                        borderRadius: "999px",
                        padding: "10px 28px",
                        color: "#C59B27",
                        fontSize: 24,
                        fontWeight: 700,
                        letterSpacing: "4px",
                        marginBottom: 28,
                    }}
                >
                    MANHAJ ARCHIVE
                </div>

                <div
                    style={{
                        color: "#F8FAFC",
                        fontSize: 52,
                        fontWeight: 700,
                        textAlign: "center",
                        lineHeight: 1.25,
                        maxWidth: "920px",
                    }}
                >
                    Authentic Islamic Knowledge, Usul &amp; Manhaj Research Portal
                </div>

                <div
                    style={{
                        color: "#3CB371",
                        fontSize: 28,
                        fontWeight: 600,
                        marginTop: 32,
                        letterSpacing: "1px",
                    }}
                >
                    manhajarchive.com
                </div>
            </div>
        ),
        { ...size }
    );
}