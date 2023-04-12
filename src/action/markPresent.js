import * as axios from "axios";

export const markAttendance = (model) => {
    const url = `${process.env.REACT_APP_BASE_URL}/mark-attendance`;
    return axios.post(url, model).then((res) => {
        return res.data;
    })
};



export const updateAttendance = (model) => {
    const url = `${process.env.REACT_APP_BASE_URL}/update-attendance`;
    return axios.put(url, model).then((res) => {
        return res.data;
    })
};

