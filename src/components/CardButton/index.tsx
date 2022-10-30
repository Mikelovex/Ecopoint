import { Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'

interface CardButton {
    image: string;
    text: string;
    id: string;

}

const CardButton = ({ image, text, id, ...props }: CardButton) => {

    const [selected, setSelected] = useState(false)

    return (
        <Flex data-id={id} background={selected ? '#e1faec' : '#f5f5f5'} style={selected ? { border: '2px solid #34cd79' } : {}} w={44} h={40} borderRadius={5} flexDirection="column" alignItems="center" justifyContent="center" onClickCapture={() => setSelected(!selected)} {...props}>
            <img src={image} alt="" style={{ pointerEvents: 'none' }} />
            <Text style={{ pointerEvents: 'none' }} color="#4d4d4d">
                {text}
            </Text>
        </Flex >
    )
}


export default CardButton