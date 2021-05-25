import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout"

export default function FirstPost() {
    return (
        <Layout>
        <Head>
            <title>Primeiro Post</title>
        </Head>
            <h1>Primeiro Post</h1>
            <h2>
                <Link href='/'>
                    <a>Voltar para página inicial</a>
                </Link>
            </h2>
        </Layout>
    )
}