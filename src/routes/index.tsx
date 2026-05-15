import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "./HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMARTVEND SYSTEM CORPORATION — Smart Digital Solutions" },
      {
        name: "description",
        content:
          "SMARTVEND SYSTEM CORP. delivers innovative IT services and the CleanIt on-demand cleaning platform for modern businesses in the Philippines.",
      },
      { property: "og:title", content: "SMARTVEND SYSTEM CORPORATION" },
      {
        property: "og:description",
        content: "Smart digital solutions for modern businesses.",
      },
    ],
  }),
  component: HomePage,
});
