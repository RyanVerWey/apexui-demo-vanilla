import "@apexui/tokens/css";
import "@apexui/web-components/components/apex-accordion.js";
import "@apexui/web-components/components/apex-alert.js";
import "@apexui/web-components/components/apex-app-bar.js";
import "@apexui/web-components/components/apex-autocomplete.js";
import "@apexui/web-components/components/apex-badge.js";
import "@apexui/web-components/components/apex-breadcrumbs.js";
import "@apexui/web-components/components/apex-button.js";
import "@apexui/web-components/components/apex-button-group.js";
import "@apexui/web-components/components/apex-calendar.js";
import "@apexui/web-components/components/apex-card.js";
import "@apexui/web-components/components/apex-chart.js";
import "@apexui/web-components/components/apex-checkbox.js";
import "@apexui/web-components/components/apex-chip.js";
import "@apexui/web-components/components/apex-data-grid.js";
import "@apexui/web-components/components/apex-data-table.js";
import "@apexui/web-components/components/apex-date-picker.js";
import "@apexui/web-components/components/apex-divider.js";
import "@apexui/web-components/components/apex-file-upload.js";
import "@apexui/web-components/components/apex-list.js";
import "@apexui/web-components/components/apex-number-field.js";
import "@apexui/web-components/components/apex-paper.js";
import "@apexui/web-components/components/apex-progress.js";
import "@apexui/web-components/components/apex-radio-group.js";
import "@apexui/web-components/components/apex-search-form.js";
import "@apexui/web-components/components/apex-select.js";
import "@apexui/web-components/components/apex-sidebar.js";
import "@apexui/web-components/components/apex-slider.js";
import "@apexui/web-components/components/apex-snackbar.js";
import "@apexui/web-components/components/apex-stack.js";
import "@apexui/web-components/components/apex-stepper.js";
import "@apexui/web-components/components/apex-switch.js";
import "@apexui/web-components/components/apex-tabs.js";
import "@apexui/web-components/components/apex-text-field.js";
import "@apexui/web-components/components/apex-textarea.js";
import "@apexui/web-components/components/apex-time-picker.js";
import "@apexui/web-components/components/apex-timeline.js";
import "@apexui/web-components/components/apex-toggle-group.js";
import "@apexui/web-components/components/apex-toolbar.js";
import "@apexui/web-components/components/apex-tree-view.js";
import "@apexui/web-components/components/apex-typography.js";
import "@apexui/web-components/components/apex-workflow-board.js";
import "./styles.css";

type ThemeMode = "light" | "dark";
type RouteId = "home" | "dashboard" | "work-orders" | "customers" | "settings" | "about";
type DataElement<T> = HTMLElement & T;
type Tone = "info" | "success" | "warning" | "danger";

type RouteDefinition = {
  badge: string;
  id: RouteId;
  label: string;
  title: string;
};

const routes: RouteDefinition[] = [
  { badge: "Site", id: "home", label: "Home", title: "Marketing home" },
  { badge: "Ops", id: "dashboard", label: "Metrics", title: "Metrics dashboard" },
  { badge: "Form", id: "work-orders", label: "Work orders", title: "Work order form" },
  { badge: "CRM", id: "customers", label: "Customers", title: "Customer records" },
  { badge: "Admin", id: "settings", label: "Settings", title: "Settings and account" },
  { badge: "Proof", id: "about", label: "About", title: "Package proof" },
];

const appShell = document.querySelector("#app-shell") as HTMLElement;
const routeView = document.querySelector("#route-view") as HTMLElement;
const themeBadge = document.querySelector("#theme-badge") as HTMLElement;
const lightButton = document.querySelector("#theme-light") as HTMLElement;
const darkButton = document.querySelector("#theme-dark") as HTMLElement;
const sidebar = document.querySelector("#nav") as DataElement<{
  activeId?: string;
  items?: Array<{ badge?: string; href?: string; id: string; label: string }>;
}>;
const snackbar = document.querySelector("#snackbar") as DataElement<{ open?: boolean; tone?: Tone }>;

snackbar.open = false;
sidebar.items = routes.map((route) => ({
  badge: route.badge,
  href: routeHref(route.id),
  id: route.id,
  label: route.label,
}));

function routeHref(route: RouteId) {
  return route === "home" ? "#/" : `#/${route}`;
}

function readRoute(): RouteId {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const route = raw || "home";
  return routes.some((item) => item.id === route) ? (route as RouteId) : "home";
}

function setTheme(mode: ThemeMode) {
  const theme = `indigo-${mode}`;
  appShell.dataset.apexTheme = theme;
  themeBadge.textContent = theme;
  lightButton.setAttribute("variant", mode === "light" ? "primary" : "secondary");
  darkButton.setAttribute("variant", mode === "dark" ? "primary" : "secondary");
  window.localStorage.setItem("northstar-theme", mode);

  const settingsTheme = routeView.querySelector("#settings-theme") as DataElement<{ value?: string }> | null;
  if (settingsTheme) {
    settingsTheme.value = mode;
  }
}

function notify(message: string, tone: Tone = "success") {
  snackbar.textContent = message;
  snackbar.tone = tone;
  snackbar.open = false;
  window.setTimeout(() => {
    snackbar.open = true;
  }, 0);
}

function setOptions(
  selector: string,
  options: Array<{ description?: string; label: string; value: string }> | string[],
) {
  const element = routeView.querySelector(selector) as DataElement<{ options?: typeof options }> | null;
  if (element) {
    element.options = options;
  }
}

function setRows(
  selector: string,
  columns: Array<{ key: string; header: string }>,
  rows: Array<Record<string, string | number | boolean | null | undefined>>,
) {
  const element = routeView.querySelector(selector) as DataElement<{
    columns?: typeof columns;
    rows?: typeof rows;
  }> | null;
  if (element) {
    element.columns = columns;
    element.rows = rows;
  }
}

function setChart(selector: string, data: Array<{ label: string; value: number }>) {
  const element = routeView.querySelector(selector) as DataElement<{ data?: typeof data }> | null;
  if (element) {
    element.data = data;
  }
}

function setWorkflow(
  selector: string,
  columns: Array<{ id: string; items: Array<{ id: string; meta?: string; title: string }>; title: string }>,
) {
  const element = routeView.querySelector(selector) as DataElement<{ columns?: typeof columns }> | null;
  if (element) {
    element.columns = columns;
  }
}

function setTimeline(selector: string, events: Array<{ description?: string; id: string; label: string; meta?: string }>) {
  const element = routeView.querySelector(selector) as DataElement<{ events?: typeof events }> | null;
  if (element) {
    element.events = events;
  }
}

function setBreadcrumbs(current: RouteDefinition) {
  const crumbs = routeView.querySelector("#breadcrumbs") as DataElement<{
    items?: Array<{ current?: boolean; href?: string; label: string }>;
  }> | null;
  if (crumbs) {
    crumbs.items = [
      { href: "#/", label: "Northstar" },
      { current: true, label: current.title },
    ];
  }
}

function render() {
  const route = readRoute();
  const definition = routes.find((item) => item.id === route) ?? routes[0];
  sidebar.activeId = route;
  routeView.innerHTML = templates[route]();
  setBreadcrumbs(definition);
  configureRoute(route);
  routeView.scrollTo({ top: 0 });
}

function pageShell(route: RouteId, eyebrow: string, title: string, body: string, content: string) {
  return `
    <div class="page">
      <apex-breadcrumbs id="breadcrumbs" label="Page trail"></apex-breadcrumbs>
      <div class="page-heading">
        <apex-stack gap="sm">
          <apex-badge tone="info">${eyebrow}</apex-badge>
          <apex-typography as="h1" variant="display">${title}</apex-typography>
          <apex-typography variant="body">${body}</apex-typography>
        </apex-stack>
        <div class="page-heading-actions">
          <a class="button-link" href="${routeHref(route === "home" ? "dashboard" : "work-orders")}">
            <apex-button>${route === "home" ? "Open dashboard" : "New work order"}</apex-button>
          </a>
          <a class="button-link" href="${routeHref("about")}">
            <apex-button variant="secondary">Package proof</apex-button>
          </a>
        </div>
      </div>
      ${content}
    </div>
  `;
}

const templates: Record<RouteId, () => string> = {
  home: () =>
    pageShell(
      "home",
      "Regional service operations",
      "Premium field teams run tighter days with Northstar.",
      "Northstar Field Services coordinates dispatch, customer records, compliance notes, and executive reporting for regional HVAC, utility, and facilities teams.",
      `
        <apex-paper elevation="sm">
          <div class="hero-grid">
            <apex-stack gap="lg">
              <apex-typography as="h2" variant="title">One operating desk from first call to closeout.</apex-typography>
              <apex-typography variant="body">Dispatchers see capacity, managers see risk, and technicians get cleaner work packets without pulling teams into a heavyweight enterprise suite.</apex-typography>
              <div class="hero-actions">
                <a class="button-link" href="${routeHref("work-orders")}"><apex-button size="lg">Create sample order</apex-button></a>
                <a class="button-link" href="${routeHref("customers")}"><apex-button size="lg" variant="secondary">Review customers</apex-button></a>
              </div>
            </apex-stack>
            <div class="proof-panel">
              <apex-card eyebrow="Customer proof" heading="41% faster same-day scheduling">
                <apex-list>
                  <li class="apex-list-item"><span>MetroGrid Facilities</span><apex-badge tone="success">Live</apex-badge></li>
                  <li class="apex-list-item"><span>Harborline Utilities</span><apex-badge tone="info">Rollout</apex-badge></li>
                  <li class="apex-list-item"><span>PrairieCare Campuses</span><apex-badge tone="warning">Pilot</apex-badge></li>
                </apex-list>
              </apex-card>
            </div>
          </div>
        </apex-paper>

        <div class="metric-strip">
          <apex-card eyebrow="Booked capacity" heading="86%">
            <apex-progress label="Weekly crew allocation" value="86"></apex-progress>
          </apex-card>
          <apex-card eyebrow="Open work" heading="124 orders">
            <apex-progress label="Orders with owner" value="91"></apex-progress>
          </apex-card>
          <apex-card eyebrow="Customer health" heading="22 at risk">
            <apex-progress label="Renewal rescue plan" value="64"></apex-progress>
          </apex-card>
        </div>

        <div class="split-grid">
          <apex-paper>
            <apex-stack gap="md">
              <apex-typography as="h2" variant="title">Offer</apex-typography>
              <apex-list>
                <li class="apex-list-item"><span>Dispatch planning with capacity and SLA context</span><apex-badge tone="info">Plan</apex-badge></li>
                <li class="apex-list-item"><span>Work order packets with parts, access, and safety notes</span><apex-badge tone="success">Do</apex-badge></li>
                <li class="apex-list-item"><span>Customer pipeline records tied to revenue and renewals</span><apex-badge tone="neutral">Grow</apex-badge></li>
              </apex-list>
            </apex-stack>
          </apex-paper>
          <apex-chart id="home-chart" label="Northstar rollout results"></apex-chart>
        </div>

        <apex-alert tone="success" heading="Proof path">This demo uses a vanilla hash router, ApexUI web components, and indigo light/dark token themes.</apex-alert>
      `,
    ),

  dashboard: () =>
    pageShell(
      "dashboard",
      "Operations command",
      "Live metrics for crew capacity, SLA risk, and daily closeout.",
      "This route uses charts, tables, progress, workflow status, and scheduling widgets to model a real dispatcher dashboard.",
      `
        <apex-toolbar label="Dashboard actions" justify="between" wrap>
          <apex-button size="sm" id="refresh-dashboard">Refresh signals</apex-button>
          <apex-button size="sm" variant="secondary">Export board</apex-button>
          <apex-badge tone="success">07:42 sync</apex-badge>
        </apex-toolbar>

        <div class="dashboard-grid">
          <apex-card eyebrow="SLA protection" heading="94%">
            <apex-progress label="Jobs on protected schedule" value="94"></apex-progress>
          </apex-card>
          <apex-card eyebrow="First visit fix" heading="78%">
            <apex-progress label="Resolved without return trip" value="78"></apex-progress>
          </apex-card>
          <apex-card eyebrow="Safety packet" heading="19 gaps">
            <apex-progress label="Orders ready for dispatch" value="69"></apex-progress>
          </apex-card>
          <apex-chart id="dashboard-chart" label="Crew capacity by region"></apex-chart>
        </div>

        <div class="split-grid wide-left">
          <apex-data-table id="dashboard-table" caption="High priority work orders"></apex-data-table>
          <apex-calendar label="June dispatch board" month-label="June 2026"></apex-calendar>
        </div>

        <apex-paper>
          <apex-stack gap="md">
            <apex-typography as="h2" variant="title">Workflow board</apex-typography>
            <apex-workflow-board id="dispatch-board"></apex-workflow-board>
          </apex-stack>
        </apex-paper>
      `,
    ),

  "work-orders": () =>
    pageShell(
      "work-orders",
      "Dispatch intake",
      "Create a work order with assignment, schedule, validation, and field evidence.",
      "The sample form validates required customer, site, date, and problem fields before showing a saved state.",
      `
        <form class="form-grid" id="work-order-form" novalidate>
          <apex-paper>
            <apex-stack gap="md">
              <apex-typography as="h2" variant="title">Request details</apex-typography>
              <apex-text-field id="wo-customer" label="Customer" name="customer" value="Harborline Utilities" hint="Account or organization"></apex-text-field>
              <apex-text-field id="wo-site" label="Service site" name="site" placeholder="Facility, address, or asset tag" hint="Required for dispatch"></apex-text-field>
              <apex-textarea id="wo-problem" label="Problem summary" name="problem" rows="5" placeholder="Describe failure, access notes, and visible hazards"></apex-textarea>
              <apex-file-upload id="wo-files" label="Field evidence" action-label="Attach files" description="PDF, JPG, PNG up to 10 MB" accept=".pdf,.jpg,.jpeg,.png" multiple></apex-file-upload>
            </apex-stack>
          </apex-paper>

          <apex-paper>
            <apex-stack gap="md">
              <apex-typography as="h2" variant="title">Dispatch plan</apex-typography>
              <apex-date-picker id="wo-date" label="Target date" name="targetDate" value="2026-06-18" hint="Crew commitment date"></apex-date-picker>
              <apex-time-picker id="wo-time" label="Arrival window" name="arrival" value="09:30" hint="Local site time"></apex-time-picker>
              <apex-select id="wo-region" label="Region" name="region" value="north" hint="Routes the order to a dispatcher"></apex-select>
              <apex-autocomplete id="wo-owner" label="Lead technician" placeholder="Select technician" value="Maya Chen" hint="Optional until scheduled"></apex-autocomplete>
              <apex-radio-group id="wo-priority" label="Priority" name="priority" value="same-day"></apex-radio-group>
              <apex-checkbox label="Customer has confirmed access window" checked></apex-checkbox>
              <apex-button type="submit">Save work order</apex-button>
            </apex-stack>
          </apex-paper>
        </form>

        <apex-stepper id="wo-stepper" active-index="1"></apex-stepper>
      `,
    ),

  customers: () =>
    pageShell(
      "customers",
      "Customer operations",
      "Pipeline, records, and account detail in one route.",
      "Account managers can scan renewals, sort active records, and inspect work history patterns without leaving the customer workspace.",
      `
        <apex-toolbar label="Customer tools" wrap>
          <apex-search-form id="customer-search" label="Find customer" placeholder="Search company, region, owner"></apex-search-form>
          <apex-button size="sm" variant="secondary">Import accounts</apex-button>
          <apex-button size="sm">Add record</apex-button>
        </apex-toolbar>

        <div class="split-grid wide-left">
          <apex-data-grid id="customer-grid" caption="Customer records"></apex-data-grid>
          <apex-paper>
            <apex-stack gap="md">
              <apex-typography as="h2" variant="title">Harborline Utilities</apex-typography>
              <div class="detail-row"><span>Owner</span><strong>Priya Kapoor</strong></div>
              <div class="detail-row"><span>Renewal</span><strong>2026-09-30</strong></div>
              <div class="detail-row"><span>Open work</span><strong>18 orders</strong></div>
              <apex-divider decorative></apex-divider>
              <apex-list>
                <li class="apex-list-item"><span>North substations access list refreshed</span><apex-badge tone="success">Done</apex-badge></li>
                <li class="apex-list-item"><span>Generator inspection needs quote approval</span><apex-badge tone="warning">Risk</apex-badge></li>
                <li class="apex-list-item"><span>Q3 capacity review scheduled</span><apex-badge tone="info">Next</apex-badge></li>
              </apex-list>
            </apex-stack>
          </apex-paper>
        </div>

        <apex-paper>
          <apex-stack gap="md">
            <apex-typography as="h2" variant="title">Pipeline board</apex-typography>
            <apex-workflow-board id="customer-board"></apex-workflow-board>
          </apex-stack>
        </apex-paper>
      `,
    ),

  settings: () =>
    pageShell(
      "settings",
      "Account controls",
      "Preferences for identity, notification policy, locale, and theme.",
      "Settings demonstrate tabs, toggles, selection controls, sliders, and theme mode updates inside the same token scope.",
      `
        <apex-tabs id="settings-tabs" label="Settings sections" active-id="profile"></apex-tabs>

        <div class="split-grid">
          <apex-paper>
            <apex-stack gap="md">
              <apex-typography as="h2" variant="title">Profile</apex-typography>
              <apex-text-field label="Workspace name" value="Northstar Field Services"></apex-text-field>
              <apex-text-field label="Account owner" value="Maya Chen"></apex-text-field>
              <apex-select id="settings-locale" label="Locale" value="en-us" hint="Used for date and number formatting"></apex-select>
              <apex-toggle-group id="settings-theme" label="Theme mode"></apex-toggle-group>
            </apex-stack>
          </apex-paper>

          <apex-paper>
            <apex-stack gap="md">
              <apex-typography as="h2" variant="title">Preferences</apex-typography>
              <apex-switch label="Notify dispatcher when SLA risk changes" checked></apex-switch>
              <apex-switch label="Require photo evidence before closeout" checked></apex-switch>
              <apex-switch label="Send daily customer health digest"></apex-switch>
              <apex-slider label="Default drive buffer minutes" min="5" max="45" step="5" value="20"></apex-slider>
              <apex-button id="save-settings">Save settings</apex-button>
            </apex-stack>
          </apex-paper>
        </div>

        <apex-alert tone="info" heading="Theme scope">The assigned theme defaults to indigo-dark. The toggle switches the same ApexUI token family to indigo-light.</apex-alert>
      `,
    ),

  about: () =>
    pageShell(
      "about",
      "Implementation proof",
      "Installed packages, routing strategy, and framework integration notes.",
      "This route is a proof page for reviewers: it describes how the vanilla demo consumes ApexUI packages without adding a framework runtime.",
      `
        <div class="split-grid wide-left">
          <apex-paper>
            <apex-stack gap="md">
              <apex-typography as="h2" variant="title">Package proof</apex-typography>
              <apex-data-table id="package-table" caption="Installed ApexUI packages"></apex-data-table>
            </apex-stack>
          </apex-paper>
          <apex-card eyebrow="Router" heading="Small hash router">
            <apex-list ordered>
              <li class="apex-list-item"><span>Read location hash</span><apex-badge tone="success">Vanilla</apex-badge></li>
              <li class="apex-list-item"><span>Render route template</span><apex-badge tone="info">TypeScript</apex-badge></li>
              <li class="apex-list-item"><span>Assign ApexUI component data</span><apex-badge tone="success">Props</apex-badge></li>
            </apex-list>
          </apex-card>
        </div>

        <div class="split-grid">
          <apex-timeline id="about-timeline"></apex-timeline>
          <apex-tree-view id="about-tree" label="Integration map"></apex-tree-view>
        </div>

        <apex-alert tone="success" heading="No framework dependency">The route shell is plain DOM, local CSS composes layout, and all controls are ApexUI web components.</apex-alert>
      `,
    ),
};

function configureRoute(route: RouteId) {
  if (route === "home") {
    setChart("#home-chart", [
      { label: "On-time arrival", value: 92 },
      { label: "Return trips avoided", value: 78 },
      { label: "Renewals protected", value: 83 },
    ]);
  }

  if (route === "dashboard") {
    setChart("#dashboard-chart", [
      { label: "North", value: 88 },
      { label: "Central", value: 73 },
      { label: "South", value: 81 },
      { label: "Coastal", value: 66 },
    ]);
    setRows(
      "#dashboard-table",
      [
        { key: "order", header: "Order" },
        { key: "customer", header: "Customer" },
        { key: "owner", header: "Owner" },
        { key: "status", header: "Status" },
      ],
      [
        { customer: "Harborline Utilities", order: "WO-1842", owner: "Maya Chen", status: "Access check" },
        { customer: "PrairieCare Campuses", order: "WO-1847", owner: "Omar Haddad", status: "Parts hold" },
        { customer: "MetroGrid Facilities", order: "WO-1851", owner: "Elena Rossi", status: "Ready" },
        { customer: "Crownline Health", order: "WO-1856", owner: "Jon Bell", status: "Safety packet" },
      ],
    );
    setWorkflow("#dispatch-board", [
      { id: "intake", items: [{ id: "wo-1842", meta: "12 min", title: "Confirm north gate access" }], title: "Intake" },
      {
        id: "scheduled",
        items: [
          { id: "wo-1847", meta: "10:00", title: "Boiler room pressure test" },
          { id: "wo-1851", meta: "13:30", title: "Generator relay inspection" },
        ],
        title: "Scheduled",
      },
      { id: "closed", items: [{ id: "wo-1831", meta: "08:20", title: "Cooling tower closeout" }], title: "Closed today" },
    ]);
    routeView.querySelector("#refresh-dashboard")?.addEventListener("click", () => notify("Dashboard signals refreshed"));
  }

  if (route === "work-orders") {
    setOptions("#wo-region", [
      { label: "North region", value: "north" },
      { label: "Central region", value: "central" },
      { label: "South region", value: "south" },
    ]);
    setOptions("#wo-owner", ["Maya Chen", "Omar Haddad", "Elena Rossi", "Jon Bell"]);
    setOptions("#wo-priority", [
      { description: "Dispatch before end of current operating day", label: "Same day", value: "same-day" },
      { description: "Schedule within two business days", label: "Standard", value: "standard" },
      { description: "Needs quote or customer approval first", label: "Hold", value: "hold" },
    ]);
    const files = routeView.querySelector("#wo-files") as DataElement<{
      files?: Array<{ meta?: string; name: string }>;
    }> | null;
    if (files) {
      files.files = [{ meta: "sample", name: "north-substation-panel.jpg" }];
    }
    const stepper = routeView.querySelector("#wo-stepper") as DataElement<{
      steps?: Array<{ description?: string; id: string; label: string }>;
    }> | null;
    if (stepper) {
      stepper.steps = [
        { description: "Customer and site", id: "intake", label: "Intake" },
        { description: "Crew and arrival window", id: "dispatch", label: "Dispatch" },
        { description: "Closeout packet", id: "closeout", label: "Closeout" },
      ];
    }
    bindWorkOrderForm();
  }

  if (route === "customers") {
    setRows(
      "#customer-grid",
      [
        { key: "account", header: "Account" },
        { key: "segment", header: "Segment" },
        { key: "owner", header: "Owner" },
        { key: "health", header: "Health" },
        { key: "renewal", header: "Renewal" },
      ],
      [
        { account: "Harborline Utilities", health: "At risk", owner: "Priya Kapoor", renewal: "2026-09-30", segment: "Utility" },
        { account: "MetroGrid Facilities", health: "Healthy", owner: "Maya Chen", renewal: "2027-01-15", segment: "Facilities" },
        { account: "PrairieCare Campuses", health: "Pilot", owner: "Omar Haddad", renewal: "2026-12-01", segment: "Education" },
        { account: "Crownline Health", health: "Expanding", owner: "Elena Rossi", renewal: "2026-10-18", segment: "Healthcare" },
      ],
    );
    setWorkflow("#customer-board", [
      { id: "lead", items: [{ id: "acct-91", meta: "$48k", title: "Riverbend Transit" }], title: "Qualified" },
      { id: "proposal", items: [{ id: "acct-42", meta: "$132k", title: "Crownline Health expansion" }], title: "Proposal" },
      { id: "renewal", items: [{ id: "acct-17", meta: "Sep 30", title: "Harborline rescue plan" }], title: "Renewal" },
    ]);
  }

  if (route === "settings") {
    const storedTheme = appShell.dataset.apexTheme === "indigo-light" ? "light" : "dark";
    setOptions("#settings-locale", [
      { label: "English (United States)", value: "en-us" },
      { label: "English (Canada)", value: "en-ca" },
      { label: "Spanish (United States)", value: "es-us" },
    ]);
    setOptions("#settings-theme", [
      { label: "Light", value: "light" },
      { label: "Dark", value: "dark" },
    ]);
    const themeToggle = routeView.querySelector("#settings-theme") as DataElement<{ value?: string }> | null;
    if (themeToggle) {
      themeToggle.value = storedTheme;
      themeToggle.addEventListener("apexChange", (event) => {
        const nextMode = (event as CustomEvent<{ value: ThemeMode }>).detail.value;
        setTheme(nextMode);
      });
    }
    const tabs = routeView.querySelector("#settings-tabs") as DataElement<{
      items?: Array<{ id: string; label: string }>;
    }> | null;
    if (tabs) {
      tabs.items = [
        { id: "profile", label: "Profile" },
        { id: "notifications", label: "Notifications" },
        { id: "security", label: "Security" },
      ];
    }
    routeView.querySelector("#save-settings")?.addEventListener("click", () => notify("Settings saved"));
  }

  if (route === "about") {
    setRows(
      "#package-table",
      [
        { key: "package", header: "Package" },
        { key: "usage", header: "Usage" },
        { key: "proof", header: "Proof" },
      ],
      [
        { package: "@apexui/web-components", proof: "Direct custom element imports", usage: "Controls and data display" },
        { package: "@apexui/tokens", proof: "data-apex-theme scope", usage: "Indigo light/dark themes" },
        { package: "vite", proof: "Static GitHub Pages build", usage: "Vanilla TypeScript bundling" },
      ],
    );
    setTimeline("#about-timeline", [
      { description: "Hash is parsed into a RouteId", id: "hash", label: "Route", meta: "router" },
      { description: "Template HTML is rendered into the route view", id: "render", label: "Render", meta: "DOM" },
      { description: "ApexUI props receive typed rows, charts, options, and board data", id: "hydrate", label: "Hydrate", meta: "components" },
    ]);
    const tree = routeView.querySelector("#about-tree") as DataElement<{
      items?: Array<{ children?: Array<{ id: string; label: string }>; id: string; label: string }>;
    }> | null;
    if (tree) {
      tree.items = [
        {
          children: [
            { id: "components", label: "@apexui/web-components" },
            { id: "tokens", label: "@apexui/tokens/css" },
          ],
          id: "packages",
          label: "Installed packages",
        },
        {
          children: [
            { id: "router", label: "src/main.ts hash router" },
            { id: "layout", label: "src/styles.css composition" },
          ],
          id: "vanilla",
          label: "Vanilla app",
        },
      ];
    }
  }
}

function bindWorkOrderForm() {
  const form = routeView.querySelector("#work-order-form") as HTMLFormElement | null;
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [
      { id: "wo-customer", message: "Customer is required" },
      { id: "wo-site", message: "Service site is required" },
      { id: "wo-problem", message: "Problem summary is required" },
      { id: "wo-date", message: "Target date is required" },
    ];
    let valid = true;

    for (const field of fields) {
      const element = routeView.querySelector(`#${field.id}`) as DataElement<{ error?: string; value?: string }> | null;
      if (!element) {
        continue;
      }
      const value = (element.value ?? element.getAttribute("value") ?? "").trim();
      element.error = value ? "" : field.message;
      if (!value) {
        valid = false;
      }
    }

    notify(valid ? "Work order saved as WO-1862" : "Complete required work order fields", valid ? "success" : "danger");
  });
}

lightButton.addEventListener("click", () => setTheme("light"));
darkButton.addEventListener("click", () => setTheme("dark"));
sidebar.addEventListener("apexSelect", (event) => {
  const selected = (event as CustomEvent<RouteId>).detail;
  if (routes.some((route) => route.id === selected)) {
    window.location.hash = routeHref(selected);
  }
});
window.addEventListener("hashchange", render);

setTheme((window.localStorage.getItem("northstar-theme") as ThemeMode | null) ?? "dark");
render();
