import dynamic from 'next/dynamic';
import { React, useState, useEffect } from 'react';
import ReactMde from "react-mde";
import * as Showdown from 'showdown';
import "react-mde/lib/styles/css/react-mde-all.css";
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { db } from '../firebase'
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';


const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

function TextEditor() {
    const [session] = useSession();
    const [time, setTime] = useState(new Date().getTime() / 1000);
    const [value, setValue] = useState("");
    const [selectedTab, setSelectedTab] = useState(
        "write"
    );
    const router = useRouter();
    const { id } = router.query;


    const [snapshot] = useDocumentOnce(
        db.collection("userDocs").doc(session?.user?.email).collection("docs").doc(id)
    );

    function saveVal(value) {
        setValue(value);
        if (new Date().getTime() / 1000 > time + 20) {

            db.collection('userDocs').doc(session?.user?.email).collection('docs').doc(id).set({
                value: value
            },
                {
                    merge: true
                });
            setTime(new Date().getTime() / 1000);

        }

    }






    useEffect(() => {
        if (snapshot?.data()?.value) {
            setValue(
                snapshot?.data().value
            )
        }
    }, [snapshot])


    const save = async function* (data) {
        const uploader = function (time) {
            let items = data.clipboardData.items;
            var files = [];

            for (let i = 0, len = items.length; i < len; ++i) {
                var item = items[i];
                if (item.kind === "file") {
                    // uploadToImgur()
                }
            }
        }

    }
    return (
        <div className="container mx-auto">
            <ReactMde
                value={value}
                onChange={saveVal}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
            />



        </div>

    );
}


export default TextEditor
