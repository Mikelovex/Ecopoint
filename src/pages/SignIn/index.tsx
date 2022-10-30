import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    Image
} from '@chakra-ui/react'
import Logo from '../../assets/logo.svg'
import { PasswordField } from './PasswordField'

import { useState } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn } = useAuth()
    const navigate = useNavigate()


    const handleSignIn = async () => {
        try {
            signIn(email, password);
            navigate('/')

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
                <Stack spacing="6">
                    {/* <Box display="flex" justifyContent="center" height="80px" >
                        <Image src={Logo} alt='logo ecopoint' />
                    </Box> */}
                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Heading size={useBreakpointValue({ base: 'xs', md: 'md' })}>
                            Entrar na sua conta
                        </Heading>

                    </Stack>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={useBreakpointValue({ base: 'transparent', sm: '#FFFAFA' })}
                    boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <Stack spacing="6">
                        <Stack spacing="5">
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input onChange={(e: any) => setEmail(e.target.value)} borderColor="gray.300" />
                            </FormControl>
                            <PasswordField onChange={(e: any) => setPassword(e.target.value)} />
                        </Stack>
                        <HStack spacing="1" justify="center">
                            <Text color="muted">ainda não tem conta?</Text>
                            <Link href='/sign-up'>
                                <Button variant="link" colorScheme="blue">
                                    Cadastrar-se
                                </Button>
                            </Link>
                        </HStack>
                        <Stack spacing="6">
                            <Button onClick={handleSignIn} colorScheme="blue">Entrar</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}


export default SignIn;