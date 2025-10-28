import { useAppContext } from "../../context/useAppContext";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { renderCustomizedLabel } from "../../utils";

import styles from "./CategoryStatsChart.module.css";

export default function CategoryStatsChart() {

    const context = useAppContext();
    if (!context) return null;

    const totalQuestions = context.categoryStats.reduce((sum, cat) => sum + cat.questionCount, 0);

    const data = context.categoryStats.map(cat => ({
        name: cat.name,
        value: (cat.questionCount / totalQuestions) * 100,
        color: cat.color
    })).filter(item => item.value > 0)

    function noDataViewRenderer() {

        if (data.length !== 0)
            return

        return <div className={styles.noDataContainer}>
            ℹ️ You haven’t selected any categories yet. Pick at least one to generate the chart.
        </div>

    }

    function chartTooltipRenderer() {

        if (data.length < 10)
            return

        return <Tooltip formatter={(value: number, name: string) => [`${value.toFixed(0)}%`, name]} />

    }

    function chartRenderer() {

        if (data.length === 0)
            return

        return <div className={styles.chart}>
            <PieChart width={500} height={500}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    label={data.length >= 10 ? false : renderCustomizedLabel}
                    labelLine={false}>
                    {data.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                </Pie>
                {chartTooltipRenderer()}
            </PieChart>
        </div>

    }

    function categoryStatsListRenderer() {

        if (data.length === 0)
            return

        return <div className={styles.listContainer}>
            <ul className={styles.list}>
                {data.map(c => {
                    return <li
                        className={styles.listItem}
                        key={c.name}>
                        <span
                            className={styles.color}
                            style={{ backgroundColor: c.color }}
                        />
                        <span>{c.name}: </span>
                        <span>{`${c.value.toFixed(0)}%`}</span>
                    </li>
                })}
            </ul>
        </div>

    }

    return (
        <div className={styles.container}>
            <h3>Question distribution by category</h3>

            {noDataViewRenderer()}
            {chartRenderer()}
            {categoryStatsListRenderer()}

        </div>
    );
}
