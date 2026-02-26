# ترسانة Python — الدليل الشامل
## Python Arsenal: Environment · Packages · Commands

> **مستقل عن أي مشروع** — يصلح لأي مشروع Python
> **يُقرأ عند:** إنشاء مشروع جديد، مشكلة في بيئة، نسيت أمر

---

# الجزء الأول: تثبيت Python

## التحقق من التثبيت

```bash
python --version
python3 --version

# معرفة مكان التثبيت
which python
which python3

# كل الإصدارات المثبتة على الجهاز
ls /usr/bin/python*
ls /usr/local/bin/python*
```

## تثبيت إصدار محدد (Linux/macOS مع pyenv)

```bash
# تثبيت pyenv أولاً
curl https://pyenv.run | bash

# عرض الإصدارات المتاحة للتثبيت
pyenv install --list
pyenv install --list | grep "3.1"    # فلترة

# تثبيت إصدار
pyenv install 3.11.9
pyenv install 3.12.4

# تعيين إصدار عالمي
pyenv global 3.11.9

# تعيين إصدار للمشروع الحالي فقط
pyenv local 3.11.9           # ينشئ .python-version

# عرض الإصدارات المثبتة
pyenv versions
pyenv version                # الإصدار الحالي فقط
```

---

# الجزء الثاني: البيئة الافتراضية (Virtual Environment)

## لماذا البيئة الافتراضية؟

```
بدونها: كل مكتبة تُثبَّت عالمياً → تعارض بين المشاريع
معها:   كل مشروع له مكتباته المعزولة → لا تعارض
```

## إنشاء بيئة افتراضية

```bash
# الأمر الأساسي
python -m venv .venv

# تحديد إصدار Python معين
python3.11 -m venv .venv
python3.12 -m venv .venv

# اسم المجلد شائع الاستخدام
python -m venv .venv        # ✓ الأكثر شيوعاً (نقطة = مخفي)
python -m venv venv         # ✓ مقبول
python -m venv env          # ✓ مقبول

# مع تجاهل الحزم المثبتة عالمياً (مستحسن)
python -m venv .venv --without-pip          # بدون pip
python -m venv .venv --copies               # نسخ بدلاً من symlinks
python -m venv .venv --upgrade-deps         # أحدث pip و setuptools
```

## تفعيل البيئة الافتراضية

```bash
# Linux / macOS
source .venv/bin/activate

# Windows (CMD)
.venv\Scripts\activate.bat

# Windows (PowerShell)
.venv\Scripts\Activate.ps1

# التحقق من التفعيل — يجب أن يظهر (.venv) في البداية
(.venv) user@machine:~/project$

# معرفة Python الذي يُستخدم الآن
which python                 # يجب أن يشير لـ .venv
python --version
```

## إلغاء تفعيل البيئة

```bash
deactivate
```

## حذف البيئة وإعادة الإنشاء

```bash
# حذف كامل
rm -rf .venv

# إعادة الإنشاء من الصفر
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## معلومات البيئة الحالية

```bash
# مسار Python الحالي
which python
python -c "import sys; print(sys.executable)"

# مسار مجلد المكتبات
python -c "import site; print(site.getsitepackages())"

# هل أنا داخل بيئة افتراضية؟
python -c "import sys; print(sys.prefix != sys.base_prefix)"
```

---

# الجزء الثالث: pip — إدارة المكتبات

## الأوامر الأساسية

```bash
# التأكد من أحدث إصدار pip
pip install --upgrade pip
python -m pip install --upgrade pip

# عرض إصدار pip
pip --version
pip3 --version
```

## تثبيت المكتبات

```bash
# تثبيت مكتبة
pip install typer
pip install typer rich

# تثبيت إصدار محدد
pip install typer==0.9.0
pip install "typer>=0.9.0"
pip install "typer>=0.9.0,<1.0.0"

# تثبيت من requirements.txt
pip install -r requirements.txt

# تثبيت في وضع التطوير (editable) — للمشروع نفسه
pip install -e .
pip install -e ".[dev]"        # مع extras للتطوير

# تثبيت بدون cache (لحل مشاكل)
pip install --no-cache-dir typer

# تثبيت مع تجاهل التبعيات
pip install --no-deps typer

# تثبيت من GitHub مباشرة
pip install git+https://github.com/user/repo.git
pip install git+https://github.com/user/repo.git@branch
pip install git+https://github.com/user/repo.git@v1.0.0
```

## رفع وتحديث المكتبات

```bash
# تحديث مكتبة
pip install --upgrade typer
pip install -U typer

# تحديث كل المكتبات (بحذر في مشاريع production)
pip list --outdated
pip install --upgrade $(pip list --outdated --format=columns | tail -n +3 | awk '{print $1}')
```

## إزالة المكتبات

```bash
# حذف مكتبة
pip uninstall typer
pip uninstall typer -y           # بدون تأكيد

# حذف عدة مكتبات
pip uninstall typer rich -y

# حذف كل شيء في البيئة (نادراً)
pip freeze | xargs pip uninstall -y
```

## البحث والاستعلام

```bash
# عرض كل المكتبات المثبتة
pip list
pip list --outdated              # القديمة فقط
pip list --uptodate              # المحدثة فقط
pip list --format=columns        # عرض جدول
pip list --format=json           # عرض JSON

# معلومات مكتبة محددة
pip show typer
pip show typer rich

# البحث (محدود في الإصدارات الحديثة)
pip index versions typer         # كل الإصدارات المتاحة
```

---

# الجزء الرابع: requirements — تجميد البيئة

## إنشاء requirements.txt

```bash
# تجميد كل المثبتات بإصداراتها الدقيقة
pip freeze > requirements.txt

# ✓ محتوى نموذجي
typer==0.9.0
rich==13.7.0
click==8.1.7
```

## أنواع ملفات requirements

```
requirements.txt          ← المكتبات الأساسية للتشغيل
requirements-dev.txt      ← مكتبات التطوير والاختبار
requirements-test.txt     ← مكتبات الاختبار فقط
requirements-prod.txt     ← مكتبات الإنتاج فقط
```

```bash
# مثال requirements-dev.txt
-r requirements.txt          # يشمل الأساسي أولاً
pytest==7.4.0
pytest-cov==4.1.0
mypy==1.5.0
ruff==0.1.0
black==23.9.0
```

## تثبيت من requirements

```bash
pip install -r requirements.txt
pip install -r requirements.txt -r requirements-dev.txt
```

---

# الجزء الخامس: pyproject.toml — الطريقة الحديثة

## الهيكل الأساسي

```toml
[build-system]
requires = ["setuptools>=68.0", "wheel"]
build-backend = "setuptools.backends.legacy:build"

[project]
name = "mira-os"
version = "0.1.0"
description = "Personal Cognitive OS"
requires-python = ">=3.11"

# المكتبات الأساسية
dependencies = [
    "typer>=0.9.0",
    "rich>=13.0.0",
    "cryptography>=41.0.0",
]

[project.optional-dependencies]
# مكتبات التطوير: pip install -e ".[dev]"
dev = [
    "pytest>=7.4.0",
    "pytest-cov>=4.1.0",
    "mypy>=1.5.0",
    "ruff>=0.1.0",
]

[project.scripts]
mira = "mira.__main__:main"      # أمر CLI بعد التثبيت
```

## تثبيت المشروع من pyproject.toml

```bash
# تثبيت المشروع نفسه (editable)
pip install -e .

# مع مكتبات التطوير
pip install -e ".[dev]"

# مع عدة extras
pip install -e ".[dev,test]"
```

---

# الجزء السادس: Poetry — مدير الحزم المتقدم

## التثبيت والإعداد

```bash
# تثبيت Poetry
curl -sSL https://install.python-poetry.org | python3 -

# التحقق
poetry --version

# إعداد: إنشاء البيئة داخل المشروع (مستحسن)
poetry config virtualenvs.in-project true
```

## إنشاء مشروع

```bash
# مشروع جديد من الصفر
poetry new my-project

# تهيئة مشروع موجود
poetry init
```

## إدارة المكتبات مع Poetry

```bash
# إضافة مكتبة
poetry add typer
poetry add typer rich

# إضافة مكتبة بإصدار محدد
poetry add "typer>=0.9.0"
poetry add typer@0.9.0

# إضافة لمكتبات التطوير فقط
poetry add --group dev pytest mypy ruff

# حذف مكتبة
poetry remove typer

# تحديث
poetry update              # كل المكتبات
poetry update typer        # مكتبة واحدة
```

## تشغيل المشروع مع Poetry

```bash
# تثبيت كل التبعيات
poetry install
poetry install --with dev    # مع مكتبات dev

# تشغيل أمر داخل البيئة
poetry run python main.py
poetry run pytest
poetry run mira

# الدخول لـ shell داخل البيئة
poetry shell

# الخروج
exit
```

## معلومات واستعلام

```bash
poetry show                  # كل المكتبات
poetry show typer            # مكتبة محددة
poetry show --outdated       # القديمة
poetry env info              # معلومات البيئة
poetry env list              # كل البيئات
```

---

# الجزء السابع: تشغيل Python

## تشغيل الملفات

```bash
# تشغيل ملف
python main.py
python src/main.py

# تشغيل مشروع كـ module (يبحث عن __main__.py)
python -m mira
python -m src.mira

# تشغيل سطر واحد
python -c "print('hello')"
python -c "from mira import app; app.run()"

# تشغيل مع متغيرات بيئة
DEBUG=true python main.py
MIRA_MODE=dev python -m mira
```

## Python REPL التفاعلي

```bash
# REPL عادي
python

# REPL مع تحميل module
python -i main.py            # ينفذ الملف ويفتح REPL
python -i -c "from mira.core import *"

# IPython (أقوى)
pip install ipython
ipython
```

---

# الجزء الثامن: أدوات الجودة

## Ruff — Linter و Formatter سريع

```bash
pip install ruff

# فحص الكود
ruff check .
ruff check src/
ruff check main.py

# إصلاح تلقائي
ruff check --fix .

# تنسيق الكود
ruff format .
ruff format --check .        # فحص بدون تغيير

# إعداد في pyproject.toml
# [tool.ruff]
# line-length = 88
# target-version = "py311"
```

## Mypy — Type Checking

```bash
pip install mypy

# فحص الأنواع
mypy .
mypy src/
mypy main.py

# مع إعدادات
mypy --strict main.py
mypy --ignore-missing-imports .

# إعداد في pyproject.toml
# [tool.mypy]
# python_version = "3.11"
# strict = true
```

## Black — Formatter (بديل Ruff format)

```bash
pip install black

black .
black src/
black --check .              # فحص بدون تغيير
black --diff .               # عرض الفرق
```

---

# الجزء التاسع: الاختبارات

## pytest

```bash
pip install pytest pytest-cov

# تشغيل كل الاختبارات
pytest
pytest tests/

# تشغيل ملف محدد
pytest tests/test_auth.py

# تشغيل دالة اختبار محددة
pytest tests/test_auth.py::test_login_success
pytest tests/test_auth.py::TestAuth::test_login

# وضع verbose
pytest -v
pytest -vv                   # أكثر تفصيلاً

# إيقاف عند أول فشل
pytest -x
pytest --maxfail=3           # إيقاف بعد 3 فشل

# تقرير التغطية
pytest --cov=src
pytest --cov=src --cov-report=html
pytest --cov=src --cov-report=term-missing

# تشغيل اختبارات بكلمة مفتاحية
pytest -k "auth"             # كل الاختبارات التي تحتوي "auth"
pytest -k "not slow"         # كل الاختبارات ما عدا "slow"

# عرض print() خلال الاختبارات
pytest -s

# تشغيل بالتوازي (أسرع)
pip install pytest-xdist
pytest -n auto
pytest -n 4
```

---

# الجزء العاشر: التشخيص وحل المشاكل

## مشاكل شائعة وحلولها

```bash
# مشكلة: ModuleNotFoundError
# السبب: البيئة الافتراضية غير مفعلة أو المكتبة غير مثبتة
which python                 # تحقق أنه يشير للبيئة
pip list | grep <module>     # تحقق من التثبيت
pip install <module>

# مشكلة: pip لا يجد المكتبة
pip install --index-url https://pypi.org/simple/ <package>
pip install --trusted-host pypi.org <package>

# مشكلة: تعارض في الإصدارات
pip check                    # يكشف التعارضات
pip install --upgrade <package>

# مشكلة: البيئة فاسدة
rm -rf .venv
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# معرفة من أين يأتي import
python -c "import typer; print(typer.__file__)"

# عرض كل مسارات Python
python -c "import sys; print('\n'.join(sys.path))"

# تنظيف cache الـ pip
pip cache purge
pip cache list

# تنظيف __pycache__
find . -type d -name __pycache__ -exec rm -rf {} +
find . -name "*.pyc" -delete
```

---

# الجزء الحادي عشر: البطاقة المرجعية السريعة

```bash
# ── إنشاء مشروع جديد ────────────────────────────
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt     # أو: poetry install

# ── دورة العمل اليومية ──────────────────────────
source .venv/bin/activate           # أول شيء كل يوم
python -m mira                      # تشغيل المشروع
pytest -v                           # اختبارات
ruff check . && ruff format .       # جودة الكود
deactivate                          # عند الانتهاء

# ── إضافة مكتبة جديدة ───────────────────────────
pip install <package>
pip freeze > requirements.txt       # تحديث الملف

# ── التحقق من صحة البيئة ───────────────────────
which python                        # يجب أن يشير للـ .venv
pip list                            # ما هو مثبت
python --version                    # إصدار Python

# ── تنظيف كامل وإعادة البناء ────────────────────
deactivate
rm -rf .venv
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```
