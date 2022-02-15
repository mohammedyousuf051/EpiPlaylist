from django.urls import include, path
from rest_framework import routers

from . import views
from .views import *

router = routers.DefaultRouter()
router.register(r"tracks", views.TrackViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path('playlist/add', PlaylistAPIView.as_view(),name="addPlaylist"),
    path('allplaylist/', PlayListViewSet.as_view({'get': 'list'})),
    path('playlist/<id>', PlaylistAPIView.as_view(),name="tracksInsidePlaylist"),

    path('playlist/delete/<id>', PlaylistAPIView.as_view(),name="deletePlalist"),
    path('playlist/addTrack/<id>', PlaylistAPIView.as_view(),name="addTrack"),
    path('playlist/removeTrack/<id>', PlaylistAPIView.as_view(),name="removeTrack"),

    path('search/',views.search,name="searchtracks")
]
