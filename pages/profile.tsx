import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import Footer from "../src/components/common/footer";
import HeaderAuth from "../src/components/common/headerAuth";
import SpinnerComponent from "../src/components/common/spinner";
import PasswordForm from "../src/components/profile/password";
import UserForm from "../src/components/profile/user";
import styles from '../styles/profile.module.scss'

const UseInfo = () =>{

    const router = useRouter()

    const [form, setForm] = useState("userForm")
    return(
        <>
            <Head>
                <title>Onebitflix - Meus dados</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
            </Head>
            <main className={styles.main}>
                <div className={styles.header}>
                    <HeaderAuth />
                </div>
                <Container className={styles.gridContainer}>
                    <p className={styles.title}>Minha conta</p>
                    <Row className="pt-3 pb-5">
                        <Col md={4} className={styles.btnColumn}>
                            <Button className={styles.renderFormBtn} onClick={() => setForm("userForm")} style={{color: form === "userForm" ? "#ff0044" : "white"}}>Dados Pessoais</Button>
                            <Button className={styles.renderFormBtn} onClick={() => setForm("passwordForm")} style={{color: form === "passwordForm" ? "#ff0044" : "white"}}>Alterar senha</Button>
                        </Col>
                        <Col md>
                            {form === "userForm" ? <UserForm /> : <PasswordForm />}
                        </Col>
                    </Row>
                </Container>
                <div className={styles.footer}>
                    <Footer />
                </div>
            </main>
        </>
    )
}

export default UseInfo