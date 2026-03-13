import { handleAuthenticationExpired } from "@/features/authenticate/utils/helpers";
import axios, { AxiosProgressEvent, AxiosRequestConfig, GenericAbortSignal } from "axios";
import { AuthStore } from "@/features/authenticate/store/Auth";

const getApiClient = (lang = "ar") => {
  const {access_token} = AuthStore.getState();
  const auth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  });

  auth.interceptors.response.use(
    (response) => response,
    (error) => {
      handleAuthenticationExpired(error);
      return Promise.reject(error);
    }
  );

  auth.defaults.headers.common["Content-Type"] = "application/json";
  auth.defaults.headers.common["Accept"] = "application/json";
  auth.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  auth.defaults.headers.common["Accept-Language"] = lang;
  return auth;
};


const ApiClient = {
  post: async <TRequest, TResponse>(
    url: string,
    body: TRequest,
    lang = "ar",
    contentType = "application/json",
    signal?: GenericAbortSignal,
    onUploadProgress?: (e:AxiosProgressEvent) => void
  ): Promise<TResponse> => {
    const auth = getApiClient(lang);
    const req = await auth.post(url,  body ?? undefined, {
      headers: {
        "content-type": contentType,
      },
      signal,
      onUploadProgress,
    });
    return req.data as TResponse;
  },
  patch: async <TRequest, TResponse>(
    url: string,
    body: TRequest,
    lang = "ar"
  ): Promise<TResponse> => {
    const auth = getApiClient(lang);
    const req = await auth.patch(url, body);
    return req.data as TResponse;
  },
  put: async <TRequest, TResponse>(
    url: string,
    body: TRequest,
    lang = "ar"
  ): Promise<TResponse> => {
    const auth = getApiClient(lang);
    const req = await auth.put(url, body);
    return req.data as TResponse;
  },
  get: async <TRequest, TResponse>(
    url: string,
    queryParams: TRequest,
    lang = "ar",
    options: AxiosRequestConfig = {}
  ): Promise<TResponse> => {
    const auth = getApiClient(lang);
    const res = await auth.get(url, { params: queryParams, ...options });
    return res.data as TResponse;
  },
  delete: async <TResponse>(
    url: string,
    lang = "ar"
  ): Promise<TResponse> => {
    const auth = getApiClient(lang);
    const res = await auth.delete(url);
    return res.data as TResponse;
  },
};

export default ApiClient;