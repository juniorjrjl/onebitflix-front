import styles from '../styles/registerLogin.module.scss'
import Head from 'next/head'
import HeaderGeneric from '../src/components/common/headerGeneric'
import { Form, FormGroup, Label, Container, Button, Input } from 'reactstrap'
import Footer from '../src/components/common/footer'

const register = () =>{
    return(
        <>
            <Head>
                <title>Onebitflix - Registro</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
                <script src="https://jsuites.net/v4/jsuites.js"></script>
            </Head>
            <main className={styles.main}>
                <HeaderGeneric logoUrl='/' btnUrl='/login' btnContent='Quero fazer login'></HeaderGeneric>
                <Container className='py-5'>
                    <p className={styles.formTitle}>
                        <strong>Bem vindo(a) ao OneBitFlix!</strong>
                    </p>
                    <Form className={styles.form}>
                        <p className='text-center'>
                            <strong>Faça a sua conta!</strong>
                        </p>
                        <FormGroup>
                            <Label for='firstName' className={styles.label}>Nome:</Label>
                            <Input id='firstName' name='firstName' type='text' placeholder='Informe o seu nome' required maxLength={20} className={styles.inputName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='lastName' className={styles.label}>Sobrenome:</Label>
                            <Input id='lastName' name='lastName' type='text' placeholder='Informe o seu sobrenome' required maxLength={20} className={styles.inputName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='phone' className={styles.label}>Whatsapp / Telegram:</Label>
                            <Input id='phone' name='phone' type='tel' placeholder='(xx) 9xxxx-xxxx' required className={styles.input} data-mask="[-]+55 (00) 00000-0000"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='email' className={styles.label}>Sobrenome:</Label>
                            <Input id='email' name='email' type='email' placeholder='Informe o seu email' required maxLength={20} className={styles.input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='birth' className={styles.label}>Sobrenome:</Label>
                            <Input id='birth' name='birth' type='date' min='1930-01-01' max='2022-12-31' required maxLength={20} className={styles.input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='password' className={styles.label}>Senha:</Label>
                            <Input id='password' name='password' type='password' placeholder='Informe a sua senha (Min: 6 | Max: 20)' required minLength={6} maxLength={20} className={styles.input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='passwordVerifier' className={styles.label}>Confirmação de senha:</Label>
                            <Input id='passwordVerifier' name='passwordVerifier' type='password' placeholder='Confirme sua senha' required minLength={6} maxLength={20} className={styles.input}/>
                        </FormGroup>
                        <Button type='submit' outline className={styles.formBtn}>Cadastrar</Button>
                    </Form>
                </Container>
                <Footer />
            </main>
        </>
    )
}

export default register