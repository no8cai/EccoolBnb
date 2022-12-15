import { createContext, useContext, useState } from 'react';


export const TransferContext = createContext();

export const useTransfer = () => useContext(TransferContext);


export default function TransferProvider({children}) {
    
    const [spotId, setSpotId] = useState(null);

    return (
        <TransferContext.Provider
            value = {{
                spotId,
                setSpotId,
            }}

        >
            {children}
        </TransferContext.Provider>
    );
}