import { Link } from "react-router-dom";
import {
  InstagramOutlined,
  TwitterOutlined,
  LinkedinFilled,
  FacebookFilled,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-[#48892F] to-[#12230C] from-40% to-100% text-white py-12 px-4 sm:px-6 lg:px-8 border-t-4">
        {/* Top border line style from image if needed, for now just gradient */}
      <div className="max-w-7xl mx-auto ">
        {/* Separator Line */}
        <div className="w-full h-px bg-white/30 mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-between">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
                 {/* Logo Placeholder - assuming a triangle shape based on 'Bit' or similar, using a simple svg or text for now */}
                 <div className="w-10 h-10 relative">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M12 2L2 22H22L12 2Z" fill="url(#logo-gradient)" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                        <defs>
                            <linearGradient id="logo-gradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FFD700" />
                                <stop offset="1" stopColor="#FFA500" />
                            </linearGradient>
                        </defs>
                    </svg>
                 </div>
                 <h3 className="font-bold text-lg leading-tight">PT. BUKIT AURUMN SEJAHTERA</h3>
            </div>
            
            <p className="text-sm text-gray-100 leading-relaxed text-justify w-full">
              PT. Bukit Aurumn Sejahtera adalah perusahaan yang bergerak dibidang Contractor & Supplier 
              yang berpengalaman dalam mengerjakan proyek nasional.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-white">
                <TwitterOutlined className="text-xl" />
              </a>
              <a href="#" className="text-white">
                <InstagramOutlined className="text-xl" />
              </a>
              <a href="#" className="text-white">
                <LinkedinFilled className="text-xl" />
              </a>
              <a href="#" className="text-white">
                <FacebookFilled className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-40">
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-100">
              <li><Link to="/" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1 h-1 bg-white rounded-full"></span> Home
              </Link></li>
              <li><Link to="/aboutpage" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1 h-1 bg-white rounded-full"></span> About
              </Link></li>
              <li><Link to="/services" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1 h-1 bg-white rounded-full"></span> Services
              </Link></li>
              <li><Link to="/karirpage" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1 h-1 bg-white rounded-full"></span> Karir
              </Link></li>
               <li><Link to="/beasiswa" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                <span className="w-1 h-1 bg-white rounded-full"></span> Beasiswa
              </Link></li>
            </ul>
          </div>

          {/* Services & Contact Wrapper */}
          <div className="contents lg:block lg:space-y-8">
            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-100">
                <li className="flex items-center gap-2">
                   <span className="w-1 h-1 bg-white rounded-full"></span> Alat berat
                </li>
                <li className="flex items-center gap-2">
                   <span className="w-1 h-1 bg-white rounded-full"></span> Konstruksi
                </li>
                <li className="flex items-center gap-2">
                   <span className="w-1 h-1 bg-white rounded-full"></span> Pengadaan barang & jasa
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Kontak Kami</h3>
              <ul className="space-y-3 text-sm text-gray-100">
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-[50px]">Phone:</span> 
                  <span>(0354) 7418963</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold min-w-[50px]">Email:</span> 
                  <span className="break-all">pt.bukitaurumnsejahtera@gmail.com</span>
                </li>
                <li className="mt-2 text-gray-200">
                  Jl. Ringin Anom Gang 1, No. 19, Kota Kediri
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Separator Line */}


        {/* Copyright */}
        <div className="text-center text-sm text-gray-200">
            {/* Can add copyright text here if needed, or leave blank as per some clean designs, 
                but usually good to have. The image didn't clearly show a separated copyright section 
                at the bottom bottom, but the previous code had it. I'll leave it simple. */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
