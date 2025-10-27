import { useAppContext } from '../../context/useAppContext'
import { Cell, Pie, PieChart } from 'recharts';
import { renderCustomizedLabel } from '../../utils';
import { DIFFICULTY_COLORS } from '../../constants';

import styles from "./DifficultyChart.module.css"

export default function DifficultyChart() {

    const context = useAppContext();
    if (!context) return null;

    const difficultyData = ['easy', 'medium', 'hard'].map(level => ({
        name: level.charAt(0).toUpperCase() + level.slice(1),
        value: context.questions.filter(q => q.difficulty === level).length,
    })).filter(item => item.value > 0);

    return (
        <div className={styles.container}>

            <div>
                <h2>Difficulty Distribution</h2>
                <div>
                    <b>Category: </b>
                    <span>{context.selectedCategory?.name}</span>
                </div>
                <div>
                    <b>Number of Questions: </b>
                    <span>{context.questions?.length}</span>
                </div>
            </div>

            <div className={styles.chartContainer}>
                <PieChart width={500} height={500}>
                    <Pie
                        data={difficultyData}
                        dataKey="value"
                        nameKey="name"
                        label={renderCustomizedLabel}
                        labelLine={false}>
                        {difficultyData.map((entry, index) => (
                            <Cell key={`cell-${entry.name}`} fill={DIFFICULTY_COLORS[index % DIFFICULTY_COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </div>

            <div className={styles.footer}>
                <span>Easy - Green</span>
                <span>Medium - Yellow</span>
                <span>Hard - Red</span>
            </div>

        </div>
    )
}
