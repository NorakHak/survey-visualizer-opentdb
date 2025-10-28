import { useAppContext } from "../../context/useAppContext"
import Button from "../../ui/Button/Button"

import styles from "./ErrorMessage.module.css"
interface ErrorMessageProps {
    isCategoriesLoadFailed?: boolean
}

export default function ErrorMessage({ isCategoriesLoadFailed = true }: ErrorMessageProps) {

    const context = useAppContext();
    if (!context) return null;

    function onRetryButtonClick() {

        if (isCategoriesLoadFailed) {
            context.fetchCategories()
        } else {
            context.retryFetchQuestions()
        }

    }

    return (
        <div className={styles.container}>

            <div className={styles.wrapper}>
                <h2 className={styles.title}>Something Went Wrong 😅</h2>
                <p className={styles.text}>
                    Looks like our quiz engine took a little nap.
                    Try again or come back later!
                </p>
                <div className={styles.footer}>
                    <Button
                        onClick={onRetryButtonClick}>
                        Retry
                    </Button >
                </div>
            </div>

        </div>
    )
}
