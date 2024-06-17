# 导入所需的库
import sentry_sdk # type: ignore
from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware

# 导入项目内部的模块
from app.api.main import api_router
from app.core.config import settings

# 自定义生成唯一ID的函数，用于API路由
def custom_generate_unique_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"

# 如果设置了SENTRY_DSN且环境不是本地，则初始化sentry_sdk
if settings.SENTRY_DSN and settings.ENVIRONMENT != "local":
    sentry_sdk.init(dsn=str(settings.SENTRY_DSN), enable_tracing=True)

# 创建FastAPI应用实例
app = FastAPI(
    title=settings.PROJECT_NAME,  # 设置项目名称
    openapi_url=f"{settings.API_V1_STR}/openapi.json",  # 设置OpenAPI的URL
    generate_unique_id_function=custom_generate_unique_id,  # 设置生成唯一ID的函数
)

# 如果设置了CORS源，则添加CORS中间件
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            str(origin).strip("/") for origin in settings.BACKEND_CORS_ORIGINS  # 允许的CORS源
        ],
        allow_credentials=True,  # 允许携带凭证
        allow_methods=["*"],  # 允许所有方法
        allow_headers=["*"],  # 允许所有头部
    )

# 将API路由添加到应用中
app.include_router(api_router, prefix=settings.API_V1_STR)