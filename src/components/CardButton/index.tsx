import { Flex, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'



interface CardButton {
    image: string;
    text: string;
    id: string;
    onClick?: (algo?: any) => void;
    teste?: any;
    setTeste?: (algo: any) => void;
}

const CardButton = ({ image, text, id, teste, setTeste, ...props }: CardButton) => {

    const [algo, setAlgo] = useState(false)
    return (
        <Flex data-id={id} background={algo ? '#e1faec' : '#f5f5f5'} style={algo ? { border: '2px solid #34cd79' } : {}} w={44} h={40} borderRadius={5} flexDirection="column" alignItems="center" justifyContent="center" onClickCapture={() => setAlgo(!algo)} {...props}>
            <img src={image} alt="" style={{ pointerEvents: 'none' }} />
            <Text style={{ pointerEvents: 'none' }} color="#4d4d4d">
                {text}
            </Text>
        </Flex >
    )
}


export default CardButton