import { useContext, useState } from "react";
import { ListsContext } from "../list-context";
import List from "./list";
import ListForm from "./list-form";
import axios from "axios";


export default function ListContainer() {
    const [listCreation, setListCreation] = useState(false);
    const lists = useContext(ListsContext);


    async function handleCreateList(event: any) {
        event.preventDefault();
        const listData = {
            title: event.target.title.value
        }
        try{
            await axios.post('http://localhost:8080/todolists', listData);
        } catch (error) {
            console.error('Error posting data', error);
        }

        setListCreation(false);
    }


    return (
        <div className="list-container">
            {lists?.map(list => {
                return <List
                    key={list.id}
                    id={list.id}
                    title={list.title}
                    done={list.done}
                />
            })}
            {listCreation ?
                <>
                    <ListForm onList={(event: any) => handleCreateList(event)} />
                    <button onClick={() => setListCreation(!listCreation)}>Cancel</button>
                </>
                :
                <button onClick={() => setListCreation(!listCreation)}>Add new list</button>
            }
        </div>

    );
}