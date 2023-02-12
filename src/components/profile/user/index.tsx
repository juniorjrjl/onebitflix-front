import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../../styles/profile.module.scss'
import profileService, { CurrentUser } from '../../../services/profileService'
import ToastComponent from '../../common/toast'
import moment, { locale } from 'moment'
import { IMaskInput, useIMask } from 'react-imask'
import "moment/locale/pt-br";

const UserForm = () =>{
    moment.locale('pt-br')
    const router = useRouter()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [initialEmail, setInitialEmail] = useState("")
    const [createdAt, setCreatedAt] = useState("")

    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastColor, setToastColor] = useState('success')

    useEffect(() =>{
        profileService.fetchCurrent().then(res =>{
            const user = res.data as CurrentUser
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setPhone(user.phone)
            setEmail(user.email)
            setInitialEmail(user.email)
            setCreatedAt(user.created_at)
        })
    }, [])
    const handleUserUpdate =async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(phone)
        const res = await profileService.update({firstName, lastName, phone, email, created_at: createdAt})
        if (res.status === 200){
            setToastMessage('Informações alteradas com sucesso')
            setToastColor('success')
        }else{
            setToastMessage('Erro na atualização dos dados')
            setToastColor('danger')
        }
        setToastIsOpen(true)
        setTimeout(() => setToastIsOpen(false), 1000 * 3);
        if (email !== initialEmail){
            sessionStorage.clear()
            router.push('/')
        }
    }

    return (
        <>
            <Form className={styles.form} onSubmit={handleUserUpdate}>
                <div className={styles.formName}>
                    <p className={styles.nameAbbreviation}>{firstName.slice(0, 1)}{lastName.slice(0, 1)}</p>
                    <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
                </div>
                <div className={styles.memberTime}>
                    <img src="/profile/iconUserAccount.svg" alt="iconProfile" className={styles.memberTimeImg}/>
                    <p className={styles.memberTimeText}>Membro desde <br /> {moment(createdAt).format('LL')}</p>
                </div>
                <hr />
                <div className={styles.inputFlexDiv}>
                    <FormGroup>
                        <Label for='firstName' className={styles.label}>Nome</Label>
                        <Input name='firstName' type='text' id='firstName' placeholder='Qual o seu primeiro nome?' required maxLength={20} 
                            className={styles.inputFlex} value={firstName} onChange={(event) =>  setFirstName(event.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastName' className={styles.label}>Sobrenome</Label>
                        <Input name='lastName' type='text' id='lastName' placeholder='Qual o seu último nome?' required maxLength={20} 
                            className={styles.inputFlex} value={lastName} onChange={(event) =>  setLastName(event.target.value)}/>
                    </FormGroup>
                </div>
                <div className={styles.inputNormalDiv}>
                    <FormGroup>
                        <Label for='phone' className={styles.label}>Whatsapp / Telegram</Label>
                        <IMaskInput mask="(00) 90000-0000" name='phone' type='tel' id='phone' placeholder='(xx) 9xxxx-xxxx' required maxLength={20} className={`${styles.input} form-control`} 
                            value={phone} onChange={(event: any) => setPhone(event.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='email' className={styles.label}>Whatsapp / Telegram</Label>
                        <Input name='email' type='email' id='email' placeholder='Informe seu email' required maxLength={20} className={styles.input} 
                            value={email} onChange={(event) =>  setEmail(event.target.value)}/>
                    </FormGroup>
                    <Button className={styles.formBtn} outline type='submit'>
                        Salvar
                    </Button>
                </div>
            </Form>
            <ToastComponent isOpen={toastIsOpen} message={toastMessage} color={toastColor} />
        </>
    )
}

export default UserForm