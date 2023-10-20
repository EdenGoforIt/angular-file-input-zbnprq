import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export function toHttpParams(obj: Object): HttpParams {
  return Object.getOwnPropertyNames(obj)
    .filter((key) => obj[key] !== undefined )
    .reduce((p, key) => p.set(key, obj[key]), new HttpParams());
}