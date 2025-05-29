export interface User {
  id: string;
  name: string;
  email: string;
}
type ClerkUserUpdate = {
  clerkUserId: string;
  name: string;
  email: string;
  profileUrl: string;
};
export type { ClerkUserUpdate };
