import React, { useRef, useState } from 'react'
import DatePicker from 'react-date-picker';
import { useNavigate } from "react-router-dom"
import '../style/form.css'

export default function Form() {
    const [dateValue, onChange] = useState(new Date());
    const navigate = useNavigate();

    /*formRefs*/
    const fnRef = useRef()
    const lnRef = useRef()
    const streetRef = useRef()
    const cityRef = useRef()
    const stateRef = useRef()
    const zipRef = useRef()
    const deptRef = useRef()

    /*errorformRefs*/
    const erFnRef = useRef()
    const erLnRef = useRef()
    const erStreetRef = useRef()
    const erCityRef = useRef()
    const erDateRef = useRef()
    const erZipRef = useRef()

    const redirect = () => {
        navigate('/login')
    }
    const submit = (e) => {
        e.preventDefault()
        const dateRef = document.querySelector('.react-date-picker__wrapper')
        let regexAlphabet = /^[a-zA-Z-\s]{2,30}$/
        let regexNumber = /^[0-9]{4}$/
        let regexStreet = /^[a-zA-Z0-9-\s]{3,30}$/
        let dateTest = dateRange(dateValue)
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
            dateRef.classList.remove('input-error')
            erDateRef.current.classList.add('hidden')
        }
        else {
            dateRef.classList.add('input-error')
            erDateRef.current.classList.remove('hidden')
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
            if (oldDatas) JSON.parse(oldDatas)
            else oldDatas = [] 
             const newDatas = {//creation des nouvelles data
                firstName: fnRef.current.value,
                lastName: lnRef.current.value,
                birthDate: dateValue,
                street: streetRef.current.value,
                state: stateRef.current.value,
                Zip: zipRef.current.value,
                department: deptRef.current.value,
                StartDate: new Date(),
                id :oldDatas.length
            }
            
            oldDatas.push(newDatas)
            window.localStorage.setItem('users', JSON.stringify(oldDatas))
            /*remise a 0 */
            fnRef.current.value = ""
            lnRef.current.value = ""
            streetRef.current.value = ""
            cityRef.current.value = ""
            stateRef.current.value = ""
            zipRef.current.value = ""
            deptRef.current.value = ""
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

    return (
        <main >
            <h1>HRnet</h1>
            <div className="list-page" onClick={redirect}>View Current Employees</div>
            <form>
                <h2>Create Employee</h2>
                <label htmlFor="firstname" >First Name:</label>
                <input ref={fnRef} type="text" id="firstname" name="firstname" size="20" />
                <p ref={erFnRef} className="hidden error" >enter two letters or more</p>
                <label htmlFor="lastname">Last Name:</label>
                <input ref={lnRef} type="text" id="lastname" name="lastname" size="20" />
                <p ref={erLnRef} className="hidden error" >enter two letters or more</p>
                <p>Date of Birth</p>
                <DatePicker onChange={onChange} value={dateValue} />
                <p ref={erDateRef} className="hidden error" >enter a valid birth date</p>
                <div className="adress">
                    <h3>Address</h3>
                    <label htmlFor="street">Street:</label>
                    <input ref={streetRef} type="text" id="street" name="street" size="20" />
                    <p ref={erStreetRef} className="hidden error" >enter two letters and number or more</p>
                    <label htmlFor="city">City:</label>
                    <input ref={cityRef} type="text" id="city" name="city" size="20" />
                    <p ref={erCityRef} className="hidden error" >enter two letters or more</p>
                    <label htmlFor="state">State:</label>
                    <input ref={stateRef} type="text" id="state" name="state" size="20" />
                    <label htmlFor="zip">Zip:</label>
                    <input ref={zipRef} type="text" id="zip" name="zip" size="20" />
                    <p ref={erZipRef} className="hidden error" >enter three number or more</p>
                </div>
                <label className="department department-label" htmlFor="department">department:</label>
                <input ref={deptRef} className="department " type="text" id="department" name="department" size="20" />
                <button className="btn" onClick={submit}>Save</button>
            </form>
        </main>
    )
}
