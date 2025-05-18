import { groq } from 'next-sanity';

export const getProcessData = groq`
  *[_type == "process"][0] {
    section_title,
    steps[] {
      title,
      description,
      "icon": icon.asset->url
    },
    side_image {
      "src": src.asset->url,
      alt
    }
  }
`; 