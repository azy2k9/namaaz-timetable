import moment from 'moment';

export interface Row {
    jamaat: {
        Isha: string
        Maghrib: string
        Asr: string
        Zuhr: string
        Fajr: string
    },
    zawal: string
    starts: {
        Isha: string
        Maghrib: string
        Asr: string
        Zuhr: string
        Sunrise: string
        Fajr: string
    }
    date: string
}

export const getNamaazTimes = (data: Array<Row>, date: moment.Moment) => {
    const namaazTimes = data.filter((row: Row) => date.isSame(moment(row.date + "2020"), 'day')).shift();
    return namaazTimes;
}