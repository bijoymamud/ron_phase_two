import { Link } from "react-router-dom";
import logo from "../../../assets/VALR_logo.png";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a2332] text-white">
      <div className="container mx-auto px-5 md:px-20 py-12 lg:py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex md:justify-start justify-center items-center mb-6">
              <img src={logo} alt="VALR Logo" className="h-20 w-auto" />
            </div>

            <p className="text-gray-300 text-center md:text-start text-sm leading-relaxed mb-6 max-w-sm">
              VALR IS A VETERAN-OWNED ORGANIZATION DEDICATED TO SIMPLIFYING THE
              VA PROCESS. WHETHER YOU'VE BEEN DENIED BEFORE OR NEVER APPLIED,
              WE'RE HERE TO FIGHT FOR YOU.
            </p>
          </div>

          {/* Helpful Links */}
          <div className="">
            <h3 className="text-white font-semibold text-sm mb-4 text-center md:text-start tracking-wider">
              HELPFUL LINKS
            </h3>
            <ul className="space-y-3 text-center md:text-start">
              <li>
                <Link
                  to="/about_us"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  ABOUT US
                </Link>
              </li>
              <li>
                <a
                  href="/#contact_us"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  CONTACT US
                </a>
              </li>
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 text-center md:text-start tracking-wider">
              OTHER LINKS
            </h3>
            <ul className="space-y-3 text-center md:text-start">
              <li>
                <Link
                  to="/calculator"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  CALCULATOR
                </Link>
              </li>

              <li>
                <a
                  href="/#faqs"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  Faq
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wider text-center md:text-start">
              CONTACT INFORMATION
            </h3>
            <ul className="space-y-4 ">
              <li className="flex items-center text-center md:text-start justify-center md:justify-start">
                <Mail className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                <a
                  href="mailto:support@valrpro.com"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  support@valrpro.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Phone className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                <a
                  href="tel:725-258-6118"
                  className="text-gray-300 hover:text-white text-sm transition-colors"
                >
                  725-258-6118
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-8"></div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-gray-400 text-xs leading-relaxed max-w-7xl mx-auto">
            <span className="text-red-500 font-semibold">DISCLAIMER:</span> VARL
            IS NOT AN ACCREDITED AGENT AND/OR A POOL OF ATTORNEYS, LAW FIRM OR
            LAW OFFICE. IT IS NOT AN ACCREDITED OR RECOGNIZED VA CLAIM AGENT NOR
            IS IT AN INDIVIDUAL OR ENTITY THAT IS ALLOWED AND ACCREDITED BY THE
            VA TO REPRESENT ANY AND ALL OF ITS AFFILIATES. VAC2023 DOES NOT
            REPRESENT VETERANS BEFORE THE VA OR BVA IN CONNECTION WITH ANY CLAIM
            FOR VA DISABILITY BENEFITS. VETERANS ARE APPRAISED THAT THERE ARE
            FREE RESOURCES AVAILABLE TO AID THEM IN THE APPLICATIONS THEY HAVE
            BEFORE DEPARTMENT OF VETERANS AFFAIRS (VA) SUCH AS BUT NOT LIMITED
            TO THE PREPARATION, FILING, PRESENTATION AND PROCESSING OF THE VA
            DISABILITY CLAIM.
          </p>
          <p className="text-gray-500 text-xs mt-4">
            © {new Date().getFullYear()} VALR. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
