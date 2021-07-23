import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Login from '../../components/Login';
import TextEditor from '../../components/TextEditor';
import { useEffect } from 'react';
import { getSession, signOut, useSession } from 'next-auth/client';
import { isValidElement, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { db } from '../../firebase'
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import dynamic from 'next/dynamic'


function Doc() {

    const [session] = useSession();
    if (!session) return <Login />;
    const router = useRouter();
    const { id } = router.query;

    const [snapshot, loadingSnapshot, error] = useDocumentOnce(
        db.collection('userDocs').doc(session?.user?.email).collection('docs').doc(id)
        // db.doc(`userDocs/${session.user.email}/docs/${id}`)
    );


    useEffect(() => {
        if (process.browser) {
            //do something here
            // vim.open({ debug: true,
            //     showMsg: function (msg) {
            //         alert('vim.js say:' + msg);
            //     }
            // });
        }
    }, []);
    return (
        <div>
            <header className="flex justify-between items-center p-3 pb-1">
                <span onClick={() => router.push("/")}
                    className="cursor-pointer">
                    <Icon name="description" size="5xl" color="blue"></Icon>
                </span>
                <div className="flex-grow px-2">
                    <h2>{snapshot?.data()?.fileName}</h2>
                    <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
                        <p className="option">File</p>
                        <p className="option">Edit</p>
                        <p className="option">View</p>
                        <p className="option">Insert</p>
                    </div>
                </div>
                <img src={session?.user?.image} alt="" className="cursor-pointer rounded-full w-10 h-10" />
            </header>
            <TextEditor />
        </div>
    )
}

export default Doc;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: {
            session
        }
    }
}
