from fastapi import APIRouter, HTTPException, Depends
import json
import os

router = APIRouter()

@router.get("/otros")
async def ultimo():
    file_path = os.path.abspath('/Users/santiagoquintero/Desktop/projects/NoticiasInteligentes/backend/src/scripts/news_articles.json')  
    with open(file_path) as f:
        data = json.load(f)
    return data

