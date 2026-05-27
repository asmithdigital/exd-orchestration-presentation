import { useState } from "react";

const C = {
  bg: "#f5f4f1", white: "#ffffff", border: "#ddd9d0", borderLight: "#eae7e0",
  text: "#333333", textMid: "#555555", textLight: "#999999", heading: "#1a1a1a",
  claude: "#C2410C", claudeBg: "#FFF7ED", claudeBorder: "#FDBA74",
  figma: "#7C3AED", figmaBg: "#F5F3FF", figmaBorder: "#C4B5FD",
  github: "#1F2937", githubBg: "#F3F4F6", githubBorder: "#D1D5DB",
  slack: "#611F69", slackBg: "#FDF4FF", slackBorder: "#E9D5FF",
  chrome: "#2563EB", chromeBg: "#EFF6FF", chromeBorder: "#BFDBFE",
  figjam: "#DC2626", figjamBg: "#FEF2F2", figjamBorder: "#FECACA",
  miro: "#CA8A04", miroBg: "#FEFCE8", miroBorder: "#FDE68A",
  teal: "#0F766E", tealBg: "#F0FDFA", tealBorder: "#99F6E4",
  green: "#15803D", greenBg: "#F0FDF4", greenBorder: "#BBF7D0",
  output: "#0E7490", outputBg: "#ECFEFF", outputBorder: "#A5F3FC",
  link: "#0369A1", linkBg: "#F0F9FF", linkBorder: "#7DD3FC",
  promptNode: "#92400E", promptNodeBg: "#FFFBEB", promptNodeBorder: "#FDE68A",
  ba: "#0F766E", content: "#B45309",
};

const W = 270;
const fs = { mono: "'IBM Plex Mono', monospace", sans: "'DM Sans', sans-serif" };

/* Highlight helpers */
function BA({ children }) { return <span style={{ color: C.ba, fontWeight: 700 }}>{children}</span>; }
function CT({ children }) { return <span style={{ color: C.content, fontWeight: 700 }}>{children}</span>; }

function Node({ label, sub, color, bg, border, icon, width, status, badge }) {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      {badge && <div style={{ position: "absolute", top: -14, left: 12, background: badge.bg || C.githubBg, border: `1.5px solid ${badge.border || C.githubBorder}`, borderRadius: 6, padding: "2px 10px", fontSize: 10, fontWeight: 700, color: badge.color || C.github, letterSpacing: 0.8, textTransform: "uppercase", fontFamily: fs.mono, whiteSpace: "nowrap" }}>{badge.text}</div>}
      <div style={{ background: bg || C.white, border: `2px solid ${border || C.border}`, borderRadius: 12, padding: "16px 18px", width: width || W, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: sub ? 5 : 0 }}>
          {icon && <span style={{ fontSize: 14, color: color || C.text }}>{icon}</span>}
          <span style={{ fontSize: 14, fontWeight: 700, color: C.heading, fontFamily: fs.sans, lineHeight: 1.25 }}>{label}</span>
          {status && <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "2px 7px", borderRadius: 10, marginLeft: "auto", whiteSpace: "nowrap", background: status === "live" ? C.greenBg : status === "demo" ? C.outputBg : "#FEF3C7", color: status === "live" ? C.green : status === "demo" ? C.output : "#92400E", border: `1px solid ${status === "live" ? C.greenBorder : status === "demo" ? C.outputBorder : "#FDE68A"}` }}>{status}</span>}
        </div>
        {sub && <div style={{ fontSize: 12.5, lineHeight: 1.5, color: C.textMid, fontFamily: fs.sans }}>{sub}</div>}
      </div>
    </div>
  );
}

function NodeWithNote({ nodeProps, note, linkLabel, linkUrl }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flexShrink: 0, width: nodeProps.width || W }}>
      <Node {...nodeProps} />
      {linkUrl && <LinkBtn label={linkLabel} url={linkUrl} />}
      {note && <div style={{ fontSize: 12.5, lineHeight: 1.5, color: C.textMid, fontFamily: fs.sans, marginTop: 8, paddingLeft: 2 }}>{note}</div>}
    </div>
  );
}

function PromptNode({ label, sub, width, badge }) {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      {badge && <div style={{ position: "absolute", top: -14, left: 12, background: badge.bg || C.promptNodeBg, border: `1.5px solid ${badge.border || C.promptNodeBorder}`, borderRadius: 6, padding: "2px 10px", fontSize: 10, fontWeight: 700, color: badge.color || C.promptNode, letterSpacing: 0.8, textTransform: "uppercase", fontFamily: fs.mono, whiteSpace: "nowrap" }}>{badge.text}</div>}
      <div style={{ background: C.promptNodeBg, border: `2px dashed ${C.promptNodeBorder}`, borderRadius: 12, padding: "16px 18px", width: width || W }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: sub ? 5 : 0 }}>
          <span style={{ fontSize: 14, color: C.promptNode }}>✎</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.promptNode, fontFamily: fs.sans, lineHeight: 1.25 }}>{label}</span>
        </div>
        {sub && <div style={{ fontSize: 12.5, lineHeight: 1.5, color: C.textMid, fontFamily: fs.sans }}>{sub}</div>}
      </div>
    </div>
  );
}

function PromptWithExample({ promptProps, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flexShrink: 0, width: promptProps.width || W }}>
      <PromptNode {...promptProps} />
      <div style={{ fontSize: 13, lineHeight: 1.7, color: C.heading, fontFamily: fs.sans, marginTop: 10, paddingLeft: 2 }}>{children}</div>
    </div>
  );
}

function LinkBtn({ label, url }) { return <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, background: C.linkBg, border: `1.5px solid ${C.linkBorder}`, borderRadius: 8, padding: "7px 12px", textDecoration: "none", marginTop: 6, fontSize: 12, fontWeight: 600, color: C.link, fontFamily: fs.sans }}><span style={{ fontSize: 11 }}>↗</span> {label}</a>; }
function Arrow({ length = 36, color = "#ccc" }) { return <div style={{ display: "flex", alignItems: "center", flexShrink: 0, width: length, alignSelf: "flex-start", marginTop: 28 }}><div style={{ flex: 1, height: 0, borderTop: `2px solid ${color}` }} /><div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: `7px solid ${color}` }} /></div>; }
function SectionHead({ number, title, subtitle }) {
  return (<div style={{ marginBottom: 24, position: "sticky", left: 0, zIndex: 2, background: C.bg, paddingRight: 20, display: "inline-block" }}><div style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: C.heading, color: "#fff", fontSize: 16, fontWeight: 800, fontFamily: fs.mono, flexShrink: 0 }}>{number}</div><div><div style={{ fontSize: 22, fontWeight: 800, color: C.heading, fontFamily: fs.sans, lineHeight: 1.2, whiteSpace: "nowrap" }}>{title}</div>{subtitle && <div style={{ fontSize: 13, color: C.textMid, marginTop: 3, fontFamily: fs.sans, whiteSpace: "nowrap" }}>{subtitle}</div>}</div></div></div>);
}
function Flow({ children }) { return <div style={{ display: "flex", alignItems: "flex-start", gap: 10, minWidth: "max-content" }}>{children}</div>; }
function NL({ nodeProps, linkLabel, linkUrl }) { return <div style={{ display: "flex", flexDirection: "column", flexShrink: 0 }}><Node {...nodeProps} />{linkUrl && <LinkBtn label={linkLabel} url={linkUrl} />}</div>; }
function Stack({ nodes, width }) { return <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>{nodes.map((n, i) => <div key={i} style={{ display: "flex", flexDirection: "column" }}><Node {...n} width={width || W} />{n.linkUrl && <LinkBtn label={n.linkLabel} url={n.linkUrl} />}</div>)}</div>; }
function StickyNote({ children, wide }) { return <div style={{ marginTop: 14, fontSize: 13, color: C.textMid, lineHeight: 1.55, maxWidth: wide ? 700 : 540, fontFamily: fs.sans, position: "sticky", left: 0 }}>{children}</div>; }
function Section({ children }) { return <div style={{ padding: "100px 0", borderBottom: `2px solid ${C.borderLight}` }}>{children}</div>; }

/* ═══ ARCHITECTURE DIAGRAM ═══ */
function SlackBotArchDiagram() {
  const f=fs.sans,t=C.textMid,h=C.heading;
  return (
    <div style={{ marginTop: 14, background: C.white, border: `2px solid ${C.border}`, borderRadius: 14, padding: "24px 28px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", width: 1060 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: t, fontFamily: fs.mono, marginBottom: 14 }}>Technical architecture — Slack bot script</div>
      <svg viewBox="0 0 1000 340" style={{ width: 1000, height: 340, display: "block" }} xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="40" width="220" height="165" rx="10" fill={C.slackBg} stroke={C.slackBorder} strokeWidth="1.5" />
        <text x="125" y="72" textAnchor="middle" fontFamily={f} fontWeight="700" fontSize="15" fill={C.slack}>Slack Workspace</text>
        <text x="125" y="96" textAnchor="middle" fontFamily={f} fontSize="12.5" fill={t}>User sends a message</text>
        <text x="125" y="114" textAnchor="middle" fontFamily={f} fontSize="12.5" fill={t}>in #ux-requests</text>
        <text x="125" y="146" textAnchor="middle" fontFamily={f} fontSize="12.5" fill={t}>Bot posts response back</text>
        <text x="125" y="180" textAnchor="middle" fontFamily={f} fontWeight="600" fontSize="12" fill={t}>OAuth 2.0 + SSO in production</text>
        <line x1="235" y1="92" x2="338" y2="92" stroke={C.slack} strokeWidth="2" /><polygon points="338,87 348,92 338,97" fill={C.slack} />
        <text x="287" y="84" textAnchor="middle" fontFamily={f} fontWeight="600" fontSize="12" fill={C.slack}>query in</text>
        <line x1="338" y1="142" x2="235" y2="142" stroke={C.slack} strokeWidth="2" strokeDasharray="5 3" /><polygon points="235,137 225,142 235,147" fill={C.slack} />
        <text x="287" y="162" textAnchor="middle" fontFamily={f} fontWeight="600" fontSize="12" fill={C.slack}>answer out</text>
        <rect x="350" y="18" width="250" height="210" rx="10" fill="#FAFAF8" stroke={C.border} strokeWidth="2" />
        <text x="475" y="48" textAnchor="middle" fontFamily={f} fontWeight="800" fontSize="16" fill={h}>Node.js Script</text>
        <line x1="375" y1="58" x2="575" y2="58" stroke={C.borderLight} strokeWidth="1" />
        {["Express server","Socket Mode listener","Route handler","Response formatter"].map((tx,i)=><text key={i} x="475" y={82+i*18} textAnchor="middle" fontFamily={f} fontSize="12.5" fill={t}>{tx}</text>)}
        <line x1="375" y1="148" x2="575" y2="148" stroke={C.borderLight} strokeWidth="1" />
        <text x="475" y="170" textAnchor="middle" fontFamily={f} fontWeight="600" fontSize="12.5" fill={t}>Stateless — no database, no cache</text>
        <text x="475" y="190" textAnchor="middle" fontFamily={f} fontWeight="600" fontSize="12.5" fill={t}>Each query is independent</text>
        <rect x="410" y="238" width="130" height="26" rx="6" fill={C.githubBg} stroke={C.githubBorder} strokeWidth="1" />
        <text x="475" y="256" textAnchor="middle" fontFamily={fs.mono} fontWeight="600" fontSize="10" fill={C.github}>HOSTED ON RENDER</text>
        <text x="475" y="280" textAnchor="middle" fontFamily={f} fontWeight="600" fontSize="12.5" fill={t}>Internal hosting at RAA in production</text>
        {[
          { label: "Slack API", sub: "Bolt SDK + Web API", auth: "Bot token — scoped to specific channels only", y: 5, color: C.slack },
          { label: "Anthropic API", sub: "Claude generates responses", auth: "API key — data is not used for training", y: 80, color: C.claude },
          { label: "Figma API", sub: "Files, components, FigJam boards", auth: "Access token — read-only to specific files", y: 155, color: C.figma },
          { label: "GitHub API", sub: "Repos, code, JSON data files", auth: "Access token — read-only to specific repos", y: 230, color: C.github },
        ].map((api,i)=>{const fX=600,fY=65+i*34,tX=700,tY=api.y+26;return(<g key={i}><path d={`M${fX},${fY} C${fX+40},${fY} ${tX-40},${tY} ${tX},${tY}`} fill="none" stroke={api.color} strokeWidth="1.5" opacity="0.5" /><polygon points={`${tX},${tY-4} ${tX+7},${tY} ${tX},${tY+4}`} fill={api.color} opacity="0.7" /><rect x="703" y={api.y} width="280" height="62" rx="8" fill={C.white} stroke={api.color} strokeWidth="1.5" /><text x="722" y={api.y+20} fontFamily={f} fontWeight="700" fontSize="14" fill={api.color}>{api.label}</text><text x="722" y={api.y+37} fontFamily={f} fontSize="12.5" fill={t}>{api.sub}</text><text x="722" y={api.y+53} fontFamily={f} fontSize="12" fill={t}>{api.auth}</text></g>);})}
        <text x="15" y="330" fontFamily={f} fontWeight="600" fontSize="13" fill={t}>Data flow: Query from Slack → Script calls relevant APIs → Results sent to Claude → Structured response posted back to Slack</text>
      </svg>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: fs.sans, background: C.bg, minHeight: "100vh", color: C.text, overflowX: "auto" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ padding: "32px 40px 24px", borderBottom: `2px solid ${C.borderLight}`, position: "sticky", left: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: C.claude, fontFamily: fs.mono, marginBottom: 8 }}>EXD AI Orchestration · Case Study</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: C.heading, marginBottom: 8, lineHeight: 1.25, maxWidth: 800 }}>How Claude connects to the design ecosystem — what I tested and how it works</div>
        <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.6, maxWidth: 750, marginBottom: 10 }}>Each section below is a workflow I set up and tested end to end. Every link goes to something real and deployed.</div>
        <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, maxWidth: 750, background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "12px 16px" }}><b>Free vs Enterprise:</b> All connections below work identically on the free/Pro version. The enterprise version adds a governance and audit layer — data controls, admin management, usage logging, and SSO. The functionality and MCP connections are the same.</div>
      </div>
      <div style={{ padding: "0 40px", minWidth: "max-content" }}>

        {/* 1 */}
        <Section>
          <SectionHead number="1" title="Setting up the connections" subtitle="Claude Pro with MCP connectors — connected to the free versions of the tools we already use" />
          <Flow>
            <NodeWithNote nodeProps={{ label: "Claude", sub: "Orchestration layer", color: C.claude, bg: C.claudeBg, border: C.claudeBorder, icon: "●" }} note="All tools below connected via MCP. No special scripts — log in, click connect, authorise your account." />
            <Arrow color={C.claude} />
            <NL nodeProps={{ label: "Figma Design System", sub: "Read + write component library, tokens, variables", color: C.figma, bg: C.figmaBg, border: C.figmaBorder, icon: "◆", status: "live" }} linkLabel="Demo Design System" linkUrl="https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/Demo-Design-System" />
            <Arrow color={C.figma} />
            <NL nodeProps={{ label: "Figma Product", sub: "Read + write product screens, pages, flows", color: C.figma, bg: C.figmaBg, border: C.figmaBorder, icon: "◆", status: "live" }} linkLabel="Demo Product File" linkUrl="https://www.figma.com/design/cXocOMh9TE9ILgfaayfihI/Demo-Product" />
            <Arrow color={C.github} />
            <NL nodeProps={{ label: "GitHub", sub: "Create repos, push code, deploy to GitHub Pages", color: C.github, bg: C.githubBg, border: C.githubBorder, icon: "⬡", status: "live" }} linkLabel="Product Repo" linkUrl="https://github.com/asmithdigital/journey-management-site" />
            <Arrow color={C.slack} />
            <NL nodeProps={{ label: "Slack", sub: "Push updates and notifications to Slack channels", color: C.slack, bg: C.slackBg, border: C.slackBorder, icon: "◈", status: "live" }} linkLabel="Test Slack Channel" linkUrl="https://uxaiexperiment.slack.com/" />
            <Arrow color={C.chrome} />
            <NL nodeProps={{ label: "Chrome", sub: "Scan live production site, capture current state", color: C.chrome, bg: C.chromeBg, border: C.chromeBorder, icon: "◉", status: "live" }} />
            <Arrow color={C.figjam} />
            <NL nodeProps={{ label: "FigJam", sub: "Read workshop boards, extract journey data", color: C.figjam, bg: C.figjamBg, border: C.figjamBorder, icon: "◇", status: "paid plan req." }} linkLabel="Demo FigJam Ideation" linkUrl="https://www.figma.com/board/rXUgEP8wuPEumdSNWEZKI5/Demo-Journey-Maps" />
            <Arrow color={C.miro} />
            <NL nodeProps={{ label: "Miro", sub: "Read collaborative boards, service blueprints", color: C.miro, bg: C.miroBg, border: C.miroBorder, icon: "△", status: "paid plan req." }} />
          </Flow>
        </Section>

        {/* 2 */}
        <Section>
          <SectionHead number="2" title="The Slack bot" subtitle="A standalone application — anyone can query the entire design ecosystem from Slack" />
          <Flow>
            <NodeWithNote nodeProps={{ label: "Bot script", sub: "Node.js with Socket Mode", color: C.slack, bg: C.slackBg, border: C.slackBorder, icon: "{ }" }} note="Anthropic API connected, Figma API connected, GitHub API connected, FigJam API connected — all within the script." />
            <Arrow color={C.slack} />
            <NodeWithNote nodeProps={{ label: "Hosted on Render", sub: "Free tier — keeps the bot running", color: C.slack, bg: C.slackBg, border: C.slackBorder, icon: "▲" }} note="Would need to be hosted internally in production." />
            <Arrow color={C.slack} />
            <NodeWithNote nodeProps={{ label: "Listens in Slack", sub: "Connected via Socket Mode", color: C.slack, bg: C.slackBg, border: C.slackBorder, icon: "◈" }} linkLabel="Test Slack Channel" linkUrl="https://uxaiexperiment.slack.com/" note="Slack app configured with bot token scopes — channels:history, chat:write, app_mentions." />
            <Arrow color={C.slack} />
            <PromptWithExample promptProps={{ label: "Someone asks a question", sub: "Natural language — no special syntax needed" }}>
              <span>"<b>What components exist for the payments page?</b> And <b>what do we know about drop-off</b> in the quote-to-buy journey?"</span>
              <br /><br />
              <span>"What are the current <CT>disclosure copy</CT> requirements for the home insurance quote page and do we have <CT>legal content approvals</CT> in place?"</span>
              <br /><br />
              <span>"What <BA>acceptance criteria</BA> were defined for the cancellation flow and what <BA>regulatory requirements</BA> apply to policy changes?"</span>
            </PromptWithExample>
            <Arrow color={C.claude} length={44} />
            <Stack nodes={[
              { label: "Search: Figma files", sub: "Components, screens, decisions", color: C.figma, bg: C.figmaBg, border: C.figmaBorder, icon: "◆" },
              { label: "Search: FigJam boards", sub: "Workshop data, ideation boards", color: C.figjam, bg: C.figjamBg, border: C.figjamBorder, icon: "◇" },
              { label: "Search: GitHub repos", sub: "Product code, deployed apps", color: C.github, bg: C.githubBg, border: C.githubBorder, icon: "⬡" },
              { label: "Search: Design system JSON", sub: "Component data, tokens, specs", color: C.figma, bg: C.figmaBg, border: C.figmaBorder, icon: "◆" },
              { label: "Search: Journey mgmt JSON", sub: "Journeys, pain points, insights, personas", color: C.figjam, bg: C.figjamBg, border: C.figjamBorder, icon: "◇" },
            ]} />
            <Arrow color={C.claude} length={44} />
            <NodeWithNote nodeProps={{ label: "Claude synthesises", sub: "Combines all results into one answer", color: C.claude, bg: C.claudeBg, border: C.claudeBorder, icon: "●" }} note="The script sends query + API results to Claude via Anthropic API. Claude generates the response, script posts it back to Slack." />
            <Arrow color={C.output} />
            <Node label="Answer in Slack" sub="Formatted response in the channel" color={C.output} bg={C.outputBg} border={C.outputBorder} icon="✓" />
          </Flow>
          <SlackBotArchDiagram />
        </Section>

        {/* 3 */}
        <Section>
          <SectionHead number="3" title="Product design" subtitle="UX / EXD team — designing with full context of the design system and live experience" />
          <Flow>
            <PromptWithExample promptProps={{ label: "You prompt Claude", sub: "Describe the brief — what to design, what problem to solve" }}>
              <span>"<b>Scan the live cancel policy flow</b>, review our design system, and <b>generate three concept directions</b> that improve the current experience."</span>
              <br /><br />
              <span>"Generate three <CT>content</CT> options for the cancellation confirmation screen using our <CT>tone of voice</CT> guidelines and check for <BA>regulatory requirements</BA> around <CT>disclosure copy</CT>."</span>
            </PromptWithExample>
            <Arrow color={C.claude} />
            <Node label="Claude reads Design System" sub="Components, tokens, patterns, constraints" color={C.figma} bg={C.figmaBg} border={C.figmaBorder} icon="◆" />
            <Arrow color={C.chrome} />
            <Node label="Chrome scans live site" sub="Current state of the experience" color={C.chrome} bg={C.chromeBg} border={C.chromeBorder} icon="◉" />
            <Arrow color={C.claude} />
            <Node label="Scans research & journeys" sub="FigJam, journey maps, persona data" color={C.claude} bg={C.claudeBg} border={C.claudeBorder} icon="●" />
            <Arrow color={C.claude} />
            <Node label="Generates concepts" sub="Ideation, layouts, screens using real tokens" color={C.claude} bg={C.claudeBg} border={C.claudeBorder} icon="●" badge={{ text: "Claude output", bg: C.claudeBg, border: C.claudeBorder, color: C.claude }} />
            <Arrow color={C.figma} />
            <NL nodeProps={{ label: "Writes to Figma Product", sub: "Screens pushed into Figma via MCP — fully editable", color: C.figma, bg: C.figmaBg, border: C.figmaBorder, icon: "◆" }} linkLabel="Demo Product File" linkUrl="https://www.figma.com/design/cXocOMh9TE9ILgfaayfihI/Demo-Product" />
          </Flow>
        </Section>

        {/* 4 */}
        <Section>
          <SectionHead number="4" title="Prototype development" subtitle="Generate interactive prototypes and an AB test plan from the design work" />
          <Flow>
            <Node label="Designs ready in Figma" sub="Screens completed from the design process" color={C.figma} bg={C.figmaBg} border={C.figmaBorder} icon="◆" />
            <Arrow color={C.claude} />
            <PromptWithExample promptProps={{ label: "You prompt Claude", sub: "Ask for interactive prototypes and a test plan" }}>
              <span>"<b>Generate two interactive prototypes</b> — one with the progress bar, one without. Then <b>create an AB test plan</b> with hypotheses and success metrics."</span>
              <br /><br />
              <span>"Generate a prototype of the updated quote page with the new <CT>legal disclosure copy</CT> and check it against the <BA>acceptance criteria</BA> from the <BA>user stories</BA>."</span>
            </PromptWithExample>
            <Arrow color={C.chrome} />
            <Node label="Chrome generates prototypes" sub="Scans existing site, overlays new design" color={C.chrome} bg={C.chromeBg} border={C.chromeBorder} icon="◉" />
            <Arrow color={C.claude} />
            <Node label="Claude generates test plan" sub="Hypotheses, metrics, success criteria" color={C.claude} bg={C.claudeBg} border={C.claudeBorder} icon="●" badge={{ text: "Claude output", bg: C.claudeBg, border: C.claudeBorder, color: C.claude }} />
            <Arrow color={C.green} />
            <Stack nodes={[
              { label: "Prototype A", sub: "With progress bar — variant", color: C.output, bg: C.outputBg, border: C.outputBorder, icon: "✓", linkLabel: "Open Prototype A", linkUrl: "https://claude.ai/public/artifacts/397bccba-adb2-44fe-beb6-6c2789cb1429" },
              { label: "Prototype B", sub: "Control — no progress bar", color: C.output, bg: C.outputBg, border: C.outputBorder, icon: "✓", linkLabel: "Open Prototype B", linkUrl: "https://claude.ai/public/artifacts/73271cac-fcb6-4712-a4fa-428d3a9d4cf6" },
              { label: "AB Test Plan", sub: "Structured plan with hypotheses", color: C.output, bg: C.outputBg, border: C.outputBorder, icon: "✓", linkLabel: "Open Test Plan", linkUrl: "https://claude.ai/public/artifacts/a1455420-e9b1-4a2a-b00c-6580ec87c99a" },
            ]} />
          </Flow>
        </Section>

        {/* 5 */}
        <Section>
          <SectionHead number="5" title="User testing & research" subtitle="Test the prototypes, import findings, push insights back into the system" />
          <Flow>
            <Node label="Prototypes ready" sub="From prototype development above" color={C.output} bg={C.outputBg} border={C.outputBorder} icon="✓" />
            <Arrow color={C.teal} />
            <NL nodeProps={{ label: "Claude generates test plan", sub: "Tasks, scenarios, script, success criteria", color: C.claude, bg: C.claudeBg, border: C.claudeBorder, icon: "●" }} linkLabel="View Test Plan" linkUrl="https://claude.ai/public/artifacts/a1455420-e9b1-4a2a-b00c-6580ec87c99a" />
            <Arrow color={C.teal} />
            <Node label="Run user testing" sub="Moderated sessions, unmoderated via tools" color={C.teal} bg={C.tealBg} border={C.tealBorder} icon="◎" />
            <Arrow color={C.teal} />
            <PromptWithExample promptProps={{ label: "Import data to Claude", sub: "Paste session notes, transcripts, observations" }}>
              <span>"Here are notes from <b>6 user testing sessions</b>. <b>Synthesise findings</b>, identify patterns, recommend design changes, and <b>structure insights for our journey map</b>."</span>
            </PromptWithExample>
            <Arrow color={C.claude} length={44} />
            <Stack width={W} nodes={[
              { label: "→ FigJam ideation boards", sub: "Findings structured into themes for team workshop", color: C.figjam, bg: C.figjamBg, border: C.figjamBorder, icon: "◇", linkLabel: "Demo FigJam Ideation", linkUrl: "https://www.figma.com/board/rXUgEP8wuPEumdSNWEZKI5/Demo-Journey-Maps" },
              { label: "→ Design iterations", sub: "Loops back to row 3 with change recommendations", color: C.figma, bg: C.figmaBg, border: C.figmaBorder, icon: "◆" },
              { label: "→ Journey map updates", sub: "Automated via TheyDo API in the real world — includes persona data", color: C.figjam, bg: C.figjamBg, border: C.figjamBorder, icon: "◇", linkLabel: "Demo Journey Platform", linkUrl: "https://asmithdigital.github.io/journey-management-site/" },
            ]} />
          </Flow>
        </Section>

        {/* 6 */}
        <Section>
          <SectionHead number="6" title="Design system maintenance" subtitle="After iteration — update the Figma design system before handing to delivery" />
          <Flow>
            <Node label="Iterations complete" sub="Product screens updated from research" color={C.output} bg={C.outputBg} border={C.outputBorder} icon="✓" />
            <Arrow color={C.figma} />
            <PromptWithExample promptProps={{ label: "You prompt Claude", sub: "Ask Claude to scan the design system for changes" }}>
              <span>"<b>Scan the design system</b> and compare against the product file. <b>Identify new components</b>. Check <CT>content patterns</CT> and <CT>tone of voice</CT>. <b>Flag accessibility issues</b>."</span>
            </PromptWithExample>
            <Arrow color={C.figma} />
            <NL nodeProps={{ label: "Claude reads Design System", sub: "What's new, what's changed, what's missing", color: C.figma, bg: C.figmaBg, border: C.figmaBorder, icon: "◆" }} linkLabel="Demo Design System" linkUrl="https://www.figma.com/design/tQfz0FFYX9zCy5bheWi8N5/Demo-Design-System" />
            <Arrow color={C.claude} />
            <Stack nodes={[
              { label: "New components", sub: "Patterns created during design", color: C.figma, bg: C.figmaBg, border: C.figmaBorder },
              { label: "Token updates", sub: "Colour, spacing, typography changes", color: C.figma, bg: C.figmaBg, border: C.figmaBorder },
              { label: "Content patterns", sub: "Error messages, microcopy, tone of voice", color: C.figma, bg: C.figmaBg, border: C.figmaBorder },
              { label: "Accessibility gaps", sub: "WCAG, contrast, screen reader", color: C.figjam, bg: C.figjamBg, border: C.figjamBorder },
            ]} />
            <Arrow color={C.figma} />
            <Node label="Updates Figma library" sub="Written into the design system via MCP" color={C.figma} bg={C.figmaBg} border={C.figmaBorder} icon="◆" badge={{ text: "Claude output", bg: C.claudeBg, border: C.claudeBorder, color: C.claude }} />
          </Flow>
        </Section>

        {/* 7 */}
        <Section>
          <SectionHead number="7" title="Code — product delivery" subtitle="Development team — Claude Code reads Figma specs, generates code, opens a merge request" />
          <Flow>
            <NodeWithNote nodeProps={{ label: "Specs from Figma", sub: "Design complete — specs, interactions, acceptance criteria", color: C.figma, bg: C.figmaBg, border: C.figmaBorder, icon: "◆" }} note="Same MCP connections from row 1 — Claude Code reads Figma directly, no export needed." />
            <Arrow color={C.github} />
            <PromptWithExample promptProps={{ label: "Developer prompts Claude Code", sub: "In the terminal — connected to the codebase and Figma" }}>
              <span>"<b>Read the Figma file</b> for this feature. Generate React components using our <b>design system tokens</b>. Write tests. <b>Commit and open a merge request</b>."</span>
            </PromptWithExample>
            <Arrow color={C.github} />
            <Node label="Generates production code" sub="React components, logic, real tokens" color={C.claude} bg={C.claudeBg} border={C.claudeBorder} icon="●" badge={{ text: "Claude output", bg: C.claudeBg, border: C.claudeBorder, color: C.claude }} />
            <Arrow color={C.github} />
            <Node label="Pushes to product repo" sub="Commits and opens a merge request" color={C.github} bg={C.githubBg} border={C.githubBorder} icon="⬡" />
            <Arrow color={C.green} />
            <NL nodeProps={{ label: "Deployed to production", sub: "Developer reviews MR, merges, CI/CD deploys", color: C.output, bg: C.outputBg, border: C.outputBorder, icon: "✓" }} linkLabel="Demo Live Product" linkUrl="https://asmithdigital.github.io/ux-workflow-outputs/" />
          </Flow>
        </Section>

        {/* 8 */}
        <Section>
          <SectionHead number="8" title="Code — design system platform" subtitle="Push design system updates from Figma into the documentation platform" />
          <Flow>
            <PromptWithExample promptProps={{ label: "Prompt Claude Code", sub: "Check Figma design system for new components, iterations, token updates" }}>
              <span>"<b>Check the Figma design system</b> for any new components, updated tokens, or iterations. <b>Update the JSON</b> and redeploy."</span>
            </PromptWithExample>
            <Arrow color={C.github} />
            <Node label="Claude Code updates JSON" sub="Writes component data, tokens, specs to the repo" color={C.github} bg={C.githubBg} border={C.githubBorder} icon=">" badge={{ text: "Claude output", bg: C.claudeBg, border: C.claudeBorder, color: C.claude }} />
            <Arrow color={C.github} />
            <NL nodeProps={{ label: "Application rebuilds", sub: "New data visible immediately", color: C.green, bg: C.greenBg, border: C.greenBorder, icon: "⟳" }} linkLabel="Open Design System Demo" linkUrl="https://asmithdigital.github.io/design-system-site/" />
            <Arrow color={C.slack} />
            <Node label="Queryable by Slack bot" sub="Updated data searchable in Slack" color={C.slack} bg={C.slackBg} border={C.slackBorder} icon="◈" />
          </Flow>
          <div style={{ height: 24 }} />
          <StickyNote wide>When ZeroHeight is in place, this will work differently — ZeroHeight syncs with Figma directly. This demo shows how we can push from code into a system by reading the Figma file through MCP.</StickyNote>
        </Section>

        {/* 9 */}
        <div style={{ padding: "100px 0" }}>
          <SectionHead number="9" title="Code — journey management platform" subtitle="Push research findings and journey data into the journey management platform" />
          <Flow>
            <PromptWithExample promptProps={{ label: "Designer generates prompt", sub: "From all research work — extracts journey data as structured output", badge: { text: "Designer / Researcher" } }}>
              <span>"<b>Take all the research findings</b>. Structure into journey stages, pain points, insights, personas, and opportunities."</span>
            </PromptWithExample>
            <Arrow color={C.claude} />
            <Node label="Claude structures data" sub="Formatted for the platform" color={C.claude} bg={C.claudeBg} border={C.claudeBorder} icon="●" badge={{ text: "Claude output", bg: C.claudeBg, border: C.claudeBorder, color: C.claude }} />
            <Arrow color={C.github} />
            <PromptNode label="Developer takes prompt" sub="Runs it in Claude Code to update the platform" badge={{ text: "Developer", bg: C.githubBg, border: C.githubBorder, color: C.github }} />
            <Arrow color={C.github} />
            <Node label="Claude Code updates JSON" sub="Writes journey data to the repo" color={C.github} bg={C.githubBg} border={C.githubBorder} icon=">" badge={{ text: "Claude output", bg: C.claudeBg, border: C.claudeBorder, color: C.claude }} />
            <Arrow color={C.github} />
            <NL nodeProps={{ label: "Application rebuilds", sub: "Journey maps updated immediately", color: C.green, bg: C.greenBg, border: C.greenBorder, icon: "⟳" }} linkLabel="Open Journey Platform Demo" linkUrl="https://asmithdigital.github.io/journey-management-site/" />
            <Arrow color={C.slack} />
            <Node label="Queryable by Slack bot" sub="Journey data searchable in Slack" color={C.slack} bg={C.slackBg} border={C.slackBorder} icon="◈" />
          </Flow>
          <div style={{ height: 24 }} />
          <StickyNote wide>TheyDo may have APIs or MCP connections that let the designer push this directly without Claude Code. We don't know yet — this demo simulates that flow.</StickyNote>
        </div>
      </div>

      <div style={{ padding: "20px 40px", borderTop: `2px solid ${C.borderLight}`, fontSize: 12, color: C.textLight, fontFamily: fs.mono, display: "flex", justifyContent: "space-between", position: "sticky", left: 0 }}>
        <span>EXD AI Orchestration · Andrew Smith · May 2026</span>
        <span>All links go to real, deployed outputs</span>
      </div>
    </div>
  );
}
