import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response))
}

export async function getImageBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');

  const contentType = response.headers.get('content-type') || 'image/jpeg';
  return `data:${contentType};base64,${base64}`;
}