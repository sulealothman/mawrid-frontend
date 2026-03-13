type ErrorRequestResponse = {
    message: string | string[];
    errors?: string[];
    status: number;
}