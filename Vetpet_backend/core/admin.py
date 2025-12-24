from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser

    # Add custom fields to the admin form
    add_fieldsets = (
    (None, {
        'classes': ('wide',),
        'fields': (
            'city', 'phone', 'email', 'address',
            'first_name', 'last_name',   # ✅ fixed here
            'is_active', 'is_staff', 'password1', 'password2'
        ),
    }),
)


admin.site.register(CustomUser,CustomUserAdmin)
