export function filterObj (obj) {
  let queryObj = {}
  for (let [k, v] of Object.entries(obj)) {
    if (k !== 'sizes' && k !== 'total' && v !== '' && v !== null) {
      queryObj[k] = v
    }
  }
  return queryObj
}

export function filterQueryParam (obj) {
  let query = ''
  for (let [k, v] of Object.entries(obj)) {
    if (v) {
      query += `&${k}=${v}`
    }
  }
  if (query) {
    return '?' + query.slice(1)
  } else {
    return ''
  }
}
