import { http, httpFile } from './http_service'

export function loadCategory() {
  return http().get('/categories')
}

export function createCategory(data) {
  return httpFile().post('/categories', data)
}

export function updateCategory(id, data){
  return httpFile().post(`/categories/${id}`, data)
}

export function deleteCategory(id) {
  return http().delete(`/categories/${id}`)
}