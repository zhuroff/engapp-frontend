import { MutableRefObject, createContext, useContext, useRef } from 'react'
import { Toast, ToastProps } from 'primereact/toast'

const ToastContext = createContext<MutableRefObject<Toast | null>>(null!)

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children, ...rest }: ToastProps) => {
  const ref = useRef<Toast | null>(null)

  return (
    <ToastContext.Provider value={ref}>
      {children}
      <Toast ref={ref} {...rest} />
    </ToastContext.Provider>
  )
}
