(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function a(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(r){if(r.ep)return;r.ep=!0;const l=a(r);fetch(r.href,l)}})();const V=`
你是「憶旅」的廣東話 AI 回憶助手，不是真人，也不是醫療工具。
你不會要求銀行資料、密碼、身份證號碼、住址或其他敏感身份資料。
用親切、有耐性、口語化的香港廣東話回應。具體呼應長者剛才說的關鍵字，
不要只說空泛的「好叻呀」。長者是故事的共同創作者：不可捏造人名、年份、
地點或事件；不確定的內容要標記「待確認」，並請長者審閱。
先從輕鬆、正面的生活或年輕時回憶開始。長者主動提到敏感經歷才溫柔跟進。
如果出現自傷字眼，立即停止追問，鼓勵聯絡真人照顧者並顯示求助選項。
單節對話最多 45 分鐘；沉默時關心但不催促。
`.trim(),B=["想死","自殺","唔想生存","活著冇意思","好唔開心","太辛苦","冇人理"],Y=["戰亂","喪偶","病痛","過身","去世"],J="yiloi-transcript-v1",Z="yiloi-story-v1",z="yiloi-share-v1",G="SpeechRecognition"in window||"webkitSpeechRecognition"in window,W=window.SpeechRecognition||window.webkitSpeechRecognition,e={messages:JSON.parse(localStorage.getItem(J)||"[]"),photo:JSON.parse(localStorage.getItem("yiloi-photo-v1")||"null"),story:JSON.parse(localStorage.getItem(Z)||"null"),sharing:JSON.parse(localStorage.getItem(z)||"null"),view:"senior",topic:localStorage.getItem("yiloi-topic-v1")||"",focusMode:!1,workflowStage:1,listening:!1,paused:!1,startedAt:Date.now(),recognition:null},$=document.querySelector("#app");function c(t){return t.replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[s])}function X(){return`<svg viewBox="0 0 19 19" role="img" aria-label="故事分享 QR Code">${["1111111001011111111","1000001011011000001","1011101000011011101","1011101011011011101","1011101001011011101","1000001010111000001","1111111010101111111","0000000011010000000","1101111010111011011","0010100101100100100","1110011110011110001","0101110001110001110","1111111001001011011","1000001011110010100","1011101000101110111","1011101011001001001","1011101000111011100","1000001011010010111","1111111010101110101"].map((s,a)=>[...s].map((n,r)=>n==="1"?`<rect x="${r}" y="${a}" width="1" height="1" />`:"").join("")).join("")}</svg>`}function K(){var a,n,r,l,d,p,v,f;if(!new URLSearchParams(window.location.search).has("story")||!((a=e.story)!=null&&a.confirmed))return!1;const t=JSON.parse(localStorage.getItem("yiloi-family-response-v1")||"null"),s=e.story.title||"我的回憶";return $.innerHTML=`<div class="shell share-page">
    <header class="topbar"><div><span class="brand-mark">憶</span><span class="brand">憶旅</span></div><span class="step">長者已確認</span></header>
    <section class="share-hero"><p class="eyebrow">一段留給家人的回憶</p><h1>${c(s)}</h1><p>呢段故事由長者親自審閱及確認。你可以慢慢睇，亦可以分享一小段自己嘅故事。</p></section>
    <div class="chapter-progress"><span class="active">1</span><i></i><span class="${t?"active":""}">2</span><i></i><span class="${t?"active":""}">3</span></div>
    <p class="chapter-label">CHAPTER 1 · 公公的故事</p>
    ${(n=e.photo)!=null&&n.image?`<img class="shared-photo" src="${e.photo.image}" alt="${c(e.photo.title||"回憶相片")}" />`:""}
    <article class="shared-story"><span class="ai-label">長者已確認</span><p>${c(e.story.text)}</p></article>
    <section class="family-invite">
      <p class="eyebrow">輪到你了</p><h2>你還記得自己第一次工作嗎？</h2>
      <p>可以錄一段語音、寫幾句，或者跳過，繼續睇故事。你唔需要註冊帳戶。</p>
      ${t?`<div class="response-saved"><strong>✓ 你已分享</strong><p>${c(t.text)}</p></div>
        <section class="connection-card"><span class="ai-label">兩代人的第一次工作</span><h3>不同年代，相似的第一次</h3><p>公公 18 歲做裁縫，家人分享了自己的第一份工作。呢兩段經歷可以成為下一次見面時嘅話題。</p></section>`:`<div class="response-options">
          <button id="family-voice" class="response-option"><span>🎙</span><strong>錄一段語音分享</strong><small>保留你自己嘅語氣</small></button>
          <button id="family-text" class="response-option"><span>✍</span><strong>寫幾句就好</strong><small>分享一小段回憶</small></button>
          <button id="family-skip" class="response-option muted"><span>→</span><strong>先跳過</strong><small>繼續睇故事</small></button>
        </div>
        <div id="family-composer" class="family-composer" hidden><textarea id="family-note" rows="4" placeholder="例如：我第一份暑期工係喺咖啡店做，每日都好緊張。"></textarea><div><button id="save-family-note" class="primary">分享呢段回憶</button><button id="cancel-family-note" class="text-button">稍後先</button></div></div>`}
    </section>
    <section class="next-chapter"><p class="eyebrow">下一章</p><h2>屋企人返工返學後，一齊食飯</h2><p>繼續閱讀長者其他回憶，慢慢拼返一個屬於你哋嘅故事。</p><button id="continue-story" class="secondary">繼續睇故事（Demo）</button></section>
    <footer><span>憶旅・由長者決定分享內容</span><a href="${window.location.pathname}">返回我的憶旅</a></footer>
  </div>`,(r=document.querySelector("#family-text"))==null||r.addEventListener("click",()=>{document.querySelector("#family-composer").hidden=!1}),(l=document.querySelector("#family-voice"))==null||l.addEventListener("click",()=>{document.querySelector("#family-composer").hidden=!1,document.querySelector("#family-note").placeholder="語音 Demo：請先用文字輸入你想分享嘅內容。",document.querySelector("#family-note").focus()}),(d=document.querySelector("#family-skip"))==null||d.addEventListener("click",()=>{document.querySelector(".family-invite").innerHTML='<p class="eyebrow">繼續閱讀</p><h2>你可以之後先分享</h2><p>唔緊要，先睇長者嘅下一段故事。下次返嚟，仍然可以分享你嘅回憶。</p>'}),(p=document.querySelector("#save-family-note"))==null||p.addEventListener("click",()=>{const u=document.querySelector("#family-note").value.trim();u&&(localStorage.setItem("yiloi-family-response-v1",JSON.stringify({text:u,at:new Date().toISOString()})),K())}),(v=document.querySelector("#cancel-family-note"))==null||v.addEventListener("click",()=>{document.querySelector("#family-composer").hidden=!0}),(f=document.querySelector("#continue-story"))==null||f.addEventListener("click",u=>{u.currentTarget.textContent="下一章已打開（Demo）",u.currentTarget.disabled=!0}),!0}function k(){var t;return((t=e.sharing)==null?void 0:t.url)||window.location.href}function x(){var t;return`同你分享一段回憶：${((t=e.story)==null?void 0:t.title)||"我的回憶"}`}const q={whatsapp:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .4 5.2.4 11.7c0 2.1.6 4.1 1.6 5.9L.3 24l6.6-1.7a11.7 11.7 0 0 0 5.2 1.2h.1c6.4 0 11.7-5.2 11.7-11.7 0-3.1-1.2-6.1-3.4-8.3Zm-8.3 18c-1.6 0-3.2-.4-4.6-1.2l-.3-.2-3.9 1 1-3.8-.2-.4a9.7 9.7 0 1 1 8 4.6Zm5.3-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.6.1-.2.1-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.2 4.5 1.9.8 2.6.9 3.5.8.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z"/></svg>',facebook:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 24v-11h3.7l.6-4.3h-4.3V6c0-1.2.3-2.1 2.2-2.1h2.3V.1C17.6.1 16.4 0 15.1 0c-3.4 0-5.7 2.1-5.7 5.9v2.8H5.7V13h3.7v11h4.1Z"/></svg>',wechat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.8 4C4 4 .2 7.2.2 11.2c0 2.3 1.4 4.4 3.5 5.7l-.8 2.8 3.2-1.6c.8.2 1.7.3 2.6.3h.5c-.2-.6-.3-1.2-.3-1.9 0-3.6 3.4-6.5 7.7-6.5.5 0 1 0 1.4.1C17.4 6.5 13.6 4 8.8 4Zm-2.9 7.8c-.7 0-1.2-.5-1.2-1.1s.5-1.1 1.2-1.1 1.2.5 1.2 1.1-.5 1.1-1.2 1.1Zm5.7 0c-.7 0-1.2-.5-1.2-1.1s.5-1.1 1.2-1.1 1.2.5 1.2 1.1-.5 1.1-1.2 1.1Zm3.5 0c-4.1 0-7.4 2.6-7.4 5.9 0 3.2 3.3 5.8 7.4 5.8.8 0 1.6-.1 2.3-.3l2.8 1.4-.7-2.5c1.8-1.1 3-2.7 3-4.5 0-3.2-3.3-5.8-7.4-5.8Zm-2.4 5.2c-.6 0-1-.4-1-.9s.4-.9 1-.9 1 .4 1 .9-.4.9-1 .9Zm4.7 0c-.6 0-1-.4-1-.9s.4-.9 1-.9 1 .4 1 .9-.4.9-1 .9Z"/></svg>'};function E(){localStorage.setItem(J,JSON.stringify(e.messages))}function y(){localStorage.setItem("yiloi-photo-v1",JSON.stringify(e.photo))}function b(){localStorage.setItem(Z,JSON.stringify(e.story))}function ee(){localStorage.setItem(z,JSON.stringify(e.sharing))}const w=[["childhood","細個嘅生活","街坊、玩伴，同屋企嘅日子","☀"],["family","屋企人","一餐飯、一句說話，一個重要嘅人","♡"],["work","第一份工","人生第一步，做過最難忘嘅工作","▣"],["festival","節日回憶","過年、團年飯，同最熱鬧嘅時光","✦"],["proud","最自豪嘅事","你最想留俾家人知道嘅故事","★"],["message","留俾家人的話","想對屋企人講，但一直未講出口嘅話","✉"]];function te(t){e.topic=t,localStorage.setItem("yiloi-topic-v1",t);const s=w.find(([a])=>a===t);s&&e.messages.length<=1?h("agent",`好呀，我哋就由「${s[1]}」開始。你最先諗起邊一件事？`):i()}function _(){const t=e.messages.filter(s=>s.role==="user");return t.length?t.map(s=>s.text).join(" "):""}function se(){e.messages=[{role:"agent",text:"你好，我係憶旅，一個 AI 回憶助手，唔係真人。我唔會問你銀行資料、身份證號碼或者地址。今日食咗飯未？",at:new Date().toISOString()},{role:"user",text:"我細個住喺深水埗，最鍾意睇婆婆煮飯。",at:new Date().toISOString()},{role:"agent",text:"你記得深水埗同婆婆煮飯，嗰個廚房一定好有味道。婆婆最常煮咩餸？",at:new Date().toISOString()},{role:"user",text:"佢最叻煮梅菜扣肉，屋企人返工返學都會一齊食。",at:new Date().toISOString()},{role:"agent",text:"原來梅菜扣肉係你哋一家人一齊食飯嘅回憶。呢句好值得保留落嚟。",at:new Date().toISOString()}],e.photo={image:oe(),title:"婆婆煮梅菜扣肉的廚房",year:"1968",people:"婆婆、屋企人",caption:"婆婆最叻煮梅菜扣肉，屋企人返工返學都會一齊食。",confirmed:!0},e.sharing=null,e.story={title:"深水埗的飯香",text:"我細個住喺深水埗，最鍾意記得婆婆煮飯。佢最叻煮梅菜扣肉，屋企人返工返學都會一齊食。對我嚟講，呢個唔只係一道餸，而係一家人坐埋一齊嘅日子。",confirmed:!0},E(),y(),b(),i()}function oe(){return`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
    <rect width="900" height="600" fill="#e8d0ae"/>
    <rect x="75" y="80" width="750" height="440" rx="24" fill="#fff7e9"/>
    <circle cx="300" cy="265" r="90" fill="#b97752"/>
    <circle cx="610" cy="270" r="90" fill="#d29b70"/>
    <path d="M180 440h520v40H180z" fill="#8e6046"/>
    <text x="450" y="145" text-anchor="middle" font-family="sans-serif" font-size="34" fill="#79513d">一齊食飯的日子</text>
    <text x="450" y="570" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#79513d">Demo 示意圖片</text>
  </svg>`)}`}function S(t){if(!("speechSynthesis"in window))return;window.speechSynthesis.cancel();const s=new SpeechSynthesisUtterance(t);s.lang="zh-HK",s.rate=.85;const a=window.speechSynthesis.getVoices();s.voice=a.find(n=>/yue|zh[-_]HK|粵|廣東|Cantonese/i.test(`${n.lang} ${n.name}`))||a.find(n=>/zh[-_]HK/i.test(n.lang)),window.speechSynthesis.speak(s)}function h(t,s,a={}){e.messages.push({role:t,text:s,at:new Date().toISOString(),...a}),E(),i()}function ae(t){const s=t.toLowerCase();return s.includes("唔記得")?"唔緊要，我哋慢慢諗。嗰陣時有冇一首歌、一種食物，或者電視劇令你諗返起嗰段日子？":s.includes("食")||s.includes("飯")?"你頭先講到食嘢，聽落你好記得嗰種味道。以前邊個最常煮俾你食？":s.includes("細個")||s.includes("年輕")||s.includes("以前")?"你講到以前嘅日子喇。當時你住喺邊度？附近有冇一個你特別記得嘅地方？":`我聽到你講「${t.slice(0,36)}${t.length>36?"…":""}」。呢個細節好有畫面，你當時身邊仲有邊個人？`}function ne(t){return B.some(s=>t.includes(s))}function j(t){if(!t.trim()||e.paused)return;if(h("user",t.trim()),ne(t)){e.paused=!0,h("agent","多謝你肯同我講呢啲感受。你唔使一個人頂住，我哋而家先停一停，搵真人照顧者陪住你。"),S("多謝你肯同我講呢啲感受。我哋而家先停一停，搵真人照顧者陪住你。");return}const s=ae(t),a=Y.some(n=>t.includes(n));h("agent",a?`我聽到你提到一段重要而可能難受嘅經歷。${s}如果你想休息，我哋可以下次再傾。`:s),S(a?`我聽到你提到一段重要而可能難受嘅經歷。${s}`:s)}function F(){var t;if(!G){document.querySelector("#manual-input").focus();return}if(e.listening){(t=e.recognition)==null||t.stop();return}e.recognition=new W,e.recognition.lang="zh-HK",e.recognition.interimResults=!1,e.recognition.continuous=!1,e.recognition.onstart=()=>{e.listening=!0,i()},e.recognition.onend=()=>{e.listening=!1,i()},e.recognition.onerror=()=>{e.listening=!1,i()},e.recognition.onresult=s=>j(s.results[0][0].transcript),e.recognition.start(),i()}function re(){var a;const t=[...e.messages].reverse().find(n=>n.role==="agent"),s=[...e.messages].reverse().find(n=>n.role==="user");$.innerHTML=`<div class="focus-shell">
    <header class="focus-topbar">
      <button id="exit-focus" class="focus-back">← 返回完整畫面</button>
      <span class="brand"><span class="brand-mark">憶</span>憶旅</span>
      <span class="focus-time">本節 ${Math.floor((Date.now()-e.startedAt)/6e4)} / 45 分鐘</span>
    </header>
    <main class="focus-main">
      <p class="eyebrow">${e.topic?`主題：${c(((a=w.find(([n])=>n===e.topic))==null?void 0:a[1])||"")}`:"廣東話語音對話"}</p>
      <div class="focus-orb ${e.listening?"is-listening":""}"><span>${e.listening?"■":"🎙"}</span></div>
      <h1>${e.listening?"我聽緊你講…":"可以同我講嘢喇"}</h1>
      <p class="focus-hint">${e.listening?"講完之後，我會耐心聽你講完。":"撳住下面個咪高風，慢慢講就得。"}</p>
      ${s?`<div class="focus-transcript"><span>你剛才講：</span><p>「${c(s.text)}」</p></div>`:""}
      ${t?`<div class="focus-agent"><span>憶旅</span><p>${c(t.text)}</p><button id="focus-speak" class="speak-button">🔊 再讀一次</button></div>`:""}
      <button id="focus-listen" class="focus-mic ${e.listening?"active":""}"><span>${e.listening?"■":"🎙"}</span><strong>${e.listening?"停止聆聽":"按一下開始講"}</strong></button>
      <div class="focus-actions"><button id="focus-rest" class="secondary">休息一陣</button><button id="focus-end" class="text-button">結束今次對話</button></div>
    </main>
  </div>`,document.querySelector("#exit-focus").addEventListener("click",()=>{e.focusMode=!1,i()}),document.querySelector("#focus-listen").addEventListener("click",F),document.querySelector("#focus-speak").addEventListener("click",()=>S((t==null?void 0:t.text)||"")),document.querySelector("#focus-rest").addEventListener("click",()=>alert("好，我哋休息一陣先。準備好再撳咪高風。")),document.querySelector("#focus-end").addEventListener("click",()=>{e.focusMode=!1,i()})}function ie(){const t=[["1","活動前","真人準備傾偈","背景卡、建議題目、避開話題"],["2","活動中","真人陪伴對話","AI 記錄、標記重點，不打斷交流"],["3","活動後","一起確認及延續","故事卡、家人回應、下一次話題"]],s={1:`<div class="workflow-content">
      <div class="workflow-icon">▤</div><div><h3>俾訪問者一眼睇晒</h3><p>真人先了解長者背景，再決定點樣開始傾。AI 只提供準備資料，唔會代替訪問者發問。</p>
      <div class="prep-cards"><span>長者背景卡</span><span>今日 3 條建議題目</span><span>避開話題</span></div></div>
    </div>`,2:`<div class="workflow-content">
      <div class="workflow-icon live">●</div><div><h3>專心陪伴，唔使低頭抄筆記</h3><p>訪問者繼續望住長者傾偈。AI 在背景轉錄、標記人名地點年份，並在需要時提示休息或轉換話題。</p>
      <div class="tool-note"><strong>AI 工具提示</strong><span>「深水埗」 · 地點</span><span>「18 歲」 · 年份</span><span>可稍後追問</span></div></div>
    </div>`,3:`<div class="workflow-content">
      <div class="workflow-icon">♡</div><div><h3>故事係邀請，不係終點</h3><p>長者先確認內容及分享權限。之後家人可以閱讀、回應，為下一次真人見面帶來新話題。</p>
      <div class="prep-cards"><span>長者確認故事卡</span><span>家人語音／文字回應</span><span>下一次續談提示</span></div></div>
    </div>`};return`<section class="workflow-section">
    <div class="workflow-heading"><div><p class="eyebrow">人係中心・AI 係工具</p><h2>一次互動，三個階段</h2></div><span class="human-badge">真人主導</span></div>
    <div class="workflow-steps">${t.map(([a,n,r])=>`<button class="workflow-step ${e.workflowStage===Number(a)?"active":""}" data-workflow-stage="${a}"><b>${a}</b><strong>${n}</strong><small>${r}</small></button>`).join("")}</div>
    ${s[e.workflowStage]}
  </section>`}function ce(){var a,n,r,l,d;const t=(a=e.story)!=null&&a.confirmed?"已確認":e.story?"待長者確認":"未開始",s=e.paused?"需要即時關注":"目前沒有通知";$.innerHTML=`<div class="shell dashboard">
    <header class="topbar">
      <div><span class="brand-mark">憶</span><span class="brand">憶旅</span></div>
      <button id="back-to-senior" class="secondary">返回長者模式</button>
    </header>
    <section class="dashboard-hero">
      <p class="eyebrow">照顧者視角・Demo</p>
      <h1>早晨，陳姑娘</h1>
      <p>以下係阿梅婆婆主動同憶旅分享嘅內容。只顯示已獲同意嘅摘要。</p>
    </section>
    <section class="status-grid">
      <article class="status-card"><span class="status-icon">◷</span><small>最近對話</small><strong>今日 10:24</strong><span class="status-good">已完成</span></article>
      <article class="status-card"><span class="status-icon">♡</span><small>故事進度</small><strong>${t}</strong><span class="status-good">${(n=e.story)!=null&&n.confirmed?"可以分享":"等待審閱"}</span></article>
      <article class="status-card ${e.paused?"attention":""}"><span class="status-icon">!</span><small>安全狀態</small><strong>${s}</strong><span>${e.paused?"請聯絡長者":"一切正常"}</span></article>
    </section>
    <section class="dashboard-panel">
      <div class="panel-heading"><div><p class="eyebrow">最近完成</p><h2>阿梅婆婆的故事</h2></div><span class="ai-label">長者已確認</span></div>
      ${(r=e.story)!=null&&r.confirmed?`<p class="dashboard-quote">「${c(e.story.text.slice(0,90))}${e.story.text.length>90?"…":""}」</p>
        <div class="dashboard-actions"><button id="dashboard-preview" class="primary">預覽故事</button><button id="dashboard-message" class="secondary">留一句話</button></div>`:'<div class="dashboard-empty">長者完成審閱後，確認嘅故事會顯示喺呢度。</div>'}
    </section>
    <section class="dashboard-panel">
      <div class="panel-heading"><div><p class="eyebrow">回憶資料</p><h2>相片及內容</h2></div><span class="step">${e.photo?"1 張相片":"未有相片"}</span></div>
      ${e.photo?`<div class="dashboard-memory"><img src="${e.photo.image}" alt="${c(e.photo.title||"回憶相片")}" /><div><h3>${c(e.photo.title||"未命名回憶")}</h3><p>${c(e.photo.caption||"未有補充內容。")}</p><span class="status-good">由長者選擇分享</span></div></div>`:'<div class="dashboard-empty">長者尚未上載相片。</div>'}
    </section>
    <p class="dashboard-note">Demo 介面：真實版本會根據長者同意及機構權限顯示資料。</p>
  </div>`,document.querySelector("#back-to-senior").addEventListener("click",()=>{e.view="senior",i()}),(l=document.querySelector("#dashboard-preview"))==null||l.addEventListener("click",()=>{var p;e.view="senior",i(),(p=document.querySelector(".story-section"))==null||p.scrollIntoView({behavior:"smooth"})}),(d=document.querySelector("#dashboard-message"))==null||d.addEventListener("click",()=>alert("家人留言功能（Demo）"))}function i(){var n,r,l,d,p,v,f,u,L,I,D,T,A,R,O,C,M,N,H,P,U;if(e.focusMode){re();return}if(e.view==="caregiver"){ce();return}const t=Math.floor((Date.now()-e.startedAt)/6e4),s=w.find(([o])=>o===e.topic),a=e.messages.length?e.messages.map(o=>`<article class="message ${o.role}">
        <span class="role">${o.role==="agent"?"憶旅":"我"}</span>
        <p>${c(o.text)}</p>
        ${o.role==="agent"?`<button class="speak-button" data-speak="${c(o.text)}">🔊 再讀一次</button>`:""}
      </article>`).join(""):'<div class="empty"><span class="wave">☊</span><p>準備好聽你講故事喇。</p></div>';$.innerHTML=`
    <div class="shell">
      <header class="topbar">
        <div><span class="brand-mark">憶</span><span class="brand">憶旅</span></div>
        <div class="top-actions">
          <button id="load-demo" class="demo-button">▶ Demo 示範</button>
          <button id="caregiver-view" class="dashboard-button">照顧者模式</button>
          <button id="focus-view" class="focus-button">全屏傾偈</button>
          <span class="timer">本節 ${t} / 45 分鐘</span>
        </div>
      </header>
      <section class="intro">
        <p class="eyebrow">真人陪伴・AI 幕後支援</p>
        <h1>${s?`今日講吓：${s[1]}`:"今日想由邊段回憶開始？"}</h1>
        <p>訪問者會由頭到尾陪住你傾偈。憶旅只會幫忙記錄、整理同準備下一次話題。</p>
      </section>
      ${ie()}
      <section class="topic-section">
        <div class="section-heading">
          <div><p class="eyebrow">揀一個你想講嘅方向</p><h2>由邊段回憶開始？</h2></div>
          ${s?'<button id="change-topic" class="text-button">更換主題</button>':""}
        </div>
        <div class="topic-grid">
          ${w.map(([o,m,g,Q])=>`<button class="topic-card ${o===e.topic?"selected":""}" data-topic="${o}">
            <span class="topic-icon">${Q}</span><strong>${m}</strong><small>${g}</small>
          </button>`).join("")}
        </div>
      </section>
      ${e.paused?`<section class="safety-alert" role="alert">
        <strong>我哋先停一停</strong>
        <p>你嘅感受好重要。請搵身邊嘅真人照顧者陪住你。</p>
        <button id="notify-caregiver" class="primary">叫人嚟幫手（模擬通知）</button>
        <button id="resume" class="secondary">休息／下次再講</button>
      </section>`:""}
      <section class="conversation" aria-live="polite">${a}</section>
      <section class="story-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">長者主導</p>
            <h2>整理成一段故事</h2>
          </div>
          <span class="step">需要確認</span>
        </div>
        ${e.story?`<article class="story-review">
          <span class="ai-label">AI 整理・${e.story.confirmed?"已確認":"尚未確認"}</span>
          <h3>${c(e.story.title||"我的回憶")}</h3>
          <p class="review-help">以下內容只係草稿。你可以直接修改，確認後先會加入故事書。</p>
          <textarea id="story-editor" rows="7" aria-label="故事內容">${c(e.story.text)}</textarea>
          <div class="review-actions">
            <button id="save-story-draft" class="secondary">儲存修改</button>
            ${e.story.confirmed?'<div class="confirmed">✓ 已加入故事書</div>':'<button id="confirm-story-text" class="primary">我確認呢段故事</button>'}
          </div>
        </article>`:`<div class="story-empty">
          <p>對話後，憶旅會將你講過嘅內容整理成草稿。</p>
          <button id="create-story" class="primary" ${_()?"":"disabled"}>整理對話成故事草稿</button>
        </div>`}
      </section>
      <section class="share-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">分享給家人</p>
            <h2>故事分享頁</h2>
          </div>
          <span class="step">私隱由你決定</span>
        </div>
        ${(n=e.story)!=null&&n.confirmed?`<p class="share-help">只有已確認嘅故事先可以分享。家人掃描 QR code，就可以睇故事同留言。</p>
          <div class="share-controls">
            <label class="consent-toggle"><input id="sharing-consent" type="checkbox" ${(r=e.sharing)!=null&&r.enabled?"checked":""} /> 我同意分享呢段故事</label>
            <button id="create-share" class="primary" ${(l=e.sharing)!=null&&l.enabled?"":"disabled"}>產生分享 QR Code</button>
          </div>
          ${(d=e.sharing)!=null&&d.enabled?`<div class="share-result">
            <div class="qr" aria-label="故事分享 QR Code">${X()}</div>
            <div>
              <strong>已建立私人分享頁</strong>
              <p class="share-url">${c(e.sharing.url)}</p>
              <div class="share-buttons">
                <button id="share-whatsapp" class="share-button whatsapp" aria-label="分享到 WhatsApp">${q.whatsapp}<span>WhatsApp</span></button>
                <button id="share-facebook" class="share-button facebook" aria-label="分享到 Facebook">${q.facebook}<span>Facebook</span></button>
                <button id="share-wechat" class="share-button wechat" aria-label="分享到微信">${q.wechat}<span>微信</span></button>
                <button id="copy-share" class="share-button copy">複製連結</button>
                <button id="native-share" class="share-button more">更多分享</button>
              </div>
              <button id="open-share" class="text-button">預覽故事分享頁</button>
            </div>
          </div>`:""}`:'<p class="share-help">完成故事確認後，先可以產生 QR Code 分享頁。</p>'}
      </section>
      <section class="memory-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">保存一段回憶</p>
            <h2>加一張舊相</h2>
          </div>
          <span class="step">下一步</span>
        </div>
        ${e.photo?`<article class="story-card">
          <img src="${e.photo.image}" alt="${c(e.photo.title||"長者上載的舊相")}" />
          <div class="story-card-content">
            <span class="ai-label">AI 整理・請長者確認</span>
            <h3>${c(e.photo.title||"未命名回憶")}</h3>
            ${e.photo.year?`<p class="memory-meta">${c(e.photo.year)}${e.photo.people?` · ${c(e.photo.people)}`:""}</p>`:""}
            <p>${c(e.photo.caption||"你可以補充呢張相背後嘅故事。")}</p>
            ${e.photo.confirmed?'<div class="confirmed">✓ 已由長者確認，加入故事書</div>':'<button id="confirm-story" class="primary">我確認，加入故事書</button>'}
            <button id="remove-photo" class="text-button">移除呢張相</button>
          </div>
        </article>`:`<form id="photo-form" class="photo-form">
          <label class="upload-box" for="photo-input">
            <span class="upload-icon">＋</span>
            <strong>上載一張舊相</strong>
            <small>可以從手機相簿選擇，圖片只保存在此瀏覽器</small>
          </label>
          <input id="photo-input" type="file" accept="image/*" />
          <div class="photo-fields">
            <input id="photo-title" placeholder="相片標題，例如：婆婆煮飯嘅廚房" />
            <input id="photo-year" inputmode="numeric" placeholder="大約年份（可留空）" />
            <input id="photo-people" placeholder="相中人物（可留空）" />
            <textarea id="photo-caption" rows="3" placeholder="想記低嘅故事或長者原句（可留空）"></textarea>
          </div>
          <button class="primary" type="submit">生成故事卡</button>
        </form>`}
      </section>
      <form id="composer" class="${e.paused?"disabled":""}">
        <input id="manual-input" aria-label="輸入你想講嘅內容" placeholder="可以打字，或者撳咪講嘢…" ${e.paused?"disabled":""} />
        <button class="mic ${e.listening?"active":""}" type="button" id="listen" aria-label="開始粵語語音輸入"><span>${e.listening?"■":"🎙"}</span><small>${e.listening?"停止":"講廣東話"}</small></button>
        <button class="send" type="submit" ${e.paused?"disabled":""}>送出</button>
      </form>
      <footer>
        <button id="clear" class="text-button">清除本次逐字稿</button>
        <span>內容只儲存在此瀏覽器（Demo）</span>
      </footer>
      <details class="trust"><summary>了解憶旅如何工作</summary><p>${c(V)}</p></details>
    </div>`,document.querySelector("#listen").addEventListener("click",F),document.querySelectorAll("[data-workflow-stage]").forEach(o=>o.addEventListener("click",()=>{e.workflowStage=Number(o.dataset.workflowStage),i()})),document.querySelectorAll("[data-topic]").forEach(o=>o.addEventListener("click",()=>te(o.dataset.topic))),(p=document.querySelector("#change-topic"))==null||p.addEventListener("click",()=>{e.topic="",localStorage.removeItem("yiloi-topic-v1"),i()}),document.querySelector("#caregiver-view").addEventListener("click",()=>{e.view="caregiver",i()}),document.querySelector("#focus-view").addEventListener("click",()=>{e.focusMode=!0,i()}),document.querySelector("#load-demo").addEventListener("click",()=>{e.messages.length&&!confirm("載入 Demo 內容會取代目前逐字稿，是否繼續？")||se()}),(v=document.querySelector("#sharing-consent"))==null||v.addEventListener("change",o=>{document.querySelector("#create-share").disabled=!o.target.checked}),(f=document.querySelector("#create-share"))==null||f.addEventListener("click",()=>{e.sharing={enabled:!0,url:`${window.location.origin}${window.location.pathname}?story=demo-${Date.now()}`},ee(),i()}),(u=document.querySelector("#copy-share"))==null||u.addEventListener("click",async o=>{await copyShareUrl(),o.currentTarget.textContent="已複製連結"}),(L=document.querySelector("#share-whatsapp"))==null||L.addEventListener("click",()=>{window.open(`https://wa.me/?text=${encodeURIComponent(`${x()} ${k()}`)}`,"_blank","noopener,noreferrer")}),(I=document.querySelector("#share-facebook"))==null||I.addEventListener("click",()=>{window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(k())}`,"_blank","noopener,noreferrer")}),(D=document.querySelector("#share-wechat"))==null||D.addEventListener("click",async o=>{await copyShareUrl(),o.currentTarget.textContent="連結已複製",alert("分享連結已複製，請貼到微信對話或朋友圈。")}),(T=document.querySelector("#native-share"))==null||T.addEventListener("click",async o=>{if(navigator.share){await navigator.share({title:x(),text:x(),url:k()});return}await copyShareUrl(),o.currentTarget.textContent="連結已複製"}),(A=document.querySelector("#open-share"))==null||A.addEventListener("click",()=>{window.open(e.sharing.url,"_blank","noopener,noreferrer")}),document.querySelector("#composer").addEventListener("submit",o=>{o.preventDefault();const m=document.querySelector("#manual-input");j(m.value),m.value=""}),document.querySelector("#clear").addEventListener("click",()=>{confirm("確定清除本次逐字稿？")&&(e.messages=[],E(),i())}),(R=document.querySelector("#photo-form"))==null||R.addEventListener("submit",o=>{o.preventDefault();const m=document.querySelector("#photo-input").files[0];if(!m){alert("請先選擇一張相片。");return}const g=new FileReader;g.onload=()=>{e.photo={image:g.result,title:document.querySelector("#photo-title").value.trim(),year:document.querySelector("#photo-year").value.trim(),people:document.querySelector("#photo-people").value.trim(),caption:document.querySelector("#photo-caption").value.trim(),confirmed:!1},y(),i()},g.readAsDataURL(m)}),(O=document.querySelector("#create-story"))==null||O.addEventListener("click",()=>{var o;e.story={title:((o=e.photo)==null?void 0:o.title)||"我記得嘅一段日子",text:_(),confirmed:!1},b(),i()}),(C=document.querySelector("#save-story-draft"))==null||C.addEventListener("click",()=>{e.story.text=document.querySelector("#story-editor").value.trim(),e.story.confirmed=!1,b(),i()}),(M=document.querySelector("#confirm-story-text"))==null||M.addEventListener("click",()=>{const o=document.querySelector("#story-editor").value.trim();if(!o){alert("請先寫一點故事內容。");return}e.story.text=o,e.story.confirmed=!0,b(),i()}),(N=document.querySelector("#confirm-story"))==null||N.addEventListener("click",()=>{e.photo.confirmed=!0,y(),i()}),(H=document.querySelector("#remove-photo"))==null||H.addEventListener("click",()=>{e.photo=null,y(),i()}),document.querySelectorAll("[data-speak]").forEach(o=>o.addEventListener("click",()=>S(o.dataset.speak))),(P=document.querySelector("#notify-caregiver"))==null||P.addEventListener("click",o=>{o.currentTarget.textContent="已通知照顧者（Demo）",o.currentTarget.disabled=!0}),(U=document.querySelector("#resume"))==null||U.addEventListener("click",()=>{e.paused=!1,h("agent","好，我哋休息一陣先。你準備好嘅時候，再同我講都得。")})}K()||(e.messages.length===0?h("agent","你好，我係憶旅，一個 AI 回憶助手，唔係真人。我唔會問你銀行資料、身份證號碼或者地址。今日食咗飯未？我哋可以先輕鬆傾兩句。"):i());
