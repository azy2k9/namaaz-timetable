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

export const getTodaysNamaazTimes = (data: Array<Row>) => {
    const today = moment();
    const todaysNamaazTimes = data.filter((row: Row) => today.isSame(moment(row.date + "2020"), 'day')).shift();
    return todaysNamaazTimes;
}