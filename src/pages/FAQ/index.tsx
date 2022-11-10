import { Button, Collapse, Flex, Text, Image, Box } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/Header";

import BackgroundImg from '../../assets/tiposmateriais.jpg'
import MetaisImg from '../../assets/metais.jpg'
import PapeisImg from '../../assets/papeis.jpg'
import VidrosImg from '../../assets/vidros.jpg'
import PlasticosImg from '../../assets/plasticos.jpg'

import { ChevronDownIcon } from '@chakra-ui/icons'


function FAQ() {
    const [showMetal, setShowMetal] = React.useState(false);
    const [showPapel, setShowPapel] = React.useState(false);
    const [showVidro, setShowVidro] = React.useState(false);
    const [showPlastico, setShowPlastico] = React.useState(false);


    const handleToggleMetal = () => setShowMetal(!showMetal);
    const handleTogglePapel = () => setShowPapel(!showPapel);
    const handleToggleVidro = () => setShowVidro(!showVidro);
    const handleTogglePlastico = () => setShowPlastico(!showPlastico);


    return (
        <>
            <Flex flexDirection="column" justifyContent="center" >
                <Header />
                <Box width="80%" margin={"0 auto"} display="flex" flexDirection={"column"} rowGap={"36px"}>

                    <Text fontSize={"4xl"} fontWeight="600">Materiais reciclaveis aceitos</Text>
                    <Image src={BackgroundImg} />

                    <Box onClick={handleToggleMetal} width="70%" margin="0 auto" borderBottom={"2px solid #3182ce"} paddingBottom="36px">
                        <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
                            <Box display="flex" alignItems={"center"}>
                                <Image src={MetaisImg} objectFit={"cover"} boxSize="150px" borderRadius={"50%"} />
                                <Text fontSize={"3xl"} fontWeight="bold" paddingLeft={"48px"}> - METAIS ACEITOS</Text>
                            </Box>
                            <ChevronDownIcon w={8} h={8} />
                        </Box>

                        <Collapse in={showMetal} style={{ paddingLeft: '36px', paddingTop: '24px' }}>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">FERRAGENS</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">FIOS DE COBRE</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">LATAS DE AEROSOL</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">LATAS DE AZEITE</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">LATAS DE ÓLEO</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">LATAS DE CERVEJA</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">LATAS DE REFRIGERANTE</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">LATAS DE SARDINHA</Text>
                            </Box>
                            <Box >
                                <Text fontSize={"2xl"} margin="8px 0px">PANELAS SEM CABO</Text>
                            </Box>
                        </Collapse>
                    </Box>

                    <Box onClick={handleTogglePapel} width="70%" margin="0 auto" borderBottom={"2px solid #3182ce"} paddingBottom="36px">
                        <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
                            <Box display="flex" alignItems={"center"}>
                                <Image src={PapeisImg} objectFit={"cover"} boxSize="150px" borderRadius={"50%"} />
                                <Text fontSize={"3xl"} fontWeight="bold" paddingLeft={"48px"}> - PAPEIS ACEITOS</Text>
                            </Box>

                            <ChevronDownIcon w={8} h={8} />

                        </Box>
                        <Collapse in={showPapel} style={{ paddingLeft: '36px', paddingTop: '24px' }}>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px"> EMBALAGEM DE MARMITEX (ALUMÍNIO)</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">EMBALAGEM DE OVO</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px"> EMBALAGENS DE PRODUTOS DE HIGIENE</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px"> EMBALAGENS DE PRODUTOS DE LIMPEZA</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">EMBALAGENS LONGA VIDA</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">JORNAIS</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">LISTA TELEFÔNICA</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px"> PAPÉIS DE DESENHOS</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">PAPÉIS DE ESCRITÓRIO</Text>
                            </Box>
                            <Box>
                                <Text fontSize={"2xl"} margin="8px 0px">REVISTAS</Text>
                            </Box>
                        </Collapse>
                    </Box>

                    <Box onClick={handleToggleVidro} width="70%" margin="0 auto" borderBottom={"2px solid #3182ce"} paddingBottom="36px">
                        <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
                            <Box display="flex" alignItems={"center"}>
                                <Image src={VidrosImg} objectFit={"cover"} boxSize="150px" borderRadius={"50%"} />
                                <Text fontSize={"3xl"} fontWeight="bold" paddingLeft={"48px"}> - VIDROS ACEITOS</Text>
                            </Box>

                            <ChevronDownIcon w={8} h={8} />

                        </Box>
                        <Collapse in={showVidro} style={{ paddingLeft: '36px', paddingTop: '24px' }}>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">CACOS DE VIDRO</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">COPOS DE VIDRO</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">FRASCOS DE CONDIMENTOS</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">FRASCOS DE MOLHOS</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">FRASCOS DE PERFUMES</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">GARRAFAS DE BEBIDAS</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">LUMINÁRIAS</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">VIDROS DE AUTOMÓVEIS</Text>
                            </Box>
                            <Box >
                                <Text fontSize={"2xl"} margin="8px 0px">VIDROS DE JANELAS</Text>
                            </Box>
                        </Collapse>
                    </Box>

                    <Box onClick={handleTogglePlastico} width="70%" margin="0 auto" borderBottom={"2px solid #3182ce"} paddingBottom="36px" marginBottom={"48px"}>
                        <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
                            <Box display="flex" alignItems={"center"}>
                                <Image src={PlasticosImg} objectFit={"cover"} boxSize="150px" borderRadius={"50%"} />
                                <Text fontSize={"3xl"} fontWeight="bold" paddingLeft={"48px"}> - PLASTICOS ACEITOS</Text>
                            </Box>

                            <ChevronDownIcon w={8} h={8} />

                        </Box>
                        <Collapse in={showPlastico} style={{ paddingLeft: '36px', paddingTop: '24px' }}>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">ACRÍLICOS</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">CÁPSULAS DE CAFÉ</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">COPOS DE PLÁSTICO</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">EMBALAGEM DE MARMITEX (ISOPOR)</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">EMBALAGEM DE OVO (ISOPOR)</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">EMBALAGENS DE PRODUTOS DE HIGIENE</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">ESCOVAS DE CABELO</Text>
                            </Box>
                            <Box borderBottom={"1px solid black"} marginBottom="8px">
                                <Text fontSize={"2xl"} margin="8px 0px">MESAS DE PLÁSTICO</Text>
                            </Box>
                            <Box >
                                <Text fontSize={"2xl"} margin="8px 0px">SACOS E SACOLAS</Text>
                            </Box>
                        </Collapse>
                    </Box>

                </Box>
            </Flex>
            <Box width={"100%"} background="#3182ce" color={"#E2E8F0"} paddingBlock={"48px"}>
                <Box width={"70%"} margin="0 auto">
                    <Text fontSize={"6xl"} fontWeight="bold">
                        REJEITOS
                    </Text>
                    <Text fontSize={"2xl"}>
                        São resíduos impossíveis de serem reciclados ou ainda sem tecnologia específica para o reaproveitamento.
                    </Text>
                    <Text fontSize={"2xl"}>
                        No momento, seu destino final são os aterros sanitários. Faça sua parte, evite o consumo de rejeitos!
                    </Text>
                    <Box marginTop="16px">
                        <Box borderBottom={"1px solid #A0AEC0"} marginBottom="8px">
                            <Text fontSize={"2xl"} margin="8px 0px" fontWeight={"bold"}> - CELOFANE</Text>
                        </Box>
                        <Box borderBottom={"1px solid #A0AEC0"} marginBottom="8px" fontWeight={"bold"}>
                            <Text fontSize={"2xl"} margin="8px 0px"> - EMBALAGENS PLÁSTICAS METALIZADAS</Text>
                        </Box>
                        <Box borderBottom={"1px solid #A0AEC0"} marginBottom="8px" fontWeight={"bold"}>
                            <Text fontSize={"2xl"} margin="8px 0px"> - EXTRATOS BANCÁRIOS (TERMO-SENSÍVEIS)</Text>
                        </Box>
                        <Box borderBottom={"1px solid #A0AEC0"} >
                            <Text fontSize={"2xl"} margin="8px 0px" fontWeight={"bold"}> - PAPÉIS CARBONO</Text>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </>
    );
}

export default FAQ;