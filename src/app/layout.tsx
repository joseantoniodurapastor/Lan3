import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains",
    weight: ["400", "500", "700"],
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space",
    weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
    title: "ZUNCHOS | Infraestructura Comercial Autónoma para Agencias B2B",
    description: "Sustituye SDRs por sistemas. ZUNCHOS instala infraestructura comercial autónoma que convierte leads en reuniones sin dependencia humana.",
    metadataBase: new URL("https://zunchos.io"),
    openGraph: {
        type: "website",
        title: "ZUNCHOS | Infraestructura Comercial Autónoma",
        description: "Infraestructura autónoma para agencias B2B. No es chatbot. No es CRM. Es arquitectura que sustituye dependencia humana por sistemas.",
        url: "https://zunchos.io/",
        images: [{ url: "/Utils/ZUNCHOS.png" }],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@graph": [
                                {
                                    "@type": "Organization",
                                    "name": "ZUNCHOS",
                                    "url": "https://zunchos.io",
                                    "logo": "https://zunchos.io/Utils/ZUNCHOS.png",
                                    "contactPoint": {
                                        "@type": "ContactPoint",
                                        "telephone": "+34-965441687",
                                        "contactType": "customer service",
                                        "email": "info@zunchos.io"
                                    },
                                },
                                {
                                    "@type": "Service",
                                    "name": "Infraestructura Comercial Autónoma",
                                    "description": "Sistema de infraestructura operativa que sustituye procesos humanos de ventas.",
                                    "provider": { "@type": "Organization", "name": "ZUNCHOS" },
                                },
                                {
                                    "@type": "FAQPage",
                                    "mainEntity": [
                                        {
                                            "@type": "Question",
                                            "name": "¿Qué es ZUNCHOS?",
                                            "acceptedAnswer": { "@type": "Answer", "text": "Infraestructura comercial autónoma para agencias B2B." }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "¿Cómo funciona?",
                                            "acceptedAnswer": { "@type": "Answer", "text": "Capa operativa sobre tu negocio actual que intercepta y cualifica leads." }
                                        }
                                    ]
                                }
                            ],
                        }),
                    }}
                />
            </head>
            <body className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} font-mono bg-black text-white`}>
                {children}
            </body>
        </html>
    );
}
