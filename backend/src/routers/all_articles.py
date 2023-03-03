from fastapi import APIRouter, HTTPException, Depends
import json
router = APIRouter()

@router.get("/otros")
async def ultimo():
    f = open('news_articles.json')
    data = json.load(f)
    f.close()
    return {"name": "Gracias","projectId": "Denada"}

    # Closing file
