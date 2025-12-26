// Dummy cn utility for shadcn/ui components
export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
