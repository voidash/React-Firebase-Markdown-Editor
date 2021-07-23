import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { Router, useRouter } from "next/dist/client/router";
function DocumentRow({ id, fileName, date }) {
    const router = useRouter();

    return (
        <div onClick={() => router.push(`/doc/${id}`)}
            className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer">
            <Icon name="article" size="3xl" color="blue" />
            <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
            <p className="flex-grow pl-5 w-10 pr-10 truncate">{date.toDate().toLocaleDateString()}</p>
            <Icon name="more_vert" size="3xl" />
        </div>
    )
}

export default DocumentRow;
