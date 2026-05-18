/**
 * Time slot generation (mock for now — to be replaced by a Firestore query
 * returning real availability).
 *
 * Studio operating hours: 08:00 → 22:00 every day.
 * Granularity: 1 hour.
 * A start time is allowed only if `start + durationHours <= closeHour`
 * AND no taken slot intersects [start, start + duration).
 */

export interface SlotOption {
  time: string; // "HH:mm"
  available: boolean;
}

const OPEN_HOUR = 8;
const CLOSE_HOUR = 22;

/** Mock: a few "taken" slots derived from the date string for demo purposes. */
function mockTakenForDate(dateISO: string): Set<string> {
  // Deterministic pseudo-random slots so the UI looks realistic but stable.
  const seed = dateISO.split("-").reduce((acc, p) => acc + Number(p), 0);
  const taken = new Set<string>();
  const candidates = [9, 11, 14, 16, 19];
  candidates.forEach((h, i) => {
    if ((seed + i) % 3 === 0) taken.add(`${String(h).padStart(2, "0")}:00`);
  });
  return taken;
}

export function generateSlotsForDate(
  dateISO: string,
  durationHours: number,
): SlotOption[] {
  const taken = mockTakenForDate(dateISO);
  // Slots are generated in 1-hour increments; sub-hour packages still occupy
  // the full starting hour for availability purposes.
  const blockSize = Math.max(1, Math.ceil(durationHours));
  const slots: SlotOption[] = [];
  for (let h = OPEN_HOUR; h + blockSize <= CLOSE_HOUR; h++) {
    const time = `${String(h).padStart(2, "0")}:00`;
    let available = !taken.has(time);
    // Block start if any hour inside the requested window is taken.
    for (let k = 1; k < blockSize && available; k++) {
      const t = `${String(h + k).padStart(2, "0")}:00`;
      if (taken.has(t)) available = false;
    }
    // Also block if the slot is in the past for today.
    if (isPast(dateISO, time)) available = false;
    slots.push({ time, available });
  }
  return slots;
}

function isPast(dateISO: string, time: string): boolean {
  const [y, m, d] = dateISO.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const slot = new Date(y, m - 1, d, hh, mm);
  return slot.getTime() < Date.now();
}

/** Compute the end time of a slot. */
export function endTime(start: string, durationHours: number): string {
  const [hh, mm] = start.split(":").map(Number);
  const totalMin = hh * 60 + mm + Math.round(durationHours * 60);
  const endH = Math.floor(totalMin / 60) % 24;
  const endM = totalMin % 60;
  return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
}
