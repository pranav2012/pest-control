'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Service } from '@/types/services'
import { X as XIcon } from 'lucide-react'
import { WhatsAppIcon } from './index'

interface ServiceModalProps {
  service: Service | null
  isOpen: boolean
  onClose: () => void
}

const ServiceModal = ({ service, isOpen, onClose }: ServiceModalProps) => {
  if (!service) return null

  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in your ${service.title.toLowerCase()} services. Please provide more information.`
  )
  const whatsappLink = `https://api.whatsapp.com/send?phone=918882002546&text=${whatsappMessage}`

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-h-[85vh] max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                {/* Header with Image */}
                <div className="relative h-48 sm:h-56 w-full">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20"
                  >
                    <XIcon className="h-5 w-5 text-white" />
                  </button>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <Dialog.Title as="h3" className="text-2xl font-bold">
                      {service.title}
                    </Dialog.Title>
                    <p className="mt-2 text-white/90">{service.description}</p>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="max-h-[calc(85vh-14rem)] overflow-y-auto p-6">
                  <div className="grid gap-6">
                    {/* Pests/Areas Covered */}
                    <div className="rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100">
                      <h4 className="font-semibold text-gray-900">
                        {service.details.pests_covered ? 'Pests Covered' : 'Areas Covered'}
                      </h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(service.details.pests_covered || service.details.areas_covered)?.map(
                          (item) => (
                            <span
                              key={item}
                              className="inline-flex items-center rounded-lg bg-gradient-to-r from-[#25D366]/10 to-[#25D366]/5 px-3 py-1 text-sm font-medium text-[#075e54] ring-1 ring-[#25D366]/20"
                            >
                              {item}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Service Features */}
                    <div className="rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100">
                      <h4 className="font-semibold text-gray-900">Service Features</h4>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {service.details.service_features.map((feature) => (
                          <div 
                            key={feature} 
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Treatment Process */}
                    <div>
                      <h4 className="font-semibold text-gray-900">Treatment Process</h4>
                      <div className="mt-4 grid gap-3">
                        {service.details.treatment_process.map((step, index) => (
                          <div
                            key={step}
                            className="flex items-start gap-4 rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100"
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-sm font-medium text-white">
                              {index + 1}
                            </span>
                            <p className="text-gray-600">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Service Info & CTA */}
                    <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Service Area</p>
                        <p className="font-medium text-gray-900">{service.details.service_area}</p>
                      </div>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] px-6 py-2.5 text-white shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#25D366]/30"
                      >
                        <WhatsAppIcon className="h-5 w-5" />
                        Get Free Quote
                      </a>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ServiceModal 