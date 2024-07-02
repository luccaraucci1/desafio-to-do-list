import { Header } from './components/Header';
import { Task } from './components/Task';

import {PlusCircle} from 'phosphor-react';
import {v4 as uuidv4} from 'uuid';

import styles from './App.module.css';
import './global.css';
import { ChangeEvent, FormEvent, useState } from 'react';




export function App() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [completeCount, setCompleteCount] = useState(0);

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
    setNewTaskText(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent){
    event.preventDefault();
    setTasks([...tasks, {id: uuidv4(), content: newTaskText, isComplete: false}]);
    setNewTaskText('');
  }

  function deleteTask(idTaskToDelete: string){
    const tasksWithoutDeletedOne = tasks.filter(task => task.id != idTaskToDelete);
    let count = completeCount;

    tasks.forEach(task => {
      if( task.id === idTaskToDelete){
        task.isComplete ? count -= 1 : count
      }
    })

    setCompleteCount(count)
    setTasks(tasksWithoutDeletedOne);
  }

  function completeTask(idTasktoComplete: string){
    let count = 0;

    const tasksWithUpdatedComplete = tasks.map(task => {
      if(task.id === idTasktoComplete){
        task.isComplete = task.isComplete ? false : true;
      }
      return task
    });

    tasksWithUpdatedComplete.forEach(task =>{
      if(task.isComplete === true){
        count++
      }
      
    })

    setCompleteCount(count);
    setTasks(tasksWithUpdatedComplete);
  }
 
  return(
    <div>

      <Header/>

      <div className={styles.wrapper}>

        <main>

          <div className={styles.newTask}>

            <form onSubmit={handleCreateNewTask}>

              <input
                size={100} 
                type="text" 
                placeholder='Adicione uma tarefa'
                onChange={handleNewTaskChange}
                value={newTaskText}
                required
              />
              <button type="submit">
                <span>Criar </span>
                <PlusCircle className={styles.plusIcon} size={18} /> 
              </button>

            </form>

          </div>

          <div className={styles.contagemTarefas}>

            <div className={styles.tarefasCriadas}>
              Tarefas Criadas
              <span className={styles.numCriadas}>{tasks.length}</span>
            </div>

            <div className={styles.tarefasConcluidas}>
              Tarefas Concluídas
              <span className={styles.numConcluidas}>{completeCount} de {tasks.length}</span>
            </div>

          </div>

          <div className={styles.listaTarefas}>
              

            { tasks.map(task => 
              <Task 
                id={task.id} 
                content={task.content} 
                isComplete={task.isComplete}
                onDeleteTask={deleteTask}
                onCompleteTask={completeTask}
              />
            )}
              

          </div>
        
        </main>
      </div>
    </div>
  );
}

