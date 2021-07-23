import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Head from 'next/head'
import Header from '../components/Header.js';
import Image from 'next/image';
import Login from '../components/Login.js';
import { getSession, useSession } from 'next-auth/client';
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { useState } from 'react';
import { db } from '../firebase.js';
import firebase from 'firebase';
import DocumentRow from '../components/DocumentRow'
import { useCollectionOnce } from 'react-firebase-hooks/firestore';





export default function Home() {
  const [session] = useSession();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [snapshot, loading] = useCollectionOnce(db.collection('userDocs').doc(session?.user?.email).collection('docs'));

  if (!session) return <Login />
  const createDocument = () => {
    if (!input) return;

    db.collection('userDocs').doc(session?.user.email).collection('docs').add({
      fileName: input,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
    setShowModal(false);
  };

  const modal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of document"
          onKeyDown={(e) => e.key === "Enter" && createDocument()} />
      </ModalBody>
      <ModalFooter>
        <Button color="blue" buttonType="link" onClick={(e) => setShowModal(false)} ripple="dark" >Cancel</Button>
        <Button color="blue" buttonType="filled" onClick={createDocument} ripple="Blue" >Create Document</Button>
      </ModalFooter>
    </Modal>
  );




  return (
    <div className="">
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {modal}
      <section className="bg-[#F8f9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h1 className="text-gray-700 text-lg">Start A Markdown Document</h1>
            <Button color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0"
            >
              <Icon name="more_vert" size="3xl"></Icon>

            </Button>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className="border-2 h-52 w-52 relative cursor-pointer hover:border-blue-700">
              <Image src="/add.jpg"
                layout="fill"></Image>
            </div>
            <p className="ml-2 mt-2 font-semibold text-gray-700">Blank</p>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-3xl mx-auto py-8">
          <div className="flex items-center justify-between pb-5">
            <h2>My Documents</h2>
            <p>Date Created: </p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>

          {!loading ? snapshot.docs.map(doc => {
            console.log(doc.data().fileName);
            return <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timeStamp}
            />
          }) : <h1>Loading</h1>}
        </div>

      </section>
    </div>

  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    }
  }
}