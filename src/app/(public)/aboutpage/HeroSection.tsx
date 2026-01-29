import imgHero from "@/assets/AboutPages/Hero Pictures BAS about.png";

export default function HeroSection() {
    return (
        <section className="relative h-[500px] md:h-[612px] w-full overflow-hidden">

            <div className="absolute inset-0">
                <img
                    src={imgHero}
                    alt="PT Bukit Aurumn Sejahtera Team"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center px-6">
                <div className="max-w-2xl text-center text-white space-y-6 md:space-y-12">
                    <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl leading-tight">
                        Tentang Kami
                    </h1>
                    <p className="font-medium text-lg md:text-xl lg:text-2xl leading-relaxed">
                        PT. Bukit Aurumn Sejahtera adalah perusahaan yang bergerak di bidang
                        Contractor & Supplier yang berpengalaman dalam mengerjakan proyek nasional.
                    </p>
                </div>
            </div>
        </section>
    );
}
