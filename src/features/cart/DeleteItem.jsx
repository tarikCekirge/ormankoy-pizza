import React from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux';
import { deleteItem } from './cartSlice';

const DeleteItem = ({ id }) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteItem(id));
    };
    return (
        <Button type="small" onClick={handleDelete}>Sil</Button>
    )
}

export default DeleteItem