const Section = () => {
  return (
    <>
    <div className='relative min-h-screen flex items-center justify-center bg-[#E7F4E2]'>
              {/* Background with gradient overlay */}
        {/* <div className="absolute inset-0 bg-linear-to-br from-blue-100 via-purple-100 to-pink-100">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/10 to-white/30"></div>
        </div> */}

        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gabung Bersama PT Bukit Aurumn Sejahtera!
          </h1>
          <p className="text-lg md:text-3xl text-black mb-8 max-w-xl mx-auto ">
            Membuka peluang karir unggul dalam lingkungan kerja inovatif dan profesional
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="text-xl px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
              Lihat Posisi
            </button>
            <button className="text-xl px-8 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-gray-300 shadow-md hover:shadow-lg">
              Lamaran Terdaftar
            </button>
          </div>
        </div>
    </div>
    </>
  )
}

export default Section
