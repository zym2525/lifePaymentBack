import type { AxiosRequestConfig } from 'axios';

declare namespace GlobalType {
    interface RequestConfig extends AxiosRequestConfig {}
}

export = GlobalType;
export as namespace GlobalType;