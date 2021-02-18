import moment from 'moment';
import data from '../data/current_month.json';
import { parseTime } from '../helpers/parseTime';
export interface TimetableDataRow {
    jamaat: {
        Isha: string
        Maghrib: string
        Asr: string
        Zuhr: string
        Fajr: string
    },
    zawaal: string
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

export interface CurrentAndNextNamaaz {
    currentNamaaz: Namaaz
    nextNamaaz: Namaaz
}

/**
 * Returns all the namaaz times for the specified dates
 * 
 * @param data - the timetable data being read from timetable.json
 * @param date - the date for which namaaz times should be returned
 */
const filterNamaazTimetable = (data: Array<TimetableDataRow>, date: moment.Moment) => {
    const namaazTimes = data.filter((row: TimetableDataRow) => date.isSame(row.date, 'day')).shift();
    return namaazTimes;
}

/**
 * Retrieves and formats the namaaz times (as moment objects) for the specified date
 * 
 * @param date - Date to filter on
 */
const getNamaazTimes = (date: moment.Moment) => {
    const todaysNamaazTimes = filterNamaazTimetable(data, date);

    if (todaysNamaazTimes) {
        const fajr = parseTime(todaysNamaazTimes.starts.Fajr, date.get('date'));
        const sunrise = parseTime(todaysNamaazTimes.starts.Sunrise, date.get('date'));
        const zuhr = parseTime(todaysNamaazTimes.starts.Zuhr, date.get('date'));
        const asr = parseTime(todaysNamaazTimes.starts.Asr, date.get('date'));
        const maghrib = parseTime(todaysNamaazTimes.starts.Maghrib, date.get('date'));
        const isha = parseTime(todaysNamaazTimes.starts.Isha, date.get('date'));

        return {
            fajr,
            sunrise,
            zuhr,
            asr,
            maghrib,
            isha,
        }
    }
}

/**
 * Gets the current namaaz and the next namaaz
 * 
 * @type Namaaz 
 * @type CurrentAndNextNamaaz
 * @returns CurrentAndNextNamaaz
 */
export const getNamaaz = (): CurrentAndNextNamaaz => {
    const today = getNamaazTimes(moment());
    const tomorrow = getNamaazTimes(moment().add(1, 'day'));

    const inFajr = moment().isSameOrAfter(today?.fajr) && moment().isBefore(today?.sunrise);
    const inZuhr = moment().isSameOrAfter(today?.zuhr) && moment().isBefore(today?.asr);
    const inAsr = moment().isSameOrAfter(today?.asr) && moment().isBefore(today?.maghrib);
    const inMaghrib = moment().isSameOrAfter(today?.maghrib) && moment().isBefore(today?.isha);
    const inIsha = moment().isSameOrAfter(today?.isha);

    const fajr: Namaaz = {
        namaaz: 'Fajr',
        time: moment(today?.fajr)
    };

    const zuhr: Namaaz = {
        namaaz: 'Zuhr',
        time: moment(today?.zuhr)
    };

    const asr: Namaaz = {
        namaaz: 'Asr',
        time: moment(today?.asr)
    };

    const maghrib: Namaaz = {
        namaaz: 'Maghrib',
        time: moment(today?.maghrib)
    };

    const isha: Namaaz = {
        namaaz: 'Isha',
        time: moment(today?.isha)
    };

    const fajrTomorrow: Namaaz = {
        namaaz: 'Fajr',
        time: moment(tomorrow?.fajr)
    };

    if (inFajr) {
        return {
            currentNamaaz: fajr,
            nextNamaaz: zuhr
        }
    }

    if (inZuhr) {
        return {
            currentNamaaz: zuhr,
            nextNamaaz: asr
        }
    }

    if (inAsr) {
        return {
            currentNamaaz: asr,
            nextNamaaz: maghrib
        }
    }

    if (inMaghrib) {
        return {
            currentNamaaz: maghrib,
            nextNamaaz: isha
        }
    }

    if (inIsha) {
        return {
            currentNamaaz: isha,
            nextNamaaz: fajrTomorrow
        }
    }

    // if we are not in namaaz time, its probably because sunrise has been and we are not in zuhr time yet
    return {
        currentNamaaz: {
            namaaz: 'No Namaaz',
            time: 'No Namaaz'
        },
        nextNamaaz: zuhr
    };
}
