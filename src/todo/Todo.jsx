import { useState } from 'react';
import './Todo.css';

function Todo() {
    const [item, setItem] = useState([])

    const handleDelete = i => {
        setItem(item.filter((item) => (item.id !== i)));
    }

    const handleAdd = text =>{
        const newIndex = item.length + 1;
        setItem([...item, { id:newIndex, text, done: false }]);
    }

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
        <div className='container'>

            <h1>Todo App</h1>
            <Input onAdd={handleAdd}/>
            <Filter changeFilter={handleFilter} value={filter}/>
            {displayItem.map((item, index) => (
                <Item item={item} index={index} deleteItem={handleDelete} checkChenge={handleChange}/>
            ))}
        </div>
    )
}

function Filter({changeFilter}) {
    const handleFilter = (key, e) => {
        e.preventDefault();
        changeFilter(key)
    }

    return (
        <nav>
            <a href="#" onClick={handleFilter.bind(null, 'ALL')}>All</a>
            <a href="#" onClick={handleFilter.bind(null, 'TODO')}>ToDo</a>
            <a href="#" onClick={handleFilter.bind(null, 'DONE')}>Done</a>
        </nav>
    );
}

function Input({onAdd}) {
    const [text, setText] = useState('');
    const textChange = (i) => setText(i.target.value)
    const submitItem = () => {
        onAdd(text);
        setText('');
    }
    return(
        <div className='input'>
            <input type="text" onChange={textChange} value={text}/>
            <button type="submit" onClick={submitItem}>作成</button>
        </div>
    );
}

function Item({item, deleteItem, checkChenge}) {

    const handleDelete = () => {
        deleteItem(item.id);
    };

    const handleChange = () => {
        checkChenge(item.id);
    }

    return (
        <div className='task_component'>
            <input type="checkbox" name="" id="" onChange={handleChange} checked={item.done}/>
            Task {item.id}:{item.text}
            {item.done ? <label>Done</label> : ""}
            <button type='submit' onClick={handleDelete}>X</button>
        </div>
    )
}


export default Todo;
