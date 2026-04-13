"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import {
  Plus, Trash2, Clock, Calendar, Ban,
  ChevronDown, ChevronUp, Loader2, CheckCircle2, XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Types ────────────────────────────────────────────────────────────────────
type ScheduleType = "availability" | "blocked"
type DayName = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

interface Period {
  start_time: string
  end_time: string
}

export interface InlineSchedule {
  id: string
  name: string
  type: ScheduleType
  resource_id: string
  frequency: string | null
  frequency_data: string | null
  start_date: string | null
  end_date: string | null
  active: boolean
  periods: Period[]
  created_at: string
}

const DAY_OPTIONS: DayName[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
const DAY_LABELS: Record<DayName, string> = {
  monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu",
  friday: "Fri", saturday: "Sat", sunday: "Sun",
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatFrequency(schedule: InlineSchedule): string {
  if (!schedule.frequency) {
    if (schedule.start_date && schedule.end_date && schedule.start_date === schedule.end_date)
      return `One-off: ${schedule.start_date}`
    if (schedule.start_date) return `From ${schedule.start_date}${schedule.end_date ? ` to ${schedule.end_date}` : ""}`
    return "Always"
  }
  if (schedule.frequency === "weekly" || schedule.frequency === "daily") {
    const data = schedule.frequency_data ? JSON.parse(schedule.frequency_data) : {}
    const days: DayName[] = data.days || []
    return `Weekly · ${days.map(d => DAY_LABELS[d]).join(", ")}`
  }
  return schedule.frequency
}

// ─── ScheduleRow ─────────────────────────────────────────────────────────────
function ScheduleRow({ schedule, onDelete }: { schedule: InlineSchedule; onDelete: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Delete schedule "${schedule.name}"?`)) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/schedules/${schedule.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete schedule")
      toast.success("Schedule deleted")
      onDelete()
    } catch {
      toast.error("Failed to delete schedule")
    } finally {
      setDeleting(false)
    }
  }

  const isAvailability = schedule.type === "availability"

  return (
    <div className={`rounded-lg border ${isAvailability ? "border-emerald-500/30 bg-emerald-500/5" : "border-destructive/30 bg-destructive/5"} p-3`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className={`shrink-0 w-2 h-2 rounded-full ${isAvailability ? "bg-emerald-500" : "bg-destructive"}`} />
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{schedule.name}</p>
            <p className="text-xs text-muted-foreground">{formatFrequency(schedule)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setExpanded(e => !e)}
            className="p-1.5 rounded hover:bg-muted transition-colors"
            aria-label="Toggle details"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="p-1.5 rounded hover:bg-destructive/10 text-destructive transition-colors"
            aria-label="Delete schedule"
          >
            {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-border space-y-1.5">
          {schedule.periods.map((p, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3 shrink-0" />
              <span className="font-mono">{p.start_time} – {p.end_time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── AddScheduleForm ──────────────────────────────────────────────────────────
function AddScheduleForm({ serviceId, onSaved, onCancel }: {
  serviceId: string
  onSaved: () => void
  onCancel: () => void
}) {
  const [name, setName] = useState("")
  const [type, setType] = useState<ScheduleType>("availability")
  const [mode, setMode] = useState<"weekly" | "oneoff">("weekly")
  const [days, setDays] = useState<DayName[]>(["monday", "tuesday", "wednesday", "thursday", "friday"])
  const [periods, setPeriods] = useState<Period[]>([{ start_time: "09:00", end_time: "17:00" }])
  const [oneOffDate, setOneOffDate] = useState("")
  const [saving, setSaving] = useState(false)

  const toggleDay = (d: DayName) =>
    setDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])

  const addPeriod = () => setPeriods(p => [...p, { start_time: "09:00", end_time: "17:00" }])
  const removePeriod = (i: number) => setPeriods(p => p.filter((_, idx) => idx !== i))
  const updatePeriod = (i: number, field: keyof Period, val: string) =>
    setPeriods(p => p.map((period, idx) => idx === i ? { ...period, [field]: val } : period))

  const handleSave = async () => {
    if (!name.trim()) return toast.error("Name is required")
    if (periods.length === 0) return toast.error("Add at least one time period")
    if (mode === "weekly" && days.length === 0) return toast.error("Select at least one day")
    if (mode === "oneoff" && !oneOffDate) return toast.error("Select a date")

    const payload: Record<string, unknown> = {
      name: name.trim(),
      type,
      active: true,
      allow_overlap: type === "availability",
      periods,
    }

    if (mode === "weekly") {
      payload.frequency = "weekly"
      payload.frequency_data = { days }
    } else {
      payload.start_date = oneOffDate
      payload.end_date = oneOffDate
    }

    setSaving(true)
    try {
      const res = await fetch(`/api/schedules/service/${serviceId}/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed to save schedule")
      toast.success("Schedule saved")
      onSaved()
    } catch {
      toast.error("Failed to save schedule")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-4">
      <p className="text-sm font-semibold">New Schedule Rule</p>

      {/* Name */}
      <div>
        <label className="text-xs text-muted-foreground block mb-1">Rule Name</label>
        <input
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          placeholder="e.g. Weekday Hours"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      {/* Type */}
      <div className="flex gap-2">
        {(["availability", "blocked"] as ScheduleType[]).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
              type === t
                ? t === "availability"
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-destructive text-white border-destructive"
                : "border-border hover:bg-muted"
            }`}
          >
            {t === "availability"
              ? <><CheckCircle2 className="w-3 h-3 inline mr-1" />Available</>
              : <><Ban className="w-3 h-3 inline mr-1" />Blocked</>
            }
          </button>
        ))}
      </div>

      {/* Recurrence mode */}
      <div className="flex gap-2">
        {(["weekly", "oneoff"] as const).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 py-1.5 rounded-lg text-xs border transition-all ${
              mode === m ? "bg-muted border-blue-500 text-blue-600 font-semibold" : "border-border hover:bg-muted"
            }`}
          >
            {m === "weekly" ? "Weekly" : "One-off Date"}
          </button>
        ))}
      </div>

      {/* Days (weekly) */}
      {mode === "weekly" && (
        <div>
          <label className="text-xs text-muted-foreground block mb-1.5">Days</label>
          <div className="flex flex-wrap gap-1.5">
            {DAY_OPTIONS.map(d => (
              <button
                key={d}
                type="button"
                onClick={() => toggleDay(d)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  days.includes(d) ? "bg-blue-600 text-white border-blue-600" : "border-border hover:bg-muted"
                }`}
              >
                {DAY_LABELS[d]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* One-off date */}
      {mode === "oneoff" && (
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Date</label>
          <input
            type="date"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            value={oneOffDate}
            onChange={e => setOneOffDate(e.target.value)}
          />
        </div>
      )}

      {/* Time periods */}
      <div>
        <label className="text-xs text-muted-foreground block mb-1.5">Time Periods</label>
        <div className="space-y-2">
          {periods.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="time"
                value={p.start_time}
                onChange={e => updatePeriod(i, "start_time", e.target.value)}
                className="flex-1 rounded-lg border border-border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
              <span className="text-muted-foreground text-xs">to</span>
              <input
                type="time"
                value={p.end_time}
                onChange={e => updatePeriod(i, "end_time", e.target.value)}
                className="flex-1 rounded-lg border border-border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
              {periods.length > 1 && (
                <button type="button" onClick={() => removePeriod(i)} className="text-destructive hover:text-destructive/80 p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addPeriod}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Plus className="w-3 h-3" /> Add time period
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button size="sm" type="button" onClick={handleSave} disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Save Rule
        </Button>
        <Button size="sm" type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  )
}

// ─── ServiceScheduleSection ───────────────────────────────────────────────────
/**
 * Inline schedule panel for embedding in the Create/Edit service form.
 * Displays existing schedule rules and allows adding new ones.
 * Does NOT change the underlying schedule data model — uses same API as ScheduleManagement.
 *
 * If serviceId is undefined (new service not yet saved), shows a placeholder.
 */
export function ServiceScheduleSection({ serviceId }: { serviceId: string | undefined }) {
  const [schedules, setSchedules] = useState<InlineSchedule[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const load = useCallback(async () => {
    if (!serviceId) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/schedules?serviceId=${serviceId}`)
      const data = await res.json() as any
      setSchedules(data.schedules || [])
    } catch {
      toast.error("Failed to load schedules")
    } finally {
      setLoading(false)
    }
  }, [serviceId])

  useEffect(() => { load() }, [load])

  const availability = schedules.filter(s => s.type === "availability")
  const blocked = schedules.filter(s => s.type === "blocked")

  if (!serviceId) {
    return (
      <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center text-sm text-muted-foreground">
        <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
        <p className="font-medium">Save the service first to configure its schedule.</p>
        <p className="text-xs mt-1 opacity-70">Schedule rules can be added after the service is created.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground">Availability — when this service can be booked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
          <span className="text-muted-foreground">Blocked — closed / holiday / break</span>
        </div>
      </div>

      {showForm && (
        <AddScheduleForm
          serviceId={serviceId}
          onSaved={() => { setShowForm(false); load() }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm py-4 justify-center">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading schedule rules…
        </div>
      ) : schedules.length === 0 && !showForm ? (
        <div className="text-center py-8 text-muted-foreground text-sm">
          <Calendar className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="font-medium">No schedule rules yet.</p>
          <p className="text-xs mt-1">Add availability rules to enable booking for this service.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {availability.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1.5">Availability</p>
              <div className="space-y-2">{availability.map(s => <ScheduleRow key={s.id} schedule={s} onDelete={load} />)}</div>
            </div>
          )}
          {blocked.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1.5 mt-3">Blocked / Closed</p>
              <div className="space-y-2">{blocked.map(s => <ScheduleRow key={s.id} schedule={s} onDelete={load} />)}</div>
            </div>
          )}
        </div>
      )}

      {!showForm && serviceId && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setShowForm(true)}
          className="gap-1.5 w-full border-dashed"
        >
          <Plus className="w-3.5 h-3.5" /> Add Schedule Rule
        </Button>
      )}
    </div>
  )
}
