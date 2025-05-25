import { groq } from 'next-sanity';

export const getServicesData = groq`
  *[_type == "services"][0] {
    section_title,
    services[] {
      _key,
      title,
      "slug": slug.current,
      date,
      about_service[] {
        ...,
        _type == "image" => {
          ...,
          "src": {
            "asset": asset->
          }
        }
      },
      description,
      image {
        "src": src.asset->url,
        alt
      },
      details {
        pests_covered,
        service_features,
        treatment_process,
        warranty,
        pricing[] {
          _key,
          type,
          price,
          includes
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
          description,
          price,
          features
        }
      }
    },
    cta_button {
      text,
      link
    }
  }
`; 