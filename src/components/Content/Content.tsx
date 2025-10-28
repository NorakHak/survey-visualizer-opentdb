import { useAppContext } from '../../context/useAppContext'
import Loader from '../../ui/Loader/Loader'
import DifficultyChart from '../DifficultyChart/DifficultyChart'
import NoQuestionsMessage from "../NoQuestionsMessage/NoQuestionsMessage"
import ErrorMessage from "../ErrorMessage/ErrorMessage"

import styles from "./Content.module.css"

export default function Content() {

    const context = useAppContext();
    if (!context) return null;

    function contentRenderer() {

        switch (true) {
            case context.isQuestionsLoadingActive:
                return <Loader />;

            case context.error:
                return <ErrorMessage isCategoriesLoadFailed={false} />

            case context.questions && context.questions.length === 0:
                return <NoQuestionsMessage />;

            default:
                return <DifficultyChart />;
        }

    }

    return (
        <div className={styles.container}>
            {contentRenderer()}
        </div>
    )
}
