import { useState } from "react";

const SCHEDULE = [
  {
    day: "D1", date: "5/27(수)", color: "#4a6fa5", emoji: "🚌",
    items: [
      { time: "11:30~12:00", name: "오리엔테이션",                  place: "2F 메이플홀",                      type: "event"   },
      { time: "12:00~13:00", name: "돼지고기 김치찌개 반상",         place: "2F 그랑쉐프",                      type: "meal"    },
      { time: "13:00~15:30", name: "투심보고서 실무(1) — 바이오",    place: "한인수 대표 · 라플라스파트너스",    type: "lecture" },
      { time: "15:45~18:15", name: "투심보고서 실무(2) — ICT/유통", place: "장원열 이사 · 케이앤티파트너스",    type: "lecture" },
      { time: "18:30~19:00", name: "객실 키 배부 및 체크인",         place: "",                                 type: "alert"   },
      { time: "19:00~20:00", name: "우니 스테이키 덮밥",             place: "2F 그랑쉐프",                      type: "meal"    },
    ]
  },
  {
    day: "D2", date: "5/28(목)", color: "#8b5cf6", emoji: "📝",
    items: [
      { time: "07:30~09:00", name: "뷔페",                             place: "2F 그랑쉐프",                       type: "meal"    },
      { time: "09:00~11:30", name: "투심보고서 실무(3) — 문화콘텐츠", place: "김범석 부대표 · 스마트스터디벤처스", type: "lecture" },
      { time: "11:30~12:00", name: "투심보고서 주제 선정",             place: "각 조 팀장",                        type: "event"   },
      { time: "12:00~13:00", name: "비빔밥",                           place: "2F 그랑쉐프",                       type: "meal"    },
      { time: "13:00~19:00", name: "투심보고서 작성 멘토링",           place: "한인수 · 장원열 · 김범석",          type: "lecture" },
      { time: "19:00~20:00", name: "제육불고기",                       place: "2F 그랑쉐프",                       type: "meal"    },
      { time: "20:00~22:00", name: "보고서 작성 과제 자율 팀플",       place: "",                                  type: "event"   },
    ]
  },
  {
    day: "D3", date: "5/29(금)", color: "#10b981", emoji: "🏁",
    items: [
      { time: "07:30~08:30", name: "뷔페",                      place: "2F 그랑쉐프",                  type: "meal"    },
      { time: "08:30~09:00", name: "객실 키 반납 및 체크아웃",  place: "",                              type: "alert"   },
      { time: "09:00~12:00", name: "투심보고서 발표 및 피드백", place: "한인수 · 장원열 · 김범석",     type: "lecture" },
      { time: "12:00~13:00", name: "고등어구이 된장찌개 반상",  place: "2F 그랑쉐프",                  type: "meal"    },
      { time: "13:00",       name: "해산",                      place: "단체버스 14:00 숙소 정문 출발", type: "alert"   },
    ]
  }
];

const ROOMS = [
  { room: "306호", members: ["김윤성", "송승준"] },
  { room: "307호", members: ["안익균", "이종준"] },
  { room: "308호", members: ["조기성", "박명훈"] },
  { room: "309호", members: ["박찬우", "송주형"] },
  { room: "310호", members: ["오승현", "윤권상"] },
  { room: "311호", members: ["이동현", "구자경"] },
  { room: "312호", members: ["김영헌", "신지환"] },
  { room: "313호", members: ["안희선", "이기원"] },
  { room: "314호", members: ["임영상", "이준명"] },
  { room: "315호", members: ["이규훈", "이원종"] },
  { room: "316호", members: ["강병진", "백범진"] },
  { room: "317호", members: ["손혁준", "윤강연"] },
  { room: "318호", members: ["신종목", "김한빈"] },
  { room: "319호", members: ["신찬울", "유일웅"] },
  { room: "412호", members: ["이후영", "장성준"] },
  { room: "414호", members: ["김윤지", "김효지"] },
  { room: "415호", members: ["성효은", "김신아"] },
  { room: "416호", members: ["서소현", "김지민"] },
  { room: "417호", members: ["정서안", "정예람"] },
  { room: "419호", members: ["김누리", "노유미"] },
];

const TEAMS = [
  { team: "1팀", count: 7, color: "#4a6fa5", members: ["김윤성", "김윤지", "성효은", "송승준", "안익균", "이종준", "조기성"] },
  { team: "2팀", count: 7, color: "#8b5cf6", members: ["김효지", "박명훈", "박찬우", "송주형", "오승현", "윤권상", "이동현"] },
  { team: "3팀", count: 7, color: "#10b981", members: ["구자경", "김영헌", "서소현", "신지환", "안희선", "이기원", "임영상"] },
  { team: "4팀", count: 7, color: "#f59e0b", members: ["강병진", "김누리", "김신아", "김지민", "이규훈", "이원종", "이준명"] },
  { team: "5팀", count: 6, color: "#ef4444", members: ["노유미", "백범진", "손혁준", "신종목", "윤강연", "정서안"] },
  { team: "6팀", count: 6, color: "#06b6d4", members: ["김한빈", "신찬울", "유일웅", "이후영", "장성준", "정예람"] },
];

const MEAL_MENU = [
  { day: "D1", date: "5/27(수)", color: "#4a6fa5", meals: [
    { label: "점심", menu: "돼지고기 김치찌개 반상", place: "2F 그랑쉐프" },
    { label: "저녁", menu: "우니 스테이키 덮밥",     place: "2F 그랑쉐프" },
  ]},
  { day: "D2", date: "5/28(목)", color: "#8b5cf6", meals: [
    { label: "아침", menu: "뷔페",      place: "2F 그랑쉐프" },
    { label: "점심", menu: "비빔밥",    place: "2F 그랑쉐프" },
    { label: "저녁", menu: "제육불고기", place: "2F 그랑쉐프" },
  ]},
  { day: "D3", date: "5/29(금)", color: "#10b981", meals: [
    { label: "아침", menu: "뷔페",                   place: "2F 그랑쉐프" },
    { label: "점심", menu: "고등어구이 된장찌개 반상", place: "2F 그랑쉐프" },
  ]},
];

const NOTICES = [
  { icon: "🍽️", text: "식사는 워크숍 참가자 지정구역(2F, 그랑쉐프)에서 해주세요." },
  { icon: "🪪",  text: "교육생 명찰 목걸이는 식당 및 교육장 내에서 신분증 역할을 하므로 항상 착용해주세요. (미착용 시 외부인으로 구분되어 식사요금 개별 부과될 수 있어요)" },
  { icon: "🚌", text: "단체버스는 5/29(금) 14:00 숙소 정문 현관에서 출발합니다. 자율 탑승이며 출발 시간 내 미탑승 시 개별 귀가하셔야 합니다." },
  { icon: "📌", text: "상기 메뉴 및 교육일정·강사는 재료 수급·상황에 따라 변경될 수 있습니다." },
];

const TYPE_CONFIG = {
  meal:    { bg: "#0d1f0d", border: "#22c55e", dot: "#22c55e", icon: "🍽️" },
  lecture: { bg: "#0d0d1f", border: "#4a6fa5", dot: "#4a6fa5", icon: "📋" },
  event:   { bg: "#1a1700", border: "#f59e0b", dot: "#f59e0b", icon: "📌" },
  alert:   { bg: "#1f0d0d", border: "#ef4444", dot: "#ef4444", icon: "⚠️" },
};

const FACILITIES = [
  { name: "사우나",       loc: "콘도 1F",               hours: "일~목 6:00–20:00 / 금·토 6:00–21:00", tel: "033-260-2665", note: "영업종료 1시간 전 입장 마감", icon: "♨️",  cat: "wellness" },
  { name: "휘트니스 센터", loc: "콘도 1F",              hours: "일~목 6:00–20:00 / 금·토 6:00–21:00", tel: "033-260-2665", note: "영업종료 1시간 전 입장 마감", icon: "💪",  cat: "wellness" },
  { name: "힐링라운지",   loc: "콘도 1F",               hours: "24시",                                 tel: "033-260-2660", note: "",                           icon: "🛋️", cat: "wellness" },
  { name: "그랑쉐프",     loc: "콘도 2F 레스토랑",      hours: "업장 문의",                            tel: "033-260-2760", note: "Break Time 15:00–17:30",     icon: "🍽️", cat: "food"    },
  { name: "그랑그릴",     loc: "콘도 2F",               hours: "업장 문의",                            tel: "033-260-2764", note: "닭갈비·구이 전문점",         icon: "🔥",  cat: "food"    },
  { name: "아라비스타",   loc: "콘도 1F CAFE",          hours: "업장 문의",                            tel: "033-260-2763", note: "브런치 8:30–11:00",          icon: "☕",  cat: "food"    },
  { name: "GS25 편의점",  loc: "콘도 1F",               hours: "24시",                                 tel: "033-260-3446", note: "",                           icon: "🏪",  cat: "shop"    },
  { name: "인생네컷",     loc: "콘도 1F",               hours: "24시",                                 tel: "033-260-2660", note: "",                           icon: "📸",  cat: "shop"    },
  { name: "게임존",       loc: "콘도 1F",               hours: "일~목 9:00–21:00 / 금·토 9:00–21:30", tel: "033-260-2665", note: "",                           icon: "🎮",  cat: "leisure" },
  { name: "야외수영장",   loc: "콘도 1F",               hours: "하계 시즌 운영",                       tel: "033-260-2857", note: "업장 문의",                  icon: "🏊",  cat: "leisure" },
  { name: "골프 연습장",  loc: "리조트 입구–콘도 사이", hours: "업장 문의",                            tel: "033-260-2992", note: "32타석 · 비거리 168m",       icon: "⛳",  cat: "leisure" },
  { name: "키즈파크",     loc: "콘도 B1F",              hours: "10:00–20:00",                          tel: "033-260-2789", note: "프런트 출입키 발급 · 월요일 휴장", icon: "🎠", cat: "leisure" },
  { name: "양상블",       loc: "콘도 1F",               hours: "업장 문의",                            tel: "033-260-2789", note: "",                           icon: "🎵",  cat: "leisure" },
];

const FAC_CATS = [
  { id: "all",      label: "전체"   },
  { id: "wellness", label: "웰니스" },
  { id: "food",     label: "식음"   },
  { id: "shop",     label: "쇼핑"   },
  { id: "leisure",  label: "레저"   },
];

const TABS = [
  { id: "schedule",  label: "📅 일정" },
  { id: "room",      label: "🛏 객실" },
  { id: "team",      label: "👥 팀"   },
  { id: "menu",      label: "🍽️ 식사" },
  { id: "facility",  label: "🏨 시설" },
  { id: "notice",    label: "📢 공지" },
];

// "HH:MM" → 분
const toMin = (str) => { const [h, m] = str.split(":").map(Number); return h * 60 + m; };

const getCurrentStatus = () => {
  const now    = new Date();
  const month  = now.getMonth() + 1;
  const date   = now.getDate();
  const curMin = now.getHours() * 60 + now.getMinutes();
  const dayMap = { "5/27": 0, "5/28": 1, "5/29": 2 };
  const dayIdx = dayMap[`${month}/${date}`];
  if (dayIdx === undefined) return { dayIdx: -1, activeIdx: -1, nextIdx: -1 };
  const items = SCHEDULE[dayIdx].items;
  for (let i = 0; i < items.length; i++) {
    const parts = items[i].time.includes("~") ? items[i].time.split("~") : [items[i].time, null];
    const start = toMin(parts[0]);
    const end   = parts[1] ? toMin(parts[1]) : start + 60;
    if (curMin >= start && curMin < end) return { dayIdx, activeIdx: i, nextIdx: -1 };
  }
  for (let i = 0; i < items.length; i++) {
    const start = toMin(items[i].time.split("~")[0]);
    if (curMin < start) return { dayIdx, activeIdx: -1, nextIdx: i };
  }
  return { dayIdx, activeIdx: -1, nextIdx: -1 };
};

export default function App() {
  const status = getCurrentStatus();
  const initDay = status.dayIdx >= 0 ? status.dayIdx : 0;

  const [tab, setTab]               = useState("schedule");
  const [activeDay, setActiveDay]   = useState(initDay);
  const [roomSearch, setRoomSearch] = useState("");
  const [teamSearch, setTeamSearch] = useState("");
  const [facCat, setFacCat] = useState("all");

  const dayData    = SCHEDULE[activeDay];
  const isToday    = activeDay === status.dayIdx;
  const findTeam   = (name) => TEAMS.find(t => t.members.includes(name));

  const nowItem = status.dayIdx >= 0 && status.activeIdx >= 0
    ? SCHEDULE[status.dayIdx].items[status.activeIdx] : null;
  const nextItem = status.dayIdx >= 0 && status.nextIdx >= 0
    ? SCHEDULE[status.dayIdx].items[status.nextIdx] : null;

  return (
    <div style={{ fontFamily: "'Noto Sans KR', sans-serif", background: "#080a0f", minHeight: "100vh", color: "#e2e8f0", paddingBottom: 90 }}>

      {/* 헤더 */}
      <div style={{ background: "linear-gradient(160deg, #0f1520 0%, #080a0f 100%)", borderBottom: "1px solid #1a2035", padding: "20px 18px 0", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#4a6fa5", fontWeight: 700, marginBottom: 3 }}>KAVA 12기 · 2026</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>워크숍 가이드</div>
          <div style={{ fontSize: 11, color: "#3a4a60", marginTop: 3 }}>5/27(수) — 5/29(금) · 2박 3일</div>
        </div>

        {/* 지금 진행 중 배너 */}
        {nowItem && (
          <div style={{ background: "#0a2a1a", border: "1px solid #22c55e44", borderRadius: 10, padding: "10px 14px", marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#22c55e", fontWeight: 700, marginBottom: 2 }}>지금 진행 중</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#e2e8f0" }}>{nowItem.name}</div>
            </div>
            <div style={{ fontSize: 11, color: "#22c55e", fontWeight: 700, whiteSpace: "nowrap" }}>{nowItem.time}</div>
          </div>
        )}
        {!nowItem && nextItem && (
          <div style={{ background: "#0d1a2a", border: "1px solid #4a6fa544", borderRadius: 10, padding: "10px 14px", marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4a6fa5", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#4a6fa5", fontWeight: 700, marginBottom: 2 }}>다음 일정</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#e2e8f0" }}>{nextItem.name}</div>
            </div>
            <div style={{ fontSize: 11, color: "#4a6fa5", fontWeight: 700, whiteSpace: "nowrap" }}>{nextItem.time}</div>
          </div>
        )}

        {/* 탭 */}
        <div style={{ display: "flex", overflowX: "auto", gap: 0 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: "0 0 auto", padding: "9px 14px 11px",
              background: "transparent",
              color: tab === t.id ? "#fff" : "#3a4a60",
              border: "none",
              borderBottom: tab === t.id ? "2px solid #4a6fa5" : "2px solid transparent",
              fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s"
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* ── 일정 탭 ── */}
      {tab === "schedule" && (
        <div style={{ padding: "16px 18px 0" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {SCHEDULE.map((d, i) => (
              <button key={i} onClick={() => setActiveDay(i)} style={{
                flex: 1, padding: "14px 8px", borderRadius: 14,
                background: activeDay === i ? d.color + "22" : "#0f1220",
                border: activeDay === i ? `1.5px solid ${d.color}88` : "1.5px solid #1a2035",
                cursor: "pointer", transition: "all 0.25s",
              }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{d.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: activeDay === i ? d.color : "#4a5568" }}>{d.day}</div>
                <div style={{ fontSize: 10, color: activeDay === i ? d.color + "aa" : "#2a3550", marginTop: 2 }}>{d.date}</div>
              </button>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 20, top: 12, bottom: 12, width: 2, background: `linear-gradient(to bottom, ${dayData.color}44, transparent)`, borderRadius: 2 }} />
            {dayData.items.map((item, i) => {
              const tc = TYPE_CONFIG[item.type];
              const isActive = isToday && i === status.activeIdx;
              const isNext   = isToday && i === status.nextIdx;
              return (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 12, position: "relative" }}>
                  <div style={{ width: 42, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 14 }}>
                    <div style={{
                      width: isActive ? 14 : 10, height: isActive ? 14 : 10,
                      borderRadius: "50%", background: tc.dot,
                      border: `2px solid ${tc.dot}44`, zIndex: 1,
                      boxShadow: isActive ? `0 0 8px ${tc.dot}` : "none",
                      transition: "all 0.3s"
                    }} />
                  </div>
                  <div style={{
                    flex: 1,
                    background: isActive ? tc.bg.replace("0d", "18") : tc.bg,
                    border: isActive ? `1.5px solid ${tc.dot}88` : `1px solid ${tc.border}33`,
                    borderLeft: `3px solid ${isActive ? tc.dot : isNext ? tc.dot + "88" : tc.dot + "44"}`,
                    borderRadius: "0 12px 12px 0", padding: "12px 14px",
                    opacity: !isToday ? 1 : (i < status.activeIdx ? 0.45 : 1),
                    transition: "all 0.3s"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: isActive ? "#fff" : "#e2e8f0", lineHeight: 1.4 }}>
                        {tc.icon} {item.name}
                        {isActive && <span style={{ marginLeft: 6, fontSize: 10, color: "#22c55e", fontWeight: 700, background: "#22c55e18", padding: "2px 6px", borderRadius: 8 }}>진행 중</span>}
                        {isNext   && <span style={{ marginLeft: 6, fontSize: 10, color: "#4a6fa5", fontWeight: 700, background: "#4a6fa518", padding: "2px 6px", borderRadius: 8 }}>다음</span>}
                      </div>
                      <div style={{ fontSize: 11, color: tc.dot, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0, background: tc.dot + "15", padding: "3px 8px", borderRadius: 20 }}>{item.time}</div>
                    </div>
                    {item.place && <div style={{ fontSize: 11, color: "#3a4a60", marginTop: 6 }}>📍 {item.place}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 객실 탭 ── */}
      {tab === "room" && (
        <div style={{ padding: "16px 18px 0" }}>
          <input value={roomSearch} onChange={e => setRoomSearch(e.target.value)} placeholder="이름 또는 호수 검색..."
            style={{ width: "100%", background: "#0f1220", border: "1px solid #1a2035", borderRadius: 10, padding: "10px 14px", color: "#e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 14 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {ROOMS
              .filter(r => !roomSearch || r.room.includes(roomSearch) || r.members.some(m => m.includes(roomSearch)))
              .map((r, i) => {
                const team1 = findTeam(r.members[0]);
                const team2 = r.members[1] ? findTeam(r.members[1]) : null;
                return (
                  <div key={i} style={{ background: "#0d1520", border: "1px solid #1a2035", borderRadius: 12, padding: "14px 14px" }}>
                    <div style={{ fontSize: 12, color: "#4a6fa5", fontWeight: 800, marginBottom: 10 }}>🛏 {r.room}</div>
                    {r.members.map((m, j) => {
                      const t = j === 0 ? team1 : team2;
                      return (
                        <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: j === 0 ? 6 : 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{m}</div>
                          {t && <div style={{ fontSize: 10, color: t.color, background: t.color + "18", padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>{t.team}</div>}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
          <div style={{ fontSize: 10, color: "#2a3550", textAlign: "center", marginTop: 16, lineHeight: 1.8 }}>
            ※ 당일 숙소 상황에 따라 체크인 전 일부 호실 변동이 생길 수 있습니다
          </div>
        </div>
      )}

      {/* ── 팀 탭 ── */}
      {tab === "team" && (
        <div style={{ padding: "16px 18px 0" }}>
          <input value={teamSearch} onChange={e => setTeamSearch(e.target.value)} placeholder="이름 검색..."
            style={{ width: "100%", background: "#0f1220", border: "1px solid #1a2035", borderRadius: 10, padding: "10px 14px", color: "#e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 14 }} />
          {TEAMS.map((t, i) => {
            const filtered = teamSearch ? t.members.filter(m => m.includes(teamSearch)) : t.members;
            if (teamSearch && filtered.length === 0) return null;
            return (
              <div key={i} style={{ background: "#0d1520", border: `1px solid ${t.color}33`, borderLeft: `3px solid ${t.color}`, borderRadius: "0 12px 12px 0", padding: "14px 16px", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ fontSize: 15, fontWeight: 900, color: t.color }}>👥 {t.team}</div>
                  <div style={{ fontSize: 11, color: t.color, background: t.color + "18", padding: "3px 10px", borderRadius: 20, fontWeight: 700 }}>{t.count}명</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                  {filtered.map((m, j) => (
                    <div key={j} style={{ background: t.color + "10", border: `1px solid ${t.color}22`, borderRadius: 8, padding: "7px 10px", fontSize: 13, fontWeight: 700, color: "#e2e8f0", textAlign: "center" }}>{m}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── 식사 탭 ── */}
      {tab === "menu" && (
        <div style={{ padding: "16px 18px 0" }}>
          <div style={{ fontSize: 11, color: "#3a4a60", marginBottom: 16 }}>
            모든 식사는 <span style={{ color: "#f59e0b", fontWeight: 700 }}>2F 그랑쉐프 (지정구역)</span>에서 진행됩니다.
          </div>
          {MEAL_MENU.map((d, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: d.color, marginBottom: 10 }}>
                {SCHEDULE[i].emoji} {d.day} · {d.date}
              </div>
              {d.meals.map((meal, j) => (
                <div key={j} style={{ background: "#0d1520", border: "1px solid #1a2035", borderRadius: 12, padding: "14px 16px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#3a4a60", fontWeight: 700, marginBottom: 4 }}>{meal.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#e2e8f0" }}>{meal.menu}</div>
                  </div>
                  <div style={{ fontSize: 11, color: "#22c55e", background: "#0a1f0a", padding: "4px 10px", borderRadius: 20 }}>{meal.place}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── 시설 탭 ── */}
      {tab === "facility" && (
        <div style={{ padding: "16px 18px 0" }}>
          <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 16, paddingBottom: 2 }}>
            {FAC_CATS.map(c => (
              <button key={c.id} onClick={() => setFacCat(c.id)} style={{
                flexShrink: 0, padding: "6px 14px", borderRadius: 20,
                background: facCat === c.id ? "#4a6fa5" : "#0f1220",
                color: facCat === c.id ? "#fff" : "#3a4a60",
                border: facCat === c.id ? "1px solid #4a6fa5" : "1px solid #1a2035",
                fontSize: 12, fontWeight: 700, cursor: "pointer"
              }}>{c.label}</button>
            ))}
          </div>
          {FACILITIES.filter(f => facCat === "all" || f.cat === facCat).map((f, i) => (
            <div key={i} style={{ background: "#0d1520", border: "1px solid #1a2035", borderRadius: 12, padding: "14px 16px", marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#e2e8f0" }}>{f.icon} {f.name}</div>
                <div style={{ fontSize: 11, color: "#4a6fa5", background: "#0d1a2a", padding: "3px 10px", borderRadius: 20, fontWeight: 700, whiteSpace: "nowrap" }}>{f.loc}</div>
              </div>
              <div style={{ fontSize: 12, color: "#6b7a99", marginBottom: f.note ? 4 : 0 }}>🕐 {f.hours}</div>
              {f.note && <div style={{ fontSize: 11, color: "#f59e0b", marginBottom: 4 }}>※ {f.note}</div>}
              <div style={{ fontSize: 11, color: "#3a4560" }}>📞 {f.tel}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── 공지 탭 ── */}
      {tab === "notice" && (
        <div style={{ padding: "16px 18px 0" }}>
          {NOTICES.map((n, i) => (
            <div key={i} style={{ background: "#0d1520", border: "1px solid #1a2035", borderLeft: "3px solid #f59e0b", borderRadius: "0 12px 12px 0", padding: "14px 16px", marginBottom: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ fontSize: 18, flexShrink: 0 }}>{n.icon}</div>
              <div style={{ fontSize: 13, color: "#c8d0e0", lineHeight: 1.7 }}>{n.text}</div>
            </div>
          ))}
          <div style={{ marginTop: 16, background: "#0a1020", border: "1px solid #1a2035", borderRadius: 14, padding: "16px 18px" }}>
            <div style={{ fontSize: 11, color: "#4a6fa5", fontWeight: 700, marginBottom: 10 }}>📞 문의처</div>
            <div style={{ fontSize: 13, color: "#8892a4", lineHeight: 1.8 }}>
              윤석규 연구원 · 02-3017-7088<br />
              이유빈 과장 · 02-3017-7085
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
