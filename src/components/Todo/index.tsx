import styles from "./style.module.css";

interface todoProps {
    name: string;
    id: number;
    handleRemoveTodo: (id: number) => void;
}

export function Todo({ name, id, handleRemoveTodo }: todoProps) {
    return (
        <li className={styles.todo}>
            <div className={styles.name}>
                <input type={"checkbox"}></input>
                <span>{name}</span>
            </div>
            <span onClick={() => handleRemoveTodo(id)}>
                Apagar
            </span>
        </li>
    )
}