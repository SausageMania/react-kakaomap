import { makeStyles } from '@material-ui/core/styles';

const MapStyle = makeStyles(theme => ({
    searchField: {
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    searchText: {
        backgroundColor: 'white',
    },
    searchButton: {
        backgroundColor: 'orange',
        color: 'white',
        '&:hover': {
            backgroundColor: 'orange',
        },
    },
    reviseButton: {
        backgroundColor: 'blue',
        color: 'white',
        '&:hover': {
            backgroundColor: 'blue',
        },
    },
    deleteButton: {
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
            backgroundColor: 'red',
        },
    },
    placeName: {
        fontSize: '16px',
        fontWeight: '600',
    },
    addressName: {
        fontSize: '13px',
        fontWeight: '400',
    },
}));

export default MapStyle;
