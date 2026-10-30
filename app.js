(function(){
"use strict";
const DIMS = [{"n": "热情与职业呈现", "w": 0.1, "q": "如果这是一位真人老师，这堂课会让家长觉得专业、可信吗？", "c": ["① 语气热情、有能量，语调有起伏，不平淡机械，也不过度夸张", "② 态度稳定，始终积极、亲切", "③ 内容和用语适合儿童", "④ 像老师而不是随意聊天的AI：不跑题、不闲扯"], "b": [["10分 卓越", "• 全程热情、有感染力，状态随活动自然变化\n• 专业亲切不夸张，没有突兀或无关表现"], ["9分 优秀", "• 全程热情、自然、专业，紧扣课堂\n• 个别时刻语气略平或略用力"], ["7–8分 良好", "• 整体热情专业，偶有语气平淡、略夸张或一两句无关的话"], ["5–6分 合格", "• 友好但能量一般，语气偏平或时有夸张\n• 偶尔跑题或情绪不稳\n• 像老师但缺少感染力"], ["3–4分 待改进", "• 语气机械或夸张做作\n• 多次跑题闲聊\n• 状态前后明显不一致"], ["1–2分 不合格", "• 出现不适合儿童的内容或情绪失当，基本不像在上课"]], "only": "老师整体的精神状态和职业感", "notin": "能否听懂 → 语速与语言；对孩子个人的关注 → 建立关系；教学步骤 → 教学策略与闭环"}, {"n": "语速与语言", "w": 0.15, "q": "孩子能听懂老师在说什么吗？老师说的英语准确吗？", "c": ["① 难度适配：语速适中，句子不过长，词汇和语法不超出该级别", "② 主动调整自己说的话：不等孩子说“慢一点”“听不懂”，就根据孩子的反应和回答质量（与目标答案的差距）调整语速、句长和用词：吃力时放慢、简化或换种说法，轻松时适当提高", "③ 指令简短明确，一次只说一件事", "④ 发音清楚，停顿和重音自然，关键词听得清", "⑤ 全英文，没有无意义的口头语和多余、重复的 Teacher Talk", "⑥ 老师的英语准确：讲解和示范没有用词、语法或发音错误"], "b": [["10分 卓越", "• 不等孩子提出，就能根据反应和回答质量及时、精准地调整语速、句长和用词，让孩子始终能听懂、又略有挑战\n• 全程清楚准确，几乎没有多余的 Teacher Talk"], ["9分 优秀", "• 语速、句长、用词与级别完全匹配，孩子吃力时通常能主动放慢或简化\n• 表达准确，发音清晰\n• 指令简短，一听就懂"], ["7–8分 良好", "• 基本匹配级别，偶有句子偏长、个别超纲词或多余重复\n• 偶尔主动调整，多数在孩子提出后才调整"], ["5–6分 合格", "• 多处偏快或偏慢、句子偏长或超纲，Teacher Talk 偏多，或偶有用词、语法不规范\n• 只在孩子提出“慢一点”“听不懂”后才调整，孩子常需老师重复"], ["3–4分 待改进", "• 语言明显高于或低于孩子水平，孩子提出“听不懂”后也不调整或调整无效\n• 指令混乱，口头语多\n• 或老师的英语有明显错误"], ["1–2分 不合格", "• 孩子大部分时间听不懂\n• 或多次讲错、示范错，误导孩子"]], "only": "老师说的话是否准确、易懂，语速和语言难度是否随孩子调整", "notin": "孩子是否回应 → 互动与参与；任务难度和提示的调整 → 教学策略与闭环"}, {"n": "互动与参与", "w": 0.15, "q": "孩子是在投入地参与课堂，还是只是在听AI说话？", "c": ["① 回应孩子真正说的内容，不是不管孩子说什么都照脚本往下走", "② 追问恰当，对话能自然延伸", "③ 从孩子的回应中识别犹豫、困惑或分心（如长时间沉默、答非所问），并把孩子拉回来", "④ 给孩子选择和主导的机会（选角色、选话题、向老师提问）", "⑤ 节奏合理：孩子说话时不抢话；老师回应及时，不冷场"], "b": [["10分 卓越", "• 全程有来有往\n• 各种回应（包括犹豫和沉默）都自然接住，孩子分心时迅速拉回、不打断学习\n• 孩子主动表达、主动提问"], ["9分 优秀", "• 每次都回应孩子真正说的内容，追问自然\n• 孩子犹豫、沉默或答非所问时及时拉回\n• 孩子全程积极回应"], ["7–8分 良好", "• 大多数时候回应到位，偶有一两次照脚本往下走或没接住孩子的话"], ["5–6分 合格", "• 回应模板化（如说完 Great 直接下一题），追问少\n• 孩子回应时有时无或答非所问时，老师常没接住"], ["3–4分 待改进", "• 经常忽略孩子的话自顾自讲，或频繁抢话\n• 孩子长时间沉默或敷衍时，老师不处理"], ["1–2分 不合格", "• 基本是单向灌输，孩子几乎不参与"]], "only": "有没有真实的双向互动，老师有没有注意到、接住孩子", "notin": "孩子说了多少、说得多好 → 学生输出；用什么方法等待和提示 → 教学策略与闭环；纠错时打断 → 纠错"}, {"n": "学生输出", "w": 0.1, "q": "这堂课让孩子产生了多少有意义的语言输出？", "c": ["① 生:师开口时长达到参考线（Lv1–2 3:7 · Lv3–4 4:6 · Lv5–6 5:5；孩子思考的停顿不算老师时长）", "② 输出达到级别期望：Lv1 准确模仿；Lv2 起能用完整句回答，不只是单词或 yes/no", "③ 有表达自己想法的个人化回答，不只是机械跟读", "④ 输出用到了本课目标语言"], "b": [["10分 卓越", "• 开口比例达到或超过参考线\n• 输出达到甚至高于级别期望，孩子从模仿走向相对独立、有意义的表达"], ["9分 优秀", "• 开口比例达到参考线\n• 输出达到级别期望，有个人化表达，用到本课目标语言"], ["7–8分 良好", "• 开口比例接近参考线\n• 输出基本达到级别期望，个人化表达或目标语言稍少"], ["5–6分 合格", "• 开口比例低于参考线\n• 输出低于级别期望（如 Lv2 以上仍多为单词或跟读），个人化表达少"], ["3–4分 待改进", "• 开口明显不足，以 yes/no 或简单跟读为主，几乎没有自己组织语言"], ["1–2分 不合格", "• 孩子几乎没开口，或开口内容与本课目标无关"]], "only": "孩子实际说出的语言（数量、完整度、独立性）", "notin": "老师如何引导、提示和检查 → 教学策略与闭环"}, {"n": "纠错", "w": 0.15, "q": "老师有没有抓住最值得教的错误，并用合适的方法帮孩子改正？", "c": ["① 发现发音、语法、词汇和理解错误", "② 不误纠：不把孩子说对的判成错", "③ 优先纠最值得教的错误（与本课目标相关、影响理解、反复出现），不过度打断", "④ 方式恰当：直接纠正、提示、重述、引导自我修正或澄清请求", "⑤ 让孩子再说一遍正确形式，确认改对了"], "b": [["10分 卓越", "• 准确把握纠什么、何时纠、怎么纠，无误纠、无多余打断\n• 孩子能自己说出正确形式"], ["9分 优秀", "• 准确发现关键错误，无误纠\n• 优先纠与目标相关的错误，方法得当\n• 通常让孩子再说一遍确认"], ["7–8分 良好", "• 抓住了主要错误，方法基本合适\n• 偶有漏纠、纠得过早，或没确认是否改对"], ["5–6分 合格", "• 纠错不均衡：漏掉重要错误或打断过多\n• 方法单一（只给正确答案），纠完不检查"], ["3–4分 待改进", "• 大量重要错误被忽略，或频繁打断让孩子不敢说\n• 出现误纠"], ["1–2分 不合格", "• 基本不纠错，或多次误纠，误导孩子"]], "only": "错误的识别、处理和修正效果", "notin": "纠错时孩子的情绪 → 建立关系；新内容的示范和练习 → 教学策略与闭环"}, {"n": "建立关系", "w": 0.1, "q": "孩子能否从老师的回应中感到被关注、被理解，并愿意继续尝试？", "c": ["① 亲切地叫名字打招呼，从容告别", "② 接住孩子本课分享的内容；有历史记录时，记得孩子之前说过的话", "③ 表扬具体、真诚，不反复机械地说 Good job", "④ 孩子犯错或迟疑时语气耐心、不责备，孩子仍愿意继续说", "⑤ 孩子沮丧时（如说 I can't、声音变小）先安慰再教"], "b": [["10分 卓越", "• 交流自然、个性化而不过度\n• 细致接住孩子话语中的分享、努力和情绪（如语气低落、说不会），孩子愿意持续尝试"], ["9分 优秀", "• 叫名字、从容开场与告别\n• 接住孩子的分享，兴趣真诚\n• 表扬具体\n• 孩子犯错或沮丧时被妥善安抚"], ["7–8分 良好", "• 关系温暖自然\n• 个性化回应稍少，或表扬偶尔笼统"], ["5–6分 合格", "• 礼貌但模板化：表扬多为 Good job，很少回应孩子的个人分享，部分情绪信号没接住"], ["3–4分 待改进", "• 冷淡敷衍，忽略孩子的分享\n• 孩子犯错或沮丧时不安抚，甚至语气不耐烦"], ["1–2分 不合格", "• 冷漠、不尊重，或语气严厉、责备，让孩子不敢再说"]], "only": "老师对这个孩子的关注、回应和情绪支持", "notin": "整体热情 → 热情与职业呈现；催促、不留思考时间 → 教学策略与闭环"}, {"n": "TPR与教具", "w": 0.1, "q": "老师有没有用动作、图片、教具等直观手段，帮孩子理解和记住语言？", "c": ["① Lv1–3 使用多样、恰当的 TPR、教具和课件（图片、实物、动画）", "② 辅助手段与语言内容对应、指向清楚，真正帮助理解，不是装饰或干扰", "③ 引导孩子跟着做动作（如 Clap your hands!），不只是老师自己演示", "④ Lv4–6 按需使用（如抽象词、易混点），不为用而用"], "b": [["10分 卓越", "• 动作、图片、教具选得准、配合好，抽象词和易混点一看就懂\n• 经常引导孩子跟做\n• 不冗余"], ["9分 优秀", "• Lv1–3：辅助手段与语言精准对应，明显帮助理解，多次引导孩子跟做\n• Lv4–6：使用适度"], ["7–8分 良好", "• 使用恰当、有帮助\n• 种类稍少，或很少引导孩子跟做"], ["5–6分 合格", "• 有使用但单一或时机不佳，与内容对应不紧\n• 多是老师自己演示，很少引导孩子跟做"], ["3–4分 待改进", "• Lv1–3 很少用直观手段，孩子难以理解\n• 或手段与内容不符、动作含糊"], ["1–2分 不合格", "• Lv1–3 完全靠口头讲解\n• 或辅助内容错误、误导孩子\n• 或 Lv4–6 过度依赖教具，挤占语言练习"]], "only": "动作、图片、教具等非语言辅助是否选得对、用得好", "notin": "检查理解、提示、难度调整 → 教学策略与闭环"}, {"n": "教学策略与闭环", "w": 0.15, "q": "老师是围绕教学目标一步步把孩子教会，还是只在陪聊或直接给答案？", "c": ["① 目标与复现：能看出清晰的教学目标（如目标词汇、句型）；核心内容在各环节反复出现，换形式练习和检验，并有控制地拓展，不是讲一次就结束", "② 示范与梯度：先给清楚的语言示范（动作示范和跟做归 TPR 与教具），再从跟说、替换练习到独立表达逐步放手；过渡自然、节奏合适，不跳步、不无效重复、不仓促", "③ 提问与等待：问题清楚，孩子开口前留足思考时间，不催促、不替孩子回答", "④ 分步支持：孩子卡住时逐步给提示（首字母、选项、句型），最后才给答案", "⑤ 检查理解：按级别确认孩子真懂，不只问“Do you understand?”（Lv1–2 用看图问答、二选一、Yes/No 等一个词能答的方式；Lv3 起用概念检查问题或小任务）", "⑥ 主动调整难度：根据孩子表现，会了就减少提示、加大难度，吃力就把任务拆成小步", "⑦ 收尾回顾：带孩子回顾本课重点并自己说出来，确认目标达成"], "b": [["10分 卓越", "• 目标与复现：目标清晰，核心内容反复出现，换形式练习、检验并有控制地拓展\n• 策略：示范、等待、提示、检查都恰到好处，并主动调整难度\n• 达成：每个目标点都走完“示范→练习→检查→确认学会”，课末带孩子回顾并自己说出本课重点，闭环完整"], ["9分 优秀", "• 目标与复现：目标清楚，核心内容多次复现，换形式练习和检验\n• 策略：先示范再要求，留足时间，分层提示，有效检查，按掌握情况调整难度，结尾让孩子回顾\n• 达成：主要目标点都做了检查和确认，结尾带孩子回顾"], ["7–8分 良好", "• 目标与复现：目标清楚，有复现但形式单一，或检验、拓展不够\n• 策略：基本有效，个别环节仓促、提示偏多，或检查、回顾不足\n• 达成：多数目标点做了检查和确认，个别目标点未确认或回顾不足"], ["5–6分 合格", "• 目标与复现：能看出目标，但复现少，多是同一形式重复\n• 策略：常跳步（没示范就让孩子说）、不留思考时间、只问 Do you understand?，难度不随孩子调整\n• 达成：只对部分内容做了检查，确认和回顾较少"], ["3–4分 待改进", "• 目标与复现：目标模糊，核心内容讲一次就过去\n• 策略：环节混乱或长时间卡住，孩子卡住时只重复原话或直接给答案，练习没有梯度\n• 达成：基本没有检查和确认，没有回顾"], ["1–2分 不合格", "• 目标与复现：看不出教学目标\n• 策略：基本没有教学设计，像聊天或单纯讲解\n• 达成：没有检查、确认或回顾"]], "only": "老师的教学动作：教学步骤、方法和任务难度的主动调整；“闭环”指围绕教学目标，核心内容反复出现，每个目标点都走完“示范→练习→检查→确认学会”，结尾回到目标回顾", "notin": "非语言辅助 → TPR与教具；错误处理 → 纠错；孩子实际说出的语言，包括课末能否独立说出目标语言 → 学生输出；抢话打断 → 互动与参与；开场和告别 → 建立关系；说话的语速和用词调整 → 语速与语言"}];
const SHORT = ['热情','语速','互动','输出','纠错','关系','TPR','策略'];
const ROOTS = ['课程','级别','识别','教学','产品','待查'];
const ROOT_TO = {'课程':'课程产品 / 教研','级别':'定级 / 排课','识别':'模型 / 工程','教学':'Prompt / 教学策略','产品':'产品 / 工程','待查':'专家复核'};
const DEFAULT_CFG = {roles:{}, teachers:['Kim','Leo','Max'],
  targets:{diff:[2,1], pass:[0.85,0.90], icc:[0.75,0.80], dim:[0.95,0.95]},
  export:{module:'课中 In-Class', channel:'TQA打分', local:'非本地化 / 通用'},
  review:{enabled:true, days:[2,3,4,5], daily_min:2, daily_max:5, weekly_min:10, weekly_max:20, per_scorer_min:2, levels:['Lv1','Lv2','Lv3','Lv4'], pool_days:14}};
const WD=['','周一','周二','周三','周四','周五','周六','周日'];
const $ = s => document.querySelector(s);
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const f1 = v => (v==null||isNaN(v))?'—':(Math.round(v*10)/10).toFixed(1);
const f2 = v => (v==null||isNaN(v))?'—':(Math.round(v*100)/100).toFixed(2);
const pct = v => (v==null||isNaN(v))?'—':Math.round(v*100)+'%';
const sgn = v => (v==null||isNaN(v))?'—':((v>0?'+':v<0?'−':'')+Math.abs(Math.round(v*100)/100).toFixed(2));
const today = () => { const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); };
const localDay = iso => { const d=new Date(iso); if(isNaN(d)) return ''; return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); };
const addDays = (s,n) => { const d=new Date(s+'T00:00:00'); d.setDate(d.getDate()+n); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); };
const weighted = s => (s.every(v=>typeof v==='number')) ? Math.round(s.reduce((a,v,i)=>a+v*DIMS[i].w,0)*100)/10 : null;
let toastT; function toast(m){ const t=$('#toast'); t.textContent=m; t.classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('on'),2600); }

const S = { uid:null, email:'', member:null, isAdmin:false, isOwner:false, myName:'',
  cfg:JSON.parse(JSON.stringify(DEFAULT_CFG)), mine:[], all:[], members:[], loaded:false,
  scores:Array(8).fill(null), editing:null, needName:false, renaming:false, progAxis:'scored', filter:{from:'',to:'',type:'',rev:''}, openRow:null, includeUnfmt:false, authMode:'login',
  isExpert:false, tasks:[], myTasks:[], fromTask:null, cmpOpen:null, cmpData:{}, rvWeek:null };

/* ---------------- data layer (Supabase) ---------------- */
const CONF = window.TQA_CONFIG || {};
const API = window.__TQA_MOCK_API || makeApi();
function makeApi(){
  if(!window.supabase||!CONF.supabaseUrl||/YOUR_/.test(CONF.supabaseUrl)) return null;
  const sb = window.supabase.createClient(CONF.supabaseUrl, CONF.supabaseAnonKey, {auth:{persistSession:true,autoRefreshToken:true}});
  const un = async p => { const {data,error} = await p; if(error) throw error; return data; };
  const pageAll = async mk => { const out=[]; for(let f=0;;f+=1000){ const d=await un(mk().range(f,f+999)); out.push(...d); if(d.length<1000) break; } return out; };
  return {
    session: async()=> (await sb.auth.getSession()).data.session,
    onAuth: cb => sb.auth.onAuthStateChange((ev,s)=>cb(ev,s)),
    signIn: (email,password)=> un(sb.auth.signInWithPassword({email,password})),
    signOut: ()=> sb.auth.signOut(),
    setPassword: password => un(sb.auth.updateUser({password})),
    account: async (action,email,password) => { const {data,error}=await sb.functions.invoke('tqa-account',{body:{action,email,password}});
      if(error) throw error; if(!data||!data.ok) throw {friendly:true,message:(data&&data.error)||'操作失败'}; return true; },
    claim: async()=> (await un(sb.rpc('claim_membership')))[0]||null,
    setMyName: name => un(sb.rpc('set_my_name',{p_name:name})),
    scores: uid => pageAll(()=>{ let q=sb.from('scores').select('*').order('created_at'); if(uid) q=q.eq('user_id',uid); return q; }),
    insertScore: row => un(sb.from('scores').insert(row).select().single()),
    updateScore: (id,row) => un(sb.from('scores').update(row).eq('id',id).select().single()),
    deleteScore: id => un(sb.from('scores').delete().eq('id',id)),
    members: () => un(sb.from('members').select('*').order('created_at')),
    addMember: m => un(sb.from('members').insert(m)),
    updateMember: (email,patch) => un(sb.from('members').update(patch).eq('email',email).select()),
    deleteMember: email => un(sb.from('members').delete().eq('email',email)),
    config: async()=> { const d=await un(sb.from('app_config').select('data').eq('id',1).maybeSingle()); return d?d.data:{}; },
    saveConfig: data => un(sb.from('app_config').update({data,updated_at:new Date().toISOString()}).eq('id',1).select()),
    reviewTasks: () => pageAll(()=>sb.from('review_tasks').select('*').order('task_date').order('created_at')),
    myReviewTasks: () => un(sb.rpc('my_review_tasks')),
    genReview: () => un(sb.rpc('generate_review_tasks',{p_manual:true})),
    cancelReview: id => un(sb.rpc('cancel_review_task',{p_id:id})),
    addReview: cls => un(sb.rpc('add_review_task',{p_class:cls})),
    reviewCompare: id => un(sb.rpc('review_compare',{p_id:id}))
  };
}
function fromDb(r){ return { id:r.id, user_id:r.user_id, import_role:r.import_role, source:r.source, date:r.date, type:r.type, level:r.level, lesson:r.lesson,
  classId:r.class_id, teacher:r.teacher, country:r.country, done:r.done, camera:r.camera, url:r.url, s:(r.s||[]).map(Number),
  total:r.total==null?null:Number(r.total), hl:r.hl, issues:r.issues, sugg:r.sugg,
  createdAt:r.source==='首批导入'?null:r.created_at, updatedAt:r.updated_at }; }
function errMsg(e){ if(e&&e.friendly) return e.message; const m=(e&&(e.message||e.error_description))||''; 
  if(/Invalid login/i.test(m)) return '邮箱或密码不对';
  if(/already registered|already exists/i.test(m)) return '这个邮箱已经设置过密码，请直接登录';
  if(/Password should be/i.test(m)) return '密码太短，至少 8 位';
  if(/Email not confirmed/i.test(m)) return '邮箱还没验证，请联系管理员';
  if(e&&e.code==='23505') return '这节课你已经打过分了，请在"我的记录"里编辑';
  if(/Failed to fetch|NetworkError|network/i.test(m)) return '网络连接失败，请检查网络后再试';
  if(/row-level security|permission/i.test(m)) return '没有权限执行这个操作';
  return m||'操作失败，请稍后再试'; }

/* ---------------- routing ---------------- */
const VIEWS=['score','mine','review','board','setup'];
function route(){
  let v=location.hash.slice(1); if(VIEWS.indexOf(v)<0) v='score';
  if((v==='board'||v==='setup') && !S.isAdmin) v='score';
  if(v==='review' && !S.isAdmin && !S.isExpert) v='score';
  const signedOut=!S.uid, denied=!!S.uid&&!S.member;
  const gate=!signedOut&&!denied&&(S.needName||S.renaming);
  $('#auth').hidden=!signedOut; $('#denied').hidden=!denied; $('#gate').hidden=!gate;
  $('#tabs').hidden=signedOut||denied||S.needName;
  const show=!signedOut&&!denied&&!gate;
  document.querySelectorAll('[data-view]').forEach(el=>el.hidden=!show||el.dataset.view!==v);
  document.querySelectorAll('.tabs a').forEach(a=>{ if(a.dataset.v===v) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
  if(!show) return;
  if(v==='mine') renderMine(); if(v==='review') renderReview(); if(v==='board') renderBoard(); if(v==='setup') renderSetup();
}
window.addEventListener('hashchange',route);

/* ---------------- score form ---------------- */
function buildDims(){
  const box=$('#dims');
  DIMS.forEach((d,i)=>{
    const el=document.createElement('div'); el.className='dim';
    el.innerHTML=`<div><div class="dn">${esc(d.n)}<small>${Math.round(d.w*100)}%</small></div><div class="dq">${esc(d.q)}</div></div>
      <div class="scale" role="group" aria-label="${esc(d.n)} 分数">${[1,2,3,4,5,6,7,8,9,10].map(v=>`<button type="button" data-d="${i}" data-v="${v}" aria-pressed="false">${v}</button>`).join('')}</div>
      <details><summary>评分要点</summary><div class="guide">
        <div><h4>检查项</h4><ul>${d.c.map(c=>`<li>${esc(c)}</li>`).join('')}</ul><h4 style="margin-top:8px">只看</h4><p>${esc(d.only)}</p><h4 style="margin-top:8px">不在此扣分</h4><p>${esc(d.notin)}</p></div>
        <div><h4>分档</h4>${d.b.map(([k,t])=>`<div class="band"><b>${esc(k)}</b><span>${esc(t).replace(/\n/g,'<br>')}</span></div>`).join('')}</div>
      </div></details>`;
    box.appendChild(el);
  });
  box.addEventListener('click',e=>{ const b=e.target.closest('.scale button'); if(!b) return;
    const i=+b.dataset.d, v=+b.dataset.v; S.scores[i]=(S.scores[i]===v)?null:v; paintScores(); });
}
function paintScores(){
  document.querySelectorAll('.scale button').forEach(b=>b.setAttribute('aria-pressed',String(S.scores[+b.dataset.d]===+b.dataset.v)));
  const n=S.scores.filter(v=>v!=null).length, t=weighted(S.scores);
  $('#total').innerHTML=(t==null?'—':t.toFixed(1))+'<small>/100</small>';
  const low=S.scores.map((v,i)=>v!=null&&v<6?SHORT[i]:null).filter(Boolean);
  let f=`已填 ${n}/8 个维度`;
  if(low.length) f+=` · <span class="pill bad">低于 6 分：${esc(low.join('、'))}</span>`;
  if(t!=null&&t<60) f+=` · <span class="pill bad">总分低于 60</span>`;
  $('#flags').innerHTML=f;
}
function fillTeachers(sel, cur){
  const list=(S.cfg.teachers||[]).slice(); if(cur&&list.indexOf(cur)<0) list.push(cur);
  sel.innerHTML=list.map(t=>`<option>${esc(t)}</option>`).join('')+'<option value="">其他 / 未知</option>';
  if(cur!=null) sel.value=cur;
}
function resetForm(keepCourse){
  S.editing=null; S.scores=Array(8).fill(null); if(!keepCourse){ S.fromTask=null; $('#taskHint').hidden=true; }
  if(!keepCourse){ ['f-lesson','f-class','f-country','f-url'].forEach(id=>$('#'+id).value=''); $('#f-date').value=today(); }
  ['f-hl','f-issues','f-sugg','b-time','b-text'].forEach(id=>$('#'+id).value=''); $('#b-sev').checked=false;
  $('#formTitle').textContent='新建打分'; $('#btnCancelEdit').hidden=true; $('#btnSave').textContent='保存记录'; $('#dupHint').hidden=true;
  paintScores();
}
function loadIntoForm(r){
  S.editing=r.id; $('#f-date').value=r.date||''; $('#f-type').value=r.type||'体验课'; $('#f-level').value=r.level||'Lv1';
  $('#f-lesson').value=r.lesson||''; $('#f-class').value=r.classId||''; fillTeachers($('#f-teacher'),r.teacher||'');
  $('#f-country').value=r.country||''; $('#f-done').value=r.done||'完课'; $('#f-cam').value=r.camera||'开'; $('#f-url').value=r.url||'';
  $('#f-hl').value=r.hl||''; $('#f-issues').value=r.issues||''; $('#f-sugg').value=r.sugg||'';
  S.scores=(r.s||[]).slice(0,8).map(v=>typeof v==='number'?v:null); while(S.scores.length<8) S.scores.push(null);
  $('#formTitle').textContent='编辑记录 · Class '+(r.classId||''); $('#btnCancelEdit').hidden=false; $('#btnSave').textContent='保存修改'; $('#dupHint').hidden=true;
  paintScores(); location.hash='score'; window.scrollTo(0,0);
}
function checkDup(){
  const c=$('#f-class').value.trim(); const h=$('#dupHint');
  const hit=c&&S.mine.find(r=>r.classId===c&&r.id!==S.editing);
  if(!hit){ h.hidden=true; return null; }
  h.hidden=false; h.innerHTML=`你已经给 Class ${esc(c)} 打过分（${esc(hit.date)}，总分 ${f1(hit.total)}）。<button class="btn sm" type="button" id="dupEdit">编辑那条记录</button>`;
  $('#dupEdit').onclick=()=>loadIntoForm(hit); return hit;
}
async function saveForm(e){
  e.preventDefault();
  if(!API||!S.member){ toast('请先登录'); return; }
  const date=$('#f-date').value, lesson=$('#f-lesson').value.trim(), cls=$('#f-class').value.trim();
  const miss=[]; if(!date) miss.push('看课日期'); if(!lesson) miss.push('Lesson ID'); if(!cls) miss.push('Class ID');
  const unset=S.scores.map((v,i)=>v==null?SHORT[i]:null).filter(Boolean); if(unset.length) miss.push('维度：'+unset.join('、'));
  if(miss.length){ toast('还没填：'+miss.join('；')); return; }
  if(!S.editing && checkDup()){ toast('这节课你已打过分，请编辑原记录'); return; }
  const row={date,type:$('#f-type').value,level:$('#f-level').value,lesson,class_id:cls,teacher:$('#f-teacher').value,
    country:$('#f-country').value.trim(),done:$('#f-done').value,camera:$('#f-cam').value,url:$('#f-url').value.trim(),
    s:S.scores.slice(),total:weighted(S.scores),hl:$('#f-hl').value.trim(),issues:$('#f-issues').value.replace(/\s+$/,''),sugg:$('#f-sugg').value.trim()};
  const btn=$('#btnSave'); btn.disabled=true;
  try{
    let saved;
    if(S.editing) saved=fromDb(await API.updateScore(S.editing,row));
    else saved=fromDb(await API.insertScore(Object.assign({user_id:S.uid},row)));
    const put=arr=>{ const i=arr.findIndex(r=>r.id===saved.id); if(i>=0) arr[i]=saved; else arr.push(saved); };
    put(S.mine); if(S.isAdmin) put(S.all);
    const wasTask=S.fromTask&&!S.editing;
    toast(S.editing?'已保存修改':(wasTask?'已保存，复评任务已完成':'已保存')); resetForm(false);
    if(wasTask){ await loadTasks(); location.hash='review'; }
  }catch(err){ toast(errMsg(err)); }
  finally{ btn.disabled=false; }
}

function addIssueLine(){
  const t=$('#b-time').value.trim(), x=$('#b-text').value.trim(), r=$('#b-root').value, sev=$('#b-sev').checked;
  if(!x){ toast('先写现象'); return; }
  const line=[t||'—',x.replace(/[|｜\n]/g,' '),r].join('｜')+(sev?'｜严重':'');
  const ta=$('#f-issues'); ta.value=(ta.value.replace(/\s+$/,'')?ta.value.replace(/\s+$/,'')+'\n':'')+line;
  $('#b-time').value=''; $('#b-text').value=''; $('#b-sev').checked=false; $('#b-text').focus();
}
/* ---------------- my records ---------------- */
function renderMine(){
  const box=$('#mineBody');
  
  const td=today(); const tdN=S.mine.filter(r=>localDay(r.createdAt)===td).length;
  const wk=addDays(td,-((new Date(td+'T00:00:00').getDay()+6)%7)); const wkN=S.mine.filter(r=>localDay(r.createdAt)>=wk).length;
  $('#mineStats').innerHTML=`<div class="kpi"><span class="v">${tdN}</span><span class="l">今天已打</span></div><div class="kpi"><span class="v">${wkN}</span><span class="l">本周已打</span></div><div class="kpi"><span class="v">${S.mine.length}</span><span class="l">累计</span></div>`;
  const rows=S.mine.slice().sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.updatedAt||'').localeCompare(a.updatedAt||''));
  if(!rows.length){ box.innerHTML='<div class="empty">还没有记录。到"打分"页填写第一节课，保存后会出现在这里。</div>'; return; }
  box.innerHTML=`<div class="tbl"><table><thead><tr><th>看课日期</th><th>课型</th><th>级别</th><th>Lesson</th><th>Class ID</th><th>老师</th>${SHORT.map(s=>`<th class="num">${s}</th>`).join('')}<th class="num">总分</th><th>问题</th><th></th></tr></thead><tbody>${
    rows.map(r=>`<tr class="click" data-id="${esc(r.id)}"><td class="mono">${esc(r.date)}</td><td>${esc(r.type)}</td><td>${esc(r.level)}</td><td class="mono">${esc(r.lesson)}</td><td class="mono">${esc(r.classId)}</td><td>${esc(r.teacher)}</td>${
      (r.s||[]).map(v=>`<td class="num${v<6?' low':''}">${v==null?'—':v}</td>`).join('')}<td class="num${r.total<60?' low':''}"><b>${f1(r.total)}</b></td><td class="num">${countLines(r.issues)}</td>
      <td class="row" style="flex-wrap:nowrap"><button class="btn sm" data-act="edit" type="button">编辑</button><button class="btn sm danger" data-act="del" type="button">删除</button></td></tr>
      ${S.openRow===r.id?`<tr class="detail"><td colspan="17">${detailText(r)}</td></tr>`:''}`).join('')}</tbody></table></div>`;
  box.onclick=async e=>{
    const tr=e.target.closest('tr[data-id]'); if(!tr) return; const r=S.mine.find(x=>x.id===tr.dataset.id); if(!r) return;
    const act=e.target.closest('button')&&e.target.closest('button').dataset.act;
    if(act==='edit'){ loadIntoForm(r); return; }
    if(act==='del'){ const b=e.target.closest('button');
      if(b.dataset.armed!=='1'){ b.dataset.armed='1'; b.textContent='确认删除'; setTimeout(()=>{ if(b.isConnected){ b.dataset.armed=''; b.textContent='删除'; } },3000); return; }
      try{ await API.deleteScore(r.id); S.mine=S.mine.filter(x=>x.id!==r.id); S.all=S.all.filter(x=>x.id!==r.id); toast('已删除'); renderMine(); }catch(e){ toast(errMsg(e)); } return; }
    S.openRow=(S.openRow===r.id)?null:r.id; renderMine();
  };
}
function countLines(t){ return (t||'').split('\n').filter(x=>x.trim()).length; }
function detailText(r){
  return `<b>亮点</b>\n${esc(r.hl||'—')}\n\n<b>问题</b>\n${esc(r.issues||'—')}\n\n<b>优化建议</b>\n${esc(r.sugg||'—')}${r.url?`\n\n<b>回放</b> <a href="${esc(r.url)}" target="_blank" rel="noopener">打开回放</a>`:''}`;
}
/* ---------------- data for board ---------------- */
function memberById(uid){ return S.members.find(m=>m.user_id===uid)||(S.member&&S.member.user_id===uid?S.member:null); }
function allRecords(){
  return S.all.map(r=>{ const rev=r.user_id||('import:'+(r.import_role||'regular')); return Object.assign({},r,{rev,role:roleOf(rev)}); });
}
function revName(id){ if(id==='import:regular') return '首批 · 打分者'; if(id==='import:expert') return '首批 · 专家';
  const m=memberById(id); if(m&&m.name) return m.name; if(m&&m.is_owner) return '管理员'; if(m) return m.email.split('@')[0]; return '已移除的成员'; }
function revKind(id){ if(id.indexOf('import:')===0) return '首批导入'; const m=memberById(id)||{}; return m.is_owner?'管理员（所有者）':m.is_admin?'管理员':'打分者'; }
function roleOf(id){ if(id.indexOf('import:')===0) return id.slice(7); const m=memberById(id); return m?m.compare_role:'none'; }
const ROLE_TXT={regular:'常规打分者',expert:'专家',none:'不参与对比'};

function inRange(r){ const f=S.filter; if(f.from&&(r.date||'')<f.from) return false; if(f.to&&(r.date||'')>f.to) return false; if(f.type&&r.type!==f.type) return false; return true; }
function parseIssues(r){
  const lines=(r.issues||'').replace(/\r/g,'').split('\n').map(x=>x.trim()).filter(Boolean);
  return lines.map(l=>{ const n=l.replace(/\|/g,'｜'); const p=n.split('｜').map(x=>x.trim());
    if(p.length>=3&&ROOTS.indexOf(p[2])>=0) return {ok:true,time:p[0]==='—'?'':p[0],text:p[1],root:p[2],sev:p[3]==='严重'};
    return {ok:false,time:'',text:l,root:'格式待查',sev:false}; });
}
function pairs(recs){
  const by={}; recs.forEach(r=>{ if(!r.classId||r.total==null) return; (by[r.classId]=by[r.classId]||{n:[],e:[]}); if(r.role==='regular') by[r.classId].n.push(r); else if(r.role==='expert') by[r.classId].e.push(r); });
  const out=[]; Object.keys(by).forEach(c=>{ const g=by[c]; if(!g.n.length||!g.e.length) return;
    const e=g.e.slice().sort((a,b)=>(b.updatedAt||'').localeCompare(a.updatedAt||''))[0];
    g.n.forEach(n=>out.push({c,n,e,d:n.total-e.total})); });
  return out;
}
function icc(P){ const n=P.length; if(n<3) return null;
  const x=P.map(p=>p.n.total), y=P.map(p=>p.e.total); const g=(x.reduce((a,b)=>a+b,0)+y.reduce((a,b)=>a+b,0))/(2*n);
  const mx=x.reduce((a,b)=>a+b,0)/n, my=y.reduce((a,b)=>a+b,0)/n;
  let ssr=0,sse=0; for(let i=0;i<n;i++){ const m=(x[i]+y[i])/2; ssr+=(m-g)**2; sse+=(x[i]-m-mx+g)**2+(y[i]-m-my+g)**2; }
  const msr=2*ssr/(n-1), msc=n*((mx-g)**2+(my-g)**2), mse=sse/(n-1);
  return (msr-mse)/(msr+mse+2*(msc-mse)/n); }
function stats(P){ const n=P.length; if(!n) return {n:0};
  let dim1=0,dimN=0; P.forEach(p=>{ for(let i=0;i<8;i++){ const a=p.n.s[i],b=p.e.s[i]; if(typeof a==='number'&&typeof b==='number'){ dimN++; if(Math.abs(a-b)<=1) dim1++; } } });
  return {n, diff:P.reduce((a,p)=>a+p.d,0)/n, pass:P.filter(p=>Math.abs(p.d)<=5).length/n, mae:P.reduce((a,p)=>a+Math.abs(p.d),0)/n,
    icc:icc(P), dim:dimN?dim1/dimN:null, mn:P.reduce((a,p)=>a+p.n.total,0)/n, me:P.reduce((a,p)=>a+p.e.total,0)/n}; }

/* ---------------- board ---------------- */
function setPreset(p){
  const t=today(); let from='',to='';
  if(p==='week'){ const d=new Date(t+'T00:00:00'); const wd=(d.getDay()+6)%7; from=addDays(t,-wd); to=addDays(from,6); }
  if(p==='d14'){ from=addDays(t,-13); to=t; } if(p==='d28'){ from=addDays(t,-27); to=t; }
  S.filter.from=from; S.filter.to=to; $('#q-from').value=from; $('#q-to').value=to;
  document.querySelectorAll('#presets button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.p===p)));
  renderBoard();
}
function statusPill(ok){ return ok==null?'<span class="pill neu">样本不足</span>':ok?'<span class="pill good">达到</span>':'<span class="pill bad">未达到</span>'; }
function scatter(P){
  if(P.length<2) return '<div class="empty">至少需要 2 节双人配对的课才能画图。</div>';
  const vals=P.flatMap(p=>[p.n.total,p.e.total]); let lo=Math.floor(Math.min(...vals)/5)*5, hi=Math.ceil(Math.max(...vals)/5)*5; if(hi-lo<20){ lo=Math.max(0,hi-20); }
  const W=440,H=400,x0=48,x1=424,y0=360,y1=16; const sx=v=>x0+(v-lo)/(hi-lo)*(x1-x0), sy=v=>y0-(v-lo)/(hi-lo)*(y0-y1);
  let s=`<svg viewBox="0 0 ${W} ${H}" class="viz" role="img" aria-label="打分者与专家总分散点图">`;
  s+=`<polygon class="band" points="${sx(lo)},${sy(lo+5)} ${sx(hi-5)},${sy(hi)} ${sx(hi)},${sy(hi)} ${sx(hi)},${sy(hi-5)} ${sx(lo+5)},${sy(lo)} ${sx(lo)},${sy(lo)}"/>`;
  for(let v=lo;v<=hi;v+=5){ s+=`<line class="grid" x1="${sx(v)}" x2="${sx(v)}" y1="${y1}" y2="${y0}"/><text class="tick" x="${sx(v)}" y="${y0+16}" text-anchor="middle">${v}</text><line class="grid" x1="${x0}" x2="${x1}" y1="${sy(v)}" y2="${sy(v)}"/><text class="tick" x="${x0-6}" y="${sy(v)+4}" text-anchor="end">${v}</text>`; }
  s+=`<line class="diag" x1="${sx(lo)}" y1="${sy(lo)}" x2="${sx(hi)}" y2="${sy(hi)}"/>`;
  P.forEach(p=>{ s+=`<circle class="dot${Math.abs(p.d)>5?' big':''}" cx="${sx(p.n.total).toFixed(1)}" cy="${sy(p.e.total).toFixed(1)}" r="5"><title>Class ${esc(p.c)} · ${esc(p.n.lesson)} · ${esc(p.n.teacher)}｜打分者 ${f1(p.n.total)} · 专家 ${f1(p.e.total)}</title></circle>`; });
  s+=`<text class="axl" x="${(x0+x1)/2}" y="${H-4}" text-anchor="middle">打分者总分</text><text class="axl" transform="translate(12,${(y0+y1)/2}) rotate(-90)" text-anchor="middle">专家总分</text></svg>`;
  return s;
}
function renderBoard(){
  const box=$('#boardBody'); if(!box) return;
  if(!API) return;
  const all=allRecords(); const ranged=all.filter(inRange);
  // reviewer filter options
  const revIds=[...new Set(all.map(r=>r.rev))]; const sel=$('#q-rev'); const cur=S.filter.rev;
  sel.innerHTML='<option value="">全部</option>'+revIds.map(id=>`<option value="${esc(id)}">${esc(revName(id))}</option>`).join(''); sel.value=cur;
  const shown=S.filter.rev?ranged.filter(r=>r.rev===S.filter.rev):ranged;
  if(!all.length){ box.innerHTML='<div class="empty">还没有任何打分记录。在「设置」里添加成员，他们保存后会出现在这里。</div>'; return; }
  const P=pairs(ranged), st=stats(P), T=S.cfg.targets||DEFAULT_CFG.targets;
  const ok={diff:st.n?Math.abs(st.diff)<=T.diff[0]:null, pass:st.n?Math.round(st.pass*100)>=Math.round(T.pass[0]*100):null,
    icc:st.icc==null?null:Math.round(st.icc*100)>=Math.round(T.icc[0]*100), dim:st.dim==null?null:Math.round(st.dim*100)>=Math.round(T.dim[0]*100)};
  const classes=new Set(shown.map(r=>r.classId)).size;
  let h=`<div class="kpis">
    <div class="kpi"><span class="v">${shown.length}</span><span class="l">打分记录</span></div>
    <div class="kpi"><span class="v">${classes}</span><span class="l">课程（Class ID）</span></div>
    <div class="kpi"><span class="v">${new Set(shown.map(r=>r.rev)).size}</span><span class="l">打分人</span></div>
    <div class="kpi"><span class="v">${P.length}</span><span class="l">打分者 / 专家配对</span></div>
    <div class="kpi"><span class="v">${f1(avg(shown.map(r=>r.total)))}</span><span class="l">平均总分</span></div></div>`;
  h+=progress(all);
  // consistency
  h+=`<div class="card"><h2>打分一致性<small>按 Class ID 配对常规打分者与专家；单周只作预警，累计约 40 节再判断是否达标</small></h2>`;
  if(!P.length) h+='<div class="empty">所选范围内还没有同一节课的常规打分者和专家双人记录。</div>';
  else{
    h+=`<div class="two"><div class="tbl"><table class="tgt"><thead><tr><th>指标</th><th class="num">初始阶段（暂定）</th><th class="num">稳定阶段</th><th class="num">本期</th><th>状态</th></tr></thead><tbody>
      <tr><td>打分者 − 专家平均差</td><td class="num">±${T.diff[0]} 以内</td><td class="num">±${T.diff[1]} 以内</td><td class="num">${sgn(st.diff)}</td><td>${statusPill(ok.diff)}</td></tr>
      <tr><td>±5 分内合格率</td><td class="num">≥${pct(T.pass[0])}</td><td class="num">≥${pct(T.pass[1])}</td><td class="num">${pct(st.pass)}</td><td>${statusPill(ok.pass)}</td></tr>
      <tr><td>ICC</td><td class="num">≥${T.icc[0]}</td><td class="num">≥${T.icc[1]}</td><td class="num">${st.icc==null?'—':f2(st.icc)}</td><td>${statusPill(ok.icc)}</td></tr>
      <tr><td>维度差 ≤1 分</td><td class="num">≥${pct(T.dim[0])}</td><td class="num">≥${pct(T.dim[1])}</td><td class="num">${pct(st.dim)}</td><td>${statusPill(ok.dim)}</td></tr>
      <tr><td>总分平均分差（参考）</td><td class="num">—</td><td class="num">—</td><td class="num">${f2(st.mae)}</td><td></td></tr>
      <tr><td>打分者均分 / 专家均分</td><td class="num">—</td><td class="num">—</td><td class="num">${f1(st.mn)} / ${f1(st.me)}</td><td></td></tr>
      </tbody></table></div><div><div class="hint">每个点是一节课；浅色带为 ±5 分，红点为差距超过 5 分。</div>${scatter(P)}</div></div>`;
    // per teacher + per novice
    const grp=(key,label)=>{ const m={}; P.forEach(p=>{ const k=key(p)||'未填'; (m[k]=m[k]||[]).push(p); });
      return `<div class="tbl"><table><thead><tr><th>${label}</th><th class="num">配对</th><th class="num">平均差</th><th class="num">±5 分内</th><th class="num">平均分差</th></tr></thead><tbody>${
        Object.keys(m).sort().map(k=>{ const s2=stats(m[k]); return `<tr><td>${esc(k)}</td><td class="num">${s2.n}</td><td class="num">${sgn(s2.diff)}</td><td class="num">${pct(s2.pass)}</td><td class="num">${f2(s2.mae)}</td></tr>`; }).join('')}</tbody></table></div>`; };
    h+=`<div class="two">${grp(p=>p.n.teacher,'老师')}${grp(p=>revName(p.n.rev),'打分者')}</div>`;
    // per dimension
    h+=`<div class="tbl"><table><thead><tr><th>维度</th><th class="num">打分者均分</th><th class="num">专家均分</th><th class="num">差（打分者 − 专家）</th><th class="num">完全一致</th><th class="num">差 ≤1</th><th class="num">打分者更高</th><th class="num">专家更高</th></tr></thead><tbody>${
      DIMS.map((d,i)=>{ const v=P.filter(p=>typeof p.n.s[i]==='number'&&typeof p.e.s[i]==='number'); if(!v.length) return '';
        const a=avg(v.map(p=>p.n.s[i])), b=avg(v.map(p=>p.e.s[i]));
        return `<tr><td>${esc(d.n)}</td><td class="num">${f1(a)}</td><td class="num">${f1(b)}</td><td class="num">${sgn(a-b)}</td><td class="num">${pct(v.filter(p=>p.n.s[i]===p.e.s[i]).length/v.length)}</td><td class="num">${pct(v.filter(p=>Math.abs(p.n.s[i]-p.e.s[i])<=1).length/v.length)}</td><td class="num">${v.filter(p=>p.n.s[i]>p.e.s[i]).length}</td><td class="num">${v.filter(p=>p.n.s[i]<p.e.s[i]).length}</td></tr>`; }).join('')}</tbody></table></div>`;
  }
  h+='</div>';
  // reviewer overview
  const byRev={}; shown.forEach(r=>(byRev[r.rev]=byRev[r.rev]||[]).push(r));
  h+=`<div class="card"><h2>打分人概览</h2><div class="tbl"><table><thead><tr><th>打分人</th><th>身份</th><th>对比角色</th><th class="num">节数</th><th class="num">体验 / 正式</th><th>级别</th><th class="num">平均总分</th>${SHORT.map(s=>`<th class="num">${s}</th>`).join('')}<th>最近看课</th></tr></thead><tbody>${
    Object.keys(byRev).map(id=>{ const L=byRev[id]; return `<tr><td>${esc(revName(id))}</td><td>${revKind(id)}</td><td>${ROLE_TXT[L[0].role]||''}</td><td class="num">${L.length}</td><td class="num">${L.filter(r=>r.type==='体验课').length} / ${L.filter(r=>r.type==='正式课').length}</td><td>${levelMix(L)}</td><td class="num">${f1(avg(L.map(r=>r.total)))}</td>${
      DIMS.map((_,i)=>`<td class="num">${f1(avg(L.map(r=>r.s&&r.s[i])))}</td>`).join('')}<td class="mono">${esc(L.map(r=>r.date).sort().pop()||'')}</td></tr>`; }).join('')}</tbody></table></div></div>`;
  // issues
  const iss=[]; shown.forEach(r=>parseIssues(r).forEach(x=>iss.push(Object.assign({r},x))));
  const fmt=iss.filter(x=>x.ok), unf=iss.length-fmt.length; const list=S.includeUnfmt?iss:fmt;
  const cnt={}; fmt.forEach(x=>cnt[x.root]=(cnt[x.root]||0)+1);
  h+=`<div class="card"><h2>问题汇总<small>来自"问题"栏中按"时间点｜现象｜根因"填写的行</small></h2>
    <div class="kpis">${ROOTS.map(k=>`<div class="kpi"><span class="v">${cnt[k]||0}</span><span class="l">${k} → ${ROOT_TO[k]}</span></div>`).join('')}</div>
    <div class="row"><span class="hint">共 ${fmt.length} 条按格式填写${unf?`；另有 ${unf} 行未按格式（多为首批导入的历史记录）`:''}</span><span class="spacer"></span>
      <label class="row hint" style="gap:4px"><input type="checkbox" id="incUnf" ${S.includeUnfmt?'checked':''}> 包含未按格式的行</label>
      <button class="btn sm" type="button" id="copyIss" ${list.length?'':'disabled'}>复制为多维表格格式</button></div>`;
  if(list.length){
    h+=`<div class="tbl"><table><thead><tr><th>看课日期</th><th>Lesson</th><th>老师</th><th>打分人</th><th>时间点</th><th>现象</th><th>根因</th><th>交给</th></tr></thead><tbody>${
      list.slice().sort((a,b)=>(b.r.date||'').localeCompare(a.r.date||'')).slice(0,300).map(x=>`<tr><td class="mono">${esc(x.r.date)}</td><td class="mono">${esc(x.r.lesson)}</td><td>${esc(x.r.teacher)}</td><td>${esc(revName(x.r.rev))}</td><td class="mono">${esc(x.time)}</td><td>${esc(x.text)}${x.sev?' <span class="pill bad">严重</span>':''}</td><td>${esc(x.root)}</td><td>${esc(ROOT_TO[x.root]||'按格式重写')}</td></tr>`).join('')}</tbody></table></div>`;
    if(list.length>300) h+=`<p class="hint">表格只显示最近 300 条；复制时包含全部 ${list.length} 条。</p>`;
  } else h+='<div class="empty">所选范围内还没有按格式填写的问题。</div>';
  h+='</div>';
  // all records
  const recs=shown.slice().sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  h+=`<div class="card"><div class="row"><h2>全部记录<small>点击一行查看亮点和问题</small></h2><span class="spacer"></span><button class="btn sm" type="button" id="csv">导出 CSV</button></div>
    <div class="tbl"><table><thead><tr><th>看课日期</th><th>打分人</th><th>课型</th><th>级别</th><th>Lesson</th><th>Class ID</th><th>老师</th>${SHORT.map(s=>`<th class="num">${s}</th>`).join('')}<th class="num">总分</th></tr></thead><tbody>${
    recs.slice(0,400).map(r=>{ const k=r.rev+'/'+r.id; return `<tr class="click" data-k="${esc(k)}"><td class="mono">${esc(r.date)}</td><td>${esc(revName(r.rev))}</td><td>${esc(r.type)}</td><td>${esc(r.level)}</td><td class="mono">${esc(r.lesson)}</td><td class="mono">${esc(r.classId)}</td><td>${esc(r.teacher)}</td>${
      (r.s||[]).map(v=>`<td class="num${v<6?' low':''}">${v==null?'—':v}</td>`).join('')}<td class="num${r.total<60?' low':''}"><b>${f1(r.total)}</b></td></tr>${S.openRow===k?`<tr class="detail"><td colspan="16">${detailText(r)}</td></tr>`:''}`; }).join('')}</tbody></table></div>
    ${recs.length>400?`<p class="hint">只显示最近 400 条；导出 CSV 包含全部 ${recs.length} 条。</p>`:''}</div>`;
  box.innerHTML=h;
  const ax=$('#progAxis'); if(ax) ax.onclick=e=>{ const b=e.target.closest('button'); if(b){ S.progAxis=b.dataset.a; renderBoard(); } };
  const inc=$('#incUnf'); if(inc) inc.onchange=()=>{ S.includeUnfmt=inc.checked; renderBoard(); };
  const cp=$('#copyIss'); if(cp) cp.onclick=()=>copyIssues(list);
  $('#csv').onclick=()=>exportCsv(recs);
  box.querySelectorAll('tr[data-k]').forEach(tr=>tr.onclick=()=>{ S.openRow=(S.openRow===tr.dataset.k)?null:tr.dataset.k; renderBoard(); });
}
function levelMix(L){ const m={}; L.forEach(r=>{ if(r.level) m[r.level]=(m[r.level]||0)+1; }); return Object.keys(m).sort().map(k=>`${esc(k)}×${m[k]}`).join(' · ')||'—'; }
function needsAttn(r){ return (r.total!=null&&r.total<60)||(r.s||[]).some(v=>typeof v==='number'&&v<6); }
function progress(all){
  const scored=S.progAxis==='scored'; const key=r=>scored?(localDay(r.createdAt)||r.date||''):(r.date||'');
  const f=S.filter; const L=all.filter(r=>{ const k=key(r); if(f.from&&k<f.from) return false; if(f.to&&k>f.to) return false; if(f.type&&r.type!==f.type) return false; if(f.rev&&r.rev!==f.rev) return false; return true; });
  const td=today(); const tdL=all.filter(r=>localDay(r.createdAt)===td);
  let h=`<div class="card"><div class="row"><h2>每日打分进度<small>今天：${new Set(tdL.map(r=>r.rev)).size} 人在打分，已完成 ${tdL.length} 节</small></h2><span class="spacer"></span>
    <div class="seg" id="progAxis" role="group" aria-label="日期口径"><button type="button" data-a="scored" aria-pressed="${scored}">按打分日期</button><button type="button" data-a="watched" aria-pressed="${!scored}">按看课日期</button></div></div>`;
  if(!L.length) return h+'<div class="empty">所选范围内没有打分记录。</div></div>';
  const days={}; L.forEach(r=>{ const k=key(r)||'未填'; (days[k]=days[k]||[]).push(r); });
  const ds=Object.keys(days).sort().reverse(); const mx=Math.max(...ds.map(d=>days[d].length));
  h+=`<div class="tbl"><table><thead><tr><th>日期</th><th class="num">打分人数</th><th>完成节数</th><th class="num">体验 / 正式</th><th>级别</th><th class="num">未完课</th><th class="num">平均总分</th><th class="num">问题条数</th><th class="num">需关注</th></tr></thead><tbody>${
    ds.map(d=>{ const D=days[d]; const at=D.filter(needsAttn).length; return `<tr><td class="mono">${esc(d)}</td><td class="num">${new Set(D.map(r=>r.rev)).size}</td><td><div class="barc"><i style="width:${Math.max(4,Math.round(D.length/mx*120))}px"></i><b>${D.length}</b></div></td><td class="num">${D.filter(r=>r.type==='体验课').length} / ${D.filter(r=>r.type==='正式课').length}</td><td>${levelMix(D)}</td><td class="num">${D.filter(r=>r.done==='未完课').length}</td><td class="num">${f1(avg(D.map(r=>r.total)))}</td><td class="num">${D.reduce((a,r)=>a+countLines(r.issues),0)}</td><td class="num${at?' low':''}">${at}</td></tr>`; }).join('')}</tbody></table></div>
    <p class="hint">需关注 = 总分低于 60 或有维度低于 6 分的课。${scored?'首批导入的记录没有打分时间，按看课日期计。':''}</p>`;
  const cols=ds.slice(0,14).reverse(); const revs=[...new Set(L.map(r=>r.rev))];
  h+=`<h3 style="margin:14px 0 6px;font-size:14px">打分人 × 日期${ds.length>14?' <small class="hint">（显示最近 14 天，合计为所选范围全部）</small>':''}</h3><div class="tbl mx"><table><thead><tr><th>打分人</th>${cols.map(d=>`<th class="num">${esc(d.slice(5))}</th>`).join('')}<th class="num">合计</th></tr></thead><tbody>${
    revs.map(id=>{ const R2=L.filter(r=>r.rev===id); return `<tr><td>${esc(revName(id))}${revKind(id).indexOf('管理员')===0&&revName(id)!=='管理员'?'<span class="tag">管理员</span>':''}</td>${cols.map(d=>{ const n=R2.filter(r=>(key(r)||'未填')===d).length; return `<td class="num${n?'':' zero'}">${n||'·'}</td>`; }).join('')}<td class="num"><b>${R2.length}</b></td></tr>`; }).join('')}</tbody></table></div></div>`;
  return h;
}
function avg(a){ const v=a.filter(x=>typeof x==='number'); return v.length?v.reduce((s,x)=>s+x,0)/v.length:null; }
function copyIssues(list){
  const E=S.cfg.export||DEFAULT_CFG.export; const clean=s=>String(s==null?'':s).replace(/[\t\r\n]+/g,' ');
  const rows=list.map(x=>{ const r=x.r; return [ x.text+'（'+r.lesson+(x.time?' · '+x.time:'')+'）', E.module, revName(r.rev), E.channel, E.local, '', x.sev?'P0':'', r.type, '', '', '',
    '根因：'+x.root+'；建议交给：'+(ROOT_TO[x.root]||'按格式重写')+'；老师：'+r.teacher+'；级别：'+r.level+'；看课日期：'+r.date+'；Class ID：'+r.classId ].map(clean).join('\t'); });
  const txt=rows.join('\n');
  navigator.clipboard.writeText(txt).then(()=>toast('已复制 '+rows.length+' 条，可直接粘贴到问题反馈池')).catch(()=>{
    const ta=document.createElement('textarea'); ta.value=txt; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select();
    let ok=false; try{ ok=document.execCommand('copy'); }catch(_){} ta.remove(); toast(ok?'已复制 '+rows.length+' 条':'复制失败，请改用导出 CSV'); });
}
function exportCsv(recs){
  const q=v=>'"'+String(v==null?'':v).replace(/"/g,'""')+'"';
  const head=['看课日期','打分日期','打分人','身份','对比角色','课程类型','级别','Lesson ID','Class ID','老师','国家','完课状态','摄像头',...DIMS.map(d=>d.n),'加权总分','亮点','问题','优化建议','回放链接'];
  const lines=[head.map(q).join(',')].concat(recs.map(r=>[r.date,localDay(r.createdAt),revName(r.rev),revKind(r.rev),ROLE_TXT[r.role]||'',r.type,r.level,r.lesson,r.classId,r.teacher,r.country,r.done,r.camera,...(r.s||[]),r.total,r.hl,r.issues,r.sugg,r.url].map(q).join(',')));
  const blob=new Blob(['﻿'+lines.join('\n')],{type:'text/csv;charset=utf-8'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='TQA打分记录_'+today()+'.csv'; document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },500);
}

/* ---------------- expert review tasks ---------------- */
const monday = d => addDays(d, -((new Date(d+'T00:00:00').getDay()+6)%7));
const wdOf = d => WD[((new Date(d+'T00:00:00').getDay()+6)%7)+1];
const safeUrl = u => /^https?:\/\//i.test(u||'') ? u : '';
function rcfg(){ return Object.assign({}, DEFAULT_CFG.review, S.cfg.review||{}); }
async function loadTasks(){
  if(!API||!(S.isAdmin||S.isExpert)) return;
  try{
    const [my,all]=await Promise.all([S.isExpert?API.myReviewTasks():null, S.isAdmin?API.reviewTasks():null]);
    S.myTasks=my||[]; if(S.isAdmin) S.tasks=all||[];
  }catch(e){ S.myTasks=[]; S.tasks=[]; toast('复评任务读取失败：'+errMsg(e)); }
}
function startTask(t){
  resetForm(false);
  $('#f-date').value=t.date||today(); $('#f-type').value=t.type||'体验课'; $('#f-level').value=t.level||'Lv1';
  $('#f-lesson').value=t.lesson||''; $('#f-class').value=t.class_id||''; fillTeachers($('#f-teacher'),t.teacher||'');
  $('#f-country').value=t.country||''; $('#f-url').value=t.url||'';
  S.fromTask=t.id; const th=$('#taskHint'); th.hidden=false;
  th.innerHTML=`<b>复评任务 · Class ${esc(t.class_id)}</b>：课程信息已带入，请独立看课打分。保存后任务自动完成，可在「复评」里查看和常规打分者的对比。`;
  checkDup(); location.hash='score'; window.scrollTo(0,0);
}
function cmpHtml(t){
  const d=S.cmpData[t.id]; if(!d) return '<div class="cmp">正在加载…</div>';
  if(d.error) return `<div class="cmp">${esc(d.error)}</div>`;
  if(!d.length) return '<div class="cmp">没有找到常规打分者对这节课的记录（可能已被删除）。</div>';
  const pool=S.isExpert?S.mine:allRecords().filter(r=>r.role==='expert');
  const me=pool.find(r=>r.classId===t.class_id);
  const cols=[{n:S.isExpert?'专家（我）':'专家',s:me?me.s:[],total:me?me.total:null}]
    .concat(d.map(x=>({n:x.who,s:(x.s||[]).map(Number),total:x.total==null?null:Number(x.total)})));
  const e=cols[0], r=cols[1]; const df=(a,b)=>(typeof a==='number'&&typeof b==='number')?a-b:null;
  let h=`<div class="cmp"><div class="tbl"><table><thead><tr><th>维度</th>${cols.map(c=>`<th class="num">${esc(c.n)}</th>`).join('')}<th class="num">差（打分者 − 专家）</th></tr></thead><tbody>${
    DIMS.map((dm,i)=>{ const x=df(r.s[i],e.s[i]); return `<tr><td>${esc(dm.n)}</td>${cols.map(c=>`<td class="num">${c.s[i]==null?'—':c.s[i]}</td>`).join('')}<td class="num${x!=null&&Math.abs(x)>1?' low':''}">${x==null?'—':sgn(x).replace('.00','')}</td></tr>`; }).join('')}
    <tr><td><b>加权总分</b></td>${cols.map(c=>`<td class="num"><b>${f1(c.total)}</b></td>`).join('')}<td class="num${df(r.total,e.total)!=null&&Math.abs(df(r.total,e.total))>5?' low':''}"><b>${df(r.total,e.total)==null?'—':sgn(df(r.total,e.total))}</b></td></tr></tbody></table></div>`;
  if(!me) h+='<p class="hint">没找到专家对这节课的记录。</p>';
  d.forEach(x=>{ h+=`<div style="white-space:pre-wrap"><b>${esc(x.who)} 的问题</b>\n${esc(x.issues||'—')}${x.hl?`\n<b>亮点</b>\n${esc(x.hl)}`:''}${x.sugg?`\n<b>优化建议</b>\n${esc(x.sugg)}`:''}</div>`; });
  return h+'</div>';
}
function taskRow(t,isOpen){
  const late=isOpen&&t.task_date<today(); const u=safeUrl(t.url);
  return `<div class="task" data-tid="${esc(t.id)}"><div>
    <div class="meta"><span class="mono"><b>Class ${esc(t.class_id)}</b></span><span>Lesson ${esc(t.lesson||'—')}</span><span>${esc(t.type||'')} · ${esc(t.level||'')}</span><span>老师 ${esc(t.teacher||'—')}</span>${t.country?`<span>${esc(t.country)}</span>`:''}<span>看课日期 ${esc(t.date||'—')}</span>${u?`<a href="${esc(u)}" target="_blank" rel="noopener">打开回放</a>`:''}</div>
    <div class="sub">分配于 ${esc(t.task_date)}（${wdOf(t.task_date)}）${late?' <span class="pill warn">已过分配日</span>':''}${t.done_at?' · 完成于 '+esc(localDay(t.done_at)):''}</div></div>
    <div class="row">${isOpen?'<button class="btn sm primary" type="button" data-act="start">开始打分</button>':`<button class="btn sm" type="button" data-act="cmp">${S.cmpOpen===t.id?'收起':'查看对比'}</button>`}</div>
    ${S.cmpOpen===t.id?cmpHtml(t):''}</div>`;
}
function expertPart(){
  const open=S.myTasks.filter(t=>t.status==='open'), done=S.myTasks.filter(t=>t.status==='done').sort((a,b)=>(b.done_at||'').localeCompare(a.done_at||''));
  const td=today(), tdN=open.filter(t=>t.task_date===td).length;
  let h=`<div class="kpis"><div class="kpi"><span class="v">${open.length}</span><span class="l">待复评（其中今天分配 ${tdN}）</span></div>
    <div class="kpi"><span class="v">${done.filter(t=>localDay(t.done_at)>=monday(td)).length}</span><span class="l">本周已完成</span></div></div>`;
  h+=`<div class="card"><h2>待复评<small>按分配日排序；点"开始打分"会自动带入课程信息</small></h2>${open.length?open.map(t=>taskRow(t,true)).join(''):'<div class="empty">暂时没有待复评的课。新任务会在复评日早上 7 点出现。</div>'}</div>`;
  h+=`<div class="card"><h2>已完成<small>近 4 周；完成后可以查看常规打分者的分数和问题</small></h2>${done.length?done.map(t=>taskRow(t,false)).join(''):'<div class="empty">还没有完成的复评。</div>'}</div>`;
  return h;
}
function adminPart(){
  const C=rcfg(), td=today(), ws=S.rvWeek||monday(td), we=addDays(ws,6);
  const all=S.tasks.filter(t=>t.week_start===ws), W=all.filter(t=>t.status!=='cancelled'), nCan=all.length-W.length;
  const done=W.filter(t=>t.status==='done').length;
  const regs=S.members.filter(m=>m.active&&m.compare_role==='regular'&&m.user_id);
  const ids=[...new Set(regs.map(m=>m.user_id).concat(W.map(t=>t.scorer_id).filter(Boolean)))];
  const experts=S.members.filter(m=>m.active&&m.compare_role==='expert');
  const per=C.per_scorer_min, scored=uid=>S.all.filter(r=>r.user_id===uid&&localDay(r.createdAt)>=ws&&localDay(r.createdAt)<=we).length;
  const covS=ids.filter(id=>W.filter(t=>t.scorer_id===id).length>=per).length;
  const lvN=l=>W.filter(t=>t.level===l).length; const covL=C.levels.filter(l=>lvN(l)>0).length;
  const isDay=C.days.indexOf(((new Date(td+'T00:00:00').getDay()+6)%7)+1)>=0;
  let h='';
  if(!experts.length) h+='<div class="notice"><b>还没有专家：</b>请在「设置 → 成员与权限」把专家的对比角色设为"专家"，任务才会显示给他。</div>';
  else if(experts.length>1) h+='<div class="notice">现在有多位专家，任务不指定具体某个人，每位专家都能看到并完成。</div>';
  if(!C.enabled) h+='<div class="notice"><b>自动生成已关闭</b>，可在「设置 → 专家复评任务」打开，或在下面手动补足。</div>';
  h+=`<div class="card"><div class="row"><h2>本周复评<small>${esc(ws)} ～ ${esc(we)}</small></h2><span class="spacer"></span>
    <div class="seg" role="group" aria-label="切换周"><button type="button" data-act="wk" data-d="-7">‹ 上一周</button><button type="button" data-act="wk" data-d="0" aria-pressed="${ws===monday(td)}">本周</button><button type="button" data-act="wk" data-d="7">下一周 ›</button></div></div>
    <div class="kpis">
      <div class="kpi"><span class="v">${W.length}</span><span class="l">已分配（目标 ${C.weekly_min}–${C.weekly_max}）</span></div>
      <div class="kpi"><span class="v">${done}</span><span class="l">专家已完成</span></div>
      <div class="kpi"><span class="v">${W.length-done}</span><span class="l">待完成</span></div>
      <div class="kpi"><span class="v">${covS}/${ids.length}</span><span class="l">打分者已覆盖（每人 ≥${per} 节）</span></div>
      <div class="kpi"><span class="v">${covL}/${C.levels.length}</span><span class="l">级别已覆盖</span></div></div>
    <div class="two"><div class="tbl"><table><thead><tr><th>常规打分者</th><th class="num">本周打分</th><th class="num">被抽复评</th><th class="num">专家已完成</th><th>覆盖要求</th></tr></thead><tbody>${
      ids.length?ids.map(id=>{ const n=W.filter(t=>t.scorer_id===id).length, k=W.filter(t=>t.scorer_id===id&&t.status==='done').length;
        return `<tr><td>${esc(revName(id))}</td><td class="num">${scored(id)}</td><td class="num">${n}</td><td class="num">${k}</td><td>${n>=per?'<span class="pill good">已达到</span>':`<span class="pill warn">还差 ${per-n} 节</span>`}</td></tr>`; }).join(''):'<tr><td colspan="5">还没有对比角色为"常规打分者"的成员。</td></tr>'}</tbody></table></div>
      <div class="field"><label>级别覆盖（全部打分者合计）</label><div class="chips">${C.levels.map(l=>{ const n=lvN(l); return `<span class="pill ${n?'good':'warn'}">${esc(l)} ${n?'× '+n:'未覆盖'}</span>`; }).join('')}</div>
        <p class="hint" style="margin-top:8px">今天${wdOf(td)}，${isDay&&C.enabled?'是复评日，07:00 已自动生成':'不是自动复评日'}。每个复评日每天 ${C.daily_min}–${C.daily_max} 节，优先补齐还没覆盖的打分者和级别，其次是有严重问题或低分的课；候选为最近 ${C.pool_days} 天内、截止前一天保存的常规打分记录。</p>
        <div class="row" style="margin-top:6px"><button class="btn sm primary" type="button" data-act="gen">补足今天的任务</button></div>
        <form class="row" id="addTask" novalidate style="margin-top:6px"><input type="text" id="addCls" placeholder="Class ID" style="max-width:160px" inputmode="numeric"><button class="btn sm" type="submit">指定这节课给专家</button></form></div></div>
    ${W.length?`<div class="tbl"><table><thead><tr><th>分配日</th><th>Class ID</th><th>Lesson</th><th>课型</th><th>级别</th><th>老师</th><th>打分者</th><th>抽取原因</th><th>状态</th><th></th></tr></thead><tbody>${
      W.slice().sort((a,b)=>a.task_date.localeCompare(b.task_date)||(a.created_at||'').localeCompare(b.created_at||'')).map(t=>`<tr data-tid="${esc(t.id)}"><td class="mono">${esc(t.task_date.slice(5))} ${wdOf(t.task_date)}</td><td class="mono">${esc(t.class_id)}</td><td class="mono">${esc(t.lesson||'')}</td><td>${esc(t.type||'')}</td><td>${esc(t.level||'')}</td><td>${esc(t.teacher||'')}</td><td>${esc(revName(t.scorer_id||''))}</td><td>${esc(t.reason||'')}</td>
        <td>${t.status==='done'?'<span class="pill good">已完成</span>':t.task_date<td?'<span class="pill warn">逾期未完成</span>':'<span class="pill neu">待完成</span>'}</td>
        <td class="row" style="flex-wrap:nowrap">${t.status==='done'?`<button class="btn sm" type="button" data-act="cmp">${S.cmpOpen===t.id?'收起':'对比'}</button>`:'<button class="btn sm danger" type="button" data-act="cancel">取消</button>'}</td></tr>${S.cmpOpen===t.id?`<tr class="detail"><td colspan="10" style="white-space:normal">${cmpHtml(t)}</td></tr>`:''}`).join('')}</tbody></table></div>`:'<div class="empty">这一周还没有复评任务。</div>'}
    ${nCan?`<p class="hint">本周另有 ${nCan} 条已取消的任务，被取消的课本周不会再被抽中。</p>`:''}</div>`;
  return h;
}
function renderReview(){
  const box=$('#reviewBody'); if(!box) return;
  box.innerHTML=(S.isExpert?expertPart():'')+(S.isAdmin?adminPart():'');
  const find=id=>S.tasks.find(t=>t.id===id)||S.myTasks.find(t=>t.id===id);
  box.onclick=async e=>{
    const b=e.target.closest('button[data-act]'); if(!b) return; const act=b.dataset.act;
    const host=b.closest('[data-tid]'); const t=host&&find(host.dataset.tid);
    if(act==='wk'){ const n=+b.dataset.d; S.rvWeek=n?addDays(S.rvWeek||monday(today()),n):null; renderReview(); return; }
    if(act==='start'&&t){ startTask(t); return; }
    if(act==='cmp'&&t){ S.cmpOpen=S.cmpOpen===t.id?null:t.id; renderReview();
      if(S.cmpOpen&&!S.cmpData[t.id]){ try{ S.cmpData[t.id]=await API.reviewCompare(t.id); }catch(err){ S.cmpData[t.id]={error:errMsg(err)}; } renderReview(); } return; }
    if(act==='cancel'&&t){
      if(b.dataset.armed!=='1'){ b.dataset.armed='1'; b.textContent='确认取消'; setTimeout(()=>{ if(b.isConnected){ b.dataset.armed=''; b.textContent='取消'; } },3000); return; }
      try{ await API.cancelReview(t.id); await loadTasks(); toast('已取消，可点"补足今天的任务"换一节'); renderReview(); }catch(err){ toast(errMsg(err)); } return; }
    if(act==='gen'){ b.disabled=true; try{ const r=await API.genReview(); await loadTasks(); toast(r&&r.created?`已新增 ${r.created} 节，今天目标 ${r.target} 节`:`今天已经够了（目标 ${r?r.target:'—'} 节），或没有可抽的课`); renderReview(); }catch(err){ toast(errMsg(err)); b.disabled=false; } }
  };
  const f=$('#addTask'); if(f) f.onsubmit=async ev=>{ ev.preventDefault(); const c=$('#addCls').value.trim(); if(!c){ toast('先填 Class ID'); return; }
    try{ await API.addReview(c); await loadTasks(); toast('已指定 Class '+c); renderReview(); }catch(err){ toast(errMsg(err)); } };
}
function reviewCfgCard(){
  const R=rcfg(); const fld=(id,l,v,w)=>`<div class="field"><label for="${id}">${l}</label><input type="text" inputmode="numeric" id="${id}" value="${esc(v)}"${w?` style="max-width:${w}"`:''}></div>`;
  return `<div class="card"><h2>专家复评任务<small>数据库每天北京时间 07:00 按这些参数给专家抽课</small></h2>
    <div class="row" style="gap:18px"><label class="row" style="gap:6px"><input type="checkbox" id="r-en" ${R.enabled?'checked':''}> 自动生成</label>
      <div class="days" role="group" aria-label="复评日">${[1,2,3,4,5,6,7].map(i=>`<label><input type="checkbox" data-rday="${i}" ${R.days.indexOf(i)>=0?'checked':''}> ${WD[i]}</label>`).join('')}</div></div>
    <div class="cfgrow">${fld('r-dmin','每个复评日最少（节）',R.daily_min)}${fld('r-dmax','每个复评日最多（节）',R.daily_max)}${fld('r-wmin','每周合计最少（节）',R.weekly_min)}${fld('r-wmax','每周合计最多（节）',R.weekly_max)}${fld('r-per','每位打分者每周至少（节）',R.per_scorer_min)}${fld('r-pool','候选范围：最近几天的打分',R.pool_days)}
      <div class="field"><label for="r-levels">每周需覆盖的级别（逗号分隔）</label><input type="text" id="r-levels" value="${esc(R.levels.join(', '))}"></div></div>
    <p class="hint">每个复评日的数量会在"每天最少—最多"之间自动调整：把本周还差的数量（周最少、每位打分者的最低节数、未覆盖的级别）平均分到剩下的复评日。已经有专家打分、首批导入、或本周被取消过的课不会被抽中。</p></div>`;
}
function readReviewCfg(){
  if(!$('#r-dmin')) return rcfg();
  const n=id=>{ const v=parseInt($('#'+id).value,10); return isNaN(v)||v<0?null:v; };
  const R={enabled:$('#r-en').checked, days:[...document.querySelectorAll('[data-rday]')].filter(x=>x.checked).map(x=>+x.dataset.rday),
    daily_min:n('r-dmin'), daily_max:n('r-dmax'), weekly_min:n('r-wmin'), weekly_max:n('r-wmax'), per_scorer_min:n('r-per'), pool_days:n('r-pool'),
    levels:$('#r-levels').value.split(/[,，、\s]+/).map(x=>x.trim()).filter(Boolean)};
  if(['daily_min','daily_max','weekly_min','weekly_max','per_scorer_min','pool_days'].some(k=>R[k]==null)){ toast('复评参数要填 0 或正整数'); return null; }
  if(R.daily_min>R.daily_max||R.weekly_min>R.weekly_max){ toast('复评参数：最少不能大于最多'); return null; }
  if(R.daily_max<1||R.pool_days<1){ toast('复评参数：每天最多和候选天数至少为 1'); return null; }
  if(R.enabled&&!R.days.length){ toast('请至少选一个复评日'); return null; }
  return R;
}

/* ---------------- setup ---------------- */
function renderSetup(){
  const box=$('#setupBody'); const c=S.cfg; const T=c.targets||DEFAULT_CFG.targets; const E=c.export||DEFAULT_CFG.export;
  const cnt={}; S.all.forEach(r=>{ if(r.user_id) cnt[r.user_id]=(cnt[r.user_id]||0)+1; });
  const roleSel=(attr,val,dis)=>`<select ${attr} ${dis?'disabled':''} aria-label="对比角色">${['regular','expert','none'].map(k=>`<option value="${k}" ${val===k?'selected':''}>${ROLE_TXT[k]}</option>`).join('')}</select>`;
  box.innerHTML=`<div class="card"><h2>成员与权限<small>只有名单里的邮箱能登录打分；对比角色只在后台可见</small></h2>
    <form id="addMem" class="grid" novalidate style="align-items:end">
      <div class="field"><label for="m-email">邮箱</label><input type="email" id="m-email" placeholder="同事的邮箱"></div>
      <div class="field"><label for="m-name">名字（可不填，由本人填写）</label><input type="text" id="m-name" maxlength="30"></div>
      <div class="field"><label for="m-admin">身份</label><select id="m-admin"><option value="0">打分者</option><option value="1">管理员</option></select></div>
      <div class="field"><label for="m-cmp">对比角色</label>${roleSel('id="m-cmp"','regular')}</div>
      <div class="field"><button class="btn primary" type="submit">添加成员</button></div>
    </form>
    <div class="tbl" style="margin-top:12px"><table><thead><tr><th>名字</th><th>邮箱</th><th>身份</th><th>对比角色</th><th>状态</th><th class="num">记录数</th><th></th></tr></thead><tbody>${
      S.members.map(m=>{ const self=m.user_id===S.uid, lockOwner=m.is_owner&&!S.isOwner; const e=esc(m.email);
        return `<tr data-email="${e}"><td><input type="text" data-f="name" value="${esc(m.name||'')}" placeholder="${m.is_owner?'管理员':'未填写'}" maxlength="30" style="max-width:140px" ${lockOwner?'disabled':''}></td>
        <td class="mono">${e}</td>
        <td>${m.is_owner?'管理员（所有者）':`<select data-f="is_admin" ${self?'disabled':''} aria-label="身份"><option value="0" ${m.is_admin?'':'selected'}>打分者</option><option value="1" ${m.is_admin?'selected':''}>管理员</option></select>`}</td>
        <td>${roleSel('data-f="compare_role"',m.compare_role,lockOwner)}</td>
        <td>${!m.active?'<span class="pill bad">已停用</span>':m.user_id?'<span class="pill good">已开通</span>':'<span class="pill neu">待设置密码</span>'}</td>
        <td class="num">${m.user_id?(cnt[m.user_id]||0):0}</td>
        <td class="row" style="flex-wrap:nowrap">${m.is_owner||self?'':`<button class="btn sm" type="button" data-act="toggle">${m.active?'停用':'启用'}</button>`}${m.user_id&&!self&&!lockOwner?'<button class="btn sm" type="button" data-act="pw">重设密码</button>':''}${!m.user_id&&!m.is_owner?'<button class="btn sm danger" type="button" data-act="del">删除</button>':''}</td></tr>${S.resetFor===m.email?`<tr class="detail"><td colspan="7"><form class="row" data-reset="${e}" novalidate style="white-space:normal"><span>给 ${esc(m.name||m.email)} 设一个新密码：</span><input type="text" data-newpw placeholder="至少 8 位" style="max-width:180px"><button class="btn sm primary" type="submit">确定</button><button class="btn sm" type="button" data-act="pwcancel">取消</button><span class="hint">设好后把新密码告诉对方，对方登录后可在"我的记录"里自己再改。</span></form></td></tr>`:''}`; }).join('')}</tbody></table></div>
    <p class="hint">添加后把网址发给同事：第一次打开点"首次使用 · 设置密码"，用这里登记的邮箱设密码即可。停用后对方无法登录打分，已有记录保留。同事忘记密码：点他那一行的"重设密码"。首批导入的 46 节课固定参与对比。</p></div>
  <div class="two">
    <div class="card"><h2>老师名单</h2><div class="field"><label for="s-teachers">用逗号分隔</label><input type="text" id="s-teachers" value="${esc((c.teachers||[]).join(', '))}"></div></div>
    <div class="card"><h2>问题导出字段<small>"复制为多维表格格式"时使用</small></h2><div class="grid">
      <div class="field"><label for="s-module">模块</label><input type="text" id="s-module" value="${esc(E.module)}"></div>
      <div class="field"><label for="s-channel">反馈渠道</label><input type="text" id="s-channel" value="${esc(E.channel)}"></div>
      <div class="field"><label for="s-local">本地化类型</label><input type="text" id="s-local" value="${esc(E.local)}"></div></div></div>
  </div>
  <div class="card"><h2>目标范围</h2><div class="tbl"><table><thead><tr><th>指标</th><th>初始阶段（暂定）</th><th>稳定阶段</th></tr></thead><tbody>
    ${[['diff','打分者 − 专家平均差（绝对值上限，分）',1],['pass','±5 分内合格率（下限，%）',100],['icc','ICC（下限）',1],['dim','维度差 ≤1 分（下限，%）',100]].map(([k,l,m])=>
      `<tr><td>${l}</td>${[0,1].map(j=>`<td><input type="text" inputmode="decimal" id="t-${k}-${j}" value="${Math.round(T[k][j]*m*100)/100}" style="max-width:110px"></td>`).join('')}</tr>`).join('')}
  </tbody></table></div></div>
  ${reviewCfgCard()}
  <p class="hint">老师名单、导出字段、目标范围和复评参数改完后点右上角"保存设置"；成员的修改会立即生效。</p>`;
  $('#addMem').onsubmit=addMember;
  box.querySelectorAll('tr[data-email] [data-f]').forEach(el=>el.addEventListener('change',()=>{
    const email=el.closest('tr').dataset.email, f=el.dataset.f; let v=el.value;
    if(f==='is_admin') v=v==='1'; if(f==='name') v=v.trim()||null;
    patchMember(email,{[f]:v}); }));
  box.querySelectorAll('[data-act="pwcancel"]').forEach(b=>b.onclick=()=>{ S.resetFor=null; renderSetup(); });
  box.querySelectorAll('form[data-reset]').forEach(f=>f.onsubmit=async ev=>{ ev.preventDefault(); const pw=f.querySelector('[data-newpw]').value;
    if(pw.length<8){ toast('密码至少 8 位'); return; }
    try{ await API.account('reset',f.dataset.reset,pw); S.resetFor=null; toast('密码已重设'); renderSetup(); }catch(e){ toast(errMsg(e)); } });
  box.querySelectorAll('tr[data-email] button[data-act]').forEach(b=>b.onclick=async()=>{
    const email=b.closest('tr').dataset.email; const m=S.members.find(x=>x.email===email);
    if(b.dataset.act==='toggle') return patchMember(email,{active:!m.active});
    if(b.dataset.act==='pw'){ S.resetFor=email; renderSetup(); const i=box.querySelector('[data-newpw]'); if(i) i.focus(); return; }
    if(b.dataset.armed!=='1'){ b.dataset.armed='1'; b.textContent='确认删除'; setTimeout(()=>{ if(b.isConnected){ b.dataset.armed=''; b.textContent='删除'; } },3000); return; }
    try{ await API.deleteMember(email); S.members=S.members.filter(x=>x.email!==email); toast('已删除'); renderSetup(); }catch(e){ toast(errMsg(e)); } });
}
async function addMember(e){
  e.preventDefault(); const email=$('#m-email').value.trim().toLowerCase();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ toast('请填写正确的邮箱'); return; }
  if(S.members.some(m=>m.email===email)){ toast('这个邮箱已经在名单里'); return; }
  const m={email,name:$('#m-name').value.trim()||null,is_admin:$('#m-admin').value==='1',compare_role:$('#m-cmp').value};
  try{ await API.addMember(m); S.members=await API.members(); toast('已添加 '+email); renderSetup(); }catch(err){ toast(errMsg(err)); }
}
async function patchMember(email,patch){
  try{ const d=await API.updateMember(email,patch); if(!d||!d.length) throw {message:'permission'};
    S.members=S.members.map(m=>m.email===email?Object.assign({},m,patch):m); toast('已更新'); }
  catch(e){ toast(errMsg(e)); }
  renderSetup();
}
async function saveCfg(){
  if(!API||!S.isAdmin){ toast('只有管理员可以修改设置'); return; }
  const c=JSON.parse(JSON.stringify(S.cfg)); delete c.roles;
  const t=$('#s-teachers'); if(t) c.teachers=t.value.split(/[,，、]/).map(x=>x.trim()).filter(Boolean);
  c.export={module:$('#s-module').value.trim(),channel:$('#s-channel').value.trim(),local:$('#s-local').value.trim()};
  const num=(id,m)=>{ const v=parseFloat(($('#'+id)||{}).value); return isNaN(v)?null:v/m; };
  const T={}; [['diff',1],['pass',100],['icc',1],['dim',100]].forEach(([k,m])=>{ T[k]=[num('t-'+k+'-0',m),num('t-'+k+'-1',m)].map((v,j)=>v==null?DEFAULT_CFG.targets[k][j]:v); });
  c.targets=T;
  const R=readReviewCfg(); if(!R) return; c.review=R;
  try{ await API.saveConfig(c); S.cfg=Object.assign(JSON.parse(JSON.stringify(DEFAULT_CFG)),c); fillTeachers($('#f-teacher'),$('#f-teacher').value); toast('设置已保存'); }catch(e){ toast(errMsg(e)); }
}

/* ---------------- auth & boot ---------------- */
function showNotice(html){ const n=$('#notice'); n.innerHTML=html; n.hidden=false; }
function paintWho(){
  const w=$('#who'); w.innerHTML=''; if(!S.uid) return;
  const sp=document.createElement('span'); sp.className='nm'; sp.textContent=S.member?(S.myName||'未填写名字'):S.email; w.append(sp);
  if(S.member&&S.isAdmin&&!S.isOwner){ const t=document.createElement('span'); t.className='tag'; t.textContent='管理员'; w.append(t); }
  if(S.member&&!S.needName){ const b=document.createElement('button'); b.type='button'; b.textContent='改名'; b.onclick=()=>openGate(true); w.append(b); }
  const o=document.createElement('button'); o.type='button'; o.className='out'; o.textContent='退出'; o.onclick=logout; w.append(o);
}
function openGate(rename){ if(rename) S.renaming=true; else S.needName=true;
  $('#gateTitle').textContent=rename?'修改你的名字':(S.isAdmin?'你是管理员，请先填写名字以便区分':'开始打分前，请先填写你的名字');
  $('#g-name').value=rename?S.myName:''; $('#g-cancel').hidden=!rename; $('#g-save').textContent=rename?'保存':'开始打分'; route(); setTimeout(()=>$('#g-name').focus(),0); }
async function submitGate(e){
  e.preventDefault(); const v=$('#g-name').value.trim().replace(/\s+/g,' ');
  if(!v){ toast('请填写名字'); return; }
  const old=S.myName; $('#g-save').disabled=true;
  try{ await API.setMyName(v); S.myName=v; S.member.name=v; S.members=S.members.map(m=>m.user_id===S.uid?Object.assign({},m,{name:v}):m);
    S.needName=false; S.renaming=false; paintWho(); route(); toast(old&&old!==v?'名字已更新':'你好，'+v); }
  catch(err){ toast(errMsg(err)); }
  finally{ $('#g-save').disabled=false; }
}
function setAuthMode(m){ S.authMode=m; document.querySelectorAll('#authTabs button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.m===m)));
  $('#a-pw2-f').hidden=m!=='signup'; $('#a-go').textContent=m==='signup'?'设置密码并进入':'登录';
  $('#a-pw').setAttribute('autocomplete',m==='signup'?'new-password':'current-password');
  $('#authHint').textContent=m==='signup'?'用管理员登记的邮箱设置一个至少 8 位的密码，之后用邮箱和密码登录。':'第一次使用请点"首次使用 · 设置密码"。忘记密码请联系管理员。'; }
async function submitAuth(e){
  e.preventDefault(); if(!API){ toast('网站还没有配置数据库'); return; }
  const email=$('#a-email').value.trim().toLowerCase(), pw=$('#a-pw').value;
  if(!email||!pw){ toast('请填写邮箱和密码'); return; }
  const btn=$('#a-go'); btn.disabled=true;
  try{
    if(S.authMode==='signup'){
      if(pw.length<8){ toast('密码至少 8 位'); return; }
      if(pw!==$('#a-pw2').value){ toast('两次输入的密码不一样'); return; }
      await API.account('register',email,pw);
      const d=await API.signIn(email,pw); setAuthMode('login'); await afterLogin(d.session);
    } else {
      const d=await API.signIn(email,pw); await afterLogin(d.session);
    }
    $('#a-pw').value=''; $('#a-pw2').value='';
  }catch(err){ toast(errMsg(err)); }
  finally{ btn.disabled=false; }
}
async function afterLogin(session){
  S.uid=session.user.id; S.email=(session.user.email||'').toLowerCase();
  try{ S.member=await API.claim(); }catch(e){ S.member=null; toast(errMsg(e)); }
  if(!S.member){ $('#deniedText').textContent=`你登录的邮箱是 ${S.email}，还不在打分名单里，或已被停用。请联系管理员后重新登录。`; paintWho(); route(); return; }
  S.isAdmin=!!S.member.is_admin; S.isOwner=!!S.member.is_owner; S.myName=S.member.name||(S.isOwner?'管理员':''); S.needName=!S.myName;
  if(S.needName){ $('#gateTitle').textContent=S.isAdmin?'你是管理员，请先填写名字以便区分':'开始打分前，请先填写你的名字'; $('#g-cancel').hidden=true; $('#g-save').textContent='开始打分'; }
  S.isExpert=S.member.compare_role==='expert';
  document.querySelectorAll('.tabs a[data-v="board"],.tabs a[data-v="setup"]').forEach(a=>a.hidden=!S.isAdmin);
  document.querySelector('.tabs a[data-v="review"]').hidden=!(S.isAdmin||S.isExpert);
  try{ S.cfg=Object.assign(JSON.parse(JSON.stringify(DEFAULT_CFG)),(await API.config())||{}); }catch(_){}
  fillTeachers($('#f-teacher'),(S.cfg.teachers||[])[0]||'');
  await loadData(); paintWho(); route();
}
async function loadData(){
  try{
    if(S.isAdmin){ const [rows,mem]=await Promise.all([API.scores(null),API.members()]); S.all=rows.map(fromDb); S.members=mem; S.mine=S.all.filter(r=>r.user_id===S.uid); }
    else { S.mine=(await API.scores(S.uid)).map(fromDb); }
  }catch(e){ toast(errMsg(e)); }
  await loadTasks();
}
function clearState(){ Object.assign(S,{uid:null,email:'',member:null,isAdmin:false,isOwner:false,isExpert:false,myName:'',mine:[],all:[],members:[],needName:false,renaming:false,editing:null,tasks:[],myTasks:[],fromTask:null,cmpOpen:null,cmpData:{}});
  document.querySelector('.tabs a[data-v="review"]').hidden=true; }
async function logout(){ try{ await API.signOut(); }catch(_){} clearState(); resetForm(false); paintWho(); location.hash='score'; route(); }
async function boot(){
  buildDims(); fillTeachers($('#f-teacher'),'Kim'); resetForm(false); setAuthMode('login');
  $('#form').addEventListener('submit',saveForm);
  $('#btnReset').onclick=()=>resetForm(false); $('#btnCancelEdit').onclick=()=>resetForm(false);
  $('#b-add').onclick=addIssueLine; $('#b-text').addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); addIssueLine(); } });
  $('#f-class').addEventListener('input',checkDup);
  $('#presets').onclick=e=>{ const b=e.target.closest('button'); if(b) setPreset(b.dataset.p); };
  ['q-from','q-to'].forEach(id=>$('#'+id).addEventListener('change',()=>{ S.filter.from=$('#q-from').value; S.filter.to=$('#q-to').value; document.querySelectorAll('#presets button').forEach(b=>b.setAttribute('aria-pressed','false')); renderBoard(); }));
  $('#q-type').onchange=()=>{ S.filter.type=$('#q-type').value; renderBoard(); };
  $('#q-rev').onchange=()=>{ S.filter.rev=$('#q-rev').value; renderBoard(); };
  $('#btnSaveCfg').onclick=saveCfg;
  $('#btnReviewRefresh').onclick=async()=>{ const b=$('#btnReviewRefresh'); b.disabled=true; await loadData(); b.disabled=false; renderReview(); toast('已刷新'); };
  $('#btnRefresh').onclick=async()=>{ const b=$('#btnRefresh'); b.disabled=true; await loadData(); b.disabled=false; renderBoard(); toast('已刷新'); };
  $('#gateForm').addEventListener('submit',submitGate);
  $('#g-cancel').onclick=()=>{ S.renaming=false; route(); };
  $('#authTabs').onclick=e=>{ const b=e.target.closest('button'); if(b) setAuthMode(b.dataset.m); };
  $('#authForm').addEventListener('submit',submitAuth);
  $('#btnDeniedOut').onclick=logout;
  $('#pwForm').addEventListener('submit',async e=>{ e.preventDefault(); const p=$('#p-new').value; if(p.length<8){ toast('密码至少 8 位'); return; }
    try{ await API.setPassword(p); $('#p-new').value=''; toast('密码已更新'); }catch(err){ toast(errMsg(err)); } });
  if(!API){ showNotice('<b>网站还没有连接数据库：</b>请在 config.js 中填写 Supabase 项目地址和 anon key。'); route(); return; }
  API.onAuth((ev)=>{ if(ev==='SIGNED_OUT'&&S.uid){ clearState(); paintWho(); route(); } });
  try{ const s=await API.session(); if(s) await afterLogin(s); }catch(e){ toast(errMsg(e)); }
  route();
}
boot();
})();
