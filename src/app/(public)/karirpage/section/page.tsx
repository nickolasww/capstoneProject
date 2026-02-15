import BgKiri from '@/assets/karirpage/BgKarirKiri.svg';
import BgKanan from '@/assets/karirpage/BgKarirKanan.svg';

const Section = () => {
  return (
    <div className='relative min-h-screen flex items-center justify-center bg-[#E7F4E2] overflow-hidden'>
        {/* Background Images */}
        <div className="absolute inset-0 z-0 w-full pointer-events-none">
          <div className="hidden xl:block absolute left-0 top-0 bottom-0 h-full w-[700px] 2xl:w-[900px]">
            <img 
              src={BgKiri} 
              alt="Background Left" 
              className="w-full lg:h-[800px] xl:h-[1000px] 2xl:h-full object-cover object-left"
            />
          </div>
          <div className="hidden xl:block absolute right-0 top-0 bottom-0 h-full w-[900px] 2xl:w-[1300px]">
             <img 
              src={BgKanan} 
              alt="Background Right" 
              className="w-full lg:h-[600px] xl:h-[1000px] 2xl:h-full object-cover object-right"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gabung Bersama PT Bukit Aurumn Sejahtera!
          </h1>
          <p className="text-lg md:text-3xl text-black mb-8 max-w-xl mx-auto ">
            Membuka peluang karir unggul dalam lingkungan kerja inovatif dan profesional
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="text-xl px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl cursor-pointer">
              Lihat Posisi
            </button>
            <button className="text-xl px-8 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-gray-300 shadow-md hover:shadow-lg cursor-pointer">
              Lamaran Terdaftar
            </button>
          </div>
        </div>
    </div>
  )
}

export default Section
