/**
 * 全局类型定义
 */

// 通用响应结构
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
  timestamp: number
}

// 分页响应结构
export interface PaginatedResponse<T = any> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 分页请求参数
export interface PaginationParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// 搜索参数
export interface SearchParams extends PaginationParams {
  search?: string
  keyword?: string
}

// 基础实体接口
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
  createdBy?: string
  updatedBy?: string
}

// 软删除实体接口
export interface SoftDeleteEntity extends BaseEntity {
  deletedAt?: string
  deletedBy?: string
}

// 用户角色枚举
export enum UserRole {
  ADMIN = 'ROLE_ADMIN',
  HQ_TEACHER = 'ROLE_HQ_TEACHER',
  FRANCHISE_ADMIN = 'ROLE_FRANCHISE_ADMIN',
  FRANCHISE_TEACHER = 'ROLE_FRANCHISE_TEACHER',
  STUDENT = 'ROLE_STUDENT',
  PARENT = 'ROLE_PARENT'
}

// 用户状态枚举
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED'
}

// 课程状态枚举
export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

// 课时类型枚举
export enum LessonType {
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT',
  QUIZ = 'QUIZ',
  ASSIGNMENT = 'ASSIGNMENT'
}

// 文件上传响应
export interface FileUploadResponse {
  url: string
  filename: string
  size: number
  mimeType: string
}

// 表单验证规则
export interface ValidationRule {
  required?: boolean
  message?: string
  pattern?: RegExp
  min?: number
  max?: number
  validator?: (value: any) => boolean | string
}

// 表单字段配置
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file'
  placeholder?: string
  rules?: ValidationRule[]
  options?: Array<{ label: string; value: any }>
  disabled?: boolean
  readonly?: boolean
}

// 菜单项配置
export interface MenuItem {
  id: string
  title: string
  icon?: string
  path?: string
  children?: MenuItem[]
  meta?: {
    requiresAuth?: boolean
    roles?: UserRole[]
    hidden?: boolean
  }
}

// 面包屑导航项
export interface BreadcrumbItem {
  title: string
  path?: string
  disabled?: boolean
}

// 通知消息
export interface NotificationMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  closable?: boolean
}

// 主题配置
export interface ThemeConfig {
  mode: 'light' | 'dark'
  primaryColor: string
  borderRadius: number
  fontSize: 'small' | 'medium' | 'large'
}

// 应用配置
export interface AppConfig {
  name: string
  version: string
  apiBaseUrl: string
  uploadUrl: string
  theme: ThemeConfig
  features: {
    enableDarkMode: boolean
    enableNotifications: boolean
    enableFileUpload: boolean
  }
}

// 错误信息
export interface ErrorInfo {
  code: string | number
  message: string
  details?: any
  timestamp?: number
}

// 加载状态
export interface LoadingState {
  loading: boolean
  error: ErrorInfo | null
}

// 操作结果
export interface OperationResult<T = any> {
  success: boolean
  data?: T
  error?: ErrorInfo
  message?: string
}

// 统计数据
export interface StatisticsData {
  label: string
  value: number
  unit?: string
  trend?: 'up' | 'down' | 'stable'
  percentage?: number
}

// 图表数据点
export interface ChartDataPoint {
  x: string | number
  y: number
  label?: string
}

// 图表配置
export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area'
  data: ChartDataPoint[]
  title?: string
  xAxisLabel?: string
  yAxisLabel?: string
  colors?: string[]
}