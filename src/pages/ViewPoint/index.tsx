import { Flex, Grid, Text } from '@chakra-ui/react';
import { collection, getDoc, getDocs, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../services/Firebase';
import { query } from 'firebase/firestore'
import Header from '../../components/Header';

import Lampda from '../../assets/lampadas.svg'

const ViewPoint = () => {

    const teste: any = localStorage.getItem('teste')
    const data = JSON.parse(teste)

    return (
        <>
            <Header link='/' text='voltar para home' />
            <Grid gridTemplateColumns={["1fr", "1fr 1fr 1fr", "1fr 1fr", "1fr 1fr 1fr"]} gridTemplateRows="auto" columnGap={8} rowGap={8} maxWidth="80%" margin=" 80px auto" >
                {data?.map((d: any) => (
                    <Flex padding={4} width={96} background="white" borderRadius={5} flexDirection="column">
                        <img style={{ height: '140px', borderRadius: '5px', margin: '20px 0 20px 50px ' }} src={d.imagem} alt="" width="240px" height="240px" />
                        <Flex flexDirection="column" gap={2}>
                            <Text fontSize="4xl" fontStyle="italic" color="#322153" fontWeight="bold">{d.nome}</Text>
                            <Text fontSize="2xl" width={96} fontStyle="italic" color="#34cb79" fontWeight="bold">{d.items.join(', ')}</Text>
                            <Text as="p" color="#322153">{d.estado}, {d.cidade}</Text>
                            <Text as="p" color="#322153">{d.endereco}</Text>
                        </Flex>
                    </Flex>
                ))}
            </Grid >
        </>
    )
}


export default ViewPoint;