import React from 'react';
import { getNamaaz } from './helpers/getTodaysNamaazTimes';
import { timeFormatter } from './helpers/timeFormatter';
import NextNamaaz from './components/NextNamaaz';
import { Flex, Text } from '@chakra-ui/react';

const Home = () => {
    const namaaz = getNamaaz();

    return (
        <>
            {namaaz && (
                <>
                    <Flex bgColor="green.500" w="100%" justifyContent="center" alignItems="center" h="100%" color="white">
                    {namaaz && namaaz.currentNamaaz.namaaz === 'No Namaaz' ? (
                        <Text>No Namaaz Right Now</Text>
                    ) : (
                        <>
                            <Text fontSize="4xl" style={{ textAlign: 'center' }}>
                                {namaaz.currentNamaaz.namaaz}
                                <Text fontSize="4xl">{timeFormatter(namaaz.currentNamaaz.time)}</Text>
                            </Text>
                        </>
                    )}
                    </Flex>
                    <Flex bgColor="green.700" w="100%" justifyContent="center" alignItems="center" h="100%" color="white">
                        <NextNamaaz namaaz={namaaz.nextNamaaz} />
                    </Flex>
                </>
            )}
        </>
    )
}

export default Home
