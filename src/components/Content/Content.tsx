import React from 'react'
import styles from "./Content.module.css"
import { useAppContext } from '../../context/useAppContext'
import Loader from '../../ui/Loader/Loader'
import DifficultyChart from '../DifficultyChart/DifficultyChart'

export default function Content() {

    const context = useAppContext()

    function contentRenderer() {

        if (context.isQuestionsLoadingActive) {
            return <Loader />
        }

        return <DifficultyChart />

    }

    return (
        <div className={styles.container}>
            {contentRenderer()}
        </div>
    )
}
