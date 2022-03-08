import React, { useEffect, useRef, useState } from 'react'
import { background, Button, Flex, FormControl, FormLabel, Grid, Input, ListItem, OrderedList, Select, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import CardButton from '../../components/CardButton'
import Header from '../../components/Header'
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from 'firebase/firestore'
import { db, storage } from '../../services/Firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import { items } from './items'



const CreatePoint = () => {

    const [states, setStates] = useState([])
    const [citys, setCitys] = useState<any>([])
    const [selectedOption, setSelectedOption] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [imageUrl, setImageUrl] = useState<any>()
    const [file, setFile] = useState<any>()

    const inputRef = useRef<any>(null)

    const optionsCollection = collection(db, 'points')

    const navigate = useNavigate();



    const initialValues = {
        nome: '',
        imagem: '',
        endereco: '',
        numero: '',
        estado: '' as any,
        cidade: '',
        items: ['']
    }



    const onSubmit = async (data: any) => {
        const { nome, imagem, endereco, estado, numero, cidade, items } = data

        let formated = estado.split(',')
        console.log('data', data)

        await addDoc(optionsCollection, { nome, imagem, endereco, estado: formated[1], numero, cidade, items })
        alert('Sucesso!')
        navigate('/')


    }


    const formik = useFormik({
        initialValues,
        onSubmit
    })



    let stateValue = formik.values.estado

    const formatedStateValue = stateValue?.split(',')



    const fetchStates = async () => {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        setStates(response.data)
    }


    const fetchCitys = async () => {
        const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formatedStateValue && formatedStateValue[0]}/municipios`)
        setCitys(response.data)
    }



    const uploadImage = async (file: any,) => {
        if (!file) {
            return;
        }
        console.log('file', file)

        const storageReff = ref(storage, `/images/${new Date().getTime()}-${file.name}`)
        const uploadTask = uploadBytesResumable(storageReff, file)

        uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

            console.log('progress', progress)

        }, (err) => console.log(err),
            async () => {
                const imageUrl = await getDownloadURL(uploadTask.snapshot.ref)
                setImageUrl(imageUrl)
            }
        )

    }


    function handleSelectItem(name: string) {
        const alreadySelected = selectedItems.includes(name);
        if (alreadySelected) {
            setSelectedItems([
                ...selectedItems.filter((idFiltered) => idFiltered !== name),
            ]);
        } else {
            setSelectedItems([...selectedItems, name]);
        }
    }


    useEffect(() => {
        fetchStates()
    }, [])


    useEffect(() => {
        fetchCitys()
    }, [formik.values.estado])



    useEffect(() => {
        formik.setValues({
            nome: formik.values.nome,
            cidade: formik.values.cidade,
            endereco: formik.values.endereco,
            estado: formatedStateValue && formatedStateValue[1],
            imagem: imageUrl,
            numero: formik.values.numero,
            items: selectedItems.map((selected) => selected)
        })
    }, [imageUrl])



    return (
        <Flex flexDirection="column" >
            <Header text='voltar para home' link='/' />
            <Flex background="white" w={[400, 800, 800, 800]} margin="auto" padding={[8, 16, 16, 16]} borderRadius={5} flexDirection="column" >
                <Text fontSize={["2xl", "4xl", "4xl", "4xl"]} fontWeight="bold" color="#322153">Cadastro de ponto de coleta</Text>
                <Text marginTop={[5, 10, 10, 10]} fontSize={["large", "2xl", "2xl", "2xl"]} fontWeight="500" color="#322153">Dados da entidade</Text>
                <FormControl marginTop={8}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid gridTemplateColumns={["1fr ", "1fr 1fr", "1fr 1fr", "1fr 1fr"]} gridTemplateRows="1fr" rowGap={8} columnGap={8}>
                            <div>
                                <FormLabel htmlFor='nome' color="#4d4d4d">Nome da entidade</FormLabel>
                                <Input id='nome' type='text' background="#f0f0f5" color="#4d4d4d" onChange={formik.handleChange} value={formik.values.nome} />
                            </div>
                            <div>
                                <FormLabel htmlFor='imagem' color="#4d4d4d">Imagem da entidade</FormLabel>
                                <Input id='imagem' display="none" type='file' background="#f0f0f5" color="#4d4d4d" onChange={(e: any) => {
                                    setFile(e.target.files[0])
                                    uploadImage(e.target.files[0])
                                }} ref={inputRef} />
                                <div onClick={() => inputRef.current.click()} style={{ cursor: 'pointer', background: '#f0f0f5', borderRadius: '5px', width: '100%', height: "40px", padding: '8px 20px' }}>
                                    {file ? (
                                        <p>{file.name}</p>
                                    ) : (
                                        <p>Escolher arquivo</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <FormLabel htmlFor='endereco' color="#4d4d4d">Endereço</FormLabel>
                                <Input id='endereco' type='text' background="#f0f0f5" color="#4d4d4d" onChange={formik.handleChange} value={formik.values.endereco} />
                            </div>
                            <div>
                                <FormLabel htmlFor='numero' color="#4d4d4d">Numero/Complemento</FormLabel>
                                <Input id='numero' type='text' background="#f0f0f5" color="#4d4d4d" onChange={formik.handleChange} value={formik.values.numero} />
                            </div>
                            <div>
                                <FormLabel htmlFor='estado' color="#4d4d4d">Estado</FormLabel>
                                <Select __css={{ background: 'white' }} placeholder='Escolha um estado' id='estado' background="#f0f0f5" color="#4d4d4d" value={formik.values.estado} onChange={formik.handleChange} >
                                    {states.map((state: any, index) => (
                                        <option key={index} id='estado' style={{ background: 'white' }} color="#4d4d4d" value={[state.sigla, state.nome]}>{state.nome}</option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <FormLabel htmlFor='cidade' color="#4d4d4d">Cidade</FormLabel>
                                <Select __css={{ background: 'white' }} placeholder='Escolha uma cidade' id='cidade' background="#f0f0f5" color="#4d4d4d" value={formik.values.cidade} onChange={formik.handleChange} >
                                    {citys.map((city: any, index: number) => (
                                        <option key={index} id='cidade' style={{ background: 'white' }} color="#4d4d4d" value={city.nome}>{city.nome}</option>
                                    ))}
                                </Select>
                            </div>
                        </Grid>
                        <Flex alignItems="center" flexDirection={['column', 'row', 'row', 'row']} justifyContent="space-between" marginTop={20}>
                            <Text color="#322153" fontSize="2xl" fontWeight="bold">Items de coleta</Text>
                            <Text color="#322153" as="p">Selecione um ou mais items abaixo</Text>
                        </Flex>
                        <Grid gridTemplateColumns={["1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr"]} gridTemplateRows="1fr 1fr" rowGap={[4, 8, 8, 8]} columnGap={[0, 8, 8, 8]} marginTop={8} marginBottom={24}>
                            {items.map((item: any, index) => (
                                <OrderedList key={index}>
                                    <ListItem
                                        key={item.id}
                                        onClick={() => {
                                            setSelectedOption(!selectedOption)
                                            handleSelectItem(item.nome)
                                        }}
                                        w={["140px", "180px", "180px", "180px"]}
                                        h="160px"
                                        background="#f5f5f5"
                                        borderRadius={5}
                                        alignItems="center"
                                        justifyContent="center"
                                        display="flex"
                                        flexDirection="column"
                                        textAlign="center"

                                        style={selectedItems.includes(item.nome) ? { background: '#e1faec', border: '2px solid #34cd79' } : {}}
                                    >
                                        <img src={item.image} alt={item.nome} />
                                        <Text style={{ pointerEvents: 'none' }} color="#4d4d4d">
                                            {item.nome}
                                        </Text>
                                    </ListItem>
                                </OrderedList>
                            ))}
                        </Grid>
                        <Button _hover={{ background: '#2fb86e' }} w="xs" color="#f2f2f2" background="#34cb79" type='submit'>
                            Cadastrar ponto de coleta
                        </Button>
                    </form>
                </FormControl>
            </Flex>
        </Flex >
    )
}


export default CreatePoint