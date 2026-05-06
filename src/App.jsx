import { useState, useEffect } from "react";
import LEADS from "./leads.js";
import { generateEmail, generateLemlistPayload } from "./utils.js";

/* ───────── tiny components ───────── */

function StatusBadge({ days }) {
  const isNew = days <= 3;
  const isRecent = days <= 7;
  const color = isNew ? "#22c55e" : isRecent ? "#eab308" : "#94a3b8";
  const label = isNew ? "NEW" : `${days}d ago`;
  return (
    <span
      style={{
        background: color + "15",
        color,
        fontWeight: 700,
        fontSize: 10,
        letterSpacing: "0.08em",
        padding: "3px 10px",
        borderRadius: 99,
        textTransform: "uppercase",
        border: `1px solid ${color}30`,
      }}
    >
      {label}
    </span>
  );
}

function StageBadge({ stage }) {
  const isSeed = stage.toLowerCase().includes("seed");
  const color = isSeed ? "#a78bfa" : "#38bdf8";
  return (
    <span
      style={{
        background: color + "12",
        color,
        fontWeight: 700,
        fontSize: 10,
        padding: "3px 9px",
        borderRadius: 99,
        letterSpacing: "0.04em",
      }}
    >
      {stage}
    </span>
  );
}

function Tag({ label }) {
  return (
    <span
      style={{
        background: "#e8552015",
        color: "#e8804a",
        fontSize: 10,
        fontWeight: 600,
        padding: "2px 9px",
        borderRadius: 99,
      }}
    >
      {label}
    </span>
  );
}

function SourceTag({ source }) {
  const colors = {
    "Y Combinator": { bg: "#ff640020", text: "#ff6600" },
    "MKT1 Job Board": { bg: "#6366f115", text: "#818cf8" },
    "Built In NYC": { bg: "#22d3ee15", text: "#22d3ee" },
    "Built In SF": { bg: "#22d3ee15", text: "#22d3ee" },
    Greenhouse: { bg: "#22c55e15", text: "#4ade80" },
    "Startup.jobs": { bg: "#f472b615", text: "#f472b6" },
  };
  const c = colors[source] || { bg: "#ffffff10", text: "#94a3b8" };
  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        fontSize: 9,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 99,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      {source}
    </span>
  );
}

/* ───────── lead card ───────── */

function LeadCard({ lead, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{
        background: isSelected ? "#1a1825" : "#151519",
        border: isSelected ? "1.5px solid #e8552080" : "1.5px solid #222228",
        borderRadius: 14,
        padding: 18,
        cursor: "pointer",
        transition: "all 0.15s",
        position: "relative",
        animation: "fadeIn 0.3s ease",
      }}
    >
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 3,
            height: "100%",
            background: "#e85520",
            borderRadius: "3px 0 0 3px",
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "#1c1c24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
              fontWeight: 800,
              color: "#e85520",
              border: "1px solid #2a2a32",
              flexShrink: 0,
            }}
          >
            {lead.company[0]}
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: "#e8e6e3",
                lineHeight: 1.2,
              }}
            >
              {lead.company}
            </div>
            <div style={{ fontSize: 11, color: "#6b6878", marginTop: 2 }}>
              {lead.location}
            </div>
          </div>
        </div>
        <StatusBadge days={lead.postedDays} />
      </div>
      <div
        style={{
          fontWeight: 600,
          fontSize: 13,
          color: "#c8c6c1",
          marginBottom: 8,
        }}
      >
        {lead.role}
      </div>
      <div
        style={{
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
          marginBottom: 8,
        }}
      >
        <StageBadge stage={lead.stage} />
        <SourceTag source={lead.source} />
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {lead.tags.slice(0, 3).map((t) => (
          <Tag key={t} label={t} />
        ))}
      </div>
    </div>
  );
}

/* ───────── detail panel ───────── */

function DetailPanel({ lead }) {
  const [emailCopied, setEmailCopied] = useState(false);
  const [tab, setTab] = useState("overview");
  const email = generateEmail(lead);
  const payload = generateLemlistPayload(lead);

  const copy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  // Reset tab when lead changes
  useEffect(() => {
    setTab("overview");
  }, [lead.id]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "24px 24px 0", borderBottom: "1px solid #222228" }}>
        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              background: "#1c1c24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              color: "#e85520",
              border: "1px solid #2a2a32",
            }}
          >
            {lead.company[0]}
          </div>
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 19,
                fontWeight: 800,
                color: "#e8e6e3",
                lineHeight: 1.2,
              }}
            >
              {lead.role}
            </h2>
            <div style={{ fontSize: 13, color: "#6b6878", marginTop: 3 }}>
              {lead.company} · {lead.location}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 14,
            flexWrap: "wrap",
          }}
        >
          <StageBadge stage={lead.stage} />
          <SourceTag source={lead.source} />
          {lead.salary && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#22c55e",
                padding: "3px 9px",
                borderRadius: 99,
                background: "#22c55e12",
              }}
            >
              {lead.salary}
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: 0 }}>
          {["overview", "outreach email", "→ lemlist"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: "none",
                border: "none",
                borderBottom:
                  tab === t
                    ? "2px solid #e85520"
                    : "2px solid transparent",
                color: tab === t ? "#e85520" : "#6b6878",
                fontWeight: tab === t ? 700 : 500,
                fontSize: 12,
                padding: "9px 16px",
                cursor: "pointer",
                textTransform: "capitalize",
                letterSpacing: "0.02em",
                transition: "all 0.1s",
                fontFamily: "inherit",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 24, flex: 1, overflowY: "auto" }}>
        {tab === "overview" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#6b6878",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Company Intel
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "#c8c6c1",
                  lineHeight: 1.75,
                }}
              >
                {lead.about}
              </p>
            </div>
            <div style={{ marginBottom: 24 }}>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#6b6878",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Hiring Manager / Key Contact
              </h3>
              <div
                style={{
                  background: "#151519",
                  borderRadius: 12,
                  padding: 16,
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                  border: "1px solid #222228",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "#e85520",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {lead.hiringManager.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#e8e6e3",
                    }}
                  >
                    {lead.hiringManager.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#6b6878",
                      marginTop: 1,
                    }}
                  >
                    {lead.hiringManager.title}
                  </div>
                </div>
                <a
                  href={lead.hiringManager.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#e85520",
                    color: "#fff",
                    padding: "7px 14px",
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 5,
                flexWrap: "wrap",
                marginBottom: 24,
              }}
            >
              {lead.tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <a
                href={lead.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#e85520",
                  color: "#fff",
                  padding: "11px 18px",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                View Job Posting ↗
              </a>
              <button
                onClick={() => setTab("outreach email")}
                style={{
                  flex: 1,
                  background: "#151519",
                  color: "#e8e6e3",
                  padding: "11px 18px",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  border: "1.5px solid #222228",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Draft Outreach →
              </button>
            </div>
          </div>
        )}

        {tab === "outreach email" && (
          <div>
            <div
              style={{
                background: "#0e0e11",
                borderRadius: 12,
                padding: 18,
                border: "1px solid #222228",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#6b6878",
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                To: {lead.hiringManager.name} · {lead.hiringManager.title}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#6b6878",
                  marginBottom: 14,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Subject: {lead.role} at {lead.company} — Quick intro
              </div>
              <pre
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: 12,
                  color: "#c8c6c1",
                  lineHeight: 1.8,
                }}
              >
                {email}
              </pre>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={copy}
                style={{
                  flex: 1,
                  background: emailCopied ? "#22c55e" : "#e85520",
                  color: "#fff",
                  padding: "11px 18px",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  fontFamily: "inherit",
                }}
              >
                {emailCopied ? "✓ Copied!" : "Copy Email"}
              </button>
              <button
                onClick={() => setTab("→ lemlist")}
                style={{
                  flex: 1,
                  background: "#151519",
                  color: "#e8e6e3",
                  padding: "11px 18px",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  border: "1.5px solid #222228",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Push to Lemlist →
              </button>
            </div>
          </div>
        )}

        {tab === "→ lemlist" && (
          <div>
            <div
              style={{
                background: "#151519",
                borderRadius: 12,
                padding: 20,
                border: "1px solid #222228",
                marginBottom: 18,
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 10 }}>🔗</div>
              <h3
                style={{
                  margin: "0 0 6px",
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#e8e6e3",
                }}
              >
                Lemlist Integration
              </h3>
              <p
                style={{
                  margin: "0 0 14px",
                  fontSize: 12,
                  color: "#6b6878",
                  lineHeight: 1.7,
                }}
              >
                Push this lead into a Lemlist campaign. The hiring manager
                details and personalized email map to Lemlist custom variables
                automatically.
              </p>
              <div
                style={{
                  background: "#0e0e11",
                  borderRadius: 8,
                  padding: 14,
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#6b6878",
                  lineHeight: 1.9,
                  border: "1px solid #1a1a22",
                  overflowX: "auto",
                }}
              >
                <div
                  style={{
                    color: "#e85520",
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  {"// POST https://api.lemlist.com/api/campaigns/{id}/leads"}
                </div>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  {JSON.stringify(payload, null, 2)}
                </pre>
              </div>
            </div>
            <div
              style={{
                background: "#0e0e11",
                borderRadius: 12,
                padding: 18,
                border: "1px solid #222228",
              }}
            >
              <h4
                style={{
                  margin: "0 0 12px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#e85520",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Automation Setup
              </h4>
              {[
                "Get your Lemlist API key → Settings → Integrations → API",
                "Create a campaign with variables: {{customVar1}}, {{customVar2}}, {{customVar3}}",
                "Use Zapier / Make / n8n to scrape jobs → enrich → POST to Lemlist",
                "Or connect Lemlist MCP server directly to Claude for push-button sending",
              ].map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    marginBottom: i < 3 ? 8 : 0,
                  }}
                >
                  <span
                    style={{
                      background: "#e85520",
                      color: "#fff",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{ fontSize: 12, color: "#c8c6c1", lineHeight: 1.6 }}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────── main app ───────── */

export default function App() {
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [mobileShowDetail, setMobileShowDetail] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setLeads(LEADS);
      setLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  const filtered = leads.filter((l) => {
    const matchQ =
      !query ||
      l.company.toLowerCase().includes(query.toLowerCase()) ||
      l.role.toLowerCase().includes(query.toLowerCase()) ||
      l.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchStage =
      stageFilter === "all" ||
      (stageFilter === "seed" && l.stage.toLowerCase().includes("seed")) ||
      (stageFilter === "seriesA" &&
        l.stage.toLowerCase().includes("series a")) ||
      (stageFilter === "seriesB" &&
        l.stage.toLowerCase().includes("series b"));
    return matchQ && matchStage;
  });

  const selected = leads.find((l) => l.id === selectedId) || leads[0];
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const sources = ["YC Jobs", "Built In", "MKT1", "Greenhouse", "Startup.jobs", "Ashby"];

  return (
    <div
      style={{
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        background: "#0c0c0f",
        color: "#e8e6e3",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid #1a1a22",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 3,
            }}
          >
            <span style={{ fontSize: 18, color: "#e85520" }}>◉</span>
            <h1
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              Lead Hunter
            </h1>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "#6b6878",
                background: "#1a1a22",
                padding: "2px 8px",
                borderRadius: 6,
                marginLeft: 4,
              }}
            >
              PMM · US · Seed–B
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#4a4856" }}>{dateStr}</div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {sources.map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  color: "#4a4856",
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: "#141418",
                  border: "1px solid #1a1a22",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {s}
              </span>
            ))}
          </div>
          <span
            style={{
              background: "#22c55e15",
              color: "#22c55e",
              fontSize: 10,
              fontWeight: 700,
              padding: "5px 12px",
              borderRadius: 99,
              border: "1px solid #22c55e30",
            }}
          >
            ● {filtered.length} leads
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left — Lead list */}
        <div
          style={{
            width: 370,
            minWidth: 320,
            borderRight: "1px solid #1a1a22",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          <div style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="Filter companies, roles, tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                padding: "8px 14px",
                borderRadius: 10,
                border: "1px solid #222228",
                background: "#141418",
                color: "#e8e6e3",
                fontSize: 12,
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              style={{
                padding: "8px 10px",
                borderRadius: 10,
                border: "1px solid #222228",
                background: "#141418",
                color: "#6b6878",
                fontSize: 11,
                outline: "none",
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              <option value="all">All stages</option>
              <option value="seed">Seed</option>
              <option value="seriesA">Series A</option>
              <option value="seriesB">Series B+</option>
            </select>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "0 16px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {loading ? (
              <div style={{ textAlign: "center", padding: "50px 20px" }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    border: "3px solid #222228",
                    borderTopColor: "#e85520",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                    margin: "0 auto 14px",
                  }}
                />
                <div style={{ fontSize: 12, color: "#4a4856" }}>
                  Scanning YC, Built In, MKT1, Greenhouse...
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "50px 20px",
                  color: "#4a4856",
                  fontSize: 12,
                }}
              >
                No leads match your filter
              </div>
            ) : (
              filtered.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  isSelected={lead.id === selectedId}
                  onSelect={() => setSelectedId(lead.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Right — Detail panel */}
        <div
          style={{ flex: 1, background: "#111115", overflow: "hidden" }}
        >
          {selected && <DetailPanel lead={selected} />}
        </div>
      </div>
    </div>
  );
}
