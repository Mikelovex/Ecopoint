import { Container } from './styles';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Grid, Heading, Stack, Text, Image } from "@chakra-ui/react";


const PointDetail = () => {
    const point: any = localStorage.getItem('@points')
    const parsedPoints = JSON.parse(point)

    const navigate = useNavigate();

    return (
        <Container>
            <Flex width="80%" margin=" 20px auto" flexDirection={'column'}>
                <Heading mb={'10'} fontSize={'3xl'}>Pontos de coletas disponíveis</Heading>
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
                        </Box>
                    ))}
                </Grid>
            </Flex>

        </Container>

    )
}


export default PointDetail;