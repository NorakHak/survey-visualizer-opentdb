import type { PieLabelRenderProps } from "recharts";
import { RADIAN } from "../constants";

export const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}: PieLabelRenderProps) => {
    // приводим к number
    const cxNum = cx as number;
    const cyNum = cy as number;
    const midAngleNum = (midAngle as number) || 0;
    const innerRadiusNum = innerRadius as number;
    const outerRadiusNum = outerRadius as number;
    const percentNum = (percent as number) || 0;

    const radius = innerRadiusNum + (outerRadiusNum - innerRadiusNum) * 0.5;
    const x = cxNum + radius * Math.cos(-midAngleNum * RADIAN);
    const y = cyNum + radius * Math.sin(-midAngleNum * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cxNum ? 'start' : 'end'
        } dominantBaseline="central" >
            {`${(percentNum * 100).toFixed(0)}%`}
        </text>
    );
};