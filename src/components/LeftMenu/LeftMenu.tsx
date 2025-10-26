import React from 'react'
import styles from "./LeftMenu.module.css"

export default function LeftMenu() {
    return (
        <div className={styles.container}>
            <nav className={styles.menu}>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        Hello
                    </li>
                </ul>
            </nav>
        </div>
    )
}
