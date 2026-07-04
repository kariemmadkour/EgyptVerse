import type { LocalizedText } from "./common";

export interface MembershipTier {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  priceEGP: number;
  billingPeriod: "monthly" | "annual";
  benefits: LocalizedText[];
  featured: boolean;
}

export interface MemberProfile {
  id: string;
  fullName: string;
  email: string;
  tierSlug: string;
  memberSince: string;
  readingRoomAccess: boolean;
}
