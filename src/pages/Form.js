import React, {  useRef, useState } from 'react'
import DatePicker from 'react-date-picker';
import { useNavigate } from "react-router-dom"
import '../style/form.css'
import Dropdown from 'gg-dropdown-menu/dist/index.js'
import 'gg-dropdown-menu/dist-unmignified/dropdown.css'
import { newArray, states } from '../data/states';
import { department } from '../data/department';

export default function Form( {stateDatas,setStateDatas}) {
    const [dateValue, onChange] = useState();
    const [startDateValue, onStartChange] = useState();
    const navigate = useNavigate();
    const array = newArray()
    const [currentSelection, setCurrentSelection] = useState(array[0])
    const [deptSelect, setDeptSelect] = useState(department[0])
    /*formRefs*/
    const fnRef = useRef()
    const lnRef = useRef()
    const streetRef = useRef()
    const cityRef = useRef()
    const zipRef = useRef()


    /*errorformRefs*/
    const erFnRef = useRef()
    const erLnRef = useRef()
    const erStreetRef = useRef()
    const erCityRef = useRef()
    const erDateRef = useRef()
    const erStartDateRef = useRef()
    const erZipRef = useRef()


    /* useEffect(() => {
         
     }, [currentSelection])*/
    const redirect = () => {
        navigate('/list')
    }
    const submit = (e) => {
        e.preventDefault()
        const dateRef = document.querySelectorAll('.react-date-picker__wrapper')
        let regexAlphabet = /^[a-zA-Z-\s]{2,30}$/
        let regexNumber = /^[0-9]{3,}$/
        let regexStreet = /^[a-zA-Z0-9-\s]{3,30}$/
        let dateTest = dateRange(dateValue)
        let startDateTest = dateRange(startDateValue)
        let regexToken = 0
        if (regexAlphabet.test(fnRef.current.value)) {
            regexToken++
            fnRef.current.classList.remove('input-error')
            erFnRef.current.classList.add('hidden')
        }
        else {
            fnRef.current.classList.add('input-error')
            erFnRef.current.classList.remove('hidden')
        }
        if (regexAlphabet.test(lnRef.current.value)) {
            regexToken++
            lnRef.current.classList.remove('input-error')
            erLnRef.current.classList.add('hidden')
        }
        else {
            lnRef.current.classList.add('input-error')
            erLnRef.current.classList.remove('hidden')
        }
        if (dateTest) {
            regexToken++
            dateRef[0].classList.remove('input-error')
            erDateRef.current.classList.add('hidden')
        }
        else {
            dateRef[0].classList.add('input-error')
            erDateRef.current.classList.remove('hidden')
        }
        if (startDateTest) {
            regexToken++
            dateRef[1].classList.remove('input-error')
            erStartDateRef.current.classList.add('hidden')
        }
        else {
            dateRef[1].classList.add('input-error')
            erStartDateRef.current.classList.remove('hidden')
        }
        if (regexStreet.test(streetRef.current.value)) {
            regexToken++
            streetRef.current.classList.remove('input-error')
            erStreetRef.current.classList.add('hidden')
        }
        else {
            streetRef.current.classList.add('input-error')
            erStreetRef.current.classList.remove('hidden')
        }
        if (regexAlphabet.test(cityRef.current.value)) {
            regexToken++
            cityRef.current.classList.remove('input-error')
            erCityRef.current.classList.add('hidden')
        }
        else {
            cityRef.current.classList.add('input-error')
            erCityRef.current.classList.remove('hidden')
        }
        if (regexNumber.test(zipRef.current.value)) {
            regexToken++
            zipRef.current.classList.remove('input-error')
            erZipRef.current.classList.add('hidden')
        }
        else {
            zipRef.current.classList.add('input-error')
            erZipRef.current.classList.remove('hidden')
        }

        if (regexToken === 6) { //si toutes les entrées sont bonnes
            let oldDatas = window.localStorage.getItem('users') //recuperation des data du stockage local
            if (oldDatas) oldDatas = JSON.parse(oldDatas)
            else oldDatas = []
            console.log(oldDatas)
            /*generate state abreviation*/
            let stateAbv = "error"
            states.forEach(state => {
                if (state.name === currentSelection) stateAbv = state.abbreviation
            })

            const newDatas = {//creation des nouvelles data
                firstName: fnRef.current.value,
                lastName: lnRef.current.value,
                birthDate: withoutTime(dateValue),
                street: streetRef.current.value,
                state: stateAbv,
                zip: zipRef.current.value,
                city: cityRef.current.value,
                department: deptSelect,
                startDate: withoutTime(startDateValue),
                id: oldDatas.length
            }

            oldDatas.push(newDatas)
            window.localStorage.setItem('users', JSON.stringify(oldDatas))
            setStateDatas(newDatas)
            /*remise a 0 */
            fnRef.current.value = ""
            lnRef.current.value = ""
            streetRef.current.value = ""
            cityRef.current.value = ""
            setDeptSelect(department[0])
            zipRef.current.value = ""
            setCurrentSelection(array[0])
            onChange(new Date())
        }
    }
    const dateRange = (date) => { // fonction qui controle si la date est bien comprise dans un certain intervale
        const testedDate = new Date(date);// la date a tester
        const currentDate = new Date(); //la date d'aujourd'hui
        const olderDate = new Date(1920 / 1 / 1)//la date la plus vielle
        if (testedDate < currentDate && testedDate > olderDate) return true
        else return false
    }
    const withoutTime = (dateTime) => { //clean date 
        var d = new Date(dateTime);
        var date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
        return date;
    }
    const setDate = () => {
        onChange(new Date())
        onStartChange(new Date()) 
    }
    return (
        <main className="form-main">
            <h1>HRnet</h1>
            <div className="list-page" onClick={redirect}>View Current Employees</div>
            <form>
                <h2>Create Employee</h2>
                <label htmlFor="firstname" >First Name:</label>
                <input ref={fnRef} data-testid = "fn-test" type="text" id="firstname" name="firstname" size="20" />
                <p ref={erFnRef} data-testid = "fn-error" className="hidden error" >enter two letters or more</p>
                <label htmlFor="lastname">Last Name:</label>
                <input data-testid = "ln-test" ref={lnRef} type="text" id="lastname" name="lastname" size="20" />
                <p data-testid = "ln-error" ref={erLnRef} className="hidden error" >enter two letters or more</p>
                <p>Date of Birth</p>
                <DatePicker  onChange={onChange} value={dateValue} />
                <p data-testid = "birth-error" ref={erDateRef} className="hidden error" >enter a valid birth date</p>
                <p>Start Date</p>
                <DatePicker onChange={onStartChange} value={startDateValue} />
                <p data-testid = "start-error" ref={erStartDateRef} className="hidden error" >enter a valid start date</p>
                <div className="adress">
                    <h3>Address</h3>
                    <label htmlFor="street">Street:</label>
                    <input ref={streetRef} data-testid = "street-test" type="text" id="street" name="street" size="20" />
                    <p ref={erStreetRef} className="hidden error" data-testid = "street-error" >enter two letters and number or more</p>
                    <label htmlFor="city">City:</label>
                    <input data-testid = "city-test" ref={cityRef} type="text" id="city" name="city" size="20" />
                    <p data-testid = "city-error" ref={erCityRef} className="hidden error" >enter two letters or more</p>
                    <p>State:</p>
                    <Dropdown array={array} currentSelection={currentSelection} setCurrentSelection={setCurrentSelection} />
                    <label htmlFor="zip">Zip:</label>
                    <inpu data-testid = "zip-test"t ref={zipRef} type="text" id="zip" name="zip" size="20" />
                    <p data-testid = "zip-error" ref={erZipRef} className="hidden error" >enter three number or more</p>
                </div>
                <p className="department department-label" >department:</p>
                <Dropdown array={department} currentSelection={deptSelect} setCurrentSelection={setDeptSelect} />
                <button className="btn" onClick={submit}>Save</button>
                <div data-testid = "test-click" onClick = {setDate} className="test-click">test click</div>
            </form>
        </main>
    )
}
