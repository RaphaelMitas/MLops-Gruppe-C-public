import React, {useContext} from "react";
import {doc, setDoc, onSnapshot} from "firebase/firestore";
import {firestore} from "../api/firebase";

const FirestoreContext = React.createContext({
    addSpotifyUserData: () => null,
    getSpotifyUserData: () => null
});

export const useFirestore = () => {
    return useContext(FirestoreContext);
};


export const FirestoreProvider = ({children}) => {

    function addSpotifyUserData(uid, data) {

        setDoc(doc(firestore, "spotify-user-data", uid), data)
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

    }

    function getSpotifyUserData(uid, dataFunction){
        const unsub = onSnapshot(doc(firestore, "spotify-user-data", uid), (doc) => {
            dataFunction(doc.data())
        });
    }


     function getGenrePredData(uid, dataFunction){
        const unsub = onSnapshot(doc(firestore, "predicted_9_genres", uid), (doc) => {
            dataFunction(doc.data())
        });
    }

    const value = {addSpotifyUserData, getGenrePredData, getSpotifyUserData};

    return (
        <FirestoreContext.Provider value={value}>
            {children}
        </FirestoreContext.Provider>
    );
};

