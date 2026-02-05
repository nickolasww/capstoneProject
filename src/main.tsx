import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryProvider } from "@/libs/react-query/react-query-provider";
import { createRoutesFromFiles } from "@/libs/react-router/index.tsx";
import { Auth0ProviderWrapper } from "@/app/_components/providers/auth0";
import { SessionProvider } from "@/app/_components/providers/session";
import { JobPostingsProvider } from "@/app/(protected)/lamaran-kerja/posting-pekerjaan/jobPostingsStore";
import "@/index.css";

const pageFiles = import.meta.glob("@/app/**/*(page|layout).tsx");
const errorFiles = import.meta.glob("@/app/**/*error.tsx");
const notFoundFiles = import.meta.glob("@/app/**/*404.tsx");
const loadingFiles = import.meta.glob("@/app/**/*loading.tsx");

const routes = createRoutesFromFiles(pageFiles, errorFiles, notFoundFiles, loadingFiles);
const router = createBrowserRouter([routes]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <Auth0ProviderWrapper>
        <ReactQueryProvider>
          <JobPostingsProvider>
            <RouterProvider router={router} />
          </JobPostingsProvider>
        </ReactQueryProvider>
      </Auth0ProviderWrapper>
    </SessionProvider>
  </StrictMode>,
);

