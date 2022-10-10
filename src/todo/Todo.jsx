import { useState } from 'react';
import styles from './Todo.module.css';
const getKey = () => Math.random().toString(32).substring(2);

function Todo() {
    const [item, setItem] = useState([])

    const handleDelete = i => {
        setItem(item.filter((item) => (item.id !== i)));
    }

    const handleAdd = (text, date)=>{
        setItem([...item, { id:getKey(), text, done: false, date}]);
    }

    const handleEditText = (i, text) => setItem(item.map(item => {
            if (item.id === i) {
                item.text = text
            };
            return item;
    }));

    const handleChange = i => setItem(item.map(item => {
        if (item.id === i) {
            item.done = !item.done
        };
        return item
    }));

    const [filter, setFilter] = useState('ALL');

    const handleFilter = value => setFilter(value);

    const displayItem = item.filter(item => {
            switch (filter) {
                case 'ALL':
                    return true;
                case 'TODO':
                    return !item.done;
                case 'DONE':
                    return item.done;
                default:
                    return item;
            }
        });

    return (
        <main className={styles.container}>
            <h1>Todo App</h1>
            <Input onAdd={handleAdd}/>
            <Filter changeFilter={handleFilter} value={filter}/>
            <ul>
                {displayItem.map((item, index) => (
                    <Item item={item} index={index} deleteItem={handleDelete} checkChenge={handleChange} editText={handleEditText}/>
                ))}
            </ul>
        </main>
    )
}

function Input({onAdd}) {
    const [text, setText] = useState('');
    const textChange = (e) => setText(e.target.value);
    const [date, setDate] = useState('');
    const dateChange = (e) => setDate(e.target.value);
    const submitItem = () => {
        onAdd(text, date);
        setText('');
        setDate('');
    }
    return(
        <div className={styles.input_container}>
            <button className={styles.card} type="submit" onClick={submitItem}></button>
            <input type="text" onChange={textChange} value={text} className={styles.text_box} placeholder="Create new todo ..."/>
            <input type="date" onChange={dateChange} value={date} className={styles.date_box}/>
        </div>
    );
}

function Filter({changeFilter}) {
    const handleFilter = (key, e) => {
        e.preventDefault();
        changeFilter(key)
    }

    return (
        <nav className={styles.filter_component}>
            <a href="#" onClick={handleFilter.bind(null, 'ALL')}>All</a>
            <a href="#" onClick={handleFilter.bind(null, 'TODO')}>ToDo</a>
            <a href="#" onClick={handleFilter.bind(null, 'DONE')}>Done</a>
        </nav>
    );
}

function Item({item, deleteItem, checkChenge, editText}) {
    const [text, setText] = useState('');
    const textChange = (i) => setText(i.target.value)

    const handleDelete = () => {
        deleteItem(item.id);
    };

    const handleChange = () => {
        checkChenge(item.id);
    }

    const [isEdit, setIsEdit] = useState(false);

    const startEdit = () => {
        setText(item.text);
        setIsEdit(true);
    }

    const endEdit = () => {
        editText(item.id, text);
        setIsEdit(false);
    }

    return (
        <li className={styles.item_container}>
            <input type="checkbox" name="" id="" onChange={handleChange} checked={item.done}/>
            {isEdit? <input type="text" name="" id="" onChange={textChange} value={text}/>: item.text}
            {item.date}
            {item.done ? <label>Done</label> : ""}
            {!isEdit?<button type='submit' onClick={startEdit}>編集</button>:<button type='submit' onClick={endEdit}>編集終了</button>}
            <button type='submit' onClick={handleDelete}>X</button>
        </li>
    )
}

export default Todo;
