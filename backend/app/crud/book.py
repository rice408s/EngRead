from typing import Any

from sqlmodel import Session, select

from app.model.book import Book, BookCreate


def create_book(db_session: Session, book_create: BookCreate) -> Book:
    # 创建一个新的Book实例
    new_book = Book(**book_create.model_dump())
    # 将新书籍添加到数据库会话中
    db_session.add(new_book)
    # 提交会话以保存书籍到数据库
    db_session.commit()
    # 刷新会话以获取分配给新书籍的ID
    db_session.refresh(new_book)
    # 返回新创建的书籍实例
    return new_book