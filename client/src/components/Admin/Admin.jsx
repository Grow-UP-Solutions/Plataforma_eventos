import React, { useEffect, useState } from 'react';
import style from './Admin.module.css';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import eventsApi from '../../axios/eventsApi';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import {fechaActual} from '../../utils/fechaActual'
import { Link } from 'react-router-dom';


const Admin = () => {

    return(
    <div>
        <Link to='/lista-de-organizadores'>Pagar Facturas</Link>
    </div>
    )
}

 

export default Admin;
