import "@apexui/tokens/css";
import "@apexui/web-components/components/apex-accordion.js";
import "@apexui/web-components/components/apex-alert.js";
import "@apexui/web-components/components/apex-app-bar.js";
import "@apexui/web-components/components/apex-autocomplete.js";
import "@apexui/web-components/components/apex-badge.js";
import "@apexui/web-components/components/apex-button.js";
import "@apexui/web-components/components/apex-button-group.js";
import "@apexui/web-components/components/apex-calendar.js";
import "@apexui/web-components/components/apex-card.js";
import "@apexui/web-components/components/apex-chart.js";
import "@apexui/web-components/components/apex-checkbox.js";
import "@apexui/web-components/components/apex-data-table.js";
import "@apexui/web-components/components/apex-date-picker.js";
import "@apexui/web-components/components/apex-list.js";
import "@apexui/web-components/components/apex-paper.js";
import "@apexui/web-components/components/apex-progress.js";
import "@apexui/web-components/components/apex-radio-group.js";
import "@apexui/web-components/components/apex-search-form.js";
import "@apexui/web-components/components/apex-sidebar.js";
import "@apexui/web-components/components/apex-snackbar.js";
import "@apexui/web-components/components/apex-stack.js";
import "@apexui/web-components/components/apex-switch.js";
import "@apexui/web-components/components/apex-text-field.js";
import "@apexui/web-components/components/apex-textarea.js";
import "@apexui/web-components/components/apex-timeline.js";
import "@apexui/web-components/components/apex-toolbar.js";
import "@apexui/web-components/components/apex-typography.js";
import "./styles.css";

type DataElement<T> = HTMLElement & T;

const appShell = document.querySelector("#app-shell") as HTMLElement;
const themeBadge = document.querySelector("#theme-badge") as HTMLElement;
const lightButton = document.querySelector("#theme-light");
const darkButton = document.querySelector("#theme-dark");

function setTheme(mode: "light" | "dark") {
  const theme = `indigo-${mode}`;
  appShell.dataset.apexTheme = theme;
  themeBadge.textContent = theme;
  lightButton?.setAttribute("variant", mode === "light" ? "primary" : "secondary");
  darkButton?.setAttribute("variant", mode === "dark" ? "primary" : "secondary");
}

lightButton?.addEventListener("click", () => setTheme("light"));
darkButton?.addEventListener("click", () => setTheme("dark"));

const nav = document.querySelector("#nav") as DataElement<{ items?: Array<{ id: string; label: string }> }>;
nav.items = [
  { id: "operations", label: "Operations" },
  { id: "signals", label: "Signals" },
  { id: "release", label: "Release" },
];

const chart = document.querySelector("#support-chart") as DataElement<{ data?: Array<{ label: string; value: number }> }>;
chart.data = [{ label: "Tokens", value: 92 }, { label: "Components", value: 86 }, { label: "Routes", value: 79 }];

const list = document.querySelector("#support-list") as DataElement<{ items?: Array<{ label: string; description: string }> }>;
list.items = [
  { label: "Custom elements", description: "Direct imports keep GitHub Pages paths stable" },
  { label: "Plain events", description: "DOM listeners wire app behavior" },
  { label: "Token modes", description: "Indigo light and dark scope on shell" },
];

const owner = document.querySelector("#owner") as DataElement<{ options?: string[] }>;
owner.options = ["Maya Chen", "Omar Haddad", "Elena Rossi"];

const priority = document.querySelector("#priority") as DataElement<{ options?: Array<{ label: string; value: string }> }>;
priority.options = [{ label: "Urgent", value: "urgent" }, { label: "Normal", value: "normal" }];

const table = document.querySelector("#support-table") as DataElement<{ columns?: Array<{ key: string; header: string }>; rows?: Array<Record<string, string>> }>;
table.columns = [{ key: "area", header: "Area" }, { key: "owner", header: "Owner" }, { key: "status", header: "Status" }];
table.rows = [
  { area: "Tokens", owner: "Platform", status: "Live" },
  { area: "Components", owner: "Design system", status: "Beta" },
  { area: "Docs", owner: "DX", status: "Linked" },
];

const notes = document.querySelector("#notes") as DataElement<{ items?: Array<{ id: string; title: string; content: string }> }>;
notes.items = [
  { id: "routing", title: "Routing", content: "Vanilla controls navigation state with plain DOM." },
  { id: "theme", title: "Theme", content: "Indigo light and dark modes are token-owned." },
  { id: "css", title: "CSS", content: "Only layout CSS is local; component visuals stay native." },
];

const timeline = document.querySelector("#timeline") as DataElement<{ items?: Array<{ label: string; description: string; meta: string }> }>;
timeline.items = [
  { label: "Register", description: "Custom elements imported directly", meta: "08:20" },
  { label: "Compose", description: "Atoms through organisms build page", meta: "08:44" },
  { label: "Verify", description: "Build and Pages smoke next", meta: "next" },
];

document.querySelector("#primary-action")?.addEventListener("click", () => document.querySelector("#snackbar")?.setAttribute("open", "true"));
