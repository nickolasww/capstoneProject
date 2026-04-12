import SEO from "@/app/_components/seo/seo";
import JobList from "./Joblist/page";
import Section from "./section/page";
import { Helmet } from "react-helmet-async";

const KarirPage = () => {
  return (
    <div>
      <SEO
        title="Karir & Lowongan Kerja - PT Bukit Aurumn Sejahtera Kediri"
        description="Bergabunglah bersama PT Bukit Aurumn Sejahtera Kediri. Temukan lowongan kerja terbaru di bidang konstruksi, pengadaan barang & jasa, dan operasional alat berat."
        canonical="https://www.bukitaurumnsejahtera.co.id/karirpage"
      />

       <Helmet> 
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EmployerAggregateRating",
            "itemReviewed": {
              "@type": "Organization",
              "name": "PT Bukit Aurumn Sejahtera",
              "sameAs": "https://www.bukitaurumnsejahtera.co.id"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kediri",
                "addressRegion": "Jawa Timur",
                "addressCountry": "ID"
              }
            }
          })}
        </script>
      </Helmet>

      <Section />
      <JobList />
    </div>
  );
};

export default KarirPage;
