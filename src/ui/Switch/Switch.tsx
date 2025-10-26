import React from 'react'
import styles from './Switch.module.css';

interface switchPropsI {

    checked?: boolean;
    onChange?: (checked: boolean) => void;

}


export default function Switch(props: switchPropsI) {

    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                checked={props.checked}
                onChange={(e) => props.onChange && props.onChange(e.target.checked)}
                style={{ display: 'none' }}
            />
            <span className={styles.slider}></span>
        </label>
    );

}
