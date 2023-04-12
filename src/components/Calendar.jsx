import React from "react";
import { parse, toDate, isSameDay, endOfWeek, isSameMonth, addMonths, startOfMonth, endOfMonth, startOfWeek, subMonths, format, addDays } from "date-fns";
import moment from 'moment';
import ModalWindow from "./ModalWindow";
import { markAttendance, updateAttendance } from "../action/markPresent";
import { selectedDateAttendance } from "../action/getAttendance";

class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        showModal: false,
        todaysAttendance: 'ABSENT',
        selectedDateAttendance: undefined,
        selectedDate: undefined
    };

    componentDidMount() {
        selectedDateAttendance(moment().format('DD-MM-YYYY')).then(res => {
            this.setState({ todaysAttendance: res.attendance })
        })
    }
    onMarkPresent(day) {
        markAttendance({ date: moment(day).format('DD-MM-YYYY'), status: 'PRESENT' }).then(res => {
            selectedDateAttendance(moment().format('DD-MM-YYYY')).then(res => {
                this.setState({ todaysAttendance: res.attendance })
            })
            alert(res.message)
        })


    }

    onUpdateAttendance(day, status) {
        updateAttendance({ date: moment(day).format('DD-MM-YYYY'), status: status }).then(res => {
            selectedDateAttendance(moment(day).format('DD-MM-YYYY')).then(res => {
                this.setState({ selectedDateAttendance: res.attendance })
            })
            alert(res.message)
        })


    }

    getAttendance(day) {

        selectedDateAttendance(moment(day).format('DD-MM-YYYY')).then(res => {
            this.setState({ selectedDateAttendance: res.attendance })
        })
    }
    renderHeader() {
        const dateFormat = "MMMM yyyy";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>{format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];

        let startDate = startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    }

    renderCells() {
        const { currentMonth, selectedDate, todaysAttendance } = this.state;
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${!isSameMonth(day, monthStart)
                            ? "disabled"
                            : isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => {

                            todaysAttendance != 'PRESENT' && moment(toDate(cloneDay)).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY') && isSameMonth(day, monthStart) ? this.onMarkPresent(toDate(cloneDay)) : this.setState({ showModal: true, selectedDate: moment().format('DD-MM-YYYY') },
                                this.getAttendance(toDate(cloneDay))
                            )
                        }
                        }
                    // onClick={() => this.onDateClick(toDate(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>

                        {todaysAttendance != 'PRESENT' && moment(toDate(cloneDay)).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY') && isSameMonth(day, monthStart) && <button className="mark-present">{'Present'}</button>}

                    </div >
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day} >
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    onDateClick = day => {
        // this.setState({
        //     selectedDate: day
        // });
        console.log(day)
    };

    nextMonth = () => {
        this.setState({
            currentMonth: addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: subMonths(this.state.currentMonth, 1)
        });
    };

    render() {

        return (
            <React.Fragment>
                {this.state.showModal && <ModalWindow
                    title={'Attendance Detail'}
                >
                    <div>
                        <button onClick={() => { this.setState({ showModal: false }) }}>close</button>
                        <h1>STATUS:{this.state.selectedDateAttendance}</h1>
                        <button onClick={() => {
                            this.onUpdateAttendance(this.state.selectedDate, this.state.selectedDateAttendance === 'PRESENT' ? 'ABSENT' : 'PRESENT')
                        }}>CLICK HERE CHANGE IT TO {this.state.selectedDateAttendance === 'PRESENT' ? 'ABSENT' : 'PRESENT'}</button>
                    </div>
                </ModalWindow >}
                <div className="calendar">


                    {this.renderHeader()}
                    {this.renderDays()}
                    {this.renderCells()}
                </div>
            </React.Fragment>
        );
    }
}

export default Calendar;