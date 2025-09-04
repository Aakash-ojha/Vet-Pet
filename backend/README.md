# 🐾 Vet-Pet Backend (Django)

This backend handles APIs and admin functionality for the Vet-Pet project, which connects pet/livestock owners with veterinary doctors.

---

## 📦 Requirements

Install required Python packages:

Or install from `requirements.txt` if available:
pip install -r requirements.txt

---

## 🛠️ Common Django Commands

### 🔄 Migrations

Make migrations for your app:
python manage.py migrate

---

### 🛡️ Admin Panel

Access the admin dashboard at:
python manage.py runserver

---

## 📋 Models Implemented

- `PetOwner` – name, email, phone
- `VeterinaryDoctor` – name, specialization, contact
- `Animal` – name, species, breed, age, owner (ForeignKey)
- `Consultation` – animal, vet, date, diagnosis, treatment

---

## 🔌 API (via Django Rest Framework)

You'll need to create:

- `serializers.py` for each model
- `viewsets` in `views.py`
- `api/urls.py` using DRF's `DefaultRouter`

Example endpoint:
http://127.0.0.1:8000/admin/

- If models don't appear in admin, check `admin.py` for registration.

- Use `pillow` for image support (if you add image fields later).

---

## 🌐 Frontend Connection (React)

- Use `http://127.0.0.1:8000/api/...` endpoints from React.
- Enable CORS in `settings.py`:

```python
INSTALLED_APPS += ['corsheaders']
MIDDLEWARE.insert(0, 'corsheaders.middleware.CorsMiddleware')
CORS_ALLOW_ALL_ORIGINS = True  # or specify allowed origins
```

python manage.py makemigrations api
python manage.py migrate
