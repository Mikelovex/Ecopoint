import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Image,
    HStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from '../../hooks/AuthContext';
import Logo from '../../assets/logo.svg';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../services/Firebase';


const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [numero, setNumero] = useState('')
    const [endereco, setEndereco] = useState('')
    const [complemento, setComplemento] = useState('')
    const [cidade, setCidade] = useState('')
    const [cep, setCep] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [imagem, setImagem] = useState('')
    const [estado, setEstado] = useState('')
    const [materiais, setMateriais] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const { signUp } = useAuth()
    const navigate = useNavigate();


    async function handleSubmit() {
        try {
            signUp({ name, email, password, numero, endereco, complemento, cidade, cep, cnpj, imagem, estado, tipoMateriais: materiais })
            navigate('/')
        } catch (err) {
            alert(err)
        }
    }


    const uploadImage = async (file: any,) => {
        if (!file) {
            return;
        }

        const storageReff = ref(storage, `/images/${new Date().getTime()}-${file.name}`)
        const uploadTask = uploadBytesResumable(storageReff, file)

        uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

            console.log('progress', progress)

        }, (err) => console.log(err),
            async () => {
                const imageUrl = await getDownloadURL(uploadTask.snapshot.ref)
                setImagem(imageUrl)
            }
        )

    }


    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    {/* <Box display="flex" justifyContent="center" height="80px" >
                        <Image src={Logo} alt='logo ecopoint' />
                    </Box> */}
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Cadastrar-se
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        para aproveitar todas as funções do ecoPoint
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>

                        <FormControl id="firstName" isRequired>
                            <FormLabel>Nome</FormLabel>
                            <Input onChange={(e) => setName(e.target.value)} type="text" />
                        </FormControl>

                        <HStack>
                            <Box>
                                <FormControl id="email" isRequired>
                                    <FormLabel>email</FormLabel>
                                    <Input onChange={(e) => setEmail(e.target.value)} type="text" />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="password" isRequired>
                                    <FormLabel>Senha</FormLabel>
                                    <InputGroup>
                                        <Input onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setShowPassword((showPassword) => !showPassword)
                                                }>
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            </Box>
                        </HStack>
                        <HStack>
                            <Box>
                                <FormControl id="cep" isRequired>
                                    <FormLabel>Cep</FormLabel>
                                    <Input onChange={(e) => setCep(e.target.value)} type="text" />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="numero">
                                    <FormLabel>Numero</FormLabel>
                                    <Input onChange={(e) => setNumero(e.target.value)} type="text" />
                                </FormControl>
                            </Box>
                        </HStack>
                        <HStack>
                            <Box>
                                <FormControl id="endereco" isRequired>
                                    <FormLabel>Endereço</FormLabel>
                                    <Input onChange={(e) => setEndereco(e.target.value)} type="text" />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="complemento">
                                    <FormLabel>Complemento</FormLabel>
                                    <Input onChange={(e) => setComplemento(e.target.value)} type="text" />
                                </FormControl>
                            </Box>
                        </HStack>
                        <HStack>
                            <Box>
                                <FormControl id="cidade" isRequired>
                                    <FormLabel>Cidade</FormLabel>
                                    <Input onChange={(e) => setCidade(e.target.value)} type="text" />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="estado">
                                    <FormLabel>Estado</FormLabel>
                                    <Input onChange={(e) => setEstado(e.target.value)} type="text" />
                                </FormControl>
                            </Box>
                        </HStack>
                        <HStack>
                            <Box>
                                <FormControl id="imagem" isRequired>
                                    <FormLabel>Imagem</FormLabel>
                                    <Input onChange={(e: any) => uploadImage(e.target.files[0])} type="file" />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="cnpj">
                                    <FormLabel>Cnpj</FormLabel>
                                    <Input onChange={(e) => setCnpj(e.target.value)} type="text" />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="materiais">
                            <FormLabel>Tipo de materiais</FormLabel>
                            <Input onChange={(e) => setMateriais(e.target.value)} type="text" />
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick={handleSubmit}
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Cadastrar-se
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Ja tem cadastro ? <Link href='/sign-in' color={'blue.400'}>Entrar</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default SignUp