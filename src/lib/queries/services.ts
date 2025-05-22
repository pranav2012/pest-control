import { groq } from 'next-sanity';

export const getServicesData = groq`
  *[_type == "services"][0] {
    section_title,
    services[] {
      title,
      description,
      image {
        "src": src.asset->url,
        alt
      },
      details {
        pests_covered,
        areas_covered,
        service_features,
        treatment_process,
        warranty,
        service_area
      }
    },
    cta_button {
      text,
      link
    }
  }
`; 