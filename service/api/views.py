from rest_framework import permissions, viewsets

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
from rest_framework import generics
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from . import models, serializers
from django.http import JsonResponse
from .models import *

class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PlayListViewSet(viewsets.ModelViewSet):     #get all Playlist
    queryset = Playlist.objects.all()
    serializer_class = serializers.PlayListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SearchView(generics.ListAPIView):
    queryset = Track.objects.all()
    serializer_class = serializers.TrackSerializer
    filter_backends = (DjangoFilterBackend,SearchFilter)
    filter_fields = ('title')







class PlaylistAPIView(APIView):

    def get(self,request,*args, **kwargs):                # gets the particular PlayList

        OnePlayList = Playlist.objects.get(id=self.kwargs['id'])
        l = json.loads(OnePlayList.all_tracks)
        resp = {
            "name": OnePlayList.name,
            "description" : OnePlayList.description,
            "all_tracks" : l
        }

        return Response(resp)

    def put(self,request,*args, **kwargs):
        data = request.data
        editPL = Playlist.objects.get(id=self.kwargs['id'])
        editPL.name = data["name"]

        editPL.save()

        return Response({"status":"success"})

    def post(self, request):                            # creates new playlist
        data = request.data
        print(data)
        NewPlayList = Playlist()
        NewPlayList.name = data["name"]
        NewPlayList.description = data["description"]
        NewPlayList.save()
        return Response({"status":"success"})

    def delete(self,request,*args, **kwargs):                #deletes the playlist
        data = {}
        try:
            DelLst = Playlist.objects.get(id=self.kwargs['id'])
            DelLst.delete()
            data['response'] = "success"
            return Response(data, status=status.HTTP_200_OK)
        except:
            data['response'] = "error"
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


    def put(self,request,*args, **kwargs):                     #add tracks to the playlist
        data = request.data
        data = data
        TrackToAdd = Playlist.objects.get(id = self.kwargs['id'])
        temp = json.loads(TrackToAdd.all_tracks)
        for i in range(len(temp)):
            if data["id"] == temp[i]["id"]:
                return Response({"status":"Already present inside this playlist"})
        temp.append(data)
        TrackToAdd.all_tracks = json.dumps(temp)
        TrackToAdd.save()
        return Response({"status":"Added successfully!"})

    def patch(self,request,*args, **kwargs):  # remove tracks from the playlist
        data = request.data
        TrackToAdd = Playlist.objects.get(id=self.kwargs['id'])
        dataToRemove = json.loads(TrackToAdd.all_tracks)
        for i in range(len(dataToRemove)):
            if dataToRemove[i]["id"] == data["id"]:
                dataToRemove.pop(i)
                break

        TrackToAdd.all_tracks = json.dumps(dataToRemove)
        TrackToAdd.save()
        return Response({"status":"success"})

def search(request):   #search filter api for adding tracks
    titles = list()
    if 'search' in request.GET:
        qs = Track.objects.filter(title__istartswith = request.GET.get('search'))
        res = {}
        for i in qs:
            res['id'] = i.id
            res['title'] = i.title
            res['length']  = i.length
            res['bpm'] = i.bpm
            res['main_artists'] = [j.name for j in i.main_artists.all()]
            res['audio'] = i.audio
            titles.append(res)
    return JsonResponse(titles,safe=False)