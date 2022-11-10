import { Box, Flex, Stack, Image, Text, Heading, Grid, Button, Tooltip } from '@chakra-ui/react';
import Header from '../../components/Header';

import { AiFillEdit } from 'react-icons/ai'

import { CgDetailsMore } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom';

function CompanyPoints() {
    const points: any = localStorage.getItem('@my-points')

    const parsedPoints = JSON.parse(points)


    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Flex width="80%" margin=" 20px auto" flexDirection={'column'}>
                <Heading mb={'10'} fontSize={'3xl'}>Meus pontos de coleta</Heading>
                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={[6, 4]}>
                    {parsedPoints && parsedPoints.map((point: any) => (
                        <Box
                            key={point.id}
                            maxW={['445px']}
                            w={'full'}
                            boxShadow={'2xl'}
                            rounded={'md'}
                            p={6}
                            overflow={'hidden'}
                            height="680px"
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
                                <Box display={"flex"} alignItems="center" justifyContent={"space-between"}>
                                    <Text as="p" color="#322153">{point.estado}, {point.cidade}</Text>
                                    {point.horarioInicio && (
                                        <Text >{point.horarioInicio} as {point.horarioFim}</Text>
                                    )}
                                </Box>
                                <Text
                                    fontSize={'md'}
                                    letterSpacing={1.1}
                                >
                                    Tipos de materiais aceitos:
                                </Text>
                                <Tooltip label={point.items.join(', ')}>
                                    <Text fontSize={["2xl", "2xl", "lg", "2xl"]} width={96} overflowWrap="break-word"
                                        noOfLines={1}
                                        fontStyle="italic" color="green.500" fontWeight="bold">{point.items.join(', ')}</Text>
                                </Tooltip>
                            </Stack>
                            <Box display="flex" justifyContent={"space-between"} marginTop="8px">
                                <Button colorScheme="blue" leftIcon={<AiFillEdit size={16} />} maxWidth={40} size="sm" mt="4" color="white" onClick={() => {
                                    navigate(`/edit/point/${point.id}`)
                                }}>
                                    Editar
                                </Button>

                                <Button colorScheme="blue" leftIcon={<CgDetailsMore size={20} />} maxWidth={40} size="sm" mt="4" color="white" onClick={() => {
                                    navigate(`/point/${point.id}`)
                                }}>
                                    Ver detalhes
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Grid>
            </Flex>
        </>
    )
}

export default CompanyPoints;