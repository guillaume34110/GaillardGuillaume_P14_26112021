export const columns = [
    { name : "First Name",selector : row => row.firstName,sortable: true,reorder: true},
    { name : "Last Name",selector : row => row.lastName,sortable: true,reorder: true},
    { name : "Start Date",selector : row => row.startDate,sortable: true,reorder: true},
    { name : "Department",selector : row => row.department,sortable: true,reorder: true},
    { name : "Date of Birth",selector : row => row.birthDate,sortable: true,reorder: true},
    { name : "Street",selector : row => row.street,sortable: true,reorder: true},
    { name : "City",selector : row => row.city,sortable: true,reorder: true},
    { name : "State",selector : row => row.state,sortable: true,reorder: true},
    { name : "Zip Code",selector : row => row.zip,sortable: true,reorder: true},
]