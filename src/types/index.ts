/**
 * 全局类型定义
 */

// 基础实体类型
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

// 用户角色枚举
export type UserRole = 'admin' | 'teacher' | 'student'

// 用户状态枚举
export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended'

// 用户信息类型
export interface UserInfo {
  id: string
  username: string
  email: string
  fullName?: string
  avatar?: string
  role: UserRole
  status: UserStatus
  createdAt: string
  updatedAt: string
}

// 分页参数类型
export interface PaginationParams {
  page: number
  pageSize: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// 分页响应类型
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// API响应基础类型
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  code?: number
}

// 错误响应类型
export interface ApiError {
  success: false
  message: string
  code: number
  details?: any
}

// 登录请求类型
export interface LoginRequest {
  username: string
  password: string
  remember?: boolean
}

// 登录响应类型
export interface LoginResponse {
  user: UserInfo
  token: string
  refreshToken?: string
  expiresIn: number
}

// 注册请求类型
export interface RegisterRequest {
  username: string
  email: string
  password: string
  confirmPassword: string
  fullName?: string
}

// 文件上传类型
export interface FileUploadResponse {
  url: string
  filename: string
  size: number
  mimeType: string
}

// 表单验证规则类型
export interface ValidationRule {
  required?: boolean
  message?: string
  validator?: (value: any) => boolean | string
}

// 表单字段类型
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'file'
  placeholder?: string
  rules?: ValidationRule[]
  options?: { label: string; value: any }[]
}

// 菜单项类型
export interface MenuItem {
  id: string
  title: string
  icon?: string
  path?: string
  children?: MenuItem[]
  permission?: string
}

// 通知类型
export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}

// 主题配置类型
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto'
  primaryColor: string
  fontSize: 'small' | 'medium' | 'large'
}

// 应用配置类型
export interface AppConfig {
  title: string
  version: string
  apiBaseUrl: string
  theme: ThemeConfig
  features: {
    enableNotifications: boolean
    enableDarkMode: boolean
    enableMultiLanguage: boolean
  }
}