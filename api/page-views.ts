const COUNTER_URL =
  "https://api.counterapi.dev/v2/lance-kit-gom-oss-team-5631/first-counter-5631"

/**
 * CounterAPI V2 wraps counts as `{ code, data: { up_count, ... } }`.
 * Older shapes (`{ value }`, `{ count }`) are still accepted.
 * NOTE: `code` (often `"200"`) and ids must never be mistaken for the count,
 * so only known count keys are inspected — never a blind numeric search.
 */

function toFiniteCount(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0)
    return value

  return null
}

function pickCountFields(value: unknown): number | null {
  if (!value || typeof value !== "object") return null

  const record = value as Record<string, unknown>

  return (
    toFiniteCount(record.up_count) ??
    toFiniteCount(record.value) ??
    toFiniteCount(record.count) ??
    null
  )
}

export function findCount(value: unknown): number | null {
  if (!value || typeof value !== "object") return toFiniteCount(value)

  const record = value as Record<string, unknown>

  // Preferred: V2 envelope `{ data: { up_count } }`.

  const fromData = pickCountFields(record.data)

  if (fromData !== null) return fromData

  // Top-level `{ up_count }` / `{ value }` / `{ count }` (up, get, reset).

  const fromTopLevel = pickCountFields(record)

  if (fromTopLevel !== null) return fromTopLevel

  // Stats endpoint nests under data.stats / data.up_count variants.

  if (record.data && typeof record.data === "object") {
    const nested = findCount(
      (record.data as Record<string, unknown>).stats,
    )

    if (nested !== null) return nested
  }

  return null
}

export default async function handler(request: any, response: any) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET")

    return response.status(405).json({ error: "Method not allowed" })
  }

  const apiKey = process.env.COUNTERAPI_API_KEY

  if (!apiKey) {
    return response.status(500).json({ error: "Counter is not configured" })
  }

  try {
    const shouldIncrement = request.query?.increment !== "0"

    const targetUrl = shouldIncrement
      ? `${COUNTER_URL}/up`
      : `${COUNTER_URL}?_=${Date.now()}`

    const counterResponse = await fetch(targetUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
    })

    let payload: unknown = null

    try {
      payload = await counterResponse.json()
    } catch {
      console.error("Counter service returned non-JSON response")

      return response.status(502).json({ error: "Invalid counter response" })
    }

    if (!counterResponse.ok) {
      console.error("Counter service error", counterResponse.status, payload)

      return response.status(502).json({ error: "Counter service unavailable" })
    }

    const count = findCount(payload)

    if (count === null) {
      console.error("Unrecognized counter payload shape", payload)

      return response.status(502).json({ error: "Invalid counter response" })
    }

    response.setHeader("Cache-Control", "no-store")

    return response.status(200).json({ count })
  } catch {
    return response.status(502).json({ error: "Counter service unavailable" })
  }
}
