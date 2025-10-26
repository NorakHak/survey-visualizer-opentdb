import React from "react";
import styles from "./MainContainer.module.css"
import LeftMenu from "../LeftMenu/LeftMenu";
import Content from "../Content/Content";
import Loader from "../../ui/Loader/Loader";
import { useAppContext } from "../../context/useAppContext";
import Header from "../Header/Header";

export default function MainContainer() {

    const context = useAppContext()


    return (
        <main className={styles.main}>
            <div className={styles.container}>

                <Header />

                <div className={styles.contentContainer}>
                    {context.isCategoriesLoadingActive ? (
                        <Loader />
                    ) : (
                        <>
                            <LeftMenu />
                            <Content />
                        </>
                    )}

                </div>

            </div>
        </main>
    );

}
