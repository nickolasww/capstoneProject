const KritikDanSaran = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-center text-4xl font-bold text-gray-800">
            Kritik dan Saran
          </h1>
          <p className="mb-12 text-center text-gray-600">
            Kami sangat menghargai masukan Anda untuk meningkatkan layanan kami
          </p>
          <div className="max-w-sm flex flex-col items-center justify-center mx-auto">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=human_resource@bukitaurumnsejahtera.co.id&su=${encodeURIComponent(
              "Kritik dan Saran",
            )}&body=${encodeURIComponent("Halo, saya ingin mengirim kritik dan saran: ")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-lg bg-green-600 py-3 px-fit font-semibold text-white transition hover:bg-green-700 flex items-center justify-center gap-2"
          >
            Beri Kritik dan Saran
          </a>
           <p className="mt-4 text-xs text-gray-400">
            Akan membuka email melalui browser Anda
          </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KritikDanSaran;
