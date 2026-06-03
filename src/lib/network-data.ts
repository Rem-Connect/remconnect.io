import type { NetworkAgent, HistoryRow, NetworkIncident, IspStats, ShiftSession, TestLogRow } from '@/types/network';
import type { SampleAgent } from '@/types/admin';
import { mulberry32 } from './network-utils';
import { getAgentPhoto } from './agent-photo';
import { SAMPLE_AGENTS } from './admin-data';

export const TEAMS     = ['Customer Support', 'Technical Support', 'Sales', 'Back Office', 'QA'];
export const LOCATIONS = ['Addis Ababa', 'Nairobi', 'Lagos', 'Accra', 'Kampala', 'Dar es Salaam'];
export const ISPS      = ['Ethio Telecom', 'Safaricom', 'MTN Nigeria', 'AirtelTigo', 'Airtel Uganda', 'TTCL'];
export const SHIFTS    = ['06:00–14:00', '14:00–22:00', '22:00–06:00'];

const NAMES = [
  'Meklit Demissie','Dawit Tadesse','Selam Haile','Yonas Tesfaye','Tigist Alemu',
  'Biruk Mengistu','Hana Girma','Eyob Bekele','Meron Assefa','Abel Kebede',
  'Sara Mulugeta','Natnael Wolde','Lidya Ayele','Henok Asfaw','Bethlehem Tsegay',
  'Kiros Tesfai','Amanuel Hailu','Mimi Gebru','Tekeste Araya','Elsa Rezene',
];

// Healthy-skewed connection metrics. critP / warnP gate how often an agent degrades —
// defaults keep ~84% of agents healthy; pass lower values for an even cleaner population.
function genConnMetrics(rand: () => number, critP = 0.05, warnP = 0.16) {
  const roll = rand();
  let download: number, upload: number, latency: number, loss: number;
  if (roll < critP) {                 // rare critical
    download = 8 + rand() * 6;
    upload   = 3 + rand() * 5;
    latency  = 360 + Math.floor(rand() * 180);
    loss     = 2.1 + rand() * 1.4;
  } else if (roll < warnP) {          // occasional warning
    download = 16 + rand() * 8;
    upload   = 10 + rand() * 4;
    latency  = 150 + Math.floor(rand() * 120);
    loss     = 0.6 + rand() * 0.9;
  } else {                            // healthy — the common case
    download = 32 + rand() * 68;
    upload   = 16 + rand() * 28;
    latency  = 40 + Math.floor(rand() * 55);
    loss     = rand() < 0.7 ? 0 : Math.round(rand() * 0.3 * 100) / 100;
  }
  // Size the plan comfortably above usage so capacity bars read ~30–55% (healthy), not saturated.
  const planDown = [50, 100, 200].find(p => p >= download * 1.6) ?? 200;
  const planUp   = [25, 50, 100].find(p => p >= upload * 1.6)   ?? 100;
  let status: NetworkAgent['status'] = 'healthy';
  if (download < 15 || latency > 400 || loss > 2) status = 'critical';
  else if (download < 25 || latency > 150 || loss > 0.5) status = 'warning';
  return {
    download:    Math.round(download * 10) / 10,
    upload:      Math.round(upload * 10) / 10,
    latency,
    loss:        Math.round(loss * 100) / 100,
    jitter:      Math.floor(rand() * 18),
    planDown,
    planUp,
    ispCapacity: Math.round((download / planDown) * 100),
    status,
  };
}

function makeAgent(i: number): NetworkAgent {
  const rand   = mulberry32(i * 7 + 13);
  const ispIdx = Math.floor(rand() * ISPS.length);
  const m      = genConnMetrics(rand);

  const spark = (base: number, amp: number, n = 24) =>
    Array.from({ length: n }, (_, k) => Math.max(0, base + Math.sin(k / 3) * amp + (mulberry32(i * k + 99)() - 0.5) * amp));

  const id = `AGENT-${String(i + 1).padStart(3, '0')}`;
  return {
    id,
    name:        NAMES[i % NAMES.length],
    team:        TEAMS[Math.floor(rand() * TEAMS.length)],
    location:    LOCATIONS[ispIdx % LOCATIONS.length],
    isp:         ISPS[ispIdx],
    ip:          `196.${Math.floor(rand() * 255)}.${Math.floor(rand() * 255)}.${Math.floor(rand() * 255)}`,
    vpn:         rand() > 0.85,
    areaMaxDown: m.planDown,
    areaMaxUp:   m.planUp,
    ispCapacity: m.ispCapacity,
    planDown:    m.planDown,
    planUp:      m.planUp,
    download:    m.download,
    upload:      m.upload,
    latency:     m.latency,
    loss:        m.loss,
    jitter:      m.jitter,
    status:      m.status,
    lastSeen:    Math.floor(rand() * 15),
    sparkDown:   spark(m.download, 8),
    sparkUp:     spark(m.upload, 3),
    sparkLatency:spark(m.latency, 40),
    shift:       SHIFTS[Math.floor(rand() * SHIFTS.length)],
    online:      rand() > 0.1,
    avatar:      getAgentPhoto(id, 96),
  };
}

const REAL_AGENTS: NetworkAgent[] = [
  {
    id: 'AD-3001', name: 'Bezawit Berhanu', team: 'Sales', location: 'Addis Ababa',
    isp: 'Ethio Telecom', ip: '196.188.120.44', vpn: false,
    areaMaxDown: 100, areaMaxUp: 50, ispCapacity: 49, planDown: 100, planUp: 50,
    download: 48.6, upload: 22.4, latency: 44, loss: 0.0, jitter: 5,
    status: 'healthy', lastSeen: 2, online: true,
    sparkDown: Array.from({ length: 24 }, (_, i) => 48.6 + Math.sin(i / 3) * 3),
    sparkUp: Array.from({ length: 24 }, (_, i) => 22.4 + Math.sin(i / 4) * 1.5),
    sparkLatency: Array.from({ length: 24 }, (_, i) => 44 + Math.sin(i / 2) * 6),
    shift: '14:00–22:00', avatar: '/agents/bezawit-berhanu.png',
  },
  {
    id: 'AD-3002', name: 'Nahom Dereje', team: 'Sales', location: 'Addis Ababa',
    isp: 'Ethio Telecom', ip: '196.188.100.21', vpn: false,
    areaMaxDown: 100, areaMaxUp: 50, ispCapacity: 55, planDown: 100, planUp: 50,
    download: 55.2, upload: 27.0, latency: 52, loss: 0.0, jitter: 7,
    status: 'healthy', lastSeen: 1, online: true,
    sparkDown: Array.from({ length: 24 }, (_, i) => 55.2 + Math.sin(i / 3.5) * 4),
    sparkUp: Array.from({ length: 24 }, (_, i) => 27 + Math.sin(i / 4) * 1.8),
    sparkLatency: Array.from({ length: 24 }, (_, i) => 52 + Math.sin(i / 2.5) * 8),
    shift: '22:00–06:00', avatar: '/agents/nahom-dereje.jpg',
  },
  {
    id: 'AD-3003', name: 'Ermias Lemma', team: 'Sales', location: 'Addis Ababa',
    isp: 'Ethio Telecom', ip: '196.188.77.110', vpn: false,
    areaMaxDown: 200, areaMaxUp: 100, ispCapacity: 46, planDown: 200, planUp: 100,
    download: 92.4, upload: 41.0, latency: 38, loss: 0.0, jitter: 6,
    status: 'healthy', lastSeen: 0, online: true,
    sparkDown: Array.from({ length: 24 }, (_, i) => 92.4 + Math.sin(i / 3) * 6),
    sparkUp: Array.from({ length: 24 }, (_, i) => 41 + Math.sin(i / 3) * 2.5),
    sparkLatency: Array.from({ length: 24 }, (_, i) => 38 + Math.sin(i / 2) * 5),
    shift: '22:00–06:00', avatar: '/agents/ermias-lemma.png',
  },
  {
    id: 'AD-3004', name: 'Tensae Wubeshet', team: 'Sales', location: 'Addis Ababa',
    isp: 'Ethio Telecom', ip: '196.188.93.55', vpn: false,
    areaMaxDown: 100, areaMaxUp: 50, ispCapacity: 45, planDown: 100, planUp: 50,
    download: 44.8, upload: 19.6, latency: 64, loss: 0.0, jitter: 9,
    status: 'healthy', lastSeen: 3, online: true,
    sparkDown: Array.from({ length: 24 }, (_, i) => 44.8 + Math.sin(i / 4) * 3),
    sparkUp: Array.from({ length: 24 }, (_, i) => 19.6 + Math.sin(i / 3) * 1.4),
    sparkLatency: Array.from({ length: 24 }, (_, i) => 64 + Math.sin(i / 2) * 9),
    shift: '14:00–22:00', avatar: '/agents/tensae-wubeshet.jpg',
  },
];

// Stable numeric seed from an agent id (e.g. "AD-3005") so generated metrics are deterministic.
function seedFromId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

// Derive a network-monitor record from a directory agent so /network/agents stays in
// sync with the agents directory. Connection metrics are deterministic per id; identity
// (id, name, photo) comes straight from the directory.
function makeRealAgentNet(src: SampleAgent): NetworkAgent {
  const seed = seedFromId(src.id);
  const rand = mulberry32(seed + 5);
  // Featured directory agents: no criticals, only the occasional warning.
  const m = genConnMetrics(rand, 0, 0.12);

  const spark = (base: number, amp: number, n = 24) =>
    Array.from({ length: n }, (_, k) => Math.max(0, base + Math.sin(k / 3) * amp + (mulberry32(seed * (k + 1) + 99)() - 0.5) * amp));

  return {
    id:          src.id,
    name:        src.name,
    team:        'Sales',
    location:    'Addis Ababa',
    isp:         'Ethio Telecom',
    ip:          `196.188.${Math.floor(rand() * 255)}.${Math.floor(rand() * 255)}`,
    vpn:         rand() > 0.85,
    areaMaxDown: m.planDown,
    areaMaxUp:   m.planUp,
    ispCapacity: m.ispCapacity,
    planDown:    m.planDown,
    planUp:      m.planUp,
    download:    m.download,
    upload:      m.upload,
    latency:     m.latency,
    loss:        m.loss,
    jitter:      m.jitter,
    status:      m.status,
    lastSeen:    Math.floor(rand() * 12),
    sparkDown:   spark(m.download, 8),
    sparkUp:     spark(m.upload, 3),
    sparkLatency:spark(m.latency, 40),
    shift:       SHIFTS[Math.floor(rand() * SHIFTS.length)],
    online:      rand() > 0.12,
    avatar:      src.photo!,
  };
}

// Onboarded directory agents (deployed / bench / assessment — i.e. those with a real
// photo on file), excluding the four already hand-authored above.
const HARDCODED_IDS = new Set(REAL_AGENTS.map(a => a.id));
const DIRECTORY_NET_AGENTS: NetworkAgent[] = SAMPLE_AGENTS
  .filter(a => a.status !== 'recruit' && !HARDCODED_IDS.has(a.id) && (a.photo?.startsWith('/agents/') ?? false))
  .map(makeRealAgentNet);

export const NET_AGENTS: NetworkAgent[] = [
  ...REAL_AGENTS,
  ...DIRECTORY_NET_AGENTS,
  ...Array.from({ length: 20 }, (_, i) => makeAgent(i)),
];

export function genHistory(agentId: string): HistoryRow[] {
  const agent = NET_AGENTS.find(a => a.id === agentId) ?? NET_AGENTS[0];
  const seed  = agentId.charCodeAt(agentId.length - 1) + agentId.charCodeAt(0);
  const rand  = mulberry32(seed);
  const now   = Date.now();

  return Array.from({ length: 96 }, (_, i) => {
    const t    = new Date(now - (95 - i) * 15 * 60 * 1000);
    // Tight noise around the agent's own baseline so history mirrors its (mostly healthy) status.
    const dl   = Math.max(8, agent.download + Math.sin(i / 6) * 4 + (rand() - 0.5) * 6);
    const ul   = Math.max(2, agent.upload + (rand() - 0.5) * 3);
    const lat  = Math.max(20, agent.latency + Math.sin(i / 4) * 15 + (rand() - 0.5) * 25);
    const loss = rand() < 0.85 ? 0 : Math.round(rand() * 0.5 * 100) / 100;
    const jitter = Math.floor(rand() * 18);
    let status: HistoryRow['status'] = 'healthy';
    if (dl < 15 || lat > 400 || loss > 2) status = 'critical';
    else if (dl < 25 || lat > 150 || loss > 0.5) status = 'warning';
    return {
      time:     t,
      download: Math.round(dl * 10) / 10,
      upload:   Math.round(ul * 10) / 10,
      latency:  Math.round(lat),
      loss,
      jitter,
      status,
    };
  });
}

export function genShiftHistory(agentId: string, days: number): ShiftSession[] {
  const seed  = agentId.charCodeAt(0) * 31 + agentId.charCodeAt(agentId.length - 1);
  const rand  = mulberry32(seed);
  const agent = NET_AGENTS.find(a => a.id === agentId) ?? NET_AGENTS[0];
  const [shiftStart] = agent.shift.split('–');
  const [h, m] = shiftStart.split(':').map(Number);

  return Array.from({ length: days }, (_, i) => {
    const base = new Date();
    base.setDate(base.getDate() - i - 1);
    base.setHours(h, m, 0, 0);
    const clockIn   = new Date(base.getTime() + (rand() - 0.5) * 20 * 60000);
    const workedMs  = (7 + rand() * 1.5) * 3600000;
    const clockOut  = new Date(clockIn.getTime() + workedMs);
    const breakMin  = Math.floor(rand() * 60) + 20;
    const activeMs  = workedMs - breakMin * 60000;
    const dl        = Math.max(10, agent.download + (rand() - 0.5) * 10);
    return {
      date:     clockIn.toISOString().slice(0, 10),
      clockIn,
      clockOut,
      workedMs,
      breakMin,
      activeMs,
      tests:    Math.floor(rand() * 30) + 20,
      incidents:Math.floor(rand() * 3),
      avgDown:  Math.round(dl * 10) / 10,
      avgUp:    Math.round(agent.upload * (0.8 + rand() * 0.4) * 10) / 10,
      avgLat:   Math.round(agent.latency * (0.8 + rand() * 0.4)),
    };
  });
}

export const NET_INCIDENTS: NetworkIncident[] = [
  { id: 1,  agent: 'AGENT-004', type: 'critical', msg: 'Download below 5 Mbps for 12 min', time: '2 min ago' },
  { id: 2,  agent: 'AGENT-012', type: 'warning',  msg: 'Latency spike 412ms', time: '8 min ago' },
  { id: 3,  agent: 'AGENT-007', type: 'critical', msg: 'Complete disconnect · 5 min', time: '14 min ago' },
  { id: 4,  agent: 'AGENT-019', type: 'warning',  msg: 'Packet loss 1.8%', time: '21 min ago' },
  { id: 5,  agent: 'AGENT-003', type: 'resolved', msg: 'Upload restored to 12 Mbps', time: '35 min ago' },
  { id: 6,  agent: 'AGENT-016', type: 'critical', msg: 'Upload below 2 Mbps', time: '1h ago' },
  { id: 7,  agent: 'AGENT-009', type: 'warning',  msg: 'Jitter 42ms sustained', time: '2h ago' },
];

export function getIspStats(): IspStats[] {
  const grouped: Record<string, NetworkAgent[]> = {};
  NET_AGENTS.forEach(a => {
    grouped[a.isp] = grouped[a.isp] ?? [];
    grouped[a.isp].push(a);
  });
  return Object.entries(grouped).map(([name, agents], i) => {
    const healthyPct = Math.round((agents.filter(a => a.status === 'healthy').length / agents.length) * 100);
    return {
      name,
      agents:     agents.length,
      avgDown:    Math.round((agents.reduce((s, a) => s + a.download, 0) / agents.length) * 10) / 10,
      avgLatency: Math.round(agents.reduce((s, a) => s + a.latency, 0) / agents.length),
      healthyPct,
      uptime:     Math.round((95 + mulberry32(i * 7)() * 5) * 10) / 10,
      rank:       i + 1,
    };
  }).sort((a, b) => b.healthyPct - a.healthyPct).map((s, i) => ({ ...s, rank: i + 1 }));
}

export function buildTestLog(): TestLogRow[] {
  const rows: TestLogRow[] = [];
  const now = Date.now();
  NET_AGENTS.forEach((agent, ai) => {
    for (let day = 0; day < 14; day++) {
      for (let test = 0; test < 8; test++) {
        const rand = mulberry32(ai * 1000 + day * 10 + test);
        const ts   = now - day * 86400000 - test * 3600000 * 1.5;
        const dl   = Math.max(2, agent.download + (rand() - 0.5) * 10);
        const ul   = Math.max(0.5, agent.upload + (rand() - 0.5) * 4);
        const ping = Math.max(10, agent.latency * 0.6 + (rand() - 0.5) * 20);
        rows.push({
          id:        `T-${String(ai).padStart(2,'0')}-${day}-${test}`,
          agentId:   agent.id,
          agentName: agent.name,
          team:      agent.team,
          ts,
          download:  Math.round(dl * 10) / 10,
          upload:    Math.round(ul * 10) / 10,
          ping:      Math.round(ping),
          latency:   Math.round(ping * 1.1),
          jitter:    Math.floor(rand() * 35),
          ip:        agent.ip,
          isp:       agent.isp,
          vpn:       agent.vpn,
          type:      test === 0 ? 'manual' : 'automated',
          sessionId: `S-${agent.id}-${day}`,
        });
      }
    }
  });
  return rows.sort((a, b) => b.ts - a.ts);
}
