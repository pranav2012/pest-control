'use client'

import Image from 'next/image'
import Link from 'next/link'
import servicesData from '@/content/services.json'
import { Service } from '@/types/services'
import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import ServiceModal from './ServiceModal'

export const WhatsAppIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
  </svg>
)

const ServiceCard = ({
  service,
  onClick,
}: {
  service: Service
  onClick: () => void
}) => {
  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in your ${service.title.toLowerCase()} services. Please provide more information.`
  )
  const whatsappLink = `${servicesData.cta_button.link}&text=${whatsappMessage}`

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[#25D366]/5"
      onClick={onClick}
    >
      {/* Image Container with Gradient Overlay */}
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Title Overlay */}
        <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white drop-shadow-lg">
          {service.title}
        </h3>
      </div>

      {/* Content */}
      <div className="relative space-y-4 p-4">
        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-600">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {(service.details.pests_covered || service.details.areas_covered)?.slice(0, 3).map((item) => (
            <span
              key={item}
              className="relative inline-flex items-center rounded-lg bg-gradient-to-r from-[#25D366]/10 to-[#25D366]/5 px-3 py-1 text-xs font-medium text-[#075e54] ring-1 ring-[#25D366]/20"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            className="group/btn relative text-sm font-medium text-[#25D366] transition-colors hover:text-[#075e54]"
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            <span className="relative">
              Learn More
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#075e54] transition-all duration-300 group-hover/btn:w-full" />
            </span>
          </button>
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#25D366]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <WhatsAppIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleServiceClick = (service: Service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  return (
    <section id="services" className="relative bg-gray-50 py-20 scroll-mt-24">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#25D366_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.15]" />
      
      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 [text-wrap:balance] md:text-5xl">
            {servicesData.section_title}
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E]" />
          <p className="text-lg text-gray-600">
            Professional pest control services with eco-friendly solutions
          </p>
        </div>

        {/* Services Grid with Horizontal Scroll for Mobile */}
        <div className="relative">
          {/* Mobile Scroll Indicators */}
          <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-[#25D366]/20 to-[#128C7E]/20 rounded-full lg:hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full" />
          </div>
          
          {/* Services Container */}
          <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto pb-6 lg:pb-0 lg:overflow-x-visible snap-x snap-mandatory scrollbar-hide">
            {servicesData.services.map((service) => (
              <div key={service.title} className="w-[85vw] sm:w-[400px] flex-shrink-0 snap-center lg:w-auto">
                <ServiceCard
                  service={service}
                  onClick={() => handleServiceClick(service)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedService(null)
        }}
      />
    </section>
  )
}

export default Services 