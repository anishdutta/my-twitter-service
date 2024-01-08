export type ApiHelper<K> = {
    error?: string,
    response?: K,
    status: HttpsStatusCode
}

export enum HttpsStatusCode {
    SUCCESS = 200,
    PARTIALLY_SUCCESS = 201,
    VALIDATION_FAILED = 404,
    SOMETHING_WENT_WRONG = 400,
    INTERNAL_SERVER_ERROR = 500
}