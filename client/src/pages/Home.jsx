
import * as React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { getAllData } from "../utils/ApiRoutes";

export const Home = () => {

    const [data, setData] = useState([]);
    console.log('data:', data)
    const [searchParams, setSearchParams] = useSearchParams();
    console.log('searchParams:', searchParams)
    const [page, setPage] = useState(Number(searchParams.get("page") || 1));
    const [sort, setSort] = useState("");
    const [category, setCategory] = useState("");

    console.log('category:', category)
    console.log('sort:', sort)
    console.log('page:', page)
    useEffect(() => {
        axios({

            url : getAllData,
            method : "GET",
            params : {
                page,
                category,
                sort
            }
        })
        .then((res) => {

            console.log("res : ",res.data);
            setData(res.data.products);
        })

        .catch((error) => {
            console.log("error : ", error.message);
        })
    },[page,sort,category])

    useEffect(() => {
        setSearchParams({
            ...searchParams,
            page,
            category,
            sort,
        })
    },[page,sort,category, setSearchParams])

    return (
        <Container>
            <div className="filtering__sorting__box">
                <div className="filtering__box">
                    <select onChange={(event) => {
                        setSort(event.target.value);
                    }} name="" id="">
                        <option value="">SORT BY PRICE</option>
                        <option value="price">Price Low To High</option>
                        <option value="-price">Price High To Low</option>
                        <option value=""></option>
                    </select>
                </div>
                <div className="sorting__box">
                    <select onChange={(event) => {
                        setCategory(event.target.value);
                    }} name="" id="">
                        <option value="">FILTER BY CATEGORIES</option>
                        <option value="women's clothing">women's clothing</option>
                        <option value="men's clothing">men's clothing</option>
                        <option value="jewelery">jewelery</option>
                        <option value="electronics">electronics</option>
                    </select>
                </div>
            </div>
            <div className="grid__items">
                {data.map((element,index) => {
                    return (
                        <div key={index+1} className="item__box">
                            <img src={element.image} alt="" />
                            <div className="item__content__box">
                                <p className="title">{element.title}</p>
                                <p className="price">{element.price}</p>
                                <p className="category">{element.category}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Stack style={{
                
                border : "0px solid",
                width : "fit-content",
                margin: "1vw auto auto auto"
            }} spacing={1}>
                <Pagination onChange={(event) => {
                    console.log("pagination :", event.currentTarget.textContent);
                    setPage(event.currentTarget.textContent);
                }} count={4} color="primary" />
            </Stack>
        </Container>
    )
}

const Container = styled.div`

    /* border : 1px solid; */
    width: 99.84vw;
    padding: .5vw 0 0 0;
    .filtering__sorting__box {

        /* border: 1px solid; */
        width: 92%;
        margin: auto;
        padding: .6vw;
        display: flex;
        justify-content: space-between;
        .filtering__box {
            /* border: 1px solid; */
            display: flex;
            width : 14%;
            select {
                width: 99.9%;
                padding : .5vw;
                font-size: 1vw;
                outline : none;
            }
        }
        .sorting__box {
            /* border: 1px solid; */
            display: flex;
            width : 14%;
            display: flex;
            select {
                width: 99.9%;
                padding : .5vw;
                font-size: 1vw;
                outline : none;
            }
        }
    }
    .grid__items {
        /* border : 1px solid; */
        margin: 1vw auto auto auto;
        width: 90%;
        padding: 1vw;
        display: grid;
        grid-template-columns: repeat(4,1fr);
        gap: .5vw;
        .item__box {
            border : 1px solid;
            img {
                /* border: 1px solid; */
                width: 99.7%;
                height: 40vh;
            }
            .item__content__box {
                /* border: 1px solid; */
                margin: auto;
                padding: .4vw 0 0 0;
                width: 99.35%;
                display: flex;
                flex-direction: column;
                gap: .2vw;
                p {
                    /* border: 1px solid; */
                    margin : auto auto auto 0;   
                }
            }  
        }
    }
`