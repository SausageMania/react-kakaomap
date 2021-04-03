import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Button,
    TextField,
    InputAdornment,
    ButtonBase,
    Typography,
    Divider,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import MapStyle from './MapStyle';

const KakaoMap = () => {
    const classes = MapStyle();
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const { kakao } = window;
    const map = useRef();

    const placeSearch = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK && search !== '') {
            setSearchData(data);
        } else alert('데이터가 없습니다.');
    };
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };
        map.current = new kakao.maps.Map(container, options);
    }, [kakao]);

    const searchClick = () => {
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(search, placeSearch);
    };

    const locationClick = (lat, lng) => {
        const moveLatLng = new kakao.maps.LatLng(lat, lng);
        const marker = new kakao.maps.Marker({
            position: moveLatLng,
        });

        map.current.setLevel(1);
        map.current.panTo(moveLatLng);
        marker.setMap(map.current);
    };

    return (
        <React.Fragment>
            <Box
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box id="map" width="95%" height="95%">
                    <Box position="absolute" zIndex="5000">
                        <Box className={classes.searchField}>
                            <Box display="flex" alignItems="center" px={1} py={1} width="100%">
                                <Box mr={1}>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        className={classes.searchText}
                                        label="주소로 검색"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Search />
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <Button
                                        variant="contained"
                                        className={classes.searchButton}
                                        onClick={searchClick}
                                    >
                                        검색
                                    </Button>
                                </Box>
                            </Box>
                            <Box>
                                {searchData.length > 0 &&
                                    searchData.map(data => (
                                        <React.Fragment key={data.id}>
                                            <Box
                                                display="flex"
                                                component={ButtonBase}
                                                width="100%"
                                                maxHeight="100%"
                                                justifyContent="flex-start"
                                                onClick={() => locationClick(data.y, data.x)}
                                                pl={2}
                                            >
                                                <Box
                                                    display="flex"
                                                    flexDirection="column"
                                                    alignItems="flex-start"
                                                >
                                                    <Box>
                                                        <Typography className={classes.placeName}>
                                                            {data.place_name}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography className={classes.addressName}>
                                                            {data.address_name}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Divider />
                                        </React.Fragment>
                                    ))}
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        position="absolute"
                        zIndex="4000"
                        width="100%"
                        display="flex"
                        justifyContent="flex-end"
                    >
                        <Box display="flex" px={1} py={1}>
                            <Box mr={1}>
                                <Button variant="contained" className={classes.reviseButton}>
                                    노선 수정
                                </Button>
                            </Box>
                            <Box>
                                <Button variant="contained" className={classes.deleteButton}>
                                    노선 삭제
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default KakaoMap;
