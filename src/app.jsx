import { useState } from "react";

const SCHEDULE = [
  {
    day: "D1", date: "5/27(수)", color: "#4a6fa5", emoji: "🚌",
    items: [
      { time: "11:30~12:00", name: "오리엔테이션",               place: "2F 메이플홀",                      type: "event"   },
      { time: "12:00~13:00", name: "점심식사",                    place: "2F 그랑쉐프",                      type: "meal"    },
      { time: "13:00~15:30", name: "투심보고서 실무(1) — 바이오",  place: "한인수 대표 · 라플라스파트너스",    type: "lecture" },
      { time: "15:45~18:15", name: "투심보고서 실무(2) — ICT/유통",place: "장원열 이사 · 케이앤티파트너스",   type: "lecture" },
      { time: "18:30~19:00", name: "객실 키 배부 및 체크인",       place: "",                                type: "alert"   },
      { time: "19:00~20:00", name: "저녁식사",                    place: "2F 그랑쉐프",                      type: "meal"    },
    ]
  },
  {
    day: "D2", date: "5/28(목)", color: "#8b5cf6", emoji: "📝",
    items: [
      { time: "07:30~09:00", name: "아침식사",                        place: "2F 그랑쉐프",                       type: "meal"    },
      { time: "09:00~11:30", name: "투심보고서 실무(3) — 문화콘텐츠", place: "김범석 부대표 · 스마트스터디벤처스", type: "lecture" },
      { time: "11:30~12:00", name: "투심보고서 주제 선정",             place: "각 조 팀장",                        type: "event"   },
      { time: "12:00~13:00", name: "점심식사",                         place: "2F 그랑쉐프",                       type: "meal"    },
      { time: "13:00~19:00", name: "투심보고서 작성 멘토링",           place: "한인수 · 장원열 · 김범석",          type: "lecture" },
      { time: "19:00~20:00", name: "저녁식사",                         place: "2F 그랑쉐프",                       type: "meal"    },
      { time: "20:00~22:00", name: "보고서 작성 과제 자율 팀플",       place: "",                                  type: "event"   },
    ]
  },
  {
    day: "D3", date: "5/29(금)", color: "#10b981", emoji: "🏁",
    items: [
      { time: "07:30~08:30", name: "아침식사",                 place: "2F 그랑쉐프",                 type: "meal"    },
      { time: "08:30~09:00", name: "객실 키 반납 및 체크아웃", place: "",                             type: "alert"   },
      { time: "09:00~12:00", name: "투심보고서 발표 및 피드백", place: "한인수 · 장원열 · 김범석",    type: "lecture" },
      { time: "12:00~13:00", name: "점심식사",                 place: "2F 그랑쉐프",                 type: "meal"    },
      { time: "13:00",       name: "해산",                     place: "단체버스 14:00 숙소 정문 출발", type: "alert"   },
    ]
  }
];

const MEAL_MENU = [
  { day: "D1", date: "5/27(수)", meals: [
    { label: "점심", menu: "점심식사", place: "2F 그랑쉐프" },
    { label: "저녁", menu: "저녁식사", place: "2F 그랑쉐프" },
  ]},
  { day: "D2", date: "5/28(목)", meals: [
    { label: "아침", menu: "조식 뷔페", place: "2F 그랑쉐프" },
    { label: "점심", menu: "비빔밥",    place: "2F 그랑쉐프" },
    { label: "저녁", menu: "제육불고기", place: "2F 그랑쉐프" },
  ]},
  { day: "D3", date: "5/29(금)", meals: [
    { label: "아침", menu: "조식 뷔페",           place: "2F 그랑쉐프" },
    { label: "점심", menu: "고등어구이 된장찌개 반상", place: "2F 그랑쉐프" },
  ]},
];

const NOTICES = [
  "식사는 워크숍 참가자 지정구역(2F, 그랑쉐프)에서 해주세요.",
  "교육생 명찰을 식당 및 교육장 내에서 항상 착용해주세요. (미착용 시 외부인으로 구분돼 식사요금 개별 부과될 수 있어요)",
  "메뉴는 재료 수급 상황에 따라 변경될 수 있습니다.",
  "단체버스는 5/29(금) 14:00 숙소 정문 현관에서 출발합니다. 자율 탑승이며 출발 시간 내 미탑승 시 개별 귀가하셔야 합니다.",
  "교육일정 및 강사는 부분적으로 변경될 수 있습니다.",
];

const TYPE_CONFIG = {
  meal:    { bg: "#0d1f0d", border: "#22c55e", dot: "#22c55e", icon: "🍽️", label: "식사"  },
  lecture: { bg: "#0d0d1f", border: "#4a6fa5", dot: "#4a6fa5", icon: "📋", label: "강의"  },
  event:   { bg: "#1a1700", border: "#f59e0b", dot: "#f59e0b", icon: "📌", label: "일정"  },
  alert:   { bg: "#1f0d0d", border: "#ef4444", dot: "#ef4444", icon: "⚠️", label: "주의"  },
};

export default function App() {
  const [activeDay, setActiveDay] = useState(0);
  const [tab, setTab] = useState("schedule"); // "schedule" | "menu" | "notice"

  const dayData = SCHEDULE[activeDay];

  return (
    <div style={{
      fontFamily: "'Noto Sans KR', sans-serif",
      background: "#080a0f",
      minHeight: "100vh",
      color: "#e2e8f0",
      paddingBottom: 80,
    }}>

      {/* 헤더 */}
      <div style={{
        background: "linear-gradient(160deg, #0f1520 0%, #080a0f 100%)",
        borderBottom: "1px solid #1a2035",
        padding: "22px 20px 0",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#4a6fa5", fontWeight: 700, marginBottom: 4 }}>
            KAVA 12기 · 2025
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>
            워크숍 일정표
          </div>
          <div style={{ fontSize: 12, color: "#3a4a60", marginTop: 4 }}>
            5/27(수) — 5/29(금) · 2박 3일
          </div>
        </div>

        {/* 상단 탭: 일정 / 식사 / 공지 */}
        <div style={{ display: "flex", gap: 4 }}>
          {[["schedule","📅 일정"], ["menu","🍽️ 식사"], ["notice","📢 공지"]].map(([v, label]) => (
            <button key={v} onClick={() => setTab(v)} style={{
              flex: 1, padding: "9px 0 11px",
              background: "transparent",
              color: tab === v ? "#fff" : "#3a4a60",
              border: "none",
              borderBottom: tab === v ? `2px solid ${dayData.color}` : "2px solid transparent",
              fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* ── 일정 탭 ── */}
      {tab === "schedule" && (
        <div style={{ padding: "16px 18px 0" }}>
          {/* 일자 선택 */}
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

          {/* 일정 아이템 */}
          <div style={{ position: "relative" }}>
            {/* 타임라인 세로선 */}
            <div style={{
              position: "absolute", left: 20, top: 12, bottom: 12,
              width: 2, background: `linear-gradient(to bottom, ${dayData.color}44, transparent)`,
              borderRadius: 2,
            }} />

            {dayData.items.map((item, i) => {
              const tc = TYPE_CONFIG[item.type];
              return (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 12, position: "relative" }}>
                  {/* 타임라인 도트 */}
                  <div style={{
                    width: 42, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, paddingTop: 14,
                  }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: "50%",
                      background: tc.dot, border: `2px solid ${tc.dot}44`,
                      flexShrink: 0, zIndex: 1,
                    }} />
                  </div>

                  {/* 카드 */}
                  <div style={{
                    flex: 1,
                    background: tc.bg,
                    border: `1px solid ${tc.border}33`,
                    borderLeft: `3px solid ${tc.dot}`,
                    borderRadius: "0 12px 12px 0",
                    padding: "12px 14px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#e2e8f0", lineHeight: 1.4 }}>
                        {tc.icon} {item.name}
                      </div>
                      <div style={{
                        fontSize: 11, color: tc.dot, fontWeight: 700,
                        whiteSpace: "nowrap", flexShrink: 0,
                        background: tc.dot + "15", padding: "3px 8px", borderRadius: 20,
                      }}>{item.time}</div>
                    </div>
                    {item.place && (
                      <div style={{ fontSize: 11, color: "#3a4a60", marginTop: 6 }}>
                        📍 {item.place}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 범례 */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8, padding: "12px 0" }}>
            {Object.entries(TYPE_CONFIG).map(([key, tc]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: tc.dot }} />
                <span style={{ fontSize: 10, color: "#3a4a60" }}>{tc.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 식사 탭 ── */}
      {tab === "menu" && (
        <div style={{ padding: "20px 18px 0" }}>
          <div style={{ fontSize: 11, color: "#3a4a60", marginBottom: 16, lineHeight: 1.6 }}>
            모든 식사는 <span style={{ color: "#f59e0b", fontWeight: 700 }}>2F 그랑쉐프 (지정구역)</span>에서 진행됩니다.
          </div>
          {MEAL_MENU.map((d, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: SCHEDULE[i].color, marginBottom: 10 }}>
                {SCHEDULE[i].emoji} {d.day} · {d.date}
              </div>
              {d.meals.map((meal, j) => (
                <div key={j} style={{
                  background: "#0d1520", border: "1px solid #1a2035",
                  borderRadius: 12, padding: "14px 16px", marginBottom: 8,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#3a4a60", fontWeight: 700, marginBottom: 4 }}>{meal.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#e2e8f0" }}>{meal.menu}</div>
                  </div>
                  <div style={{ fontSize: 11, color: "#22c55e", background: "#0a1f0a", padding: "4px 10px", borderRadius: 20 }}>
                    {meal.place}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── 공지 탭 ── */}
      {tab === "notice" && (
        <div style={{ padding: "20px 18px 0" }}>
          <div style={{ fontSize: 11, color: "#3a4a60", marginBottom: 16 }}>꼭 확인해주세요</div>
          {NOTICES.map((n, i) => (
            <div key={i} style={{
              background: "#0d1520", border: "1px solid #1a2035",
              borderLeft: "3px solid #f59e0b",
              borderRadius: "0 12px 12px 0", padding: "14px 16px", marginBottom: 10,
              display: "flex", gap: 12, alignItems: "flex-start",
            }}>
              <div style={{ fontSize: 16, flexShrink: 0 }}>
                {i === 3 ? "🚌" : i === 0 ? "🍽️" : i === 1 ? "🪪" : "📌"}
              </div>
              <div style={{ fontSize: 13, color: "#c8d0e0", lineHeight: 1.7 }}>{n}</div>
            </div>
          ))}

          {/* 문의처 */}
          <div style={{
            marginTop: 24, background: "#0a1020", border: "1px solid #1a2035",
            borderRadius: 14, padding: "16px 18px",
          }}>
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
