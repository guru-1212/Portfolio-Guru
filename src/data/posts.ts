// Blog posts. Each post is a list of simple blocks so no MDX tooling is needed.
// Inline `code` in paragraphs and list items is supported with backticks.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "note"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  tags: string[];
  blocks: Block[];
};

export const posts: Post[] = [
  {
    slug: "signals-rxjs-ngrx-choosing-the-right-tool",
    title: "Signals, RxJS and NgRx: choosing the right tool in Angular",
    description:
      "A practical mental model for when to reach for Angular Signals, RxJS streams or an NgRx store — with examples from a booking-flow UI.",
    date: "2026-10-15",
    tags: ["Angular", "Signals", "RxJS", "NgRx"],
    blocks: [
      {
        type: "p",
        text: "Modern Angular gives you three ways to model changing data: Signals, RxJS Observables and (optionally) an NgRx store. In the airline booking applications I work on, all three live side by side. The question I get asked most by developers new to the codebase is: which one do I use here? This is the mental model I give them.",
      },
      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          "**Signals** — synchronous state that the template reads: form-adjacent UI state, derived values, flags.",
          "**RxJS** — things that happen over time: HTTP calls, user-input streams, websockets, cancellation and retries.",
          "**NgRx** — state that many features share and that you need to trace: the booking itself, the signed-in member, cart-like data.",
        ],
      },
      { type: "h2", text: "Signals for local, derived UI state" },
      {
        type: "p",
        text: "Signals shine when a value is known right now and other values derive from it. A seat-selection panel is a good example: the selected seats are state, and the total is derived. `computed()` recalculates only when its inputs change, and because the template reads signals, OnPush components update without any manual change detection.",
      },
      {
        type: "code",
        lang: "ts",
        code: `@Component({
  selector: 'app-seat-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    @for (seat of selected(); track seat.id) {
      <li>{{ seat.label }} — {{ seat.price | currency }}</li>
    }
    <p>Total: {{ total() | currency }}</p>
  \`,
})
export class SeatSummaryComponent {
  readonly selected = signal<Seat[]>([]);
  readonly total = computed(() =>
    this.selected().reduce((sum, seat) => sum + seat.price, 0)
  );

  toggle(seat: Seat) {
    this.selected.update((seats) =>
      seats.some((s) => s.id === seat.id)
        ? seats.filter((s) => s.id !== seat.id)
        : [...seats, seat]
    );
  }
}`,
      },
      { type: "h2", text: "RxJS for anything asynchronous or time-based" },
      {
        type: "p",
        text: "Signals don't replace RxJS. Debouncing a search box, cancelling a stale request when the user types again, or retrying a flaky call are still best expressed as streams. The trick is to keep the stream at the edge and hand the template a signal with `toSignal()`.",
      },
      {
        type: "code",
        lang: "ts",
        code: `export class AirportSearchComponent {
  private api = inject(AirportApi);
  readonly query = signal('');

  readonly results = toSignal(
    toObservable(this.query).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((q) => (q.length < 2 ? of([]) : this.api.search(q)))
    ),
    { initialValue: [] as Airport[] }
  );
}`,
      },
      {
        type: "note",
        text: "`switchMap` is doing the important work here: when the query changes, the previous HTTP request is cancelled, so results for an old query can never overwrite newer ones.",
      },
      { type: "h2", text: "NgRx for shared, traceable application state" },
      {
        type: "p",
        text: "A booking touches many screens — search, fares, seats, ancillaries, passenger details, payment. When several features read and update the same data, a store gives you one source of truth, predictable updates through actions, and DevTools history when something goes wrong. Since NgRx 16 you can read a selector as a signal, so components stay simple.",
      },
      {
        type: "code",
        lang: "ts",
        code: `export class FareSummaryComponent {
  private store = inject(Store);

  readonly booking = this.store.selectSignal(selectCurrentBooking);
  readonly passengers = this.store.selectSignal(selectPassengerCount);

  confirm() {
    this.store.dispatch(BookingActions.confirmRequested());
  }
}`,
      },
      { type: "h2", text: "A quick decision checklist" },
      {
        type: "ul",
        items: [
          "Is it used by one component (or one small subtree)? Start with a signal.",
          "Does it arrive over time, need cancelling, debouncing or retrying? Use an Observable, convert with `toSignal()` at the edge.",
          "Do several features read and write it, or do you need to debug its history? Put it in the store and select it as a signal.",
          "Not sure? Start local. Promoting a signal to the store later is easier than untangling a store that holds everything.",
        ],
      },
      {
        type: "p",
        text: "None of these tools is the \"new way\" that replaces the others. Used for what they are good at, they make a large Angular codebase noticeably easier to read and reason about.",
      },
    ],
  },
  {
    slug: "keeping-large-angular-apps-fast",
    title: "Keeping a large Angular app fast: a practical checklist",
    description:
      "Lazy loading, OnPush, tracking in @for, @defer and bundle budgets — the techniques I rely on to keep enterprise Angular apps responsive.",
    date: "2026-10-15",
    tags: ["Angular", "Performance", "Architecture"],
    blocks: [
      {
        type: "p",
        text: "Enterprise apps rarely get slow because of one bad decision. They get slow one feature at a time: another eagerly loaded module, another component re-rendering on every event. These are the techniques I use to keep booking flows with dozens of screens responsive, roughly in the order I'd apply them.",
      },
      { type: "h2", text: "1. Lazy-load every route that isn't the landing page" },
      {
        type: "p",
        text: "Users who search for flights don't need the manage-booking or check-in code. Route-level lazy loading keeps that code out of the initial bundle. With standalone components it's one line per route.",
      },
      {
        type: "code",
        lang: "ts",
        code: `export const routes: Routes = [
  { path: '', component: FlightSearchComponent },
  {
    path: 'manage-booking',
    loadComponent: () =>
      import('./manage-booking/manage-booking.component')
        .then((m) => m.ManageBookingComponent),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.routes').then((m) => m.CHECKOUT_ROUTES),
  },
];`,
      },
      { type: "h2", text: "2. Make OnPush the default" },
      {
        type: "p",
        text: "With `ChangeDetectionStrategy.OnPush`, Angular checks a component only when its inputs change, an event fires inside it, or a signal it reads in the template changes. Combined with immutable updates and signals, this removes most unnecessary re-rendering. I treat a component without OnPush as something that needs a reason.",
      },
      { type: "h2", text: "3. Always track list items" },
      {
        type: "p",
        text: "Flight results, seat maps and passenger lists re-render often. Giving `@for` a stable identity lets Angular move existing DOM nodes instead of destroying and recreating them. (In older `*ngFor` code, this is what `trackBy` does.)",
      },
      {
        type: "code",
        lang: "html",
        code: `@for (flight of flights(); track flight.id) {
  <app-flight-card [flight]="flight" />
} @empty {
  <p>No flights match your search.</p>
}`,
      },
      { type: "h2", text: "4. Defer what's below the fold" },
      {
        type: "p",
        text: "Fare rules, baggage details and promotional blocks are often far down the page. `@defer` splits them into their own chunk and loads them only when needed — for example, when they scroll into view.",
      },
      {
        type: "code",
        lang: "html",
        code: `@defer (on viewport) {
  <app-fare-rules [fareId]="fareId()" />
} @placeholder {
  <div class="fare-rules-skeleton"></div>
}`,
      },
      { type: "h2", text: "5. Put a budget on the bundle" },
      {
        type: "p",
        text: "Performance regressions are easiest to fix the day they're introduced. Budgets in `angular.json` make the build warn — or fail — when the initial bundle grows past a limit, so a heavy dependency gets noticed in code review instead of in production.",
      },
      {
        type: "code",
        lang: "json",
        code: `"budgets": [
  { "type": "initial", "maximumWarning": "500kB", "maximumError": "1MB" },
  { "type": "anyComponentStyle", "maximumWarning": "4kB" }
]`,
      },
      {
        type: "p",
        text: "When a budget trips, `ng build --stats-json` writes a metafile you can load into a bundle analyzer to see exactly which dependency grew.",
      },
      { type: "h2", text: "6. Measure before and after" },
      {
        type: "ul",
        items: [
          "Use the Performance panel in Chrome DevTools to find long tasks and layout shifts on real interactions.",
          "Use Angular DevTools' profiler to see which components run change detection, and how often.",
          "Run Lighthouse on key journeys — search, results, checkout — not just the home page.",
        ],
      },
      {
        type: "note",
        text: "None of these techniques is exotic. The value comes from applying them consistently, on every feature, so the app stays fast as it grows.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function readingMinutes(post: Post) {
  const words = post.blocks
    .map((block) =>
      block.type === "ul" ? block.items.join(" ") : block.type === "code" ? block.code : block.text,
    )
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string) {
  // Fixed locale and UTC so the output is identical on server and client.
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
