from pydantic import BaseModel
from typing import Optional
from sqlmodel import Field, Relationship, SQLModel
from sqlalchemy import Text


class BookBase(SQLModel):
    title: str
    author: str
    publishDate: str
    isbn: str
    description: Optional[str] = None
    coverImage: str
    
class Book(BookBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    content: str = Field(sa_column_kwargs={"type_": Text()})