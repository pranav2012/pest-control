'use client';

import Link from 'next/link';
import { 
  Facebook, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard,
  IndianRupee,
  Banknote,
  CircleDollarSign,
  Clock,
  Shield,
  Award
} from 'lucide-react';
import footerData from '@/content/footer.json';
import { SocialLink } from '@/types/footer';
import { handleSectionNavigation } from '@/utils/navigation';

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return <Facebook className="w-5 h-5" />;
    case 'instagram':
      return <Instagram className="w-5 h-5" />;
    case 'whatsapp':
      return <WhatsAppIcon />;
    default:
      return null;
  }
};

const PaymentMethodIcon = ({ method }: { method: string }) => {
  const getIcon = () => {
    switch (method.toLowerCase()) {
      case 'upi':
        return <IndianRupee className="w-5 h-5" />;
      case 'visa':
      case 'mastercard':
        return <CreditCard className="w-5 h-5" />;
      case 'cash':
        return <Banknote className="w-5 h-5" />;
      default:
        return <CircleDollarSign className="w-5 h-5" />;
    }
  };

  return (
    <div className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-md hover:bg-white/20 transition-colors duration-300">
      {getIcon()}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Top Section - Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 pb-16 border-b border-gray-800">
          <div className="flex items-center space-x-4 bg-[#25D366]/5 p-6 rounded-xl">
            <div className="bg-[#25D366]/10 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-[#25D366]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#25D366]">24/7 Support</h4>
              <p className="text-sm text-gray-400">Always here to help you</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-[#25D366]/5 p-6 rounded-xl">
            <div className="bg-[#25D366]/10 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-[#25D366]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#25D366]">Licensed & Insured</h4>
              <p className="text-sm text-gray-400">Professional service guaranteed</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-[#25D366]/5 p-6 rounded-xl">
            <div className="bg-[#25D366]/10 p-3 rounded-lg">
              <Award className="w-6 h-6 text-[#25D366]" />
            </div>
            <div>
              <h4 className="font-semibold text-[#25D366]">Expert Team</h4>
              <p className="text-sm text-gray-400">Experienced professionals</p>
            </div>
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          {/* Company Info */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-2xl font-bold text-[#25D366]">Alpha Beneficent Care</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {footerData.company_info.description}
            </p>
            <div className="flex items-center space-x-4 pt-4">
              {footerData.company_info.social_links.map((social: SocialLink) => (
                <Link
                  key={social.platform}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366]/10 p-3 rounded-lg text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300"
                >
                  <SocialIcon platform={social.platform} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-xl font-semibold text-[#25D366]">
              {footerData.quick_links.title}
            </h3>
            <ul className="space-y-3">
              {footerData.quick_links.links.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.url}
                    onClick={(e) => link.url.startsWith('/#') && handleSectionNavigation(e, link.url)}
                    className="text-gray-400 hover:text-[#25D366] transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="h-1.5 w-1.5 bg-[#25D366] rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-xl font-semibold text-[#25D366]">
              {footerData.contact_info.title}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-[#25D366]/5 rounded-lg group hover:bg-[#25D366]/10 transition-colors duration-300">
                <MapPin className="w-5 h-5 text-[#25D366] shrink-0" />
                <span className="text-gray-400 text-sm">
                  {footerData.contact_info.address}
                </span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-[#25D366]/5 rounded-lg hover:bg-[#25D366]/10 transition-colors duration-300">
                <Phone className="w-5 h-5 text-[#25D366]" />
                <a
                  href={`tel:${footerData.contact_info.phone}`}
                  className="text-gray-400 hover:text-[#25D366] transition-colors duration-300 text-sm"
                >
                  {footerData.contact_info.phone}
                </a>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-[#25D366]/5 rounded-lg hover:bg-[#25D366]/10 transition-colors duration-300">
                <Mail className="w-5 h-5 text-[#25D366]" />
                <a
                  href={`mailto:${footerData.contact_info.email}`}
                  className="text-gray-400 hover:text-[#25D366] transition-colors duration-300 text-sm"
                >
                  {footerData.contact_info.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Accepted Payments:</span>
              <div className="flex items-center space-x-3">
                {footerData.bottom_bar.payment_methods.map((method) => (
                  <PaymentMethodIcon key={method} method={method} />
                ))}
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              {footerData.bottom_bar.copyright}
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <Link
        href={`https://wa.me/${footerData.contact_info.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 hover:scale-110"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </Link>
    </footer>
  );
};

export default Footer;
