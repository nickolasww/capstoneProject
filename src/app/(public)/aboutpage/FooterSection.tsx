import { Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';
import imgLogo from "@/assets/AboutPages/logo PT BAS.png";

export function Footer() {
    return (
        <footer className="bg-gradient-to-r from-[#48892f] to-[#48892f] text-white py-12 md:py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Divider Line */}
                <div className="w-full h-px bg-white/30 mb-10" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-14 relative overflow-hidden">
                                <img
                                    src={imgLogo}
                                    alt="Logo"
                                    className="absolute h-[170.38%] left-0 top-[-20.47%] w-full object-cover"
                                />
                            </div>
                            <span className="font-['Poppins'] font-bold text-xl">
                                PT. BUKIT AURUMN SEJAHTERA
                            </span>
                        </div>

                        {/* Company Description */}
                        <p className="font-['Poppins'] text-justify leading-relaxed">
                            PT. Bukit Aurumn Sejahtera adalah perusahaan yang bergerak dibidang
                            Contractor & Supplier yang berpengalaman dalam mengerjakan proyek nasional.
                        </p>

                        {/* Social Media */}
                        <div className="flex gap-8 pt-4">
                            <SocialIcon Icon={Twitter} href="#" label="Twitter" />
                            <SocialIcon Icon={Instagram} href="#" label="Instagram" />
                            <SocialIcon Icon={Linkedin} href="#" label="LinkedIn" />
                            <SocialIcon Icon={Facebook} href="#" label="Facebook" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-['Poppins'] font-bold text-lg">Quick Links</h3>
                        <ul className="space-y-2 font-['Poppins']">
                            <FooterLink href="#home">Home</FooterLink>
                            <FooterLink href="#about">About</FooterLink>
                            <FooterLink href="#services">Services</FooterLink>
                            <FooterLink href="#karir">Karir</FooterLink>
                            <FooterLink href="#kontak">Kontak</FooterLink>
                            <FooterLink href="#beasiswa">Beasiswa</FooterLink>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className="font-['Poppins'] font-bold text-lg">Services</h3>
                        <ul className="space-y-2 font-['Poppins']">
                            <FooterLink href="#alat-berat">Alat berat</FooterLink>
                            <FooterLink href="#konstruksi">Konstruksi</FooterLink>
                            <FooterLink href="#pengadaan">Pengadaan barang & jasa</FooterLink>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="font-['Poppins'] font-bold text-lg">Kontak Kami</h3>
                        <div className="space-y-3 font-['Poppins']">
                            <div>
                                <span className="font-bold">Phone</span>: (0354) 7418963
                            </div>
                            <div>
                                <span className="font-bold">Email</span>:
                                <br />
                                <a
                                    href="mailto:pt.bukitaurumnsejahtera@gmail.com"
                                    className="hover:underline break-all"
                                >
                                    pt.bukitaurumnsejahtera@gmail.com
                                </a>
                            </div>
                            <div className="pt-2">
                                <p className="leading-relaxed">
                                    Jl. Ringin Anom Gang 1, No. 19, Kota Kediri
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-6 border-t border-white/20 text-center">
                    <p className="font-['Poppins'] text-sm">
                        © {new Date().getFullYear()} PT. Bukit Aurumn Sejahtera. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ Icon, href, label }: { Icon: any; href: string; label: string }) {
    return (
        <a
            href={href}
            aria-label={label}
            className="hover:scale-110 transition-transform"
        >
            <Icon className="w-6 h-6" />
        </a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <a
                href={href}
                className="hover:text-white/80 transition-colors inline-block"
            >
                {children}
            </a>
        </li>
    );
}
