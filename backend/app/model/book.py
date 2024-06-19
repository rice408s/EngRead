from pydantic import BaseModel
from typing import Optional
from sqlmodel import Field, Relationship, SQLModel


class BookBase(SQLModel):
    title: str
    author: str
    publishDate: str
    isbn: str
    description: Optional[str] = None
    coverImage: str

# 
class Book(BookBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    content: str = Field()
# 创建书籍 
class BookCreate(BookBase):
    content: str

# 更新书籍
class BookUpdate(BookBase):
    title: str | None = None
    author: str | None = None
    publishDate: str | None = None
    isbn: str | None = None
    description: str | None = None
    coverImage: str | None = None
    content: str | None = None
    
# 返回书籍
class BookPublic(BookBase):
    id: int
    content: str

# 返回书籍列表
class BooksPublic(BaseModel):
    data: list[BookPublic]
    count: int





