// Stylized, illustrative dashboard for the OurPGTracker card — not a real screenshot.
// It depicts the product's feature areas (beds, occupancy, members, payments) without inventing data;
// the only figure shown is the real 119-bed count. Replace with a screenshot by setting `image` on the project.

const BED_COUNT = 40;
// Deterministic pattern so server and client render identically.
const isVacant = (index: number) => index % 7 === 3 || index % 11 === 5;

function Bar({ className = "" }: { className?: string }) {
  return <span className={`block h-2 rounded-full bg-foreground/10 ${className}`} />;
}

export function PgDashboardPreview() {
  return (
    <div className="flex h-full min-h-72 items-center justify-center p-5 sm:p-8">
      <figure className="w-full max-w-md">
        <div
          className="overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-accent/10"
          aria-hidden="true"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-2 flex-1 truncate rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted">
              ourpgtracker.in/dashboard
            </span>
          </div>

          <div className="grid grid-cols-[2.25rem_1fr] sm:grid-cols-[3rem_1fr]">
            {/* Sidebar */}
            <div className="flex flex-col items-center gap-2.5 border-r border-border bg-surface py-3">
              <span className="size-5 rounded-md bg-gradient-to-br from-accent to-accent-2" />
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`size-4 rounded ${i === 0 ? "bg-accent/40" : "bg-foreground/10"}`} />
              ))}
            </div>

            <div className="space-y-3 p-3">
              {/* Stat tiles */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-border bg-surface p-2">
                  <p className="text-[9px] uppercase tracking-wide text-muted">Beds</p>
                  <p className="mt-0.5 text-base font-semibold leading-none">119</p>
                </div>
                <div className="rounded-lg border border-border bg-surface p-2">
                  <p className="text-[9px] uppercase tracking-wide text-muted">Occupancy</p>
                  <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-foreground/10">
                    <span className="block h-full w-4/5 rounded-full bg-gradient-to-r from-accent to-accent-2" />
                  </span>
                </div>
                <div className="rounded-lg border border-border bg-surface p-2">
                  <p className="text-[9px] uppercase tracking-wide text-muted">Payments</p>
                  <Bar className="mt-1.5 w-3/4" />
                </div>
              </div>

              {/* Bed grid */}
              <div className="rounded-lg border border-border bg-surface p-2">
                <p className="mb-1.5 text-[9px] uppercase tracking-wide text-muted">Bed map</p>
                <div className="grid grid-cols-10 gap-1">
                  {Array.from({ length: BED_COUNT }, (_, index) => (
                    <span
                      key={index}
                      className={`aspect-square rounded-[3px] ${
                        isVacant(index) ? "border border-dashed border-foreground/25" : "bg-accent/55"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Members & payments */}
              <div className="space-y-1.5 rounded-lg border border-border bg-surface p-2">
                <p className="text-[9px] uppercase tracking-wide text-muted">Members</p>
                {["Paid", "Due", "Paid"].map((status, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="size-4 shrink-0 rounded-full bg-foreground/10" />
                    <Bar className={index === 1 ? "w-1/3" : "w-1/2"} />
                    <span
                      className={`ml-auto rounded px-1.5 py-px text-[8px] font-medium ${
                        status === "Paid"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <figcaption className="mt-3 text-center text-xs text-muted">
          Illustrative preview of the owner dashboard — visit the live product for the real thing.
        </figcaption>
      </figure>
    </div>
  );
}
