'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import footerData from '@/content/footer.json';
import { SocialLink } from '@/types/footer';

const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return <Facebook className="w-5 h-5" />;
    case 'instagram':
      return <Instagram className="w-5 h-5" />;
    case 'twitter':
      return <Twitter className="w-5 h-5" />;
    case 'linkedin':
      return <Linkedin className="w-5 h-5" />;
    default:
      return null;
  }
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <p className="text-gray-300 mb-6">{footerData.company_info.description}</p>
            <div className="flex space-x-4">
              {footerData.company_info.social_links.map((social: SocialLink) => (
                <Link
                  key={social.platform}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <SocialIcon platform={social.platform} />
                </Link>
              ))}
            </div>
          </div>

          {/* Information Menu */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              {footerData.information_menu.title}
            </h3>
            <ul className="space-y-3">
              {footerData.information_menu.links.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.url}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              {footerData.contact_info.title}
            </h3>
            <p className="text-gray-400">{footerData.contact_info.address}</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
              {footerData.bottom_bar.copyright}
            </p>
            <div className="flex space-x-4">
              {footerData.bottom_bar.payment_methods.map((method) => (
                <span
                  key={method}
                  className="text-gray-400 text-sm capitalize"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
