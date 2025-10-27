import Switch from '../../ui/Switch/Switch'
import { useAppContext } from '../../context/useAppContext'
import Button from "../../ui/Button/Button"

import styles from "./Header.module.css"

export default function Header() {

    const context = useAppContext()

    return (
        <header className={styles.header}>

            <div className={styles.headerLeft}>
                <h1>Trivia Dashboard</h1>
                <div className={styles.headerLeftButtons}>
                    <Button onClick={() => {
                        context.setShowOverallChart(prev => !prev)
                    }}>
                        View {context.showOverallChart ? "Categories" : "Stats"}
                    </Button>
                    <Button
                        onClick={() => {
                            context.resetCache()
                        }}>Reset Questions</Button>
                </div>
            </div>
            <div className={styles.headerRight}>
                <Switch
                    checked={context.theme === 'dark'}
                    onChange={(val) => context.setTheme(val ? 'dark' : 'light')}
                />
            </div>

        </header>
    )
}
