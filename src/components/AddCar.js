import React, { useState } from 'react';
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';

export default function Addcar(props) {
    const [open, setOpen] = useState(false);
  
    const [car, setCar] = useState({
      brand: '',
      model: '',
      color: '',
      fuel: '',
      year: '',
      price: ''
    });
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = (event) => {
      setCar({ ...car, [event.target.name]: event.target.value });
    };
  
    const handleSave = () => {
      props.addCar(car);
      handleClose();
  
      // очищаем форму после сохранения
      setCar({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: ''
      });
    };
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          ADD CAR
        </Button>
  
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Car</DialogTitle>
  
          <DialogContent>
            <DialogContentText>
              Fill in new car information
            </DialogContentText>
  
            <TextField
              margin="dense"
              name="brand"
              label="Brand"
              fullWidth
              value={car.brand}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="model"
              label="Model"
              fullWidth
              value={car.model}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="color"
              label="Color"
              fullWidth
              value={car.color}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="fuel"
              label="Fuel"
              fullWidth
              value={car.fuel}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="year"
              label="Year"
              type="number"
              fullWidth
              value={car.year}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              value={car.price}
              onChange={handleChange}
            />
          </DialogContent>
  
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }