import React ,{ useState, useEffect,createContext} from "react";

export const ErkContext = createContext();

const ErkContextProvider = (props)=>{

    let [dil,setDil]=useState();
    useEffect(()=>{
            let dilData = localStorage.getItem("erkDilAdmin");
        if(dilData){
            setDil(JSON.parse(dilData));
        }else{
            setDil("tm");
        }
    },[])

    const ChangeDil = (event)=>{
            setDil(event);
            localStorage.setItem("erkDilAdmin",JSON.stringify(event));
    }

    return(
        <ErkContext.Provider value={{dil,ChangeDil}}>
            {props.children}
        </ErkContext.Provider>
    );
};
 

export default ErkContextProvider;