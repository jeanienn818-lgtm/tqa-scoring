"""Build both scoring languages from the reviewed V2.1 rubric HTML."""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parent
source = (root / 'rubric.html').read_text()
match = re.search(r'<script id="data" type="application/json">(.*?)</script>', source, re.S)
if not match:
    raise ValueError('Rubric data not found')
rubric = json.loads(match.group(1))
keys = ('g10', 'g9', 'g78', 'g56', 'g34', 'g12')
labels = {
    'zh': ('10分 卓越', '9分 优秀', '7–8分 良好', '5–6分 合格', '3–4分 待改进', '1–2分 不合格'),
    'en': ('10 · Outstanding', '9 · Excellent', '7–8 · Good', '5–6 · Adequate', '3–4 · Needs Improvement', '1–2 · Unsatisfactory'),
}
data = {}
for lang in ('zh', 'en'):
    dims = []
    for dim in rubric['dims']:
        body = dim[lang]
        dims.append({
            'n': dim['name'][lang], 'w': dim['weight'], 'q': body['question'],
            'c': body['observations'].splitlines(),
            'b': [[label, body[key]] for key, label in zip(keys, labels[lang])],
            'only': body['scope'], 'notin': body['exclude'],
        })
    data[lang] = {
        'dimensions': dims,
        'guide': [rubric['guide'][str(i)][key][lang] for i in range(1, 9) for key in keys],
        'guideKeys': [dim['guideKey'][lang] for dim in rubric['dims']],
        'rules': rubric['rules'][lang],
    }
    assert len(dims) == 8 and len(data[lang]['guide']) == 48 and len(data[lang]['rules']) == 4
    assert abs(sum(d['w'] for d in dims) - 1) < 1e-9

(root / 'rubric-v21.js').write_text('window.TQA_V21 = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/') + ';\n')
