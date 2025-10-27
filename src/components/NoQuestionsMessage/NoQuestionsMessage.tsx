import { useAppContext } from "../../context/useAppContext"
import Button from "../../ui/Button/Button"

import styles from "./NoQuestionsMessage.module.css"

export default function NoQuestionsMessage() {

    const context = useAppContext()

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>No Questions Found 🤔</h2>
                <p className={styles.text}>
                    Maybe the quiz master took a break.
                    Try again or pick another one!
                </p>
                <div className={styles.footer}>
                    <Button
                        onClick={() => {
                            context.retryFetchQuestions()
                        }}>
                        Retry
                    </Button >
                </div>
            </div>
        </div>
    )
}
