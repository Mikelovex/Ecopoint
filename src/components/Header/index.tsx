import { Flex, Link, Menu, MenuButton, MenuItem, MenuList, Text, Image, Button, Avatar, MenuDivider, Box, useTimeout } from '@chakra-ui/react'


import Logo from '../../assets/logo.svg'
import { useAuth } from '../../hooks/AuthContext'
import { useNavigate } from 'react-router-dom'
import { AddIcon } from '@chakra-ui/icons'
import { query, collection, where, getDocs } from 'firebase/firestore'
import { db } from '../../services/Firebase'


const Header = () => {
    const navigate = useNavigate()
    const { user, logOut } = useAuth()


    const pointsCollection = query(collection(db, 'points'), where("userId", "==", `${user.uid}`))

    const getData = async () => {
        const data = await getDocs(pointsCollection)
        const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        localStorage.removeItem('@my-points')
        localStorage.setItem('@my-points', JSON.stringify(res))
    }


    const handleLogOut = () => {
        logOut()
    }


    const handleGetPoints = async () => {
        await getData()
        setTimeout(() => {
            navigate('/company-points')
        }, 1000);
    }

    console.log('user', user)

    return (
        <Flex width="80%" height={20} margin=" 20px auto" justifyContent="space-between" alignItems={["center", "normal", "normal", "normal"]}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: "pointer" }} onClick={() => navigate('/')}>
                <Image width="40px" height="40px" src={Logo} alt="logo" /><h1 style={{ fontSize: '26px', fontWeight: 'bold', color: "#322153" }}>Ecopoint</h1>
            </div>
            {Object.keys(user).length > 0 ? (
                <Flex alignItems={'center'}>
                    <Link href='/faq'>
                        <Button
                            variant={'ghost'}
                            size={'sm'}
                            mr={4}
                        >
                            FAQ
                        </Button>
                    </Link>
                    <Link href='/json'>
                        <Button
                            variant={'ghost'}
                            size={'sm'}
                            mr={4}
                        >
                            JSON
                        </Button>
                    </Link>
                    <Link href='/xml'>
                        <Button
                            variant={'ghost'}
                            size={'sm'}
                            mr={4}
                        >
                            XML
                        </Button>
                    </Link>
                    <Button
                        variant={'solid'}
                        colorScheme={'blue'}
                        size={'sm'}
                        mr={4}
                        leftIcon={<AddIcon />}>
                        <Link href='/new-point'>
                            Novo ponto de coleta
                        </Link>
                    </Button>


                    <Menu>
                        <MenuButton
                            border="1px solid #3182ce"
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}>
                            <Avatar
                                size={'sm'}
                                src={user.imagem}

                            />
                        </MenuButton>
                        <MenuList>
                            <Box display="flex" ml="2" mt="2" height="60px" >
                                <Avatar
                                    border="1px solid #3182ce"
                                    size={'md'}
                                    src={user.imagem}
                                />
                                <Box ml="4">
                                    <Text fontWeight="bold">{user.name}</Text>
                                    <Text mr="4" color="blackAlpha.700">{user.email}</Text>
                                </Box>
                            </Box>
                            <MenuDivider />
                            <MenuItem onClick={() => navigate("/profile")}>Perfil</MenuItem>
                            <MenuItem onClick={handleGetPoints}>Meus pontos de coleta</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={handleLogOut}>Sair</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            ) : (
                <Flex alignItems={'center'}>
                    <Link href='/faq'>
                        <Button
                            variant={'ghost'}
                            size={'sm'}
                            mr={4}
                        >
                            FAQ
                        </Button>
                    </Link>
                    <Link href='/json'>
                        <Button
                            variant={'ghost'}
                            size={'sm'}
                            mr={4}
                        >
                            JSON
                        </Button>
                    </Link>
                    <Link href='/xml'>
                        <Button
                            variant={'ghost'}
                            size={'sm'}
                            mr={4}
                        >
                            XML
                        </Button>
                    </Link>

                    <Link _hover={{ textDecorationLine: 'none' }} href='/sign-in'>
                        <Button
                            variant={'ghost'}
                            // colorScheme="blue"
                            size={'sm'}
                            mr={4}
                        >
                            Entrar
                        </Button>
                    </Link>
                    <Link _hover={{ textDecorationLine: 'none' }} href='/sign-up'>
                        <Button
                            variant={'solid'}
                            colorScheme="blue"
                            size={'sm'}
                            mr={4}
                        >
                            Cadastrar-se
                        </Button>
                    </Link>
                </Flex>
            )}
        </Flex >
    )
}


export default Header