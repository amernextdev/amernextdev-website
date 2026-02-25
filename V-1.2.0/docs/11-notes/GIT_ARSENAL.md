# ترسانة Git — الدليل الشامل
## Git Arsenal: Setup · Daily Workflow · Branching · Recovery

> **مستقل عن أي مشروع** — يصلح لأي مشروع
> **يُقرأ عند:** بدء مشروع جديد، مشكلة في Git، نسيت أمر

---

# الجزء الأول: الإعداد الأولي

## إعداد الهوية (مرة واحدة على الجهاز)

```bash
# الاسم والإيميل — يظهران في كل commit
git config --global user.name "Amer"
git config --global user.email "amer@example.com"

# المحرر الافتراضي
git config --global core.editor "code --wait"    # VS Code
git config --global core.editor "nvim"           # Neovim
git config --global core.editor "nano"           # Nano

# الفرع الافتراضي عند init
git config --global init.defaultBranch main

# تحسينات مستحسنة
git config --global pull.rebase false            # merge عند pull
git config --global core.autocrlf input          # Linux/macOS
git config --global core.autocrlf true           # Windows

# عرض كل الإعدادات
git config --global --list
git config --list                                # الإعدادات الكاملة
```

## بدء مشروع

```bash
# إنشاء مستودع جديد
git init
git init my-project              # ينشئ المجلد أيضاً

# استنساخ مستودع موجود
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git my-folder   # باسم مختلف
git clone --depth 1 https://github.com/user/repo.git   # آخر commit فقط
git clone -b develop https://github.com/user/repo.git  # فرع محدد
```

---

# الجزء الثاني: دورة العمل اليومية

## مخطط الحالات

```
Untracked  →  git add  →  Staged  →  git commit  →  Committed
                                                         │
                                                   git push  →  Remote
```

## الحالة والمعلومات

```bash
# حالة الملفات الحالية
git status
git status -s                    # مختصر
git status -sb                   # مختصر + اسم الفرع

# تاريخ الـ commits
git log
git log --oneline                # سطر لكل commit
git log --oneline --graph        # مع رسم الفروع
git log --oneline --graph --all  # كل الفروع
git log -10                      # آخر 10 commits فقط
git log --author="Amer"          # commits شخص معين
git log --since="2024-01-01"     # منذ تاريخ
git log --grep="fix"             # commits تحتوي كلمة

# الفرق بين الملفات
git diff                         # التغييرات غير الـ staged
git diff --staged                # التغييرات الـ staged
git diff HEAD                    # كل التغييرات منذ آخر commit
git diff main..develop           # الفرق بين فرعين
git diff abc123..def456          # الفرق بين commit-ين

# معلومات commit معين
git show                         # آخر commit
git show abc123                  # commit محدد
git show abc123 --stat           # الملفات المتأثرة فقط
```

## إضافة الملفات (Staging)

```bash
# إضافة ملف
git add main.py
git add src/auth.py

# إضافة عدة ملفات
git add main.py src/vault.py

# إضافة مجلد كامل
git add src/

# إضافة كل شيء
git add .
git add --all

# إضافة تفاعلية (تختار التغييرات)
git add -p main.py               # junk by junk
git add -i                       # interactive mode

# إزالة من الـ staging (تراجع عن add)
git restore --staged main.py
git restore --staged .
git reset HEAD main.py           # الطريقة القديمة
```

## الـ Commit

```bash
# commit بسيط
git commit -m "feat: add vault encryption"

# commit مع وصف تفصيلي
git commit -m "feat: add vault encryption" -m "Uses AES-256-GCM with PBKDF2 key derivation"

# add + commit معاً (للملفات المتتبعة فقط)
git commit -am "fix: handle empty password"

# تعديل آخر commit (قبل الـ push فقط)
git commit --amend -m "feat: add vault encryption with AES-256-GCM"
git commit --amend --no-edit     # تعديل الملفات بدون تغيير الرسالة
```

## صيغة رسائل الـ Commit (Conventional Commits)

```bash
# الصيغة: نوع(نطاق): وصف
# النوع  : feat | fix | docs | style | refactor | test | chore

git commit -m "feat: add task creation command"
git commit -m "feat(auth): implement PBKDF2 key derivation"
git commit -m "fix: handle empty password in vault"
git commit -m "fix(storage): prevent duplicate task IDs"
git commit -m "docs: update README with installation steps"
git commit -m "refactor: split vault.py into open/read/write"
git commit -m "test: add auth unit tests"
git commit -m "chore: update dependencies"
git commit -m "style: format with ruff"

# BREAKING CHANGE
git commit -m "feat!: change vault encryption to AES-256-GCM"
```

---

# الجزء الثالث: التراجع والإصلاح

## مخطط خيارات التراجع

```
تريد التراجع عن...
         │
┌────────┴──────────┬─────────────────┬──────────────────┐
▼                   ▼                 ▼                  ▼
تغيير في ملف    add (staging)    آخر commit       عدة commits
(لم تعمل add)                  (لم تعمل push)
git restore     git restore      git commit        git reset
  <file>        --staged <file>  --amend        HEAD~N / hash
```

## التراجع عن التغييرات

```bash
# تراجع عن تغيير ملف (قبل add) — يُعيده لآخر commit
git restore main.py
git restore .                    # كل الملفات

# تراجع عن add (إخراج من staging)
git restore --staged main.py
git restore --staged .

# تراجع عن آخر commit (يحتفظ بالتغييرات في الملفات)
git reset HEAD~1
git reset HEAD~1 --soft          # نفس الأمر، التغييرات تبقى staged
git reset HEAD~1 --mixed         # التغييرات تبقى لكن unstaged (الافتراضي)
git reset HEAD~1 --hard          # يحذف التغييرات نهائياً ⚠️

# تراجع عن N commits
git reset HEAD~3
git reset HEAD~3 --hard          # ⚠️ حذف نهائي

# تراجع عن commit معين بـ hash
git reset abc123
git reset abc123 --hard          # ⚠️

# إنشاء commit يُلغي commit قديم (آمن للـ push)
git revert abc123
git revert HEAD                  # يُلغي آخر commit
git revert HEAD~3..HEAD          # يُلغي آخر 3 commits
```

## استعادة ملف محذوف

```bash
# استعادة ملف من آخر commit
git restore main.py

# استعادة ملف من commit محدد
git restore --source=abc123 main.py
git checkout abc123 -- main.py   # الطريقة القديمة
```

## Stash — حفظ مؤقت للتغييرات

```bash
# حفظ التغييرات مؤقتاً (للتبديل للفرع الآخر سريعاً)
git stash
git stash push -m "work in progress on auth"

# عرض القائمة
git stash list

# استعادة آخر stash
git stash pop                    # استعادة + حذف من الـ stash
git stash apply                  # استعادة بدون حذف

# استعادة stash محدد
git stash pop stash@{2}
git stash apply stash@{2}

# حذف stash
git stash drop                   # آخر واحد
git stash drop stash@{2}         # محدد
git stash clear                  # حذف الكل
```

---

# الجزء الرابع: الفروع (Branches)

## إنشاء وإدارة الفروع

```bash
# عرض الفروع
git branch                       # المحلية
git branch -r                    # البعيدة
git branch -a                    # الكل

# إنشاء فرع
git branch feature/add-vault
git branch fix/auth-timeout

# الانتقال لفرع
git switch feature/add-vault
git checkout feature/add-vault   # الطريقة القديمة

# إنشاء والانتقال في أمر واحد
git switch -c feature/add-vault
git checkout -b feature/add-vault

# إنشاء فرع من نقطة محددة
git switch -c feature/add-vault main
git switch -c hotfix/critical abc123    # من commit محدد

# إعادة تسمية الفرع الحالي
git branch -m new-name

# حذف فرع
git branch -d feature/add-vault  # حذف آمن (فقط لو مدموج)
git branch -D feature/add-vault  # حذف قسري ⚠️
```

## نموذج تسمية الفروع

```bash
main                    ← الإنتاج المستقر
develop                 ← التطوير الرئيسي

feature/add-vault       ← ميزة جديدة
feature/task-filtering
feature/voice-input

fix/auth-timeout        ← إصلاح خطأ
fix/vault-corruption
bugfix/empty-password   ← بديل

hotfix/critical-crash   ← إصلاح عاجل في main
hotfix/security-patch

refactor/split-vault    ← إعادة هيكلة
refactor/core-cleanup

docs/update-readme      ← توثيق
test/add-auth-tests     ← اختبارات
chore/upgrade-deps      ← صيانة
```

## الدمج (Merge)

```bash
# الانتقال للفرع الذي يستقبل الدمج أولاً
git switch main

# دمج فرع
git merge feature/add-vault
git merge --no-ff feature/add-vault    # يُنشئ commit دمج دائماً
git merge --squash feature/add-vault   # يجمع كل commits في واحد

# إلغاء دمج فاشل
git merge --abort

# عرض ما تم دمجه وما لم يُدمج
git branch --merged
git branch --no-merged
```

## Rebase

```bash
# rebase الفرع الحالي على main
git rebase main

# rebase تفاعلي — لتنظيم الـ commits قبل الدمج
git rebase -i HEAD~3             # تعديل آخر 3 commits
git rebase -i main               # تعديل commits منذ main

# أوامر داخل rebase التفاعلي
# pick   = احتفظ بالـ commit كما هو
# reword = احتفظ لكن غيّر الرسالة
# squash = ادمجه مع الـ commit السابق
# fixup  = ادمج وتجاهل رسالته
# drop   = احذف الـ commit

# إلغاء rebase
git rebase --abort

# متابعة rebase بعد حل التعارضات
git rebase --continue
```

---

# الجزء الخامس: Remote — GitHub وما شابهه

## إدارة الـ Remotes

```bash
# عرض الـ remotes
git remote -v

# إضافة remote
git remote add origin https://github.com/user/repo.git
git remote add upstream https://github.com/original/repo.git

# تغيير URL
git remote set-url origin https://github.com/user/new-repo.git

# حذف remote
git remote remove upstream
```

## Push و Pull

```bash
# رفع للـ remote
git push origin main
git push origin feature/add-vault

# رفع أول مرة مع ربط الفرع
git push -u origin main          # -u = --set-upstream
git push -u origin feature/add-vault

# بعد الربط، يكفي
git push
git pull

# رفع كل الفروع
git push --all origin

# رفع الـ tags
git push --tags

# حذف فرع من الـ remote
git push origin --delete feature/add-vault
git push origin :feature/add-vault          # الطريقة القديمة

# تحديث من الـ remote
git pull                         # fetch + merge
git pull --rebase                # fetch + rebase
git fetch                        # تنزيل فقط بدون دمج
git fetch --all                  # كل الـ remotes
git fetch --prune                # حذف الفروع المحذوفة من remote
```

## مزامنة مع Fork الأصلي

```bash
git fetch upstream
git switch main
git merge upstream/main
git push origin main
```

---

# الجزء السادس: Tags — الإصدارات

```bash
# إنشاء tag
git tag v0.1.0
git tag v0.1.0 -m "First alpha release"
git tag v0.1.0 abc123            # tag لـ commit محدد

# عرض الـ tags
git tag
git tag -l "v0.*"                # فلترة

# عرض معلومات tag
git show v0.1.0

# رفع الـ tags
git push origin v0.1.0
git push origin --tags           # كل الـ tags

# حذف tag
git tag -d v0.1.0                # محلياً
git push origin --delete v0.1.0  # من الـ remote
```

---

# الجزء السابع: البحث والتحقيق

```bash
# البحث عن نص في الكود
git grep "vault"
git grep "derive_key" -- "*.py"

# معرفة من كتب كل سطر في ملف
git blame main.py
git blame -L 10,20 main.py       # أسطر محددة

# البحث عن commit أدخل خللاً (ثنائي)
git bisect start
git bisect bad                   # الحالة الحالية سيئة
git bisect good v0.1.0           # هذا الـ tag كان جيداً
# Git ينتقل لـ commit وسط — اختبر وقول:
git bisect good                  # أو
git bisect bad
# كرر حتى تجد الـ commit المسبب
git bisect reset                 # إنهاء

# عرض كل ما حدث في المستودع (خط نجاة)
git reflog
git reflog --all
```

---

# الجزء الثامن: حل التعارضات (Conflicts)

```bash
# عند ظهور تعارض
# 1. افتح الملف — ستجد:
<<<<<<< HEAD
الكود في فرعك الحالي
=======
الكود القادم من الفرع الآخر
>>>>>>> feature/add-vault

# 2. حرر الملف واحتفظ بما تريد
# 3. احذف علامات التعارض كلها
# 4. أضف الملف وأكمل
git add main.py
git merge --continue            # أو
git rebase --continue

# إلغاء العملية كلها
git merge --abort
git rebase --abort

# أدوات مساعدة
git mergetool                   # يفتح أداة رسومية
git diff --conflict=diff3       # عرض أوضح للتعارض
```

---

# الجزء التاسع: الإعدادات المتقدمة

## Aliases — اختصارات مخصصة

```bash
# إضافة aliases
git config --global alias.st "status -sb"
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.last "log -1 HEAD --stat"
git config --global alias.unstage "restore --staged"
git config --global alias.undo "reset HEAD~1"

# استخدام
git st
git lg
git last
git unstage main.py
git undo
```

## .gitconfig الكامل المقترح

```ini
[user]
    name = Amer
    email = amer@example.com

[init]
    defaultBranch = main

[core]
    editor = code --wait
    autocrlf = input

[pull]
    rebase = false

[alias]
    st = status -sb
    lg = log --oneline --graph --all --decorate
    last = log -1 HEAD --stat
    unstage = restore --staged
    undo = reset HEAD~1
    aliases = config --get-regexp alias
```

---

# الجزء العاشر: أوامر الصيانة

```bash
# تنظيف الملفات غير المتتبعة
git clean -n                     # معاينة فقط بدون حذف
git clean -f                     # حذف الملفات
git clean -fd                    # حذف الملفات والمجلدات
git clean -fdx                   # حذف + ملفات الـ .gitignore ⚠️

# تحسين أداء المستودع
git gc
git gc --aggressive

# التحقق من سلامة المستودع
git fsck

# عرض حجم المستودع
git count-objects -v -H
```

---

# الجزء الحادي عشر: البطاقة المرجعية السريعة

```bash
# ── إعداد مشروع جديد ────────────────────────────
git init
git add .
git commit -m "chore: initial project structure"
git remote add origin https://github.com/user/repo.git
git push -u origin main

# ── دورة العمل اليومية ──────────────────────────
git status                           # أين أنا؟
git pull                             # تحديث أولاً
git switch -c feature/new-thing      # فرع جديد
# ... اعمل التغييرات ...
git add .
git commit -m "feat: add new thing"
git push -u origin feature/new-thing

# ── التراجع السريع ──────────────────────────────
git restore <file>              # تراجع عن تغيير (قبل add)
git restore --staged <file>     # تراجع عن add
git reset HEAD~1                # تراجع عن آخر commit (التغييرات تبقى)
git reset HEAD~1 --hard         # تراجع + حذف التغييرات ⚠️
git stash                       # حفظ مؤقت

# ── خط النجاة ───────────────────────────────────
git reflog                      # تاريخ كل شيء حدث
git reflog | head -20           # آخر 20 عملية
git reset --hard HEAD@{3}       # الرجوع لنقطة من الـ reflog

# ── قبل الـ Push دائماً ─────────────────────────
git log --oneline -5            # راجع آخر commits
git diff --staged               # راجع ما ستضيفه
git status                      # تأكد من الحالة
```
