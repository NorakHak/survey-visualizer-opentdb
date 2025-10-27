import { useAppContext } from "../../context/useAppContext";
import LeftMenu from "../LeftMenu/LeftMenu";
import Content from "../Content/Content";
import Loader from "../../ui/Loader/Loader";
import Header from "../Header/Header";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import CategoryStatsChart from "../CategoryStatsChart/CategoryStatsChart";

import styles from "./MainContainer.module.css"

export default function MainContainer() {

    const context = useAppContext()

    function contentRenderer() {

        switch (true) {
            case context.isCategoriesLoadingActive:
                return <Loader />;

            case context.error && !context.categories.length:
                return <ErrorMessage />;

            case context.showOverallChart:
                return <CategoryStatsChart />;

            default:
                return (
                    <>
                        <LeftMenu />
                        <Content />
                    </>
                );
        }

    }


    return (
        <main className={styles.main}>
            <div className={styles.container}>

                <Header />

                <div className={styles.contentContainer}>
                    {contentRenderer()}
                </div>

            </div>
        </main>
    );

}
