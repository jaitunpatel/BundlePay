export const WAITLIST_MODE: boolean =
  process.env.NEXT_PUBLIC_WAITLIST_MODE === "true";

export function isWaitlistMode() {
  return WAITLIST_MODE;
}