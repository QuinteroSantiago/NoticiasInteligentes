from fastapi import APIRouter, HTTPException, Depends

router = APIRouter(
    prefix="/news",
    tags=["news"],
    responses={404: {"description": "Not Found"}}
)

articles_db = {
    1:{
        "title": "Atrae emociones positivas y ten una vida mas plena", 
        "imgUrl": "assets/news_images/noticia1.webp", 
        "tags": {'Bienestar'}, 
        "link": "https://lacarabuenadelmundo.com/como-atraer-emociones-positivas-tener-una-vida-mas-plena/",
        "date": "12-11-2022",
    },
    2:{
        "title": "Good News ML Aggregator", 
        "imgUrl": "assets/news_images/noticia2.webp", 
        "tags": {'Francia', 'Agua Potable'}, 
        "link": "https://lacarabuenadelmundo.com/inventan-un-sistema-para-potabilizar-agua-en-cualquier-parte/",
        "date": "12-9-2022",
    }
}

@router.get("/")
async def read_projects():
    return articles_db

@router.get("/{newsId}")
async def read_project(newsId: int):
    if newsId not in articles_db:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"name": articles_db[newsId]["title"],"newsId": newsId}



@router.get("/otros")
async def ultimo():
    return {"name": "Gracias","projectId": "Denada"}
