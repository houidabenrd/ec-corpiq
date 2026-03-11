export type MembershipState =
  | 'NON_MEMBER'
  | 'MEMBER_ACTIVE'
  | 'MEMBER_IN_PROGRESS'
  | 'MEMBER_EXPIRED'
  | 'MEMBER_GRACE_PERIOD';

export interface UserScenario {
  membership_state: MembershipState;
  user_active: boolean;
  is_primary_member: boolean;
  has_password_auth: boolean;
  google_linked: boolean;
  microsoft_linked: boolean;
  has_organization: boolean;
  organization_editable: boolean;
  billing_available: boolean;
  has_primary_card: boolean;
  has_secondary_card: boolean;
  ams_available: boolean;
  cgu_accepted: boolean;
}

export interface ScenarioPreset {
  label: string;
  description: string;
  color: string;
  scenario: UserScenario;
}

export type AuthStep =
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'verify-email'
  | 'cgu'
  | 'email-sent';
