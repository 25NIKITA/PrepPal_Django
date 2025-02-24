from django.shortcuts import render
from django.contrib.auth.models import User 
from .models import Note
from .serializer import NoteSerializer, UserRegistrationSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens.get('access')
            refresh_token = tokens.get('refresh')

            if not access_token or not refresh_token:
                return Response({'success': False, 'error': 'Token generation failed'}, status=400)

            res = Response({'success': True})

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            return res

        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=400)


class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            if not refresh_token:
                return Response({'refreshed': False, 'error': 'Refresh token not found'}, status=400)

            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)

            access_token = response.data.get('access')
            if not access_token:
                return Response({'refreshed': False, 'error': 'Access token generation failed'}, status=400)

            res = Response({'refreshed': True})
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            return res

        except Exception as e:
            return Response({'refreshed': False, 'error': str(e)}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        res = Response({'success': True})

        # Blacklist the refresh token if applicable
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()  # Requires SIMPLE_JWT Blacklist setup in settings.py
            except Exception:
                pass  # Ignore errors if token is already blacklisted

        # Remove cookies securely
        res.delete_cookie('access_token', path='/', samesite='None', httponly=True)
        res.delete_cookie('refresh_token', path='/', samesite='None', httponly=True)

        return res

    except Exception as e:
        return Response({'success': False, 'error': str(e)}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({'authenticated': True})


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)  # Properly return validation errors


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    notes = Note.objects.filter(owner=user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)
