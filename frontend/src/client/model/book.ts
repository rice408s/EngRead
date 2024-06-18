export type Book = {
  title: string; // 书名
  author: string; // 作者
  publishDate: string; // 出版日期
  isbn: string; // 国际标准书号
  description?: string | null; // 简介，可选
  coverImage: string; // 封面图片链接
};