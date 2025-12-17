import { vehicles as baseVehicles, Vehicle } from '@/data/vehicles';

const CUSTOM_VEHICLES_KEY = 'rentAnyBus_custom_vehicles';

function safeParseVehicles(raw: unknown): Vehicle[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((v) => v && typeof v === 'object') as Vehicle[];
}

export function getCustomVehicles(): Vehicle[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = window.localStorage.getItem(CUSTOM_VEHICLES_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return safeParseVehicles(parsed);
  } catch {
    return [];
  }
}

export function saveCustomVehicles(list: Vehicle[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CUSTOM_VEHICLES_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function getAllVehicles(): Vehicle[] {
  const custom = getCustomVehicles();
  return [...baseVehicles, ...custom];
}


