import { Container } from './styles';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Grid, Heading, Stack, Text, Image } from "@chakra-ui/react";

import { ArrowBackIcon } from '@chakra-ui/icons'

import LixeiraImg from '../../assets/lixeira.svg';


const PointDetail = () => {
    const point: any = localStorage.getItem('@points')
    const parsedPoints = JSON.parse(point)

    const navigate = useNavigate();

    return (
        <Container>
            <Flex width="80%" margin=" 20px auto" flexDirection={'column'}>
                <Heading display={"flex"} alignItems="center" justifyContent={"space-between"} mb={'10'} fontSize={'3xl'}>
                    <Text>Pontos de coletas disponíveis</Text>
                    <ArrowBackIcon onClick={() => navigate('/')} w={6} h={6} />
                </Heading>
                <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                    {parsedPoints && parsedPoints.map((point: any) => (
                        <Box
                            onClick={() => navigate(`/point/${point.id}`)}
                            key={point.id}
                            maxW={'445px'}
                            w={'full'}
                            boxShadow={'2xl'}
                            rounded={'md'}
                            p={6}
                            overflow={'hidden'}
                            cursor={"pointer"}
                        >
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
                                {point.horarioInicio && (
                                    <Text >Horario de funcionamento: {point.horarioInicio} as {point.horarioFim}</Text>
                                )}
                                <Text
                                    fontSize={'md'}
                                    letterSpacing={1.1}>
                                    Tipos de materiais aceitos:
                                </Text>
                                <Text fontSize="2xl" width={96} fontStyle="italic" color="green.500" fontWeight="bold">{point.items.join(', ')}</Text>
                            </Stack>
                        </Box>
                    ))}
                </Grid>
                {parsedPoints.length <= 0 && (
                    <Box width={"100%"} display='flex' flexDirection={"column"} justifyContent="center" alignItems={"center"}>
                        <Image src={LixeiraImg} boxSize="400px" />
                        <Text fontSize={"5xl"} fontWeight="bold" width={"700px"} marginTop="100px">Não existe pontos de coletas disponíveis nessa região.</Text>
                    </Box>
                )}
            </Flex>

        </Container>

    )
}


export default PointDetail;