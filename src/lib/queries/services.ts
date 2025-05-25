import { groq } from 'next-sanity';

export const getServicesData = groq`
  *[_type == "services"][0] {
    section_title,
    services[] {
      title,
      "slug": slug.current,
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
        service_area,
        pest_facts[] {
          title,
          content
        },
        pricing[] {
          type,
          price
        },
        treatment_details[] {
          title,
          description,
          image {
            "src": asset->url,
            alt
          }
        },
        maintenance_contracts[] {
          title,
          description
        }
      }
    },
    cta_button {
      text,
      link
    }
  }
`; 