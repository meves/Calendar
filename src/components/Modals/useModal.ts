import { useEffect, useMemo } from "react"

export const useModal = (isOpen: boolean) => {
    const ModalRootElement = useMemo(() => document.querySelector("#modal"), [])
    const domElement = useMemo(() => document.createElement("div"), [])
    
    useEffect(() => {
        if (isOpen) {
            ModalRootElement?.appendChild(domElement)
            return () => {
                ModalRootElement?.removeChild(domElement)
            }
        }
    }, [isOpen, domElement, ModalRootElement])

    return { domElement }
}