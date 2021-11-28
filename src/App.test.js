import { render, screen,fireEvent,} from '@testing-library/react';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom'
import {Switch } from './App';
import { MemoryRouter } from "react-router-dom";
                              //how to test 
test( 'render form' , () => { // https://newbedev.com/can-t-get-memoryrouter-to-work-with-testing-library-react
  const root = document.createElement('div');
  document.body.appendChild(root);
  const app = render(
  <MemoryRouter initialEntries={['/']} initialIndex={0}>
    <Switch/>;
  </MemoryRouter>,
   root
  )
  expect(screen.getByText('HRnet')).toBeInTheDocument();
})
test( 'submit empty form ' , async () => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  const app = render(
  <MemoryRouter initialEntries={['/']} initialIndex={0}>
    <Switch/>;
  </MemoryRouter>,
   root
  )
  fireEvent.click(screen.getByText(/Save/i))
  expect(screen.getByTestId('fn-error').classList.contains('hidden')).toBe(false)
  expect(screen.getByTestId('ln-error').classList.contains('hidden')).toBe(false)
  expect(screen.getByTestId('birth-error').classList.contains('hidden')).toBe(false)
  expect(screen.getByTestId('start-error').classList.contains('hidden')).toBe(false)
  expect(screen.getByTestId('street-error').classList.contains('hidden')).toBe(false)
  expect(screen.getByTestId('city-error').classList.contains('hidden')).toBe(false)
  expect(screen.getByText('enter two letters and number or more')).toBeInTheDocument();
  expect(screen.getByText('enter three number or more')).toBeInTheDocument();
 
})
test( 'submit street field only ' , async () => { 
  const root = document.createElement('div');
  document.body.appendChild(root);
  const app = render(
  <MemoryRouter initialEntries={['/']} initialIndex={0}>
    <Switch/>;
  </MemoryRouter>,
   root
  )
  const street = screen.getByTestId('street-test')
  const streetError = screen.getByTestId('street-error')
  fireEvent.change(street , {target : {value: "street"}})
  expect(streetError.classList.contains('hidden')).toBe(true);
  fireEvent.click(screen.getByText('Save'))
  expect(streetError.classList.contains('hidden')).toBe(true);
 
})
test( 'submit all fields ' , async () => { 
  const root = document.createElement('div');
  document.body.appendChild(root);
  const app = render(
  <MemoryRouter initialEntries={['/']} initialIndex={0}>
    <Switch/>;
  </MemoryRouter>,
   root
  )
  fireEvent.change(screen.getByTestId('fn-test') , {target : {value: "name"}})
  fireEvent.change(screen.getByTestId('ln-test') , {target : {value: "Name"}})
  fireEvent.click(screen.getByTestId('test-click')) //set valid dates
  fireEvent.change(screen.getByTestId('street-test') , {target : {value: "street"}})
  fireEvent.change(screen.getByTestId('city-test') , {target : {value: "city"}})
  
  expect(screen.getByTestId('fn-test').value).toBe('name')

  fireEvent.click(screen.getByText('Save'))
  
  expect(screen.getByTestId('fn-error').classList.contains('hidden')).toBe(true)
  expect(screen.getByTestId('ln-error').classList.contains('hidden')).toBe(true)
  expect(screen.getByTestId('birth-error').classList.contains('hidden')).toBe(true)
  expect(screen.getByTestId('start-error').classList.contains('hidden')).toBe(true)
  expect(screen.getByTestId('street-error').classList.contains('hidden')).toBe(true)
  expect(screen.getByTestId('city-error').classList.contains('hidden')).toBe(true)
  
  expect(screen.getByTestId('fn-test').value).toBe('')
})
test( 'click on View Current Employees' , () => { 
  const root = document.createElement('div');
  document.body.appendChild(root);
  const app = render(
  <MemoryRouter initialEntries={['/']} initialIndex={0}>
    <Switch/>;
  </MemoryRouter>,
   root
  )
  fireEvent.click(screen.getByText('View Current Employees'))
  expect(screen.getByText('Current Employees')).toBeInTheDocument();
})

test( 'render List' , () => { 
  const root = document.createElement('div');
  document.body.appendChild(root);
  const app = render(
  <MemoryRouter initialEntries={['/list']} initialIndex={0}>
    <Switch/>;
  </MemoryRouter>,
   root
  )
  expect(app.getByText('Current Employees')).toBeInTheDocument();
})
test( 'render Users' , () => { 
  const root = document.createElement('div');
  document.body.appendChild(root);
  const app = render(
  <MemoryRouter initialEntries={['/list']} initialIndex={0}>
    <Switch/>;
  </MemoryRouter>,
   root
  )
  fireEvent.click(screen.getByText('test click'))
  expect(app.getByText('jean')).toBeInTheDocument();
  expect(app.getByText('michel')).toBeInTheDocument();
})