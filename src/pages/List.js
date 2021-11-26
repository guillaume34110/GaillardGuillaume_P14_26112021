import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router';
import {columns} from '../data/columns'
import '../style/list.css'

export default function List() {
    const navigate = useNavigate();
    const [pending, setPending] = useState(true);
    const [rows ,setRows] = useState([])

    useEffect(() => {
       
       
        let oldDatas = window.localStorage.getItem('users') //recuperation des data du stockage local
            oldDatas = JSON.parse(oldDatas)
            console.log(oldDatas)
            setRows(oldDatas)
            setPending(false)
    }, []);

    const redirect = () => {
        navigate('/login')
    }


    return (
        <main>
            <DataTable columns={columns} data={rows} progressPending={pending} />
            <p className = "home-page" onClick = {redirect}>Home</p>
        </main>
    )
}

