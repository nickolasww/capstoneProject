const VisionMission = () => {
  const missionPoints = [
    "Fokus dengan apa yang dibutuhkan konsumen",
    "Mendengarkan keluhan konsumen",
    "Memberikan pengalaman yang terbaik untuk konsumen",
    "Menyelesaikan pekerjaan tepat waktu",
    "Mengedepankan kualitas pekerjaan",
    "Fokus dengan efisiensi kerja dan pengurangan biaya yang timbul",
    "Berkomitmen terhadap inovasi, kreasi, dan perkembangan teknologi yang menunjang",
    "Berjuang untuk tumbuh bersama Tim",
  ];

  return (
    <section id="visimisi-section" className="bg-[#e7f4e2] py-12 md:py-20 lg:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          {/* Visi */}
          <div className="space-y-6 md:space-y-10">
            <h1 className=" font-medium text-5xl md:text-6xl lg:text-7xl text-[#3a6d26]">
              Visi
            </h1>
            <p className=" text-xl md:text-2xl text-black leading-relaxed">
              Membangun dengan kualitas, menyempurnakan dengan dedikasi
            </p>
          </div>

          {/* Misi */}
          <div className="space-y-6 md:space-y-10">
            <h1 className=" font-medium text-5xl md:text-6xl lg:text-7xl text-[#3a6d26]">
              Misi
            </h1>
            <ol className="space-y-3 text-lg md:text-2xl text-black list-decimal list-inside">
              {missionPoints.map((point, index) => (
                <li key={index} className="leading-relaxed pl-2">
                  <span className="ml-2">{point}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisionMission; 