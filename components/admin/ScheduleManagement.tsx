"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { Plus, Trash2, Clock, Calendar, Ban, ChevronDown, ChevronUp, Loader2, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Types ────────────────────────────────────────────────────────────────────
type ScheduleType = "availability" | "blocked"

type DayName = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

interface Period {
  start_time: string
  end_time: string
}

interface Schedule {
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

interface Service {
  id: string
  name: string
}

const DAY_OPTIONS: DayName[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
const DAY_LABELS: Record<DayName, string> = {
  monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu",
  friday: "Fri", saturday: "Sat", sunday: "Sun",
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatFrequency(schedule: Schedule): string {
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
function ScheduleRow({ schedule, onDelete }: { schedule: Schedule; onDelete: () => void }) {
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
          <span className={`flex-shrink-0 w-2 h-2 rounded-full ${isAvailability ? "bg-emerald-500" : "bg-destructive"}`} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-card-foreground truncate">{schedule.name}</p>
            <p className="text-xs text-muted-foreground">{formatFrequency(schedule)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => setExpanded(e => !e)}
            className="p-1.5 rounded hover:bg-muted transition-colors"
            aria-label="Toggle details"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <button
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
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span className="font-mono">{p.start_time} – {p.end_time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── AddScheduleForm ──────────────────────────────────────────────────────────
function AddScheduleForm({
  serviceId,
  onSaved,
  onCancel,
}: {
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
      const typeMap: Record<ScheduleType, string> = { availability: "availability", blocked: "blocked" }
      const res = await fetch(`/api/schedules/service/${serviceId}/${typeMap[type]}`, {
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
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-4">
      <p className="text-sm font-semibold text-card-foreground">New Schedule</p>

      {/* Name */}
      <div>
        <label className="text-xs text-muted-foreground block mb-1">Name</label>
        <input
          className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="e.g. Weekday Morning Hours"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      {/* Type */}
      <div className="flex gap-2">
        {(["availability", "blocked"] as ScheduleType[]).map(t => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold border transition-all ${
              type === t
                ? t === "availability"
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-destructive text-white border-destructive"
                : "border-border hover:bg-muted"
            }`}
          >
            {t === "availability" ? <><CheckCircle2 className="w-3 h-3 inline mr-1" />Available</> : <><XCircle className="w-3 h-3 inline mr-1" />Blocked</>}
          </button>
        ))}
      </div>

      {/* Mode: recurring vs one-off */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode("weekly")}
          className={`flex-1 py-1 rounded text-xs border transition-all ${mode === "weekly" ? "bg-muted border-primary text-primary font-semibold" : "border-border hover:bg-muted"}`}
        >
          Weekly
        </button>
        <button
          onClick={() => setMode("oneoff")}
          className={`flex-1 py-1 rounded text-xs border transition-all ${mode === "oneoff" ? "bg-muted border-primary text-primary font-semibold" : "border-border hover:bg-muted"}`}
        >
          One-off date
        </button>
      </div>

      {/* Days */}
      {mode === "weekly" && (
        <div>
          <label className="text-xs text-muted-foreground block mb-1.5">Days</label>
          <div className="flex flex-wrap gap-1.5">
            {DAY_OPTIONS.map(d => (
              <button
                key={d}
                onClick={() => toggleDay(d)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                  days.includes(d) ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
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
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
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
                className="flex-1 rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <span className="text-muted-foreground text-xs">to</span>
              <input
                type="time"
                value={p.end_time}
                onChange={e => updatePeriod(i, "end_time", e.target.value)}
                className="flex-1 rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {periods.length > 1 && (
                <button onClick={() => removePeriod(i)} className="text-destructive hover:text-destructive/80 p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addPeriod}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            <Plus className="w-3 h-3" /> Add period
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button size="sm" onClick={handleSave} disabled={saving} className="flex-1">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Save Schedule
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  )
}

// ─── ServiceSchedulePanel ─────────────────────────────────────────────────────
function ServiceSchedulePanel({ service }: { service: Service }) {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/schedules?serviceId=${service.id}`)
      const data = await res.json()
      setSchedules(data.schedules || [])
    } catch {
      toast.error("Failed to load schedules")
    } finally {
      setLoading(false)
    }
  }, [service.id])

  useEffect(() => { load() }, [load])

  const availability = schedules.filter(s => s.type === "availability")
  const blocked = schedules.filter(s => s.type === "blocked")

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-card-foreground">{service.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {availability.length} availability · {blocked.length} blocked
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={() => setShowForm(s => !s)} className="gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          Add Rule
        </Button>
      </div>

      {showForm && (
        <AddScheduleForm
          serviceId={service.id}
          onSaved={() => { setShowForm(false); load() }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm py-4 justify-center">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading schedules…
        </div>
      ) : schedules.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground text-sm">
          <Calendar className="w-8 h-8 mx-auto mb-2 opacity-40" />
          No schedules yet. Add availability rules to enable booking for this service.
        </div>
      ) : (
        <div className="space-y-2">
          {availability.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1.5">Availability</p>
              <div className="space-y-2">
                {availability.map(s => <ScheduleRow key={s.id} schedule={s} onDelete={load} />)}
              </div>
            </div>
          )}
          {blocked.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1.5 mt-3">Blocked / Closed</p>
              <div className="space-y-2">
                {blocked.map(s => <ScheduleRow key={s.id} schedule={s} onDelete={load} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── ScheduleManagement ───────────────────────────────────────────────────────
export function ScheduleManagement() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/v1/services?limit=100")
      .then(r => r.json())
      .then(d => setServices(d.services || []))
      .catch(() => toast.error("Failed to load services"))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Schedule Management
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Control availability and blockouts for each service. Time slots are generated dynamically from these rules.
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground">Availability — when the service can be booked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
          <span className="text-muted-foreground">Blocked — closed / holiday / break</span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 justify-center py-12 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading services…
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {services.map(s => <ServiceSchedulePanel key={s.id} service={s} />)}
        </div>
      )}
    </div>
  )
}
