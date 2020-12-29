import React from 'react'
import { timeFormatter } from '../helpers/timeFormatter';

interface IProps {
    namaaz: Namaaz
}

const NextNamaaz = ({ namaaz }: IProps) => {
    return (
        <div>
            <p>{namaaz.namaaz} is at {timeFormatter(namaaz.time)}</p>
        </div>
    )
}

export default NextNamaaz
