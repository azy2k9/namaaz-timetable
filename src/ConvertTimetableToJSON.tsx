import React from 'react';
import moment, { MomentInput } from 'moment';
import data from './data/timetable.json';
import { parseTime } from './helpers/parseTime';
import { getTodaysNamaazTimes } from './helpers/getTodaysNamaazTimes';
import { Spinner } from '@chakra-ui/react';

const getTimes = () => {
    const todaysNamaazTimes = getTodaysNamaazTimes(data);

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

interface Namaaz {
    namaaz: 'Fajr' | 'Zuhr' | 'Asr' | 'Maghrib' | 'Isha',
    time: MomentInput
}

const getNextNamaaz = (): Namaaz | null => {    
    const today = getTimes();

    const fajr = moment().isSameOrAfter(today?.fajr) && moment().isBefore(today?.sunrise);
    const zuhr = moment().isSameOrAfter(today?.zuhr) && moment().isBefore(today?.asr);
    const asr = moment().isSameOrAfter(today?.asr) && moment().isBefore(today?.maghrib);
    const maghrib = moment().isSameOrAfter(today?.maghrib) && moment().isBefore(today?.isha);
    const isha = moment().isSameOrAfter(today?.isha);

    console.log(fajr)
    console.log(zuhr)
    console.log(asr)
    console.log(maghrib)
    console.log(isha)
    
    if (fajr) {
        console.log('fajr')
        return {
            namaaz: 'Fajr',
            time: moment(today?.fajr)
        }
    }
    
    if (zuhr) {
        console.log('zuhr')
        return {
            namaaz: 'Zuhr',
            time: moment(today?.zuhr)
        }
    }

    if (asr) {
        console.log('asr')
        return {
            namaaz: 'Asr',
            time: moment(today?.asr)
        }
    }

    if (maghrib) {
        console.log('maghrib')
        return {
            namaaz: 'Maghrib',
            time: moment(today?.maghrib)
        }
    }

    if (isha) {
        console.log('isha')
        return {
            namaaz: 'Isha',
            time: moment(today?.isha)
        }
    }


    return null;
}

const ConvertTimetableToJSON = () => {
    const nextNamaaz = getNextNamaaz();
    
    return (
        <>
            <h1>DateTime right now: {moment().format('LLLL')}</h1>
            {nextNamaaz === null && (
                <Spinner size="large" />
            )}
            {nextNamaaz && (
                <p>Next Namaaz: {nextNamaaz.namaaz} at {nextNamaaz.time}</p>
            )}
        </>
    )
}

export default ConvertTimetableToJSON
