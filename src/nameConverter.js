const { camelize, pluralize, singularize } = require('inflection');

/**
 * A bit of vocabulary
 *
 * Consider this data:
 * {
 *     posts: [
 *          { id: 1, title: 'foo', user_id: 123 }
 *     ],
 *     users: [
 *          { id: 123, name: 'John Doe' }
 *     ]
 * }
 *
 * We'll use the following names:
 * - key: the keys in the data map, e.g. 'posts', 'users'
 * - type: for a key, the related type in the graphQL schema, e.g. 'posts' => 'Post', 'users' => 'User'
 * - field: the keys in a record, e.g. 'id', 'foo', user_id'
 * - relationship field: a key ending in '_id', e.g. 'user_id'
 * - related key: for a relationship field, the related key, e.g. 'user_id' => 'users'
 */

/**
 *
 * @param {String} fieldName 'users'
 * @return {String} 'Users'
 */
const getRelationshipFromKey = key => camelize(key);

/**
 *
 * @param {String} fieldName 'users'
 * @return {String} 'User'
 */
const getTypeFromKey = key => camelize(singularize(key));

/**
 *
 * @param {String} fieldName 'user_id'
 * @return {String} 'users'
 */
const getRelatedKey = fieldName =>
  pluralize(fieldName.substr(0, fieldName.length - 3));

/**
 *
 * @param {String} key 'users'
 * @return {String} 'user_id'
 */
const getReverseRelatedField = key => `${singularize(key)}_id`;

/**
 *
 * @param {String} fieldName 'user_id'
 * @return {String} 'User'
 */
const getRelatedType = fieldName =>
  getTypeFromKey(fieldName.substr(0, fieldName.length - 3));

module.exports = {
  getRelationshipFromKey,
  getTypeFromKey,
  getRelatedKey,
  getReverseRelatedField,
  getRelatedType
};
