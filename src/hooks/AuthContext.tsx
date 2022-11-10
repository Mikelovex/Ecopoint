import { useContext, createContext, useEffect, useState } from 'react';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../services/Firebase';
import { doc, getDoc, setDoc, updateDoc, } from 'firebase/firestore';


interface User {
    name: string;
    email: string;
    password: string;
    cep: string;
    cnpj: string;
    cidade: string;
    estado: string;
    complemento: string;
    endereco: string;
    numero: string;
    imagem: string;
    tipoMateriais: string;
}


interface EditUser {
    name?: string;
    cidade?: string;
    estado?: string;
    complemento?: string;
    endereco?: string;
    numero?: string;
    imagem?: string;
    informacao?: string;
}

interface AuthContextProps {
    signIn(email: string, password: string): void,
    signUp({ cep, cidade, cnpj, complemento, email, endereco, estado, imagem, name, numero, password, tipoMateriais }: User): void,
    editUser({ cidade, complemento, endereco, estado, imagem, name, numero, informacao }: EditUser): void
    editAvatar(imagem: string): void;
    logOut(): void;
    user: any;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<any>(() => {
        const userData = localStorage.getItem('@user')

        if (userData) {
            return { user: JSON.parse(userData) }
        }

        return {} as any
    })


    const signIn = async (email: string, password: string) => {
        const user = await signInWithEmailAndPassword(auth, email, password)

        const docRef = doc(db, 'users', `${user.user.uid}`)
        const docData = await getDoc(docRef)

        if (docData) {
            localStorage.removeItem('@user')
            localStorage.setItem("@user", JSON.stringify(docData.data()))
        }

        setUser(docData.data())
    }

    const signUp = async ({ cep, cidade, cnpj, complemento, email, endereco, estado, imagem, name, numero, password, tipoMateriais }: User) => {
        const res = await createUserWithEmailAndPassword(auth, email, password)

        const userStore = {
            uid: res.user.uid,
            name,
            email: res.user.email,
            cep,
            endereco,
            numero,
            complemento,
            cidade,
            estado,
            cnpj,
            imagem,
            tipoMateriais,
            point: []
        }

        await setDoc(doc(db, "users", res.user.uid), userStore)

        localStorage.setItem("@user", JSON.stringify(userStore))

        setUser(userStore)
    }

    const editUser = async ({ cidade, complemento, endereco, estado, imagem, name, numero, informacao }: EditUser) => {

        const params = { ...user }

        Object.assign(params, {
            ...params,
            cidade,
            complemento,
            endereco,
            estado,
            imagem,
            name,
            numero,
            informacao
        })
        await setDoc(doc(db, "users", user.uid), params)
        localStorage.setItem("@user", JSON.stringify(params))
        setUser(params)

    }

    const editAvatar = async (imagem: string) => {
        const cityRef = doc(db, "users", user.uid)

        const data = {
            imagem
        }

        updateDoc(cityRef, data)
        setUser({ ...user, imagem: imagem })
    }

    const logOut = () => {
        signOut(auth)
        localStorage.clear()
        setUser({} as any)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async () => {

            const docRef = doc(db, 'users', `${user.user.uid}`)
            const docData = await getDoc(docRef)

            setUser(docData.data())


        });
        return () => {
            unsubscribe();
        };
    }, [logOut]);

    return (
        <AuthContext.Provider value={{ signIn, signUp, editUser, editAvatar, logOut, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};