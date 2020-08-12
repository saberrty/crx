import axios from "axios";

export const Api = {
    request({ method, url, data, params  }) {
        return axios({
            method,
            url,
            data,
            params
        });
    }
};
