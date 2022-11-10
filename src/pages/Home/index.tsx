import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import Header from '../../components/Header';

import { CgEnter } from 'react-icons/cg'

import BackgroundImage from '../../assets/wallpaper.svg'
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/Firebase';
import { useAuth } from '../../hooks/AuthContext';

const Home = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [inputValue, setInputValue] = useState('')

    const pointsCollection = query(collection(db, 'points'), where("estado", "==", `${inputValue}`))

    const getData = async () => {
        const data = await getDocs(pointsCollection)
        const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        localStorage.setItem('@points', JSON.stringify(res))
    }


    const navigate = useNavigate()

    return (
        <Flex flexDirection="column" height="100vh" justifyContent="center" >
            <Header />
            <Flex maxWidth="80%" margin="auto" flexDirection="row">
                <Flex flexDirection="column" rowGap="56px" w={['100vw', '50vw', '70vw', '100vw']}>
                    <Text textAlign={['initial', 'center', 'left', 'left']} fontSize={['4xl', '3xl', '4xl', "6xl"]} fontWeight="600" color="#322153">Encontrar pontos de coleta nunca foi tão fácil.</Text>
                    <Text fontSize={["large", "2xl", "2xl", "2xl"]} color="#322153">Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
                    <Button colorScheme="blue" leftIcon={<CgEnter size={20} />} maxWidth={80} size="lg" color="white" onClick={() => {
                        localStorage.removeItem('@points')
                        onOpen()
                    }}>
                        Pesquisar pontos de coleta
                    </Button>

                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Modal Title</ModalHeader>
                            <ModalCloseButton _focus={{ border: 'none' }} />
                            <ModalBody>
                                <Input colorScheme={"blue"} placeholder='Busque pelo nome da cidade' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme={"blue"} mr={3} onClick={() => {
                                    getData()
                                    onClose()
                                    setTimeout(() => {
                                        navigate('/view-points')
                                    }, 2000);
                                }}>
                                    Buscar ponto de coleta
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                </Flex>


                <Flex w={['0vw', '50vw', '70vw', '100vw']}>
                    <img src={BackgroundImage} alt="" />
                </Flex>
            </Flex>
        </Flex >
    )
}


export default Home;