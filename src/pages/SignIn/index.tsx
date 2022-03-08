import React, { useEffect, useState } from 'react'

import { Button, Flex, FormControl, Text, FormLabel, Input } from '@chakra-ui/react'

import { auth, provider, db } from '../../services/Firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { addDoc, collection, } from 'firebase/firestore'



const SignIn = () => {

    const usersCollection = collection(db, 'users')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async () => {
        await addDoc(usersCollection, { name: name, email: email, password: password })
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((res) => {
            console.log('data', res.user)
        })
    }


    const teste = () => {
        signOut(auth)

    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('user', user)
        })
    })

    return (
        <Flex maxWidth="600px" minHeight="500px" padding="32px" border="1px solid #f4f4f4" borderRadius="5px">
            <FormControl >
                <FormLabel htmlFor='name' >Name</FormLabel>
                <Input id='name' type='name' value={name} onChange={(event) => setName(event.target.value)} />
                <FormLabel htmlFor='email' marginTop={8} >Email address</FormLabel>
                <Input id='email' type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
                <FormLabel htmlFor='password' marginTop={8}>Password</FormLabel>
                <Input id='password' type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                <Text cursor="pointer" onClick={signInWithGoogle} fontSize='xs' marginTop={4}>Logar com google</Text>
                <Button type='submit' onClick={handleSubmit} colorScheme='teal' variant='solid' width="100%" marginTop={8}>
                    Button
                </Button>
                <Button type='submit' onClick={teste} colorScheme='teal' variant='solid' width="100%" marginTop={8}>
                    singOut
                </Button>
            </FormControl>
        </Flex>
    )
}


export default SignIn