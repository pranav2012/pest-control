'use client'

import featuresData from '@/content/features.json'
import { Feature } from '@/types/features'
import { Shield, Zap, Users } from 'lucide-react'

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const icons = [Shield, Zap, Users]
  const Icon = icons[index]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:-translate-y-1">
      <div className="w-12 h-12 bg-[#25D366] rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {feature.title}
      </h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  )
}

const Features = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {featuresData.section_title}
          </h2>
          <p className="text-gray-600 text-lg">
            {featuresData.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features 