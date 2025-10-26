import React from "react";
import styles from "./MainContainer.module.css"
import LeftMenu from "../LeftMenu/LeftMenu";
import Content from "../Content/Content";
import Switch from "../../ui/Switch/Switch";

export default function MainContainer() {

    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <main className={styles.mainContainerWrapper}>
            <div className={styles.switchContainer}>
                <Switch
                    checked={theme === 'dark'}
                    onChange={(val) => setTheme(val ? 'dark' : 'light')}
                />
            </div>
            <div className={styles.mainContainer}>
                <LeftMenu />
                <Content />
            </div>
        </main>
    )
}
