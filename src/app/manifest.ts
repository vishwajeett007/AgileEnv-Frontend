import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "AgileEnv",
        short_name: "AgileEnv",
        description: "AgileEnv - Your Personalized Project Management Assistant",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
            {
                src: "/Images/logo.svg",
                sizes: "192x192",
                type: "image/svg+xml",
            },
            {
                src: "/Images/logo.svg",
                sizes: "512x512",
                type: "image/svg+xml",
            },
        ],
    };
}
