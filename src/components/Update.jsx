import React, { useState, useEffect } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

const Update = () => {
  const [data, setData] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    // Fetch data from the server endpoint
    axios.get("http://localhost:8080/view")
      .then(response => {
        setData(response.data); // Set fetched data to state
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const updateValues = (val) => {
    setUpdateId(val._id);
    setUpdateData({ fname: val.fname, fprice: val.fprice, imageUrl: val.imageUrl });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/edit/${updateId}`, updateData)
      .then((response) => {
        alert(response.data);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/remove/${id}`)
      .then((response) => {
        alert(response.data);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ margin: '4%' }}>
      <Typography variant='h3'>Update Items</Typography><br />

      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" gap={2}>
        {data.map((val, i) => (
          <Card key={i} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={val.imageUrl}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {val.fname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {val.fprice}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Button onClick={() => updateValues(val)} size="small" variant='contained' color='warning'>
              Update
            </Button>
            <Button onClick={() => handleDelete(val._id)} size="small" variant='contained' color='secondary'>
              Delete
            </Button>
          </Card>
        ))}
      </Box>

      {/* Update Form */}
      {updateId && (
        <div>
          <Typography variant='h4'>Update Item</Typography>
          <form style={{ backgroundColor: 'white' }}>
            <TextField
              label="Name"
              name="fname"
              value={updateData.fname}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              name="fprice"
              value={updateData.fprice}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Image"
              name="imageUrl"
              value={updateData.imageUrl}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button onClick={handleUpdate} variant='contained' color='primary'>
              Update
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Update;
