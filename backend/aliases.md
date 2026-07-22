# django




```bash
# Core Environment & Running
alias dj="python manage.py"
alias venv="source .venv/bin/activate"
alias runserver="python3 manage.py runserver"

# Automation & Testing
alias createsuperuser="DJANGO_SUPERUSER_PASSWORD=qwerty python3 manage.py createsuperuser --username=raypamber --email=raypamber@gmail.com --noinput"
alias loadcomp="python3 manage.py load complaints"

# Database Reset (Prunes migrations safely, keeping __init__.py files)
alias resetdatabase="find . -path './.venv' -prune -o \( -path '*/migrations/*' -not -name '__init__.py' -o -name 'db.sqlite3' \) -exec rm -rf {} + && python3 manage.py makemigrations && python3 manage.py migrate"

```
