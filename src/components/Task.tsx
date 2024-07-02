import {Trash} from 'phosphor-react';

import styles from './Task.module.css';

export interface Task{
    id: string,
    content: string,
    isComplete: boolean
}

interface TaskProps extends Task{
    onDeleteTask: (id: string) => void;
    onCompleteTask: (id: string) => void;
}


export function Task({id, content, isComplete, onDeleteTask, onCompleteTask}: TaskProps){

    function handleDeleteTask(){
        onDeleteTask(id);
    }

    function handleTaskComplete(){
        onCompleteTask(id);
    }


    return (
        <div key = {id} className={isComplete ? styles.taskComplete : styles.task}>

            <div className={styles.botaoCheck}>
                <input onClick={handleTaskComplete} type="checkbox" checked={isComplete}/>
            </div>

            <div className={styles.textoTarefa}>
                {content}
            </div>

            <button onClick={handleDeleteTask} title="Deletar tarefa" className={styles.trash}>
                <Trash size={20} />
            </button>

        </div>
    );
}