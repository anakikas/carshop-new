import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Button, Snackbar } from '@mui/material';
import Addcar from './AddCar';
import Editcar from './EditCar';

ModuleRegistry.registerModules([AllCommunityModule]);


export default function Carlist() {
    const [cars, setCars] = useState ([]);
    const [open, setOpen] = useState(false);

    useEffect (() => fetchData(),[]);

    const fetchData = () => {
        fetch ('https://car-rest-service-carshop.2.rahtiapp.fi/cars')
            .then(response => response.json())
            .then(data => {
                console.log(data._embedded.cars);
                setCars(data._embedded.cars);
              })
              .catch(err => console.error(err));
          };

    const deleteCar = (link) => {
        if (window.confirm('Are you sure?')) {
          fetch(link, { method: 'DELETE' })
            .then(() => {
              fetchData();
              setOpen(true);
            })
            .catch(err => console.error(err));
        }
      };

      const handleClose = () => {
        setOpen(false);
      };

      const saveCar = (car) => {
        const newCar = {
          ...car,
          year: Number(car.year),
          price: Number(car.price)
        };
      
        fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCar)
        })
          .then(() => fetchData())
          .catch(err => console.error(err));
      };
      
      const updateCar = (car, link) => {
        const updatedCar = {
          ...car,
          year: Number(car.year),
          price: Number(car.price)
        };
      
        fetch(link, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedCar)
        })
          .then(() => fetchData())
          .catch(err => console.error(err));
      };

      const columns = [
        { field: 'brand', headerName: 'Brand', flex: 1 },
        { field: 'model', headerName: 'Model', flex: 1 },
        { field: 'color', headerName: 'Color', flex: 1 },
        { field: 'fuel', headerName: 'Fuel', flex: 1 },
        { field: 'modelYear', headerName: 'Year', flex: 1 },
        { field: 'price', headerName: 'Price', flex: 1 },
        {
            headerName: 'Edit',
            width: 120,
            filter: false,
            sortable: false,
            cellRenderer: (params) => (
              <Editcar car={params.data} updateCar={updateCar} />
            )
        },
        {
            headerName: 'Delete',
            width: 120,
            filter: false,
            sortable: false,
            cellRenderer: (params) => (
              <Button
                color="error"
                size="small"
                onClick={() => deleteCar(params.data._links.self.href)}
              >
                Delete
              </Button>
            )
          }
        
      ];

      const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true
      };
    
    return (
        <div style={{ padding: 10 }}>

         <Addcar addCar={saveCar} />

         <div style={{ 
            height: '100vh', 
            width: '100%', 
            marginTop: '10px' }}
            >

        <AgGridReact
          rowData={cars}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          rowHeight={48}
          headerHeight={50}
        />
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Car deleted"
        />

    </div>
    );
}
