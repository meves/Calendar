import React from "react";
import { Main } from "../../components/Main/Main";
import styles from './index.module.scss'
import { Header } from "../../components/Header/Header";
import { useAppSelector } from "../../store/hooks";
import { selectModal } from "../../store/slices/modalSlice";
import { CreateTask, DeleteTask, UpdateTask, DisplayTaskData, ModalWrapper, AddNewtask } from "../../components/Modals/";

const HomePage = () => {
    const { 
        "new-task": isNewTaskModalOpen,
        "submit-create": isCreationModalOpen,
        "submit-update": isUpdatingModalOpen,
        "submit-delete": isDeletionModalOpen,
        "task-data": isTaskDataModalOpen
    } = useAppSelector(selectModal)

    return (
        <>
        <section className={styles.pageWrapper}>
            <div className={styles.homeContainer}>
                <Header/>
                <Main/>
            </div>
        </section>
        
        <ModalWrapper
            isModalOpen={isNewTaskModalOpen}
        >
            <AddNewtask/>
        </ModalWrapper>

        <ModalWrapper
            isModalOpen={isCreationModalOpen}
        >
            <CreateTask/>
        </ModalWrapper>

        <ModalWrapper
            isModalOpen={isUpdatingModalOpen}
        >
            <UpdateTask/>
        </ModalWrapper>

        <ModalWrapper
            isModalOpen={isDeletionModalOpen}
        >
            <DeleteTask/>
        </ModalWrapper>

        <ModalWrapper
            isModalOpen={isTaskDataModalOpen}
        >
            <DisplayTaskData/>
        </ModalWrapper>

        </>
    )
}

export default HomePage