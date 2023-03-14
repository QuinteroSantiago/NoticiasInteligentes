from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from src.routers import articles
from src.routers import all_articles

app = FastAPI()
handler = Mangum(app)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(articles.router)
app.include_router(all_articles.router)

@app.get("/")
async def root():
    return {"message": "This is Noticias Inteligentes Backend"}
