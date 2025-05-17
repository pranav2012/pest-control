'use client'

import Image from 'next/image'
import processData from '@/content/process.json'
import { ProcessStep } from '@/types/process'

const ProcessStepCard = ({ step, index }: { step: ProcessStep; index: number }) => {
  return (
    <div className="relative flex flex-col items-center text-center bg-white rounded-xl p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1">
      {/* Connecting Line */}
      {index < 3 && (
        <div className="hidden sm:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-[#25D366] to-transparent -z-10" />
      )}
      
      {/* Icon */}
      <div className="relative w-24 h-24 mb-6 p-4 bg-gray-50 rounded-full">
        <Image
          src={step.icon}
          alt={step.title}
          fill
          className="object-contain p-2"
        />
      </div>

      {/* Number and Title */}
      <div className="flex items-center mb-4 w-full">
        <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-xl shadow-md">
          {index + 1}
        </div>
        <div className="ml-3 text-xl font-semibold text-gray-900 flex-1 text-left">
          {step.title}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {step.description}
      </p>
    </div>
  )
}

const Process = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {processData.section_title}
          </h2>
          <div className="w-20 h-1 bg-[#25D366] mx-auto rounded-full mb-6" />
          <p className="text-gray-600 text-lg">
            Our proven 4-step process ensures effective and long-lasting pest control solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Process Steps */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
            {processData.steps.map((step, index) => (
              <ProcessStepCard key={step.title} step={step} index={index} />
            ))}
          </div>

          {/* Side Image */}
          <div className="lg:col-span-2">
            <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              <Image
                src={processData.side_image.src}
                alt={processData.side_image.alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <h3 className="text-2xl font-semibold mb-2">Professional Service</h3>
                <p className="text-gray-200">
                  Our expert team follows this proven process to deliver outstanding results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process 