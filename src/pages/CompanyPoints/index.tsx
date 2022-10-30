import { Box, Flex, Stack, Image, Text, Heading, useColorModeValue, Avatar, Center, HStack, Grid } from '@chakra-ui/react';
import { collection, getDocs, query, where, } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import { useAuth } from '../../hooks/AuthContext';
import { db } from '../../services/Firebase';


function CompanyPoints() {
    const points: any = localStorage.getItem('@my-points')

    const parsedPoints = JSON.parse(points)

    console.log('parsedPoints', parsedPoints)

    return (
        <>
            <Header />
            <Flex width="80%" margin=" 20px auto" flexDirection={'column'}>
                <Heading mb={'10'} fontSize={'3xl'}>Meus pontos de coleta</Heading>
                <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                    {parsedPoints && parsedPoints.map((point: any) => (
                        <Box
                            key={point.id}
                            maxW={'445px'}
                            w={'full'}
                            boxShadow={'2xl'}
                            rounded={'md'}
                            p={6}
                            overflow={'hidden'}>
                            <Box
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                objectFit="fill"
                                bg={'gray.100'}
                                mt={-6}
                                mx={-6}
                                mb={6}
                            >
                                <Image
                                    borderRadius={'5px'}
                                    height="400px"
                                    objectFit="scale-down"
                                    src={point.imagem}

                                />
                            </Box>
                            <Stack>
                                <Text
                                    color={'green.500'}
                                    textTransform={'uppercase'}
                                    fontWeight={800}
                                    fontSize={'sm'}
                                    letterSpacing={1.1}>
                                    {point.nome}
                                </Text>
                                <Heading
                                    fontSize={'2xl'}
                                    fontFamily={'body'}>
                                    {point.endereco}
                                </Heading>
                                <Text as="p" color="#322153">{point.estado}, {point.cidade}</Text>
                                <Text
                                    fontSize={'md'}
                                    letterSpacing={1.1}>
                                    Tipos de materiais aceitos:
                                </Text>
                                <Text fontSize="2xl" width={96} fontStyle="italic" color="green.500" fontWeight="bold">{point.items.join(', ')}</Text>

                            </Stack>
                            {/* <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                                <Avatar
                                    src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                                />
                                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                    <Text fontWeight={600}>Achim Rolle</Text>
                                    <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
                                </Stack>
                            </Stack> */}
                        </Box>
                    ))}
                </Grid>
            </Flex>
        </>
    )
}

export default CompanyPoints;