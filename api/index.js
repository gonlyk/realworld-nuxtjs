import { request } from '../plugins/request'

/**
 * @param {{"user":{  "email": string, "password": string}}} data 
 * @returns {Users}
 */
export function login(data) {
    return request.request({
        method: 'POST',
        url: '/users/login',
        data
    })
}

/**
 * @param { "user": { "username": string, "email": string, "password": string } } data 
 * @returns {Users | ErrorCode}
 */
export function register(data) {
    return request.request({
        method: 'POST',
        url: '/users',
        data
    })
}

/**
 * @returns {Users | ErrorCode}
 */
export function getCurrentUser() {
    return request.request({
        method: 'GET',
        url: '/user'
    })
}

/**
 * 
 * @returns {Users | ErrorCode}
 */
export function updateUser(data) {
    return request.request({
        method: 'PUT',
        url: '/user',
        data
    })
}

/**
 * 
 * @param {string} username 
 * @returns {Profile | ErrorCode}
 */
export function getProfile(username) {
    return request.request({
        method: 'GET',
        url: `/profiles/${username}`
    })
}

/**
 * 
 * @param {string} username 
 * @returns {Profile | ErrorCode}
 */
export function followUser(username) {
    return request.request({
        method: 'POST',
        url: `/profiles/${username}/follow`
    })
}

/**
 * 
 * @param {string} username 
 * @returns {Profile | ErrorCode}
 */
export function unFollowUser(username) {
    return request.request({
        method: 'DELETE',
        url: `/profiles/${username}/follow`
    })
}

/**
 * 
 * @param {{tag?: string, author?: string, favorited?: string, limit?: number, offset?: number}} params 
 * @returns {MultiArticle | ErrorCode}
 */
export function getArticles(params) {
    return request.request({
        method: 'GET',
        url: '/articles',
        params
    })
}

/**
 * 
 * @param {{tag?: string, author?: string, favorited?: string, limit?: number, offset?: number}} params 
 * @returns {MultiArticle | ErrorCode}
 */
export function getArticlesFeed(params) {
    return request.request({
        method: 'GET',
        url: '/articles/feed',
        params
    })
}

/**
 * 
 * @param {{tag?: string, author?: string, favorited?: string, limit?: number, offset?: number}} params 
 * @returns {Article | ErrorCode}
 */
export function getArticle(slug) {
    return request.request({
        method: 'GET',
        url: `/articles/${slug}`
    })
}

/**
 * @returns {Tags | ErrorCode}
 */
export function getTags() {
    return request.request({
        method: 'GET',
        url: '/tags'
    })
}

/**
 * 
 * @param {*} slug 
 * @returns {Article}
 */
export function favoriteArticle(slug) {
    return request.request({
        method: 'POST',
        url: `/articles/${slug}/favorite`
    })
}

/**
 * 
 * @param {*} slug 
 * @returns {Article}
 */
export function unfavoriteArticle(slug) {
    return request.request({
        method: 'DELETE',
        url: `/articles/${slug}/favorite`
    })
}

/**
 * @returns {MultiComment}
 */
export function getComment(slug) {
    return request.request({
        method: 'GET',
        url: `articles/${slug}/comments`
    })
}

/**
 * 
 */
export function addComment(slug, data) {
    return request.request({
        method: 'POST',
        url: `articles/${slug}/comments`,
        data
    })
}

/**
 * 
 */
export function deleteComment(slug, id) {
    return request.request({
        method: 'DELETE',
        url: `articles/${slug}/comments${id}`
    })
}

/**
 * @returns {Article}
 */
export function createArticle(data) {
    return request.request({
        method: 'POST',
        url: '/articles',
        data
    })
}

/**
 * 
 * @return {Article} 
 */
export function updateArticle(slug, data) {
    return request.request({
        method: 'PUT',
        url: `articles/${slug}`,
        data
    })
}

/**
 * 
 */
export function deleteArticle(slug) {
    return request.request({
        method: 'DELETE',
        url: `articles/${slug}`
    })
}