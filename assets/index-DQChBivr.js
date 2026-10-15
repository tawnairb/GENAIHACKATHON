(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const p of l.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&r(p)}).observe(document,{childList:!0,subtree:!0});function a(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(n){if(n.ep)return;n.ep=!0;const l=a(n);fetch(n.href,l)}})();const X=`
你是「憶旅」的廣東話 AI 回憶助手，不是真人，也不是醫療工具。
你不會要求銀行資料、密碼、身份證號碼、住址或其他敏感身份資料。
用親切、有耐性、口語化的香港廣東話回應。具體呼應長者剛才說的關鍵字，
不要只說空泛的「好叻呀」。長者是故事的共同創作者：不可捏造人名、年份、
地點或事件；不確定的內容要標記「待確認」，並請長者審閱。
先從輕鬆、正面的生活或年輕時回憶開始。長者主動提到敏感經歷才溫柔跟進。
如果出現自傷字眼，立即停止追問，鼓勵聯絡真人照顧者並顯示求助選項。
單節對話最多 45 分鐘；沉默時關心但不催促。
`.trim(),ee=["想死","自殺","唔想生存","活著冇意思","好唔開心","太辛苦","冇人理"],te=["戰亂","喪偶","病痛","過身","去世"],V="yiloi-transcript-v1",F="yiloi-story-v1",Q="yiloi-share-v1",se="SpeechRecognition"in window||"webkitSpeechRecognition"in window,oe=window.SpeechRecognition||window.webkitSpeechRecognition,e={messages:JSON.parse(localStorage.getItem(V)||"[]"),photo:JSON.parse(localStorage.getItem("yiloi-photo-v1")||"null"),story:JSON.parse(localStorage.getItem(F)||"null"),sharing:JSON.parse(localStorage.getItem(Q)||"null"),view:"caregiver",topic:localStorage.getItem("yiloi-topic-v1")||"",focusMode:!1,workflowStage:1,listening:!1,paused:!1,startedAt:Date.now(),recognition:null},q=document.querySelector("#app");function d(t){return t.replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[s])}function ae(){return`<svg viewBox="0 0 19 19" role="img" aria-label="故事分享 QR Code">${["1111111001011111111","1000001011011000001","1011101000011011101","1011101011011011101","1011101001011011101","1000001010111000001","1111111010101111111","0000000011010000000","1101111010111011011","0010100101100100100","1110011110011110001","0101110001110001110","1111111001001011011","1000001011110010100","1011101000101110111","1011101011001001001","1011101000111011100","1000001011010010111","1111111010101110101"].map((s,a)=>[...s].map((r,n)=>r==="1"?`<rect x="${n}" y="${a}" width="1" height="1" />`:"").join("")).join("")}</svg>`}function B(){var a,r,n,l,p,v,h,f;if(!new URLSearchParams(window.location.search).has("story")||!((a=e.story)!=null&&a.confirmed))return!1;const t=JSON.parse(localStorage.getItem("yiloi-family-response-v1")||"null"),s=e.story.title||"我的回憶";return q.innerHTML=`<div class="shell share-page">
    <header class="topbar"><div><span class="brand-mark">憶</span><span class="brand">憶旅</span></div><span class="step">長者已確認</span></header>
    <section class="share-hero"><p class="eyebrow">一段留給家人的回憶</p><h1>${d(s)}</h1><p>呢段故事由長者親自審閱及確認。你可以慢慢睇，亦可以分享一小段自己嘅故事。</p></section>
    <div class="chapter-progress"><span class="active">1</span><i></i><span class="${t?"active":""}">2</span><i></i><span class="${t?"active":""}">3</span></div>
    <p class="chapter-label">CHAPTER 1 · 公公的故事</p>
    ${(r=e.photo)!=null&&r.image?`<img class="shared-photo" src="${e.photo.image}" alt="${d(e.photo.title||"回憶相片")}" />`:""}
    <article class="shared-story"><span class="ai-label">長者已確認</span><p>${d(e.story.text)}</p></article>
    <section class="family-invite">
      <p class="eyebrow">輪到你了</p><h2>你還記得自己第一次工作嗎？</h2>
      <p>可以錄一段語音、寫幾句，或者跳過，繼續睇故事。你唔需要註冊帳戶。</p>
      ${t?`<div class="response-saved"><strong>✓ 你已分享</strong><p>${d(t.text)}</p></div>
        <section class="connection-card"><span class="ai-label">兩代人的第一次工作</span><h3>不同年代，相似的第一次</h3><p>公公 18 歲做裁縫，家人分享了自己的第一份工作。呢兩段經歷可以成為下一次見面時嘅話題。</p></section>`:`<div class="response-options">
          <button id="family-voice" class="response-option"><span>🎙</span><strong>錄一段語音分享</strong><small>保留你自己嘅語氣</small></button>
          <button id="family-text" class="response-option"><span>✍</span><strong>寫幾句就好</strong><small>分享一小段回憶</small></button>
          <button id="family-skip" class="response-option muted"><span>→</span><strong>先跳過</strong><small>繼續睇故事</small></button>
        </div>
        <div id="family-composer" class="family-composer" hidden><textarea id="family-note" rows="4" placeholder="例如：我第一份暑期工係喺咖啡店做，每日都好緊張。"></textarea><div><button id="save-family-note" class="primary">分享呢段回憶</button><button id="cancel-family-note" class="text-button">稍後先</button></div></div>`}
    </section>
    <section class="next-chapter"><p class="eyebrow">下一章</p><h2>屋企人返工返學後，一齊食飯</h2><p>繼續閱讀長者其他回憶，慢慢拼返一個屬於你哋嘅故事。</p><button id="continue-story" class="secondary">繼續睇故事（Demo）</button></section>
    <footer><span>憶旅・由長者決定分享內容</span><a href="${window.location.pathname}">返回我的憶旅</a></footer>
  </div>`,(n=document.querySelector("#family-text"))==null||n.addEventListener("click",()=>{document.querySelector("#family-composer").hidden=!1}),(l=document.querySelector("#family-voice"))==null||l.addEventListener("click",()=>{document.querySelector("#family-composer").hidden=!1,document.querySelector("#family-note").placeholder="語音 Demo：請先用文字輸入你想分享嘅內容。",document.querySelector("#family-note").focus()}),(p=document.querySelector("#family-skip"))==null||p.addEventListener("click",()=>{document.querySelector(".family-invite").innerHTML='<p class="eyebrow">繼續閱讀</p><h2>你可以之後先分享</h2><p>唔緊要，先睇長者嘅下一段故事。下次返嚟，仍然可以分享你嘅回憶。</p>'}),(v=document.querySelector("#save-family-note"))==null||v.addEventListener("click",()=>{const i=document.querySelector("#family-note").value.trim();i&&(localStorage.setItem("yiloi-family-response-v1",JSON.stringify({text:i,at:new Date().toISOString()})),B())}),(h=document.querySelector("#cancel-family-note"))==null||h.addEventListener("click",()=>{document.querySelector("#family-composer").hidden=!0}),(f=document.querySelector("#continue-story"))==null||f.addEventListener("click",i=>{i.currentTarget.textContent="下一章已打開（Demo）",i.currentTarget.disabled=!0}),!0}function x(){var t;return((t=e.sharing)==null?void 0:t.url)||window.location.href}function E(){var t;return`同你分享一段回憶：${((t=e.story)==null?void 0:t.title)||"我的回憶"}`}const L={whatsapp:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .4 5.2.4 11.7c0 2.1.6 4.1 1.6 5.9L.3 24l6.6-1.7a11.7 11.7 0 0 0 5.2 1.2h.1c6.4 0 11.7-5.2 11.7-11.7 0-3.1-1.2-6.1-3.4-8.3Zm-8.3 18c-1.6 0-3.2-.4-4.6-1.2l-.3-.2-3.9 1 1-3.8-.2-.4a9.7 9.7 0 1 1 8 4.6Zm5.3-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.6.1-.2.1-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.2 4.5 1.9.8 2.6.9 3.5.8.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z"/></svg>',facebook:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 24v-11h3.7l.6-4.3h-4.3V6c0-1.2.3-2.1 2.2-2.1h2.3V.1C17.6.1 16.4 0 15.1 0c-3.4 0-5.7 2.1-5.7 5.9v2.8H5.7V13h3.7v11h4.1Z"/></svg>',wechat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.8 4C4 4 .2 7.2.2 11.2c0 2.3 1.4 4.4 3.5 5.7l-.8 2.8 3.2-1.6c.8.2 1.7.3 2.6.3h.5c-.2-.6-.3-1.2-.3-1.9 0-3.6 3.4-6.5 7.7-6.5.5 0 1 0 1.4.1C17.4 6.5 13.6 4 8.8 4Zm-2.9 7.8c-.7 0-1.2-.5-1.2-1.1s.5-1.1 1.2-1.1 1.2.5 1.2 1.1-.5 1.1-1.2 1.1Zm5.7 0c-.7 0-1.2-.5-1.2-1.1s.5-1.1 1.2-1.1 1.2.5 1.2 1.1-.5 1.1-1.2 1.1Zm3.5 0c-4.1 0-7.4 2.6-7.4 5.9 0 3.2 3.3 5.8 7.4 5.8.8 0 1.6-.1 2.3-.3l2.8 1.4-.7-2.5c1.8-1.1 3-2.7 3-4.5 0-3.2-3.3-5.8-7.4-5.8Zm-2.4 5.2c-.6 0-1-.4-1-.9s.4-.9 1-.9 1 .4 1 .9-.4.9-1 .9Zm4.7 0c-.6 0-1-.4-1-.9s.4-.9 1-.9 1 .4 1 .9-.4.9-1 .9Z"/></svg>'};function I(){localStorage.setItem(V,JSON.stringify(e.messages))}function w(){localStorage.setItem("yiloi-photo-v1",JSON.stringify(e.photo))}function S(){localStorage.setItem(F,JSON.stringify(e.story))}function ne(){localStorage.setItem(Q,JSON.stringify(e.sharing))}const $=[["childhood","細個嘅生活","街坊、玩伴，同屋企嘅日子","☀"],["family","屋企人","一餐飯、一句說話，一個重要嘅人","♡"],["work","第一份工","人生第一步，做過最難忘嘅工作","▣"],["festival","節日回憶","過年、團年飯，同最熱鬧嘅時光","✦"],["proud","最自豪嘅事","你最想留俾家人知道嘅故事","★"],["message","留俾家人的話","想對屋企人講，但一直未講出口嘅話","✉"]];function re(t){e.topic=t,localStorage.setItem("yiloi-topic-v1",t);const s=$.find(([a])=>a===t);s&&e.messages.length<=1?y("agent",`好呀，我哋就由「${s[1]}」開始。你最先諗起邊一件事？`):c()}function Z(){const t=e.messages.filter(s=>s.role==="user");return t.length?t.map(s=>s.text).join(" "):""}function K(){var t,s,a,r,n,l,p;return((t=e.story)==null?void 0:t.profile)||{people:((s=e.photo)==null?void 0:s.people)||"婆婆、屋企人",place:(r=(a=e.photo)==null?void 0:a.title)!=null&&r.includes("深水埗")?"深水埗":"待長者補充",year:((n=e.photo)==null?void 0:n.year)||"待長者補充",quote:((p=(l=e.story)==null?void 0:l.text)==null?void 0:p.split("。")[0])||"待長者選出原句"}}function Y(){e.messages=[{role:"agent",text:"你好，我係憶旅，一個 AI 回憶助手，唔係真人。我唔會問你銀行資料、身份證號碼或者地址。今日食咗飯未？",at:new Date().toISOString()},{role:"user",text:"我細個住喺深水埗，最鍾意睇婆婆煮飯。",at:new Date().toISOString()},{role:"agent",text:"你記得深水埗同婆婆煮飯，嗰個廚房一定好有味道。婆婆最常煮咩餸？",at:new Date().toISOString()},{role:"user",text:"佢最叻煮梅菜扣肉，屋企人返工返學都會一齊食。",at:new Date().toISOString()},{role:"agent",text:"原來梅菜扣肉係你哋一家人一齊食飯嘅回憶。呢句好值得保留落嚟。",at:new Date().toISOString()}],e.photo={image:ie(),title:"婆婆煮梅菜扣肉的廚房",year:"1968",people:"婆婆、屋企人",caption:"婆婆最叻煮梅菜扣肉，屋企人返工返學都會一齊食。",confirmed:!0},e.sharing=null,e.story={title:"深水埗的飯香",text:"我細個住喺深水埗，最鍾意記得婆婆煮飯。佢最叻煮梅菜扣肉，屋企人返工返學都會一齊食。對我嚟講，呢個唔只係一道餸，而係一家人坐埋一齊嘅日子。",confirmed:!0,profileConfirmed:!0,profile:{people:"婆婆、屋企人",place:"深水埗",year:"1968",quote:"我細個住喺深水埗，最鍾意記得婆婆煮飯。"},sharePermissions:{story:!0,quote:!0,photo:!0,details:!1}},I(),w(),S(),c()}function ie(){return`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
    <rect width="900" height="600" fill="#e8d0ae"/>
    <rect x="75" y="80" width="750" height="440" rx="24" fill="#fff7e9"/>
    <circle cx="300" cy="265" r="90" fill="#b97752"/>
    <circle cx="610" cy="270" r="90" fill="#d29b70"/>
    <path d="M180 440h520v40H180z" fill="#8e6046"/>
    <text x="450" y="145" text-anchor="middle" font-family="sans-serif" font-size="34" fill="#79513d">一齊食飯的日子</text>
    <text x="450" y="570" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#79513d">Demo 示意圖片</text>
  </svg>`)}`}function k(t){if(!("speechSynthesis"in window))return;window.speechSynthesis.cancel();const s=new SpeechSynthesisUtterance(t);s.lang="zh-HK",s.rate=.85;const a=window.speechSynthesis.getVoices();s.voice=a.find(r=>/yue|zh[-_]HK|粵|廣東|Cantonese/i.test(`${r.lang} ${r.name}`))||a.find(r=>/zh[-_]HK/i.test(r.lang)),window.speechSynthesis.speak(s)}function y(t,s,a={}){e.messages.push({role:t,text:s,at:new Date().toISOString(),...a}),I(),c()}function ce(t){const s=t.toLowerCase();return s.includes("唔記得")?"唔緊要，我哋慢慢諗。嗰陣時有冇一首歌、一種食物，或者電視劇令你諗返起嗰段日子？":s.includes("食")||s.includes("飯")?"你頭先講到食嘢，聽落你好記得嗰種味道。以前邊個最常煮俾你食？":s.includes("細個")||s.includes("年輕")||s.includes("以前")?"你講到以前嘅日子喇。當時你住喺邊度？附近有冇一個你特別記得嘅地方？":`我聽到你講「${t.slice(0,36)}${t.length>36?"…":""}」。呢個細節好有畫面，你當時身邊仲有邊個人？`}function le(t){return ee.some(s=>t.includes(s))}function G(t){if(!t.trim()||e.paused)return;if(y("user",t.trim()),le(t)){e.paused=!0,y("agent","多謝你肯同我講呢啲感受。你唔使一個人頂住，我哋而家先停一停，搵真人照顧者陪住你。"),k("多謝你肯同我講呢啲感受。我哋而家先停一停，搵真人照顧者陪住你。");return}const s=ce(t),a=te.some(r=>t.includes(r));y("agent",a?`我聽到你提到一段重要而可能難受嘅經歷。${s}如果你想休息，我哋可以下次再傾。`:s),k(a?`我聽到你提到一段重要而可能難受嘅經歷。${s}`:s)}function W(){var t;if(!se){document.querySelector("#manual-input").focus();return}if(e.listening){(t=e.recognition)==null||t.stop();return}e.recognition=new oe,e.recognition.lang="zh-HK",e.recognition.interimResults=!1,e.recognition.continuous=!1,e.recognition.onstart=()=>{e.listening=!0,c()},e.recognition.onend=()=>{e.listening=!1,c()},e.recognition.onerror=()=>{e.listening=!1,c()},e.recognition.onresult=s=>G(s.results[0][0].transcript),e.recognition.start(),c()}function de(){var a;const t=[...e.messages].reverse().find(r=>r.role==="agent"),s=[...e.messages].reverse().find(r=>r.role==="user");q.innerHTML=`<div class="focus-shell">
    <header class="focus-topbar">
      <button id="exit-focus" class="focus-back">← 返回完整畫面</button>
      <span class="brand"><span class="brand-mark">憶</span>憶旅</span>
      <span class="focus-time">本節 ${Math.floor((Date.now()-e.startedAt)/6e4)} / 45 分鐘</span>
    </header>
    <main class="focus-main">
      <p class="eyebrow">${e.topic?`主題：${d(((a=$.find(([r])=>r===e.topic))==null?void 0:a[1])||"")}`:"廣東話語音對話"}</p>
      <div class="focus-orb ${e.listening?"is-listening":""}"><span>${e.listening?"■":"🎙"}</span></div>
      <h1>${e.listening?"我聽緊你講…":"可以同我講嘢喇"}</h1>
      <p class="focus-hint">${e.listening?"講完之後，我會耐心聽你講完。":"撳住下面個咪高風，慢慢講就得。"}</p>
      ${s?`<div class="focus-transcript"><span>你剛才講：</span><p>「${d(s.text)}」</p></div>`:""}
      ${t?`<div class="focus-agent"><span>憶旅</span><p>${d(t.text)}</p><button id="focus-speak" class="speak-button">🔊 再讀一次</button></div>`:""}
      <button id="focus-listen" class="focus-mic ${e.listening?"active":""}"><span>${e.listening?"■":"🎙"}</span><strong>${e.listening?"停止聆聽":"按一下開始講"}</strong></button>
      <div class="focus-actions"><button id="focus-rest" class="secondary">休息一陣</button><button id="focus-end" class="text-button">結束今次對話</button></div>
    </main>
  </div>`,document.querySelector("#exit-focus").addEventListener("click",()=>{e.focusMode=!1,c()}),document.querySelector("#focus-listen").addEventListener("click",W),document.querySelector("#focus-speak").addEventListener("click",()=>k((t==null?void 0:t.text)||"")),document.querySelector("#focus-rest").addEventListener("click",()=>alert("好，我哋休息一陣先。準備好再撳咪高風。")),document.querySelector("#focus-end").addEventListener("click",()=>{e.focusMode=!1,c()})}function pe(){const t=[["1","活動前","真人準備傾偈","背景卡、建議題目、避開話題"],["2","活動中","真人陪伴對話","AI 記錄、標記重點，不打斷交流"],["3","活動後","一起確認及延續","故事卡、家人回應、下一次話題"]],s={1:`<div class="workflow-content">
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
    <div class="workflow-steps">${t.map(([a,r,n])=>`<button class="workflow-step ${e.workflowStage===Number(a)?"active":""}" data-workflow-stage="${a}"><b>${a}</b><strong>${r}</strong><small>${n}</small></button>`).join("")}</div>
    ${s[e.workflowStage]}
  </section>`}function ue(){var a,r,n,l,p,v,h,f;(a=e.story)!=null&&a.confirmed||e.story;const t=e.workflowStage,s={1:`<div class="caregiver-stage-grid">
      <section class="caregiver-card profile-card">
        <p class="eyebrow">長者備忘卡</p><h2>阿梅婆婆</h2>
        <p class="muted">深水埗 / 石硤尾 · 成長背景速讀</p>
        <div class="caregiver-divider"></div>
        <small>成長經歷</small><p>成長於石硤尾，18 歲起於深水埗製衣廠工作逾 20 年；性格爽朗好客，最拿手煮梅菜扣肉。</p>
        <small>溝通與健康提示</small><p>右耳聽力稍弱，對話時需正面面向長者，語速放慢。</p>
        <div class="caregiver-alert"><strong>⚠ 避開話題提醒</strong><span>避免主動問及丈夫數年前因病離世細節；若長者感傷，以溫和傾聽與適當為主。</span></div>
      </section>
      <section class="caregiver-card topic-card-panel">
        <p class="eyebrow">今日破冰題目</p><h2>選擇交談切入點</h2>
        <p class="muted">選取一個容易喚起愉快記憶的生活話題：</p>
        <button class="caregiver-topic selected" data-caregiver-topic="work"><strong>第一份工・車衣廠歲月</strong><span>年輕時的自豪感、師傅經歷、出第一份糧的滋味</span><small>開場問句：「阿梅婆婆，你仲記唔記得 18 歲嗰陣第一份工係做咩？」</small><b>✓ 今日已選</b></button>
        <button class="caregiver-topic" data-caregiver-topic="food"><strong>一餐飯與最重要的人</strong><span>圍坐開飯的味道、長輩手藝、難忘的團圓時光</span><small>開場問句：「細個圍埋食飯，邊個餸最令你記得？」</small></button>
        <button class="caregiver-topic" data-caregiver-topic="neighbourhood"><strong>舊樓鄰里與童年歲月</strong><span>石硤尾徙置區、走廊乘涼、街坊鄰里人情味</span><small>開場問句：「以前住樓嗰陣，街坊之間係咪好熱鬧？」</small></button>
        <button id="start-session" class="primary caregiver-start">開始陪伴長者（進入活動中） →</button>
      </section>
    </div>`,2:`<div class="caregiver-stage-grid">
      <section class="caregiver-card live-card">
        <div class="stage-card-heading"><div><p class="eyebrow">活動中・真人傾談</p><h2>專心望住阿梅婆婆</h2></div><span class="live-indicator">● 進行中</span></div>
        <p class="muted">AI 只在背景記錄，不會代替你發問。</p>
        <div class="live-transcript">${e.messages.length?e.messages.slice(-3).map(i=>`<p><strong>${i.role==="user"?"阿梅婆婆":"AI 記錄"}</strong>${d(i.text)}</p>`).join(""):"<p><strong>等待對話</strong>你可以由今日已選的題目開始。</p>"}</div>
        <div class="keyword-row"><span>深水埗 · 地點</span><span>18 歲 · 年份</span><span>裁縫 · 工作</span></div>
        <button id="open-conversation" class="primary caregiver-start">開啟對話工具 →</button>
      </section>
      <section class="caregiver-card followup-card"><p class="eyebrow">AI 幕後提示</p><h2>可以稍後追問</h2><div class="followup-item">「你當時第一日返工，最記得邊一樣嘢？」</div><div class="followup-item">「第一份人工，你有冇買啲嘢俾屋企人？」</div><div class="caregiver-note">如果長者感到疲倦，可以先休息，不需要完成所有問題。</div></section>
    </div>`,3:`<div class="caregiver-stage-grid">
      <section class="caregiver-card recap-card"><p class="eyebrow">活動後・手帳</p><h2>把今日對話留低</h2><p class="muted">長者確認後，故事才會交給家人，成為下一次見面的起點。</p><div class="recap-list"><div><strong>今日完成</strong><span>✓ 記錄第一份工作故事</span><span>✓ 找到深水埗與裁縫關鍵詞</span></div><div><strong>下次可以繼續</strong><span>・第一次出糧用來做什麼</span><span>・當年工作的同事和師傅</span></div></div><button id="open-story-profile" class="primary caregiver-start">查看 Story Profile →</button></section>
      <section class="caregiver-card next-visit-card"><p class="eyebrow">下一次見面</p><h2>留一句接續提示</h2><div class="next-visit-quote">「下次可以問阿梅婆婆：第一份人工有冇買嘢俾屋企人？」</div><p class="muted">這不是 AI 結論，而是給下一位訪問者的溫柔提示。</p><button id="back-to-prep" class="secondary caregiver-start">返回活動前準備</button></section>
    </div>`};q.innerHTML=`<div class="shell dashboard">
    <header class="topbar">
      <div class="brand-lockup"><span class="brand-mark">憶</span><div><span class="brand">憶旅・照顧者工作台</span><small>真人陪伴・AI 幕後支援</small></div></div>
      <div class="caregiver-top-actions"><span class="resident-chip">阿梅婆婆（82 歲）</span><button id="back-to-senior" class="secondary">切換長者全屏</button><button class="size-button">標準</button><button class="size-button">大字</button><button id="load-demo" class="demo-button">▶ 示範數據</button></div>
    </header>
    <nav class="stage-tabs">${[["1","活動前・準備"],["2","活動中・傾談"],["3","活動後・手帳"]].map(([i,g])=>`<button class="${t===Number(i)?"active":""}" data-caregiver-stage="${i}"><b>${i}</b>${g}</button>`).join("")}</nav>
    ${s[t]}
    <p class="dashboard-note">Demo 介面：真實版本會根據長者同意及機構權限顯示資料。</p>
  </div>`,document.querySelector("#back-to-senior").addEventListener("click",()=>{e.view="senior",c()}),document.querySelectorAll("[data-caregiver-stage]").forEach(i=>i.addEventListener("click",()=>{e.workflowStage=Number(i.dataset.caregiverStage),c()})),(r=document.querySelector("#start-session"))==null||r.addEventListener("click",()=>{e.workflowStage=2,c()}),(n=document.querySelector("#open-conversation"))==null||n.addEventListener("click",()=>{var i;e.view="senior",e.workflowStage=2,c(),(i=document.querySelector(".conversation"))==null||i.scrollIntoView({behavior:"smooth"})}),(l=document.querySelector("#open-story-profile"))==null||l.addEventListener("click",()=>{var i;e.view="senior",c(),(i=document.querySelector(".story-section"))==null||i.scrollIntoView({behavior:"smooth"})}),(p=document.querySelector("#back-to-prep"))==null||p.addEventListener("click",()=>{e.workflowStage=1,c()}),(v=document.querySelector("#load-demo"))==null||v.addEventListener("click",()=>Y()),document.querySelectorAll("[data-caregiver-topic]").forEach(i=>i.addEventListener("click",()=>{document.querySelectorAll("[data-caregiver-topic]").forEach(g=>g.classList.remove("selected")),i.classList.add("selected")})),(h=document.querySelector("#dashboard-preview"))==null||h.addEventListener("click",()=>{var i;e.view="senior",c(),(i=document.querySelector(".story-section"))==null||i.scrollIntoView({behavior:"smooth"})}),(f=document.querySelector("#dashboard-message"))==null||f.addEventListener("click",()=>alert("家人留言功能（Demo）"))}function c(){var n,l,p,v,h,f,i,g,A,C,D,T,R,O,M,N,P,H,U,_,j;if(e.focusMode){de();return}if(e.view==="caregiver"){ue();return}const t=Math.floor((Date.now()-e.startedAt)/6e4),s=$.find(([o])=>o===e.topic),a=((n=e.story)==null?void 0:n.confirmed)&&e.story.profileConfirmed!==!1,r=e.messages.length?e.messages.map(o=>`<article class="message ${o.role}">
        <span class="role">${o.role==="agent"?"憶旅":"我"}</span>
        <p>${d(o.text)}</p>
        ${o.role==="agent"?`<button class="speak-button" data-speak="${d(o.text)}">🔊 再讀一次</button>`:""}
      </article>`).join(""):'<div class="empty"><span class="wave">☊</span><p>準備好聽你講故事喇。</p></div>';q.innerHTML=`
    <div class="shell">
      <header class="topbar">
        <div><span class="brand-mark">憶</span><span class="brand">憶旅</span></div>
        <div class="top-actions">
          <button id="load-demo" class="demo-button">▶ Demo 示範</button>
          <button id="caregiver-view" class="dashboard-button">訪問者工作台</button>
          <button id="focus-view" class="focus-button">全屏傾偈</button>
          <span class="timer">本節 ${t} / 45 分鐘</span>
        </div>
      </header>
      <section class="intro">
        <p class="eyebrow">真人陪伴・AI 幕後支援</p>
        <h1>${s?`今日講吓：${s[1]}`:"今日想由邊段回憶開始？"}</h1>
        <p>訪問者會由頭到尾陪住你傾偈。憶旅只會幫忙記錄、整理同準備下一次話題。</p>
      </section>
      ${pe()}
      <section class="topic-section">
        <div class="section-heading">
          <div><p class="eyebrow">揀一個你想講嘅方向</p><h2>由邊段回憶開始？</h2></div>
          ${s?'<button id="change-topic" class="text-button">更換主題</button>':""}
        </div>
        <div class="topic-grid">
          ${$.map(([o,u,m,b])=>`<button class="topic-card ${o===e.topic?"selected":""}" data-topic="${o}">
            <span class="topic-icon">${b}</span><strong>${u}</strong><small>${m}</small>
          </button>`).join("")}
        </div>
      </section>
      ${e.paused?`<section class="safety-alert" role="alert">
        <strong>我哋先停一停</strong>
        <p>你嘅感受好重要。請搵身邊嘅真人照顧者陪住你。</p>
        <button id="notify-caregiver" class="primary">叫人嚟幫手（模擬通知）</button>
        <button id="resume" class="secondary">休息／下次再講</button>
      </section>`:""}
      <section class="conversation" aria-live="polite">${r}</section>
      <section class="story-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">長者主導</p>
            <h2>整理成一段故事</h2>
          </div>
          <span class="step">需要確認</span>
        </div>
        ${e.story?`<article class="story-review">
          <span class="ai-label">AI 整理・${a?"已確認":"尚未確認"}</span>
          <h3>${d(e.story.title||"我的回憶")}</h3>
          <p class="review-help">以下內容只係草稿。你可以直接修改，確認後先會加入故事書。</p>
          <div class="profile-heading"><div><p class="eyebrow">Story Profile</p><strong>長者可以逐項確認嘅資料</strong></div><span class="step">${a?"已確認":"待確認"}</span></div>
          <div class="profile-fields">
            ${Object.entries({people:"人物",place:"地點",year:"年份",quote:"長者原句"}).map(([o,u])=>`<label class="profile-field"><input type="checkbox" data-profile="${o}" ${a?"checked":""} /><span><small>${u}</small><strong>${d(K()[o])}</strong></span></label>`).join("")}
          </div>
          <textarea id="story-editor" rows="7" aria-label="故事內容">${d(e.story.text)}</textarea>
          <div class="review-actions">
            <button id="save-story-draft" class="secondary">儲存修改</button>
            ${a?'<div class="confirmed">✓ 已加入故事書</div>':'<button id="confirm-story-text" class="primary">確認 Story Profile 及故事</button>'}
          </div>
          <p class="review-help profile-disclaimer">AI 只係整理內容，未經長者逐項確認前，不會加入故事書或分享。</p>
        </article>`:`<div class="story-empty">
          <p>對話後，憶旅會將你講過嘅內容整理成草稿。</p>
          <button id="create-story" class="primary" ${Z()?"":"disabled"}>整理對話成故事草稿</button>
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
        ${a?`<p class="share-help">只有已確認嘅故事先可以分享。家人掃描 QR code，就可以睇故事同留言。</p>
          <div class="share-controls">
            <label class="consent-toggle"><input id="sharing-consent" type="checkbox" ${(l=e.sharing)!=null&&l.enabled?"checked":""} /> 我同意分享呢段故事</label>
            <button id="create-share" class="primary" ${(p=e.sharing)!=null&&p.enabled?"":"disabled"}>產生分享 QR Code</button>
          </div>
          ${(v=e.sharing)!=null&&v.enabled?`<div class="share-result">
            <div class="qr" aria-label="故事分享 QR Code">${ae()}</div>
            <div>
              <strong>已建立私人分享頁</strong>
              <p class="share-url">${d(e.sharing.url)}</p>
              <div class="share-buttons">
                <button id="share-whatsapp" class="share-button whatsapp" aria-label="分享到 WhatsApp">${L.whatsapp}<span>WhatsApp</span></button>
                <button id="share-facebook" class="share-button facebook" aria-label="分享到 Facebook">${L.facebook}<span>Facebook</span></button>
                <button id="share-wechat" class="share-button wechat" aria-label="分享到微信">${L.wechat}<span>微信</span></button>
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
          <img src="${e.photo.image}" alt="${d(e.photo.title||"長者上載的舊相")}" />
          <div class="story-card-content">
            <span class="ai-label">AI 整理・請長者確認</span>
            <h3>${d(e.photo.title||"未命名回憶")}</h3>
            ${e.photo.year?`<p class="memory-meta">${d(e.photo.year)}${e.photo.people?` · ${d(e.photo.people)}`:""}</p>`:""}
            <p>${d(e.photo.caption||"你可以補充呢張相背後嘅故事。")}</p>
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
      <details class="trust"><summary>了解憶旅如何工作</summary><p>${d(X)}</p></details>
    </div>`,document.querySelector("#listen").addEventListener("click",W),document.querySelectorAll("[data-workflow-stage]").forEach(o=>o.addEventListener("click",()=>{e.workflowStage=Number(o.dataset.workflowStage),c()})),document.querySelectorAll("[data-topic]").forEach(o=>o.addEventListener("click",()=>re(o.dataset.topic))),(h=document.querySelector("#change-topic"))==null||h.addEventListener("click",()=>{e.topic="",localStorage.removeItem("yiloi-topic-v1"),c()}),document.querySelector("#caregiver-view").addEventListener("click",()=>{e.view="caregiver",c()}),document.querySelector("#focus-view").addEventListener("click",()=>{e.focusMode=!0,c()}),document.querySelector("#load-demo").addEventListener("click",()=>{e.messages.length&&!confirm("載入 Demo 內容會取代目前逐字稿，是否繼續？")||Y()}),(f=document.querySelector("#sharing-consent"))==null||f.addEventListener("change",o=>{document.querySelector("#create-share").disabled=!o.target.checked}),(i=document.querySelector("#create-share"))==null||i.addEventListener("click",()=>{e.sharing={enabled:!0,url:`${window.location.origin}${window.location.pathname}?story=demo-${Date.now()}`},ne(),c()}),(g=document.querySelector("#copy-share"))==null||g.addEventListener("click",async o=>{await copyShareUrl(),o.currentTarget.textContent="已複製連結"}),(A=document.querySelector("#share-whatsapp"))==null||A.addEventListener("click",()=>{window.open(`https://wa.me/?text=${encodeURIComponent(`${E()} ${x()}`)}`,"_blank","noopener,noreferrer")}),(C=document.querySelector("#share-facebook"))==null||C.addEventListener("click",()=>{window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(x())}`,"_blank","noopener,noreferrer")}),(D=document.querySelector("#share-wechat"))==null||D.addEventListener("click",async o=>{await copyShareUrl(),o.currentTarget.textContent="連結已複製",alert("分享連結已複製，請貼到微信對話或朋友圈。")}),(T=document.querySelector("#native-share"))==null||T.addEventListener("click",async o=>{if(navigator.share){await navigator.share({title:E(),text:E(),url:x()});return}await copyShareUrl(),o.currentTarget.textContent="連結已複製"}),(R=document.querySelector("#open-share"))==null||R.addEventListener("click",()=>{window.open(e.sharing.url,"_blank","noopener,noreferrer")}),document.querySelector("#composer").addEventListener("submit",o=>{o.preventDefault();const u=document.querySelector("#manual-input");G(u.value),u.value=""}),document.querySelector("#clear").addEventListener("click",()=>{confirm("確定清除本次逐字稿？")&&(e.messages=[],I(),c())}),(O=document.querySelector("#photo-form"))==null||O.addEventListener("submit",o=>{o.preventDefault();const u=document.querySelector("#photo-input").files[0];if(!u){alert("請先選擇一張相片。");return}const m=new FileReader;m.onload=()=>{e.photo={image:m.result,title:document.querySelector("#photo-title").value.trim(),year:document.querySelector("#photo-year").value.trim(),people:document.querySelector("#photo-people").value.trim(),caption:document.querySelector("#photo-caption").value.trim(),confirmed:!1},w(),c()},m.readAsDataURL(u)}),(M=document.querySelector("#create-story"))==null||M.addEventListener("click",()=>{var u,m,b,z,J;const o=Z();e.story={title:((u=e.photo)==null?void 0:u.title)||"我記得嘅一段日子",text:o,confirmed:!1,profileConfirmed:!1,profile:{people:((m=e.photo)==null?void 0:m.people)||"待長者補充",place:(z=(b=e.photo)==null?void 0:b.title)!=null&&z.includes("深水埗")?"深水埗":"待長者補充",year:((J=e.photo)==null?void 0:J.year)||"待長者補充",quote:o.split("。")[0]||"待長者選出原句"},sharePermissions:{story:!0,quote:!1,photo:!1,details:!1}},S(),c()}),(N=document.querySelector("#save-story-draft"))==null||N.addEventListener("click",()=>{e.story.text=document.querySelector("#story-editor").value.trim(),e.story.confirmed=!1,S(),c()}),(P=document.querySelector("#confirm-story-text"))==null||P.addEventListener("click",()=>{const o=document.querySelector("#story-editor").value.trim();if(!o){alert("請先寫一點故事內容。");return}if([...document.querySelectorAll("[data-profile]")].some(m=>!m.checked)){alert("請先逐項確認人物、地點、年份同原句。");return}e.story.text=o,e.story.confirmed=!0,e.story.profileConfirmed=!0,e.story.profile=K(),S(),c()}),(H=document.querySelector("#confirm-story"))==null||H.addEventListener("click",()=>{e.photo.confirmed=!0,w(),c()}),(U=document.querySelector("#remove-photo"))==null||U.addEventListener("click",()=>{e.photo=null,w(),c()}),document.querySelectorAll("[data-speak]").forEach(o=>o.addEventListener("click",()=>k(o.dataset.speak))),(_=document.querySelector("#notify-caregiver"))==null||_.addEventListener("click",o=>{o.currentTarget.textContent="已通知照顧者（Demo）",o.currentTarget.disabled=!0}),(j=document.querySelector("#resume"))==null||j.addEventListener("click",()=>{e.paused=!1,y("agent","好，我哋休息一陣先。你準備好嘅時候，再同我講都得。")})}B()||(e.messages.length===0?y("agent","你好，我係憶旅，一個 AI 回憶助手，唔係真人。我唔會問你銀行資料、身份證號碼或者地址。今日食咗飯未？我哋可以先輕鬆傾兩句。"):c());
