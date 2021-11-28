import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router';
import { columns } from '../data/columns'
import '../style/list.css'

export default function List() {
    const navigate = useNavigate();
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState([])
    const searchRef = useRef()

    useEffect(() => {
        let oldDatas = window.localStorage.getItem('users') //recuperation des data du stockage local
        oldDatas = JSON.parse(oldDatas)
        console.log(oldDatas)
        if (!oldDatas) oldDatas = [{ firstName: "", lastName: "", birthDate: "", state: "", city: "", department: "", startDate: "", id: "", }]
        setRows(oldDatas)
        setPending(false)
    }, []);

    const redirect = () => {
        navigate('/')
    }
    const search = () => {
        let oldDatas = window.localStorage.getItem('users')
        oldDatas = JSON.parse(oldDatas)
        if (!oldDatas) oldDatas = [{ firstName: "", lastName: "", birthDate: "", state: "", city: "", department: "", startDate: "", id: "", }]
        let rowsBuffer = []
        oldDatas.forEach(row =>{
            let rowToken = true
            Object.values(row).forEach(val => {
                console.log(val, 'val')
                if (typeof val !== 'string') val = val.toString()
                if (val.toLowerCase().includes(searchRef.current.value) && rowToken ) {
                    rowToken = false
                    rowsBuffer.push(row)
                }
            })
        })
        setRows(rowsBuffer)
    }
    const testFuction = () => {
        setRows([{ firstName: "jean", lastName: "michel", birthDate: "12/12/2020", state: "herault", city: "paris", department: "93", startDate: "12/12/2020", id: "0", }])
    }
    return (
        <main className="list-main">
            <h1>Current Employees</h1>
            <div className="list-content">
                
                <DataTable
                    direction="auto"
                    defaultSortFieldId={1}
                    fixedHeaderScrollHeight="300px"
                    pagination
                    responsive
                    subHeaderAlign="right"
                    subHeaderWrap
                    columns={columns}
                    data={rows}
                    progressPending={pending} />
       
            <div className = "research-contenair">
                <label htmlFor="research">Search: </label>
                <input id="research" type="text" ref={searchRef} onChange = {search}/>
            </div>    
             </div>
            <p className="home-page" onClick={redirect}>Home</p>
            <div data-testid = "test-click" onClick = {testFuction} className="test-click">test click</div>
        </main>
    )
}

