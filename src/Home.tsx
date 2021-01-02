import React from 'react';
import moment from 'moment';
import { getNamaaz } from './helpers/getTodaysNamaazTimes';
import { timeFormatter } from './helpers/timeFormatter';
import NextNamaaz from './components/NextNamaaz';

const Home = () => {
    const namaaz = getNamaaz();

    return (
        <>
            <h1>DateTime right now: {moment().format('LLLL')}</h1>
            {namaaz && namaaz.currentNamaaz.namaaz === 'No Namaaz' ? (
                <p>No Namaaz right now</p>
            ) : (
                <>
                    <p>{namaaz.currentNamaaz.namaaz} started at {timeFormatter(namaaz.currentNamaaz.time)}</p>
                    <NextNamaaz namaaz={namaaz.nextNamaaz} />
                </>
            )}
        </>
    )
}

export default Home
