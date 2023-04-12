import * as axios from "axios";

export const selectedDateAttendance = (date) => {
    const url = `${process.env.REACT_APP_BASE_URL}/selected-date-attendance?date=${date}`;
    return axios.get(url).then((res) => {
        return res.data;
    })
};
