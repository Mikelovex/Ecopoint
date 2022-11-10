import { doc, getDoc } from 'firebase/firestore';
import { toXML } from 'jstoxml'
import { useEffect, useState } from 'react'
import Header from '../../components/Header';
import { db } from '../../services/Firebase';

import { Text } from "@chakra-ui/react";


const XML = () => {

    const [pointData, setPointData] = useState<any>()

    const config = {
        indent: '    '
    };

    const xml = toXML(pointData, config);

    useEffect(() => {
        const docRef = doc(db, 'points', `35XzDDlk6QheXrvkMzLb`)
        getDoc(docRef).then((doc) => {
            setPointData(doc.data())
        })
    }, [])

    return (
        <>
            <Header />
            <div style={{ width: "80%", margin: "0 auto" }}>
                <Text fontSize={"3xl"} marginBottom={"48px"}>XML</Text>
                {pointData ? (
                    <span style={{ display: 'flex', width: '20px' }}>{xml}</span>
                ) : (
                    <span>Not Found</span>
                )}
            </div>
        </>
    )
}


export default XML;