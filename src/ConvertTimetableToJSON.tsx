import React from 'react';
import moment, { MomentInput } from 'moment';
import data from './data/timetable.json';
import { parseTime } from './helpers/parseTime';
import { getNamaazTimes } from './helpers/getTodaysNamaazTimes';
import { timeFormatter } from './helpers/timeFormatter';
import NextNamaaz from './components/NextNamaaz';

const getTimes = (date: moment.Moment) => {
    const todaysNamaazTimes = getNamaazTimes(data, date);

    if (todaysNamaazTimes) {
        const fajr = parseTime(todaysNamaazTimes.starts.Fajr);
        const sunrise = parseTime(todaysNamaazTimes.starts.Sunrise);
        const zuhr = parseTime(todaysNamaazTimes.starts.Zuhr);
        const asr = parseTime(todaysNamaazTimes.starts.Asr);
        const maghrib = parseTime(todaysNamaazTimes.starts.Maghrib);
        const isha = parseTime(todaysNamaazTimes.starts.Isha);

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

export interface Namaaz {
    namaaz: 'Fajr' | 'Zuhr' | 'Asr' | 'Maghrib' | 'Isha' | 'No Namaaz'
    time: MomentInput | moment.Moment
}

export interface CurrentAndNextNamaaz {
    currentNamaaz: Namaaz
    nextNamaaz: Namaaz
}

const getNamaaz = (): CurrentAndNextNamaaz  => {
    const today = getTimes(moment());
    const tomorrow = getTimes(moment().add(1, 'day'));

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

const ConvertTimetableToJSON = () => {
    const namaaz = getNamaaz();

    return (
        <>
            <h1>DateTime right now: {moment().format('LLLL')}</h1>
            {namaaz && (
                <>
                    <p>{namaaz.currentNamaaz.namaaz} started at {timeFormatter(namaaz.currentNamaaz.time)}</p>
                    <NextNamaaz namaaz={namaaz.nextNamaaz} />
                </>
            )}
        </>
    )
}

export default ConvertTimetableToJSON
