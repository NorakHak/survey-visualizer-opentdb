import React from 'react'

import styles from "./Header.module.css"
import Switch from '../../ui/Switch/Switch'
import { useAppContext } from '../../context/useAppContext'

export default function Header() {

    const context = useAppContext()

    return (
        <header className={styles.header}>

            <div className={styles.headerLeft}>
                <h1>Trivia Dashboard</h1>
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
