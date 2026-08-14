import { createFileRoute } from "@tanstack/react-router";
import { ZumbaRegistration } from "../components/site/ZumbaRegistration";

export const Route = createFileRoute("/zumba-registration")({
  head: () => ({
    meta: [
      { title: "Zumba Fit by CleanIt - Pre-Registration" },
      {
        name: "description",
        content:
          "Secure your slot for Zumba Fit by CleanIt! Pre-register now for a fun-filled Zumba experience. Serbisyong So Sulit! Sayaw, Galaw at Saya!",
      },
      { property: "og:title", content: "Zumba Fit by CleanIt - Pre-Registration" },
      {
        property: "og:description",
        content: "Join us for Zumba Fit by CleanIt. Secure your slot now!",
      },
    ],
  }),
  component: ZumbaRegistration,
});
