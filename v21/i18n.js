(function () {
  'use strict';
  const query = new URLSearchParams(location.search).get('lang');
  let saved = 'zh';
  try { saved = localStorage.getItem('tqa-v21-language') || 'zh'; } catch (_) {}
  const lang = query === 'en' || query === 'zh' ? query : saved === 'en' ? 'en' : 'zh';
  try { localStorage.setItem('tqa-v21-language', lang); } catch (_) {}
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';

  // UI wording only. Stored course types, issue roots, roles and user notes keep
  // their original values so both languages use the same records.
  const entries = [
    ['TQA 看课打分台', 'TQA Scoring Platform'],
    ['打分', 'Score'], ['我的记录', 'My Records'], ['复评', 'Expert Review'], ['同步问题', 'Sync Issues'], ['看板', 'Dashboard'], ['设置', 'Settings'],
    ['登录', 'Sign In'], ['首次使用 · 设置密码', 'First time · Set password'], ['邮箱', 'Email'], ['密码', 'Password'],
    ['管理员登记的邮箱', 'Email registered by the administrator'], ['至少 8 位', 'At least 8 characters'], ['再输入一次密码', 'Confirm password'],
    ['第一次使用请点"首次使用 · 设置密码"。忘记密码请联系管理员。', 'First time here? Select “Set password.” Contact an administrator if you forgot your password.'],
    ['这个邮箱还没有打分权限', 'This email is not authorized to score'],
    ['请联系管理员把你的邮箱加入名单，然后重新登录。', 'Ask an administrator to add your email, then sign in again.'],
    ['退出登录', 'Sign Out'], ['开始打分前，请先填写你的名字', 'Enter your name before scoring'],
    ['名字会显示在打分记录和问题反馈里，只需填写一次，之后可在右上角修改。', 'Your name appears in scoring records and issue reports. You can change it later in the top right.'],
    ['如：张三', 'Your name'], ['你的名字', 'Your name'], ['开始打分', 'Start Scoring'], ['取消', 'Cancel'],
    ['新建打分', 'New Score'], ['按 V2.1 评分标准，每节课一条记录；8 个维度都填完才能保存。', 'Use the V2.1 rubric. Save one record per class after scoring all eight dimensions.'],
    ['清空表单', 'Clear Form'], ['通用评分规则', 'General Scoring Rules'],
    ['先看规则，再用快速指南定档；有疑问时展开完整标准', 'Read the rules, use the Quick Guide to choose a band, and open the full rubric when needed'],
    ['平台填写要求：八维打完后，为最低分的 2 个维度、最高分的 1 个维度写原因；同分按权重概率抽选，已写原因优先保留。需要跟进的问题另记。', 'After scoring all eight dimensions, explain the two lowest and one highest. Ties are drawn with higher-weight dimensions more likely; existing reasons take priority. Record follow-up issues separately.'],
    ['课程信息', 'Class Details'], ['看课日期', 'Observation Date'], ['课程类型', 'Class Type'], ['级别', 'Level'],
    ['体验课', 'Trial Class'], ['正式课', 'Regular Class'], ['如 761', 'e.g. 761'], ['用于和其他打分人配对', 'Used to match another scorer’s record'],
    ['老师', 'Teacher'], ['国家', 'Country'], ['如 越南', 'e.g. Vietnam'], ['完课状态', 'Completion Status'],
    ['完课日期', 'Completion Date'], ['版本号', 'Course / Product Version'], ['版本号（选填）', 'Course / Product Version (optional)'],
    ['课程或产品版本号', 'Course or product version'],
    ['完课', 'Completed'], ['未完课', 'Incomplete'], ['摄像头', 'Camera'], ['开', 'On'], ['未开', 'Off'], ['回放链接', 'Recording URL'],
    ['8 维打分', 'Eight Dimensions'], ['每维先看快速指南，需要时展开完整标准；', 'Use the Quick Guide first; open the full standard when needed. '],
    ['打开完整 V2.1 Rubric', 'Open Full V2.1 Rubric'], ['需要跟进的问题', 'Issues Needing Follow-up'],
    ['只记需要有人去改的事，一条一行', 'Record only issues requiring action, one per row'],
    ['＋ 添加问题', '+ Add Issue'], ['原问题记录（旧格式，可修改）', 'Original issue notes (legacy format, editable)'],
    ['优化建议（选填）', 'Improvement Suggestions (optional)'], ['加权总分', 'Weighted Total'],
    ['已填 0/8 个维度', 'Scored 0/8 dimensions'], ['取消编辑', 'Cancel Editing'], ['保存记录', 'Save Record'],
    ['只显示你自己的打分；点击一行查看详情、编辑或删除。', 'Only your scores appear here. Select a row to view, edit or delete it.'],
    ['修改密码', 'Change Password'], ['新密码，至少 8 位', 'New password, at least 8 characters'], ['保存新密码', 'Save New Password'],
    ['专家复评', 'Expert Review'], ['刷新', 'Refresh'],
    ['把打分时记录的问题同步到问题反馈池：复制、粘贴、标记已同步。同一 Lesson、同一根因的问题已自动归成一组。', 'Send recorded issues to the issue tracker: copy, paste and mark them synced. Issues with the same Lesson and root cause are grouped automatically.'],
    ['打分进度、双人一致性、问题汇总和记录，按所选评分标准及日期统计。', 'Scoring progress, agreement, issues, and records for the selected rubric and dates.'],
    ['刷新数据', 'Refresh Data'], ['快捷范围', 'Quick Range'], ['本周', 'This Week'], ['近 14 天', 'Last 14 Days'], ['近 28 天', 'Last 28 Days'],
    ['全部', 'All'], ['开始日期', 'Start Date'], ['结束日期', 'End Date'], ['打分人（记录与问题）', 'Scorer (records and issues)'],
    ['未标注', 'Unspecified'], ['该评分版本暂无记录。', 'No records for this rubric version.'],
    ['累计（V2.1）', 'Total (V2.1)'],
    ['历史评分仅供查看', 'Historical scores are read-only'],
    ['原记录未标注评分标准；这组统计仅供历史参考。', 'The original records did not identify a rubric. Treat these statistics as historical reference only.'],
    ['成员与权限、老师名单、目标范围和问题导出字段。只有管理员可以修改。', 'Members, teachers, targets and issue export fields. Administrators only.'],
    ['保存设置', 'Save Settings'], ['页面', 'Pages'],

    ['快速指南', 'Quick Guide'], ['该维度完整标准 · 检查项与分档', 'Full Standard · Checkpoints & Score Bands'],
    ['检查项', 'Checkpoints'], ['只看', 'Assess Only'], ['不在此扣分', 'Do Not Deduct Here'], ['分档', 'Score Bands'],
    ['＋ 写打分原因（选填）', '+ Add Scoring Reason (optional)'], ['打分原因（选填）', 'Scoring Reason (optional)'], ['打分原因', 'Scoring Reason'],
    ['最低分', 'lowest score'], ['最高分', 'highest score'], ['其他 / 未知', 'Other / Unknown'],
    ['时间点 + 老师的具体行为，如：03:10 学生读错 bread，老师只说 good try 没有示范', 'Time + specific teacher behavior, e.g. 03:10 the student misread “bread”; the teacher said “good try” without modeling it'],
    ['已填 ', 'Scored '], [' 个维度', ' dimensions'], ['低于 6 分：', 'Below 6: '], ['总分低于 60', 'Total below 60'],
    ['打分原因（必填 · ', 'Scoring Reason (required · '], ['选填', 'optional'],
    ['你已经给 Class ', 'You already scored Class '], ['打过分（', ' (' ], ['，总分 ', ', total '], ['编辑那条记录', 'Edit That Record'],
    ['请先登录', 'Please sign in first'], ['维度：', 'Dimensions: '], ['还没填：', 'Missing: '],
    ['每节课要写 3 条打分原因（最低 2 个 + 最高 1 个维度），还差：', 'Three scoring reasons are required (two lowest and one highest dimension). Missing: '],
    ['有问题只填了时间点，请补上问题描述或删掉这一行', 'An issue has a time but no description. Add a description or remove that row.'],
    ['这节课你已打过分，请编辑原记录', 'You already scored this class. Edit the existing record.'],
    ['分数已保存，但问题没有保存成功：', 'Score saved, but issues were not saved: '], ['。请在"我的记录"里编辑这条再保存一次', '. Edit this entry in My Records and save it again.'],
    ['已保存修改', 'Changes saved'], ['已保存，复评任务已完成', 'Saved; review task completed'], ['已保存', 'Saved'],
    ['时间点', 'Time'], ['问题描述', 'Issue Description'], ['环节 + 现象 + 期望', 'Stage + observation + expected result'],
    ['根因', 'Root Cause'], ['优先级', 'Priority'], ['删除这条问题', 'Delete this issue'], ['删除', 'Delete'],
    ['没有需要跟进的问题就不用填。', 'Leave this blank if there are no issues needing follow-up.'],
    ['课程', 'Courseware'], ['识别', 'Recognition'], ['教学', 'Teaching'], ['产品', 'Product'], ['待查', 'To Investigate'],
    ['今天已打', 'Scored Today'], ['本周已打', 'Scored This Week'], ['累计', 'Total'],
    ['还没有记录。到"打分"页填写第一节课，保存后会出现在这里。', 'No records yet. Score your first class and it will appear here.'],
    ['课型', 'Class Type'], ['总分', 'Total Score'], ['问题', 'Issues'], ['编辑', 'Edit'], ['确认删除', 'Confirm Delete'], ['已删除', 'Deleted'],
    ['仅留档', 'Archive Only'], ['（已同步）', ' (synced)'], ['（已忽略）', ' (ignored)'],
    ['亮点（旧记录）', 'Highlights (legacy)'], ['优化建议', 'Improvement Suggestions'], ['回放', 'Recording'], ['打开回放', 'Open Recording'],
    ['常规打分者', 'Regular Scorer'], ['专家', 'Expert'], ['不参与对比', 'Excluded from Comparison'], ['管理员（所有者）', 'Administrator (Owner)'],
    ['管理员', 'Administrator'], ['打分者', 'Scorer'], ['已移除的成员', 'Removed Member'], ['未填', 'Unspecified'],
    ['样本不足', 'Insufficient Sample'], ['达到', 'Met'], ['未达到', 'Not Met'],
    ['打分者与专家总分散点图', 'Scorer vs Expert Total Score Scatterplot'], ['打分者总分', 'Scorer Total'], ['专家总分', 'Expert Total'],
    ['所选范围内没有打分记录。', 'No scoring records in the selected range.'], ['打分记录', 'Scoring Records'], ['课程（Class ID）', 'Classes (Class ID)'],
    ['打分人', 'Scorers'], ['打分者 / 专家配对', 'Scorer / Expert Pairs'], ['平均总分', 'Average Total'],
    ['初始阶段（暂定）', 'Initial Stage (provisional)'], ['稳定阶段', 'Stable Stage'], ['本期', 'This Period'], ['状态', 'Status'],
    ['配对', 'Pairs'], ['平均差', 'Mean Difference'], ['平均分差', 'Mean Absolute Difference'],
    ['看课日期', 'Observation Date'], ['打分日期', 'Scoring Date'], ['身份', 'Role'], ['对比角色', 'Comparison Role'],
    ['评分标准', 'Rubric Version'], ['记录数', 'Records'], ['打分节数', 'Classes Scored'], ['课程数', 'Classes'],
    ['需关注', 'Needs Attention'], ['双人配对', 'Paired Classes'], ['最近看课', 'Latest Observation'],
    ['未填写', 'Not Entered'], ['未开通', 'Not Activated'], ['待设置密码', 'Password Not Set'], ['已开通', 'Active'], ['已停用', 'Inactive'],
    ['启用', 'Activate'], ['停用', 'Deactivate'], ['重设密码', 'Reset Password'], ['添加成员', 'Add Member'],
    ['老师名单', 'Teacher List'], ['目标范围', 'Target Ranges'], ['模块', 'Module'], ['反馈渠道', 'Feedback Channel'], ['本地化类型', 'Localization Type'],
    ['用逗号分隔', 'Separate with commas'], ['同事的邮箱', 'Colleague’s email'], ['可以', 'Allowed'],
    ['自动生成', 'Automatic Generation'], ['复评日', 'Review Days'], ['周一', 'Monday'], ['周二', 'Tuesday'], ['周三', 'Wednesday'],
    ['周四', 'Thursday'], ['周五', 'Friday'], ['周六', 'Saturday'], ['周日', 'Sunday'],
    ['导出 CSV', 'Export CSV'], ['导出全部打分明细 CSV', 'Export All Score Details CSV'],
    ['导出当前筛选明细 CSV', 'Export Filtered Score Details CSV'], ['没有打分记录可导出', 'No scoring records to export'],
    ['已复制', 'Copied'], ['复制失败，请改用导出 CSV', 'Copy failed. Use CSV export instead.'],
  ];
  entries.push(
    ['每个复评日北京时间 07:00 从前一天及之前的常规打分中自动抽课；专家对同一 Class ID 打分后自动完成，用于一致性对比。', 'At 07:00 Beijing time on each review day, classes scored before that day are selected automatically. An expert completes a task by scoring the same Class ID; the pair is used to measure agreement.'],
    ['问题描述写"环节 + 现象 + 期望"，如：跟读题：语音只读问句，答案标准却是问句加答句；期望答案与语音一致。', 'Write “stage + observation + expected result.” Example: In a repeat-after-me task, audio reads only the question while the expected answer includes both question and answer; align them.'],
    ['根因：课程（课件内容 / 交互）· 级别（学生与课程级别明显不符）· 识别（ASR / 评测）· 教学（AI 教学选择）· 产品（功能 / 播放 / 网络）· 待查。优先级由你判断，同步时还可以调整。', 'Root causes: courseware (content / interaction), level (clear mismatch), recognition (ASR / assessment), teaching (AI choices), product (features / playback / network), or investigate. Set the priority; it can be changed during sync.'],
    ['邮箱或密码不对', 'Incorrect email or password'], ['这个邮箱已经设置过密码，请直接登录', 'This email already has a password. Sign in instead.'],
    ['密码太短，至少 8 位', 'Password must be at least 8 characters.'], ['邮箱还没验证，请联系管理员', 'Email not verified. Contact an administrator.'],
    ['这节课你已经打过分了，请在"我的记录"里编辑', 'You have already scored this class. Edit it in My Records.'],
    ['网络连接失败，请检查网络后再试', 'Network connection failed. Check your connection and try again.'],
    ['没有权限执行这个操作', 'You do not have permission for this action.'], ['操作失败，请稍后再试', 'Operation failed. Please try again later.'],
    ['复评任务读取失败：', 'Failed to load review tasks: '], ['正在加载…', 'Loading…'],
    ['没有找到常规打分者对这节课的记录（可能已被删除）。', 'The regular scorer’s record for this class was not found (it may have been deleted).'],
    ['没找到专家对这节课的记录。', 'The expert’s record for this class was not found.'],
    ['复评任务 · Class ', 'Review Task · Class '], ['课程信息已带入，请独立看课打分。保存后任务自动完成，可在「复评」里查看和常规打分者的对比。', 'Class details are filled in. Score independently. Saving completes the task; compare with the regular scorer under Expert Review.'],
    ['专家（我）', 'Expert (me)'], ['差（打分者 − 专家）', 'Difference (Scorer − Expert)'],
    [' 的打分原因', ' — scoring reasons'], [' 的问题', ' — issues'],
    ['分配于 ', 'Assigned '], ['已过分配日', 'Past Due'], ['完成于 ', 'Completed '],
    ['收起', 'Collapse'], ['查看对比', 'View Comparison'], ['对比', 'Compare'],
    ['待复评（其中今天分配 ', 'Awaiting Review (assigned today: '], ['本周已完成', 'Completed This Week'],
    ['待复评', 'Awaiting Review'], ['按分配日排序；点"开始打分"会自动带入课程信息', 'Sorted by assignment date; Start Scoring fills in the class details'],
    ['暂时没有待复评的课。新任务会在复评日早上 7 点出现。', 'No classes awaiting review. New tasks appear at 07:00 on review days.'],
    ['已完成', 'Completed'], ['近 4 周；完成后可以查看常规打分者的分数和问题', 'Last four weeks; after scoring, view the regular scorer’s scores and issues'],
    ['还没有完成的复评。', 'No completed reviews yet.'],
    ['还没有专家：', 'No expert assigned: '], ['请在「设置 → 成员与权限」把专家的对比角色设为"专家"，任务才会显示给他。', 'In Settings → Members & Access, set the expert’s comparison role to Expert so tasks appear for them.'],
    ['现在有多位专家，任务不指定具体某个人，每位专家都能看到并完成。', 'With multiple experts, tasks are unassigned; any expert can see and complete them.'],
    ['自动生成已关闭', 'Automatic generation is off'], ['可在「设置 → 专家复评任务」打开，或在下面手动补足。', 'Enable it in Settings → Expert Review Tasks, or create tasks manually below.'],
    ['本周复评', 'This Week’s Reviews'], ['‹ 上一周', '‹ Previous Week'], ['下一周 ›', 'Next Week ›'],
    ['已分配（目标 ', 'Assigned (target '], ['专家已完成', 'Completed by Expert'], ['待完成', 'Pending'],
    ['打分者已覆盖（每人 ≥', 'Scorers Covered (each ≥'], ['级别已覆盖', 'Levels Covered'],
    ['本周打分', 'Scored This Week'], ['被抽复评', 'Selected for Review'], ['覆盖要求', 'Coverage Target'],
    ['已达到', 'Met'], ['还差 ', 'Need '], ['还没有对比角色为"常规打分者"的成员。', 'No member has the Regular Scorer comparison role.'],
    ['级别覆盖（全部打分者合计）', 'Level Coverage (all scorers)'], ['未覆盖', 'Not Covered'],
    ['是复评日，07:00 已自动生成', 'is a review day; tasks were generated at 07:00'], ['不是自动复评日', 'is not an automatic review day'],
    ['每个复评日每天 ', 'Each review day: '], ['优先补齐还没覆盖的打分者和级别', 'prioritizing uncovered scorers and levels'],
    ['其次是有严重问题或低分的课', 'then classes with serious issues or low scores'],
    ['候选为最近 ', 'Candidates are from the last '], [' 天内、截止前一天保存的常规打分记录', ' days of regular scores saved before today'],
    ['补足今天的任务', 'Fill Today’s Tasks'], ['指定这节课给专家', 'Assign This Class to Expert'],
    ['分配日', 'Assignment Date'], ['抽取原因', 'Selection Reason'], ['逾期未完成', 'Overdue'],
    ['这一周还没有复评任务。', 'No review tasks this week.'], ['本周另有 ', 'There are also '], [' 条已取消的任务，被取消的课本周不会再被抽中。', ' cancelled tasks this week; those classes will not be selected again this week.'],
    ['确认取消', 'Confirm Cancellation'], ['已取消，可点"补足今天的任务"换一节', 'Cancelled. Select Fill Today’s Tasks to choose another class.'],
    ['已新增 ', 'Created '], [' 节，今天目标 ', ' tasks; today’s target is '], ['今天已经够了（目标 ', 'Today’s target has been met (' ], [' 节），或没有可抽的课', ' tasks), or no classes are available'],
    ['先填 Class ID', 'Enter a Class ID first'], ['已指定 Class ', 'Assigned Class '],
    ['专家复评任务', 'Expert Review Tasks'], ['数据库每天北京时间 07:00 按这些参数给专家抽课', 'The database selects classes at 07:00 Beijing time using these settings'],
    ['每个复评日最少（节）', 'Minimum per Review Day'], ['每个复评日最多（节）', 'Maximum per Review Day'],
    ['每周合计最少（节）', 'Weekly Minimum'], ['每周合计最多（节）', 'Weekly Maximum'],
    ['每位打分者每周至少（节）', 'Minimum per Scorer per Week'], ['候选范围：最近几天的打分', 'Candidate Pool: Recent Days'],
    ['每周需覆盖的级别（逗号分隔）', 'Levels to Cover Each Week (comma separated)'],
    ['每个复评日的数量会在"每天最少—最多"之间自动调整：把本周还差的数量（周最少、每位打分者的最低节数、未覆盖的级别）平均分到剩下的复评日。已经有专家打分、首批导入、或本周被取消过的课不会被抽中。', 'Daily targets adjust between the minimum and maximum to cover the weekly minimum, each scorer and the required levels. Classes already scored by an expert, imported initially or cancelled this week are excluded.'],
    ['复评参数要填 0 或正整数', 'Review settings must be nonnegative integers.'], ['复评参数：最少不能大于最多', 'Review minimum cannot exceed maximum.'],
    ['复评参数：每天最多和候选天数至少为 1', 'Daily maximum and candidate days must be at least 1.'], ['请至少选一个复评日', 'Choose at least one review day.']
  );
  entries.push(
    ['至少需要 2 节双人配对的课才能画图。', 'At least two paired classes are needed to draw the chart.'],
    ['还没有任何打分记录。在「设置」里添加成员，他们保存后会出现在这里。', 'No scoring records yet. Add members in Settings; their records will appear after they save.'],
    ['打分一致性', 'Scoring Agreement'], ['按 Class ID 配对常规打分者与专家；单周只作预警，累计约 40 节再判断是否达标', 'Pair regular scorers with experts by Class ID. Treat one week as an early signal; assess targets after about 40 paired classes.'],
    ['所选范围内还没有同一节课的常规打分者和专家双人记录。', 'No regular scorer and expert have both scored the same class in this range.'],
    ['打分者 − 专家平均差', 'Mean Scorer − Expert Difference'], ['±5 分内合格率', 'Share Within ±5 Points'],
    ['维度差 ≤1 分', 'Dimension Difference ≤1 Point'], ['总分平均分差（参考）', 'Mean Absolute Total Difference (reference)'],
    ['打分者均分 / 专家均分', 'Scorer Mean / Expert Mean'], ['以内', 'or less'],
    ['每个点是一节课；浅色带为 ±5 分，红点为差距超过 5 分。', 'Each point is one class. The pale band marks ±5 points; red points differ by more than 5.'],
    ['差 ≤1', 'Difference ≤1'], ['完全一致', 'Exact Match'], ['打分者更高', 'Scorer Higher'], ['专家更高', 'Expert Higher'],
    ['打分人概览', 'Scorer Overview'], ['节数', 'Classes'], ['体验 / 正式', 'Trial / Regular'],
    ['问题汇总', 'Issue Summary'], ['打分时逐条记录的问题，以及旧记录里按格式填写的行', 'Issues recorded while scoring, plus formatted lines from legacy notes'],
    ['待同步到问题反馈池：', 'Pending issue tracker sync: '], ['共 ', 'Total: '], [' 条按格式填写', ' formatted entries'],
    ['另有 ', 'plus '], [' 行未按格式（多为首批导入的历史记录）', ' unformatted rows (mostly imported history)'],
    ['包含未按格式的行', 'Include unformatted rows'], ['去同步问题', 'Go to Issue Sync'],
    ['现象', 'Observation'], ['交给', 'Owner Team'],
    ['表格只显示最近 300 条；复制时包含全部 ', 'Table shows the latest 300 entries; copying includes all '],
    ['所选范围内还没有按格式填写的问题。', 'No formatted issues in the selected range.'],
    ['全部记录', 'All Records'], ['点击一行查看打分原因和问题', 'Select a row to view scoring reasons and issues'],
    ['只显示最近 400 条；导出 CSV 包含全部 ', 'Shows the latest 400 records; CSV export includes all '],
    ['每日打分进度', 'Daily Scoring Progress'], [' 人在打分，已完成 ', ' scorers active, '],
    ['按打分日期', 'By Scoring Date'], ['按看课日期', 'By Observation Date'], ['日期口径', 'Date Basis'],
    ['日期', 'Date'], ['打分人数', 'Active Scorers'], ['完成节数', 'Classes Completed'], ['未完课', 'Incomplete'], ['问题条数', 'Issue Count'],
    ['需关注 = 总分低于 60 或有维度低于 6 分的课。', 'Needs attention means a total below 60 or any dimension below 6.'],
    ['首批导入的记录没有打分时间，按看课日期计。', 'Initially imported records use observation date because their scoring time is unavailable.'],
    ['打分人 × 日期', 'Scorers × Date'], ['显示最近 14 天，合计为所选范围全部', 'Showing the latest 14 days; totals cover the full selected range'],
    ['合计', 'Total'], ['根因：', 'Root cause: '], ['建议交给：', 'Suggested owner: '], ['老师：', 'Teacher: '],
    ['级别：', 'Level: '], ['看课日期：', 'Observation date: '], ['按格式重写', 'Rewrite in the required format'],
    ['已复制 ', 'Copied '], [' 条，可直接粘贴到问题反馈池', ' rows; paste them into the issue tracker'],
    ['看课日期', 'Observation Date'], ['打分日期', 'Scoring Date'], ['亮点（旧）', 'Highlights (legacy)'],
    ['按级别', 'By Level'], ['所选范围内每个级别的看课数量和分数；"仅留档"记录只计入节数', 'Class counts and scores by level; archive-only records count toward classes but not averages'],
    ['最低 – 最高', 'Lowest – Highest'], ['级别 × 老师 平均总分', 'Level × Teacher Average Total'], ['括号内为节数', 'Class count in parentheses'],
    ['打分分布', 'Score Distribution'], ['每位打分人的维度分落在 ≤6 / 7–8 / ≥9 的比例；7–8 占比明显变高，可能是在"往中间靠"', 'Share of each scorer’s dimension scores in ≤6, 7–8 and ≥9; a larger 7–8 share may indicate clustering toward the middle'],
    ['分布', 'Distribution'], ['分歧最大的课', 'Largest Scoring Disagreements'],
    ['总分差超过 5 分或某个维度差 ≥2 分；点开看两人的打分原因', 'Total difference above 5 points or a dimension difference ≥2; expand to inspect both reasons'],
    ['所选范围内没有明显分歧的配对。', 'No paired classes with substantial disagreement in this range.'],
    ['差 ≥2 的维度', 'Dimensions Differing by ≥2'], ['差', 'Difference'], ['（未写原因）', '(no reason entered)'],
    ['两人都没有写打分原因。', 'Neither scorer entered a scoring reason.']
  );
  entries.push(
    ['正在读取待同步的问题…', 'Loading issues awaiting sync…'], ['读取失败：', 'Failed to load: '],
    ['全部课程', 'All Class Types'], ['没有待同步的问题。打分人记录的新问题会出现在这里。', 'No issues awaiting sync. New issues entered by scorers will appear here.'],
    ['条原始记录', 'original entries'], ['记录人', 'Recorded By'],
    ['第 1 步 · 新问题', 'Step 1 · New Issues'], ['组，合计', ' groups, total '], ['复制全部（', 'Copy All (' ],
    ['复制后到问题反馈池粘贴（从"问题描述"列开始），负责人在 Lark 里手动选。不需要同步的组点"忽略"。', 'Paste the copied rows into the issue tracker starting at the Issue Description column. Choose the owner manually in Lark. Ignore groups that do not need syncing.'],
    ['问题描述（会出现在反馈池）', 'Issue description (appears in the tracker)'], ['取消忽略', 'Undo Ignore'], ['忽略', 'Ignore'],
    ['出现 ', 'Seen in '], ['拆成 ', 'Split into '], [' 行分别贴', ' separate rows'], ['没有新问题。', 'No new issues.'],
    ['第 2 步 · 又出现的问题', 'Step 2 · Recurring Issues'],
    ['这些问题已在反馈池里，只需在原来那一行的"备注说明"后追加', 'These issues are already in the tracker; append a note to their existing rows'],
    ['本次 ', 'This time: '], ['反复出现', 'Recurring'], ['复制备注', 'Copy Note'], ['没有又出现的问题。', 'No recurring issues.'],
    ['第 3 步 · 标记已同步', 'Step 3 · Mark as Synced'], ['全部标记已同步', 'Mark All as Synced'],
    ['会把 ', 'This will mark '], [' 条标记为"已同步"', ' issues as synced'], [' 条标记为"已忽略"', ' issues as ignored'],
    ['下次只显示新增的问题。', 'Only new issues will appear next time.'],
    ['还没复制第 1 步的内容，确认已经贴进反馈池再标记。', 'Step 1 has not been copied yet. Confirm that you pasted it into the tracker before marking as synced.'],
    ['已复制备注，粘到反馈池原来那一行的"备注说明"后面', 'Note copied. Append it to the existing tracker row.'],
    ['还没复制，确定标记？', 'Not copied yet. Mark anyway?'], ['已标记 ', 'Marked '], [' 条已同步', ' synced'], [' 条已忽略', ' ignored'],
    ['复制失败，请手动选中复制', 'Copy failed. Select and copy manually.'],
    ['根因 ', 'Root cause '], ['回放：', 'Recording: '], ['仍在反复高频出现', 'Recurring frequently'], ['又出现 ', 'Recurred in '],

    ['成员与权限', 'Members & Access'], ['只有名单里的邮箱能登录打分；对比角色只在后台可见', 'Only listed emails can sign in and score. Comparison roles are visible only to administrators.'],
    ['名字（可不填，由本人填写）', 'Name (optional; member may enter it)'], ['名字', 'Name'],
    ['同步问题', 'Sync Issues'], ['记录数', 'Records'], ['管理员默认可以', 'Administrators have access'],
    ['待设置密码', 'Password Not Set'], ['未填写', 'Not Entered'], ['确认删除', 'Confirm Delete'],
    ['给 ', 'Set '], [' 设一个新密码：', ' a new password: '], ['确定', 'Confirm'],
    ['设好后把新密码告诉对方，对方登录后可在"我的记录"里自己再改。', 'Tell the member the new password; they can change it in My Records after signing in.'],
    ['账号与成员名单和原平台共用；这里修改成员或密码会影响两个平台。勾选"同步问题"的成员可使用同步页。V2.1 的打分记录、复评任务和问题记录单独保存。', 'Accounts and membership are shared with the original platform. Member and password changes here affect both platforms. Members granted issue sync can use the Sync Issues page. V2.1 scores, review tasks and issues remain separate.'],
    ['问题导出字段', 'Issue Export Fields'], ['「同步问题」复制到反馈池时使用', 'Used when copying from Sync Issues to the tracker'],
    ['打分者 − 专家平均差（绝对值上限，分）', 'Scorer − Expert Mean Difference (absolute maximum, points)'],
    ['±5 分内合格率（下限，%）', 'Share Within ±5 Points (minimum, %)'],
    ['ICC（下限）', 'ICC (minimum)'], ['维度差 ≤1 分（下限，%）', 'Dimension Difference ≤1 (minimum, %)'],
    ['老师名单、导出字段、目标范围和复评参数改完后点右上角"保存设置"；成员的修改会立即生效。', 'After changing teachers, export fields, targets or review settings, select Save Settings. Member changes take effect immediately.'],
    ['请填写正确的邮箱', 'Enter a valid email address.'], ['这个邮箱已经在名单里', 'This email is already listed.'],
    ['已添加 ', 'Added '], ['已更新', 'Updated'], ['只有管理员可以修改设置', 'Only administrators can change settings.'],
    ['设置已保存', 'Settings saved'], ['密码至少 8 位', 'Password must be at least 8 characters.'], ['密码已重设', 'Password reset.'],
    ['未填写名字', 'Name Not Entered'], ['改名', 'Change Name'], ['退出', 'Sign Out'],
    ['修改你的名字', 'Change Your Name'], ['你是管理员，请先填写名字以便区分', 'You are an administrator. Enter your name to identify your records.'],
    ['请填写名字', 'Enter your name.'], ['名字已更新', 'Name updated'], ['你好，', 'Hello, '],
    ['设置密码并进入', 'Set Password and Continue'], ['用管理员登记的邮箱设置一个至少 8 位的密码，之后用邮箱和密码登录。', 'Set a password of at least 8 characters using your registered email, then sign in.'],
    ['网站还没有配置数据库', 'The database has not been configured.'], ['请填写邮箱和密码', 'Enter your email and password.'],
    ['两次输入的密码不一样', 'Passwords do not match.'], ['你登录的邮箱是 ', 'You signed in as '], ['，还不在打分名单里，或已被停用。请联系管理员后重新登录。', ', but this address is not on the scoring list or has been deactivated. Contact an administrator, then sign in again.'],
    ['已刷新', 'Refreshed'], ['密码已更新', 'Password updated.'],
    ['网站还没有连接数据库：', 'The site is not connected to a database: '], ['请在 config.js 中填写 Supabase 项目地址和 anon key。', 'Enter the Supabase project URL and anon key in config.js.']
  );
  entries.push(
    ['今天：', 'Today: '], [' 分内', ' points'], [' 节', ' classes'], [' 条', ' entries'], [' 行', ' rows'],
    ['还差 ', 'Need '], ['未覆盖', 'Not Covered'], ['优先级', 'Priority'], ['指标', 'Metric'],
    ['课程产品 / 教研', 'Course Product / Curriculum'], ['定级 / 排课', 'Level Placement / Scheduling'],
    ['模型 / 工程', 'Model / Engineering'], ['Prompt / 教学策略', 'Prompt / Teaching Strategy'],
    ['产品 / 工程', 'Product / Engineering'], ['专家复核', 'Expert Review'],
    ['评分原因', 'Scoring Reason'], ['评分边界', 'Scoring Boundaries'],
    ['打分者 · ', 'Scorer · '], ['专家 · ', 'Expert · '],
    ['有严重问题', 'Serious Issues'], ['低分', 'Low Score'], ['覆盖打分者', 'Scorer Coverage'], ['随机抽查', 'Random Check'],
    ['管理员指定', 'Assigned by Administrator']
  );
  const direct = new Map(entries);
  const replacements = entries.filter(([zh]) => zh.length >= 3).sort((a, b) => b[0].length - a[0].length);
  const shortFragments = [[' 节',' classes'],[' 条',' entries'],[' 行',' rows'],['共 ','Total '],['还差 ','Need ']];
  function translate(value) {
    if (lang !== 'en' || !value || !/[\u3400-\u9fff]/.test(value)) return value;
    const trimmed = value.trim();
    if (direct.has(trimmed)) return value.replace(trimmed, direct.get(trimmed));
    let result = value;
    for (const [zh, en] of replacements) result = result.replaceAll(zh, en);
    for (const [zh, en] of shortFragments) result = result.replaceAll(zh, en);
    result = result.replace(/^(\s*)(课程|级别|识别|教学|产品|待查)(?=\s*→)/, (_m, space, root) => space + direct.get(root));
    result = result.replace(/(Root cause\s+)(课程|级别|识别|教学|产品|待查)(?=\s*(?:→|$))/, (_m, prefix, root) => prefix + direct.get(root));
    result = result.replace(/(\d)(课程|级别|识别|教学|产品|待查)/g, (_m,n,root) => n+' '+direct.get(root));
    result = result.replace(/今天(?=(Mon|Tue|Wed|Thu|Fri|Sat|Sun))/g, 'Today is ');
    return result;
  }
  function visit(root) {
    if (lang !== 'en' || !root) return;
    const elements = root.nodeType === 1 ? [root, ...root.querySelectorAll('*')] : [];
    for (const el of elements) {
      if (el.tagName === 'OPTION' && !el.hasAttribute('value')) el.setAttribute('value', el.value);
      for (const attr of ['placeholder', 'aria-label', 'title']) {
        const value = el.getAttribute(attr);
        if (value) { const next = translate(value); if (next !== value) el.setAttribute(attr, next); }
      }
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || /^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT)$/.test(parent.tagName) || parent.closest('[contenteditable="true"]')) continue;
      const next = translate(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    }
  }
  function start(rules) {
    document.title = lang === 'en' ? 'TQA V2.1 Scoring Platform' : 'TQA 看课打分台';
    const list = document.querySelectorAll('#rules ol li');
    if (rules?.length === list.length) list.forEach((el, i) => { el.textContent = rules[i]; });
    document.querySelectorAll('.language button').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
      button.onclick = () => {
        const next = button.dataset.lang;
        try { localStorage.setItem('tqa-v21-language', next); } catch (_) {}
        const url = new URL(location.href);
        url.searchParams.set('lang', next);
        location.assign(url.toString());
      };
    });
    visit(document.body);
    if (lang === 'en') new MutationObserver(records => {
      for (const record of records) {
        if (record.type === 'characterData') visit(record.target.parentElement);
        else for (const node of record.addedNodes) {
          if (node.nodeType === 1) visit(node);
          else if (node.nodeType === 3) visit(node.parentElement);
        }
      }
    }).observe(document.body, {subtree:true, childList:true, characterData:true});
  }
  window.TQA_I18N = { lang, start, translate };
})();
