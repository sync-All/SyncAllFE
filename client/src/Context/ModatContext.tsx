import React, { createContext, useState } from "react";

interface Providerprops {
    children : React.ReactNode
}
type Provide = {
    openModal : ()=> void;
    afterOpenModal : ()=> void;
    closeModal : ()=> void;
    modalIsOpen : boolean;
    setModalIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}

 const ModalContext = createContext<Provide >(null!);
 export default ModalContext

export const ModalProvider = ({children}:Providerprops)=>{
    const [modalIsOpen, setModalIsOpen] = useState(false)

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {
    // reference are now sync'd and can be accessed.
    
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const value = {
    closeModal,
    afterOpenModal,
    openModal,
    modalIsOpen,
    setModalIsOpen,
  }
  return(<ModalContext.Provider value={value}>
    {children}

  </ModalContext.Provider>)
}
