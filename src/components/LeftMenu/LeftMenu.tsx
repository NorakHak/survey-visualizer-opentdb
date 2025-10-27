import styles from "./LeftMenu.module.css"
import { useAppContext } from '../../context/useAppContext'
import type { TriviaCategory } from '../../interfaces'

export default function LeftMenu() {

    const context = useAppContext()

    function onCategoryClick(category: TriviaCategory) {

        if (!context.isQuestionsLoadingActive) {

            context.setError(false)

            if (context.error || context.questions.length === 0) {

                context.retryFetchQuestions()

            } else {

                context.setSelectedCategory(category);

            }

        }

    }

    function categoriesItemRenderer(category: TriviaCategory) {

        return <li
            key={category.id}
            className={`${styles.listItem} ${context.selectedCategory?.id === category.id ? styles.selected : ''}`}
            style={{
                pointerEvents: context.isQuestionsLoadingActive ? 'none' : 'auto',
                opacity: context.isQuestionsLoadingActive ? 0.8 : 1
            }}
            onClick={() => onCategoryClick(category)}>
            {category.name}
        </li>

    }

    function categoriesListRenderer() {

        if (context.categories) {

            return <nav className={styles.menu}>
                <h3 className={styles.menuTitle}>Question Categories</h3>
                <ul className={styles.list}>
                    {context.categories.map(k => {
                        return categoriesItemRenderer(k)
                    })}
                </ul>
            </nav>

        }

    }

    return (
        <div className={styles.container}>
            {categoriesListRenderer()}
        </div>
    )

}
