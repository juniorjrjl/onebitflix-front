import styles from '../../../../styles/profile.module.scss'
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { FormEvent, useState } from 'react'
import profileService from '../../../services/profileService'
import ToastComponent from '../../common/toast'

const PasswordForm = () =>{
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastColor, setToastColor] = useState('success')

    const handlePasswordUpdate = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        if (newPassword !== passwordConfirm){
            setToastIsOpen(true)
            setToastMessage('A senha e a confirmação de senha são diferentes')
            setToastColor('danger')
            setTimeout(() => setToastIsOpen(false),1000 * 3)
            return
        }
        if(currentPassword === newPassword){
            setToastIsOpen(true)
            setToastMessage('A nova senha é igual a senha atual')
            setToastColor('danger')
            setTimeout(() => setToastIsOpen(false),1000 * 3)
            return
        }
        const res = await profileService.changePassword({currentPassword, newPassword, passwordConfirm})
        if (res.status === 204){
            setToastIsOpen(true)
            setToastMessage('Senha alterada com sucesso')
            setToastColor('success')
            setTimeout(() => setToastIsOpen(false),1000 * 3)
            setCurrentPassword('')
            setNewPassword('')
            setPasswordConfirm('')
        } else{
            setToastIsOpen(true)
            setToastMessage('Erro ao alterar a senha')
            setToastColor('danger')
            setTimeout(() => setToastIsOpen(false),1000 * 3)
        }

    }

    return(
        <>
            <Form className={styles.form} onSubmit={handlePasswordUpdate}>
                <div className={styles.inputNormalDiv}>
                    <FormGroup>
                        <Label for="currentPassword" className={styles.label}>Senha atual</Label>
                        <Input name="currentPassword" type="password" id="currentPassword" placeholder="******" required minLength={6} maxLength={12} 
                            className={styles.input} value={currentPassword} onChange={event => setCurrentPassword(event.target.value)}/>
                    </FormGroup>
                </div>
                <div className={styles.inputFlexDiv}>
                    <FormGroup>
                        <Label for="newPassword" className={styles.label}>Nova senha</Label>
                        <Input name="newPassword" type="password" id="newPassword" placeholder="******" required minLength={6} maxLength={12} 
                            className={styles.inputFlex} value={newPassword} onChange={event => setNewPassword(event.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="passwordConfirm" className={styles.label}>Confirmação da nova senha</Label>
                        <Input name="passwordConfirm" type="password" id="passwordConfirm" placeholder="******" required minLength={6} maxLength={12} 
                            className={styles.inputFlex} value={passwordConfirm} onChange={event => setPasswordConfirm(event.target.value)}/>
                    </FormGroup>
                    
                </div>
                <div className={styles.inputNormalDiv}>
                    <Button outline className={styles.formBtn} type="submit">
                        Alterar senha
                    </Button>
                </div>
            </Form>
            <ToastComponent isOpen={toastIsOpen} message={toastMessage} color={toastColor} />
        </>
    )
}

export default PasswordForm