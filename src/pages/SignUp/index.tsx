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
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from '../../hooks/AuthContext';
import Logo from '../../assets/logo.svg';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../services/Firebase';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdOutlineFileDownload } from 'react-icons/md'




const SignUp = () => {

    const [imagem, setImagem] = useState('')
    const [file, setFile] = useState<any>()

    const [showPassword, setShowPassword] = useState(false);

    const { signUp } = useAuth()
    const navigate = useNavigate();

    const inputRef = useRef<any>(null)





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


    const initialValues = {
        name: '',
        email: '',
        password: '',
        numero: '',
        endereco: '',
        complemento: '',
        cidade: '',
        cep: '',
        cnpj: '',
        imagem: '',
        estado: '',
        tipoMateriais: ''
    }


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('insira um e-mail'),
        password: Yup.string()
            .min(6, 'senha muito curta')
            .matches(/^(?=.*[a-z]){1}/, "A senha deve conter uma letra minuscula")
            .matches(/^(?=.*[A-Z]){1}/, "A senha deve conter uma letra maiscula")
            .matches(/^(?=.*[@$!%*#?&])/, "A senha deve conter carectere especial")
            .required('Senha obrigatória'),
        cnpj: Yup.string()
            .required('insira um CNPJ'),
    });



    const onSubmit = (data: any) => {
        const { name, email, password, numero, endereco, complemento, cidade, cep, cnpj, estado, tipoMateriais } = data;

        signUp({ name, email, password, numero, endereco, complemento, cidade, cep, cnpj, imagem, estado, tipoMateriais })
        navigate('/')

        console.log('data', data)
        console.log('imagem', imagem)
    }




    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack mx={'auto'} maxW={'lg'} py={12} px={6}>
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
                    <form onSubmit={formik.handleSubmit} onChange={formik.handleChange}>

                        <Stack spacing={8}>
                            <FormControl id="name" isRequired >
                                <FormLabel>Nome</FormLabel>
                                <Input value={formik.values.name} type="text" />
                            </FormControl>

                            <HStack>
                                <Box>
                                    <FormControl id="email" isRequired >
                                        <FormLabel>email</FormLabel>
                                        <Input name='email' value={formik.values.email} type="text" />
                                        {formik.errors.email && formik.touched.email ? <div style={{ color: 'rgb(193, 30, 30)', padding: '8px 0px', fontSize: '12px' }} >{formik.errors.email}</div> : null}
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="password" isRequired>
                                        <FormLabel>Senha</FormLabel>
                                        <InputGroup>
                                            <Input value={formik.values.password} type={showPassword ? 'text' : 'password'} />
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
                                        {formik.errors.password && formik.touched.password ? <div style={{ color: 'rgb(193, 30, 30)', padding: '8px 0px', fontSize: '12px' }}>{formik.errors.password}</div> : null}
                                    </FormControl>
                                </Box>
                            </HStack>
                            <HStack>
                                <Box>
                                    <FormControl id="cep" isRequired>
                                        <FormLabel>Cep</FormLabel>
                                        <Input value={formik.values.cep} type="text" />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="numero" isRequired>
                                        <FormLabel>Numero</FormLabel>
                                        <Input value={formik.values.numero} type="text" />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <HStack>
                                <Box>
                                    <FormControl id="endereco" isRequired>
                                        <FormLabel>Endereço</FormLabel>
                                        <Input value={formik.values.endereco} type="text" />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="complemento" isRequired>
                                        <FormLabel>Complemento</FormLabel>
                                        <Input value={formik.values.complemento} type="text" />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <HStack>
                                <Box>
                                    <FormControl id="cidade" isRequired>
                                        <FormLabel>Cidade</FormLabel>
                                        <Input value={formik.values.cidade} type="text" />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="estado" isRequired>
                                        <FormLabel>Estado</FormLabel>
                                        <Input value={formik.values.estado} type="text" />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <HStack>
                                <Box>

                                    <FormControl>
                                        <FormLabel htmlFor='imagem' color="#4d4d4d" width={'48'}>Imagem</FormLabel>
                                        <Input id='imagem' name="imagem" display="none" type='file' background="#f0f0f5" color="#4d4d4d" onChange={(e: any) => {
                                            setFile(e.target.files[0])
                                            uploadImage(e.target.files[0])
                                        }} ref={inputRef} />
                                        {formik.errors.cnpj && formik.touched.cnpj ? <div style={{ color: 'rgb(193, 30, 30)', padding: '8px 0px', fontSize: '12px', opacity: 0 }} >{formik.errors.cnpj}</div> : null}
                                        <div onClick={() => inputRef.current.click()} style={{ display: 'flex', textAlign: "center", justifyContent: 'center', cursor: 'pointer', background: '#f0f0f5', borderRadius: '5px', width: '100%', height: "40px", }}>
                                            {file ? (
                                                <p style={{ marginTop: '8px' }}>{file.name}</p>
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <p style={{ marginRight: '12px' }}>Escolher arquivo</p>
                                                    <MdOutlineFileDownload size={20} />
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="cnpj" isRequired>
                                        <FormLabel>Cnpj</FormLabel>
                                        <Input value={formik.values.cnpj} type="text" />
                                        {formik.errors.cnpj && formik.touched.cnpj ? <div style={{ color: 'rgb(193, 30, 30)', padding: '8px 0px', fontSize: '12px' }} >{formik.errors.cnpj}</div> : null}
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="tipoMateriais" isRequired>
                                <FormLabel>Tipo de materiais</FormLabel>
                                <Input value={formik.values.tipoMateriais} type="text" />
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    type='submit'
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
                    </form>

                </Box>
            </Stack >
        </Flex >
    );
}

export default SignUp