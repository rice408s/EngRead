# 导入所需的库和模块
from datetime import datetime, timedelta
from typing import Any
import jwt
from passlib.context import CryptContext
from app.core.config import settings

# 创建一个密码上下文，用于处理密码的哈希和验证
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 定义JWT的算法
ALGORITHM = "HS256"

# 定义一个函数，用于创建访问令牌
def create_access_token(subject: str | Any, expires_delta: timedelta) -> str:
    # 计算令牌的过期时间
    expire = datetime.utcnow() + expires_delta
    # 创建要编码的数据
    to_encode = {"exp": expire, "sub": str(subject)}
    # 使用JWT对数据进行编码
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    # 返回编码后的JWT
    return encoded_jwt

# 定义一个函数，用于验证密码
def verify_password(plain_password: str, hashed_password: str) -> bool:
    # 使用密码上下文来验证密码
    return pwd_context.verify(plain_password, hashed_password)

# 定义一个函数，用于获取密码的哈希
def get_password_hash(password: str) -> str:
    # 使用密码上下文来获取密码的哈希
    return pwd_context.hash(password)