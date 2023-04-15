import React, { useEffect, useState, ReactElement } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import APIList from '../mock/list.json';
import { useRouter } from 'next/router';

const Home = (): ReactElement => {
  const { push } = useRouter();
  const [list, setList] = useState([]);

  const fetchList = () => {
    // TODO BRUNO, metti l'url della chiamata api
    axios
      .get('http://localhost:3000/api/v1/simulation_statistics') // <--- DA CAMBIARE !!!
      .then(({ data }) => {
        setList(data);
      })
      .catch((error) => {
        setList(APIList);
        // alert(error?.message || 'Errore chiamata lista api');
      });
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Stack p={2}>
      <h2>
        <Typography textTransform="uppercase">Dashboard</Typography>
      </h2>
      <Paper sx={{ p: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right">Initial Balance</TableCell>
                <TableCell align="right">Final balance</TableCell>
                <TableCell align="right">gained</TableCell>
                <TableCell align="right">successful buy</TableCell>
                <TableCell align="right">successful sell</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => {
                const time = new Date(row.timestamp);
                return (
                  <TableRow
                    onClick={() => {
                      push(`/details/${row.id}`);
                    }}
                    key={row.name}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': {
                        backgroundColor: '#e8c12e'
                      }
                    }}>
                    <TableCell component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell align="right">{row.initial_account_balance}</TableCell>
                    <TableCell align="right">{row.final_account_balance}</TableCell>
                    <TableCell align="right">
                      {(row.final_account_balance - row.initial_account_balance).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">{row.successful_buy}</TableCell>
                    <TableCell align="right">{row.successful_sell}</TableCell>
                    <TableCell align="right">{time.toISOString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
};

export default Home;
