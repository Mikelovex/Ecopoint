import { Flex, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Text, Image } from '@chakra-ui/react'
import React from 'react'
import { CgEnter } from 'react-icons/cg'

import { BsArrowLeft } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'

import Logo from '../../assets/logo.svg'


interface HeaderProps {
    link: string;
    text: string;
}

const Header = ({ link, text }: HeaderProps) => {
    return (
        <Flex width="80%" height={20} margin=" 20px auto" justifyContent="space-between" alignItems={["center", "normal", "normal", "normal"]}>
            <Image width={[140, 200, 200, 200]} src={Logo} alt="logo" />
            <Link _focus={{ border: 'none' }} display='flex' alignItems="center" href={link} color="black" fontWeight="600" >
                {text === 'voltar para home' ? <BsArrowLeft style={{ marginRight: '10px' }} size={20} color="#2fb86e" /> : <CgEnter style={{ marginRight: '10px' }} size={20} color="#2fb86e" />}  {text}
            </Link>
            {/* <Flex display={['none', 'flex', 'flex', 'flex']}>
                <Text>
                    Voltar para home
                </Text>

            </Flex>
            <Flex display={['static', 'none', 'none', 'none']}>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<GiHamburgerMenu />}
                        background="#e7e6e6"
                        variant='outline'
                    />
                    <MenuList>
                        <MenuItem command='⌘T'>
                            New Tab
                        </MenuItem>
                        <MenuItem command='⌘N'>
                            New Window
                        </MenuItem>
                        <MenuItem command='⌘⇧N'>
                            Open Closed Tab
                        </MenuItem>
                        <MenuItem command='⌘O'>
                            Open File...
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex> */}
        </Flex>
    )
}


export default Header