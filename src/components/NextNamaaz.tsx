import { Text } from '@chakra-ui/react';
import React from 'react'
import { timeFormatter } from '../helpers/timeFormatter';

interface IProps {
    namaaz: Namaaz
}

const NextNamaaz = ({ namaaz }: IProps) => {
    return (
        <>
            <Text fontSize="4xl" style={{ textAlign: 'center' }}>
                {namaaz.namaaz}
                <Text fontSize="4xl">{timeFormatter(namaaz.time)}</Text>
            </Text>
        </>
    )
}

export default NextNamaaz
