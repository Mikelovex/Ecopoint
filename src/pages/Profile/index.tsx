import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Textarea,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useAuth } from '../../hooks/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../services/Firebase';
import { doc, collection, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Profile(): JSX.Element {

    const [name, setName] = useState<any>()
    const [numero, setNumero] = useState<any>()
    const [endereco, setEndereco] = useState<any>()
    const [complemento, setComplemento] = useState<any>()
    const [cidade, setCidade] = useState<any>()
    const [imagem, setImagem] = useState<any>()
    const [estado, setEstado] = useState<any>()
    const [informacao, setInformacao] = useState<any>()

    const inputRef = useRef<HTMLInputElement>(null)
    const { user, editUser, editAvatar } = useAuth()
    const navigate = useNavigate()


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
                if (imageUrl) {
                    editAvatar(imageUrl)
                }
            }
        )

    }

    async function handleSubmit() {

        const params = { ...user }

        Object.assign(params, {
            ...params,
            cidade: cidade ?? user.cidade,
            complemento: complemento ?? user.complemento,
            endereco: endereco ?? user.endereco,
            estado: estado ?? user.estado,
            imagem: imagem ?? user.imagem,
            name: name ?? user.name,
            numero: numero ?? user.numero,
            informacao: informacao ?? user.informacao
        })
        try {
            editUser(params)
            navigate('/')
        } catch (err) {
            alert(err)
        }
    }


    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                    Editar perfil da empresa
                </Heading>
                <FormControl id="userName">
                    <FormLabel></FormLabel>
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                            <Avatar size="xl" src={user.imagem} />
                        </Center>
                        <Center w="full">
                            <Button onClick={() => inputRef.current?.click()} w="full">Alterar avatar</Button>
                            <Input onChange={(e: any) => uploadImage(e.target.files[0])} type="file" hidden ref={inputRef} />
                        </Center>
                    </Stack>
                </FormControl>
                <FormControl id="nome">
                    <FormLabel>Nome</FormLabel>
                    <Input
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={name ? name : user.name}
                        onChange={(e: any) => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl id="endereco">
                    <FormLabel>Endereço</FormLabel>
                    <Input
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                        value={endereco ? endereco : user.endereco}
                        onChange={(e: any) => setEndereco(e.target.value)}
                    />
                </FormControl>
                <FormControl id="cidade">
                    <FormLabel>Cidade</FormLabel>
                    <Input
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={cidade ? cidade : user.cidade}
                        onChange={(e: any) => setCidade(e.target.value)}
                    />
                </FormControl>
                <FormControl id="numero">
                    <FormLabel>Número</FormLabel>
                    <Input
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={numero ? numero : user.numero}
                        onChange={(e: any) => setNumero(e.target.value)}
                    />
                </FormControl>
                <FormControl id="complemento">
                    <FormLabel>Complemento</FormLabel>
                    <Input
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={complemento ? complemento : user.complemento}
                        onChange={(e: any) => setComplemento(e.target.value)}
                    />
                </FormControl>
                <FormControl id="information" >
                    <FormLabel>Sobre a empresa</FormLabel>
                    <Textarea value={informacao ? informacao : user.informacao} onChange={(e: any) => setInformacao(e.target.value)} placeholder='Adicionar informações sobre a empresa' />
                </FormControl>

                <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                        onClick={() => navigate('/')}
                        bg={'red.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'red.500',
                        }}>
                        Voltar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        bg={'blue.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Salvar
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}

export default Profile;