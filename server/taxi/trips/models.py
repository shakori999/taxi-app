import uuid 

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse  
from django.conf import settings
# Create your models here.

class User(AbstractUser):
    photo = models.ImageField(upload_to='photos', null=True, blank=True, verbose_name='user Image')
    def __unicode__(self):
            return (self.photo)
    def image_img(self):
        if self.photo:
            return u'<img src="%s" width="50" height="50" />' % self.photo.url
        else:
            return '(Sin imagen)'
    image_img.short_description = 'Thumb'
    image_img.allow_tags = True
    @property
    def group(self):
        groups = self.groups.all()
        return groups[0].name if groups else None

class Trip(models.Model): # new
    REQUESTED = 'REQUESTED'
    STARTED = 'STARTED'
    IN_PROGRESS = 'IN_PROGRESS'
    COMPLETED = 'COMPLETED'
    STATUSES = (
        (REQUESTED, REQUESTED),
        (STARTED, STARTED),
        (IN_PROGRESS, IN_PROGRESS),
        (COMPLETED, COMPLETED),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True, null=True)
    updated = models.DateTimeField(auto_now=True)
    pick_up_address = models.CharField(max_length=255, null=True)
    drop_off_address = models.CharField(max_length=255, null=True)
    status = models.CharField(
        max_length=20, choices=STATUSES, default=REQUESTED)
    driver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING,
        related_name='trips_as_driver'
    )
    rider = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING,
        related_name='trips_as_rider'
    )

    def __str__(self):
        return f'{self.id}'

    def get_absolute_url(self):
        return reverse('trip:trip_detail', kwargs={'trip_id': self.id})