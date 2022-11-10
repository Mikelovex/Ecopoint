import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { db } from "../../services/Firebase";

import { Text } from "@chakra-ui/react";

const Json = () => {

    const [pointData, setPointData] = useState<any>()

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
                <Text fontSize={"3xl"} marginBottom="48px">JSON</Text>
                {pointData ? (
                    <span>{JSON.stringify(pointData)}</span>
                ) : (
                    <span>Not Found</span>
                )}
            </div>
        </>
    )
}


export default Json;