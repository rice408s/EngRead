from fastapi import FastAPI, HTTPException, Depends, APIRouter
from sqlmodel import Session, create_engine, SQLModel

from app.model.book import Book, BookCreate,BookPublic
from app.crud.book import create_book
from app.core.db import engine
from collections.abc import Generator
router = APIRouter()


# 生成数据库连接
def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


@router.post("/books/", response_model=BookPublic)
def create_book_api(book_create: BookCreate, db: Session = Depends(get_db)):
    try:
        return create_book(db_session=db, book_create=book_create)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))