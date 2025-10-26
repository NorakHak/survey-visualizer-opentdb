import React from 'react'
import styles from "./LeftMenu.module.css"
import { useAppContext } from '../../context/useAppContext'

export default function LeftMenu() {

    const context = useAppContext()

    function categoriesListRenderer() {

        if (context.categories) {

            return <nav className={styles.menu}>
                <h3 className={styles.menuTitle}>Question Categories</h3>
                <ul className={styles.list}>
                    {context.categories.map(k => {
                        return <li
                            key={k.id}
                            className={`${styles.listItem} ${context.selectedCategory?.id === k.id ? styles.selected : ''}`}
                            onClick={() => {
                                context.setSelectedCategory(k)
                            }}>
                            {k.name}
                        </li>
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
