import moment from 'moment';

interface TimeMapping<T> {
    [id: string]: T;
}

export const TIME_MAPPINGS: TimeMapping<number> = {
    12: 12,
    1: 13,
    2: 14,
    3: 15,
    4: 16,
    5: 17,
    6: 18,
    7: 19,
    8: 20,
    9: 21,
    10: 22,
    11: 23,
};

export const parseTime = (time: string, date: number): string => {
    const twelveHR = parseInt(time.split('.')[0]);
    const minutes = parseInt(time.split('.')[1]);
    const meridiem = time.split(' ')[1];
    
    let twentyFourHour = twelveHR;

    if (meridiem === "pm") {
        twentyFourHour = TIME_MAPPINGS[twelveHR];
    }
    
    const parsedTime = moment().set('date', date).set('hour', twentyFourHour).set('minutes', minutes).toLocaleString();
    return parsedTime;
}
