import firebase_admin
from firebase_admin import credentials, firestore
from app.config import settings

cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS)
firebase_admin.initialize_app(cred)
db = firestore.client()

def save_video_data(video_data):
    doc_ref = db.collection("videos").document(video_data["video_id"])
    doc_ref.set(video_data)

def get_video_data(video_id):
    doc_ref = db.collection("videos").document(video_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        return None
