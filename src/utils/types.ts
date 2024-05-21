export type CountryDetailsType = {
  name: string
  lat: number
  lon: number
}

export type StoryDetails = {
  id: number;
  title: string;
  description: string;
  date: string;
  coverURL?: string;
  author: {
    id: number;
    name: string;
    profileImageUrl: string;
  }

  countryDetails?: {
    published: CountryDetailsType
    received: CountryDetailsType
  }
}

export type TopicDetails = {
  name: string;
  icon: string;
  stories: string;
  writers: string;
}