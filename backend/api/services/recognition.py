from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models.Recognition import Recognition, RecognitionSerializer
import jwt


@api_view(["POST"])
def create_vote(request):
    try:
        serializer = RecognitionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_all_vote_from(request):
    try:
        user_id = request.user.id
        qs = Recognition.objects.filter(uid_from = user_id)
        serializer = RecognitionSerializer(qs, many=True)
        return Response(serializer.data)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_all_vote_to(request):
    try:
        user_id = request.user.id
        qs = Recognition.objects.filter(uid_to=user_id)
        serializer = RecognitionSerializer(qs, many=True)
        return Response(serializer.data)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_vote(request):
    try:
        uid = request.user.id
        rid = request.data["rid"]
        r = Recognition.objects.filter(rid=rid).first()
        if r is None:
            return Response({"message": f"There is no recognition with rid {rid}"}, status.HTTP_404_NOT_FOUND)
        
        if int(r.uid_from) != uid and int(r.uid_to) != uid:
            return Response({"message": f"User can only delete their recognition"}, status.HTTP_403_FORBIDDEN)

        r.delete()
        return Response({"message": f"Recognition {rid} deleted"})
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)