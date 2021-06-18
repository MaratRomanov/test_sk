import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actionCreators/user';
import cities from './cities.json';
import sources from './sources.json';
import InputMask from 'react-input-mask';
import CircularProgress from '@material-ui/core/CircularProgress';

const Div = styled.div`
    width: 380px;
    border-radius: 8px;
    box-shadow: 0px 5px 20px rgba(53, 50, 56, 0.14);
    display: flex;
    flex-direction: column;
    padding: 40px 30px;
`;

const useStyles = makeStyles({
    ShortTextField: {
        margin: '0 20px 25px 0',
        width: '180px',
        height: '50px',
        borderRadius: '8px',
        "&:last-child": {
            margin: '0 0 25px 0',
        }
    },
    LongTextField: {
        marginBottom: '25px',
        width: '380px',
        height: '50px',
        borderRadius: '8px',
        "&:first-child": {
            margin: '25px 0',
        }
    },
    heading: {
        fontSize: '14px',
        fontWeight: 400,
    },
    button: {
        background: '#E3E3E3',
        borderRadius: '8px',
        height: '48px',
        padding: '18px 25px',
        marginTop: '20px',
        textTransform: 'capitalize',
    },
    formControl: {
        marginBottom: '20px',
        width: '380px',
        height: '50px'
    }
});

export default function Card() {
    const dispatch = useDispatch();

    const state = useSelector(state => state);
    const city = useSelector(state => state.city);
    const howDidKnow = useSelector(state => state.howDidKnow);
    const [submitStatus, setSubmitStatus] = React.useState(false);

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const nameInput = (e) => {
        dispatch(actions.name_input(e.target.value));
    }

    const phoneInput = (e) => {
        dispatch(actions.phone_input(e.target.value));
    }

    const emailInput = (e) => {
        dispatch(actions.email_input(e.target.value));
    }

    const profileInput = (e) => {
        dispatch(actions.profile_input(e.target.value));
    }

    const cityChange = (e) => {
        dispatch(actions.сity_input(e.target.value));
    }

    const howKnowChange = (e) => {
        dispatch(actions.howDidKnow(e.target.value));
    }

    const organisationNameInput = (e) => {
        dispatch(actions.organisationName_input(e.target.value));
    }

    const recipientInput = (e) => {
        dispatch(actions.recipient_input(e.target.value));
    }

    const submit = () => {        
        setSubmitStatus(true);

        let promise = new Promise((resolve, reject) => {

            setTimeout(() => {
              resolve(dispatch(actions.submit()));
            }, 1000);
          
          });

          promise
            .then( result => setSubmitStatus(false))
            .then( result => console.log(JSON.stringify(state)))
            .then( result => dispatch(actions.clear()) )
    }

    return (
        <Div>
            <div>
                <TextField
                    className={classes.ShortTextField}
                    label="Ваше имя"
                    variant="outlined"
                    placeholder="Иван"
                    required
                    value={state.name}
                    error={state.name.length < 2 ? true : false}
                    onChange={(e) => nameInput(e)}
                />
                <InputMask 
                    mask="+7(999)999-99-99"
                    value={state.phone} 
                    onChange={(e) => phoneInput(e)}
                    className={classes.ShortTextField}
                    maskChar=" "
                >
                    {() => <TextField 
                        className={classes.ShortTextField}
                        label="Номер телефона"
                        variant="outlined"
                        placeholder="+7(000)000-00-00"
                        required                        
                        />
                    }
                </InputMask>                
            </div>
            <div>
                <TextField
                    className={classes.ShortTextField}
                    label="E-mail"
                    variant="outlined"
                    placeholder="example@skdesign.ru"
                    required
                    value={state.email}
                    onChange={(e) => emailInput(e)}
                />
                <TextField
                    className={classes.ShortTextField}
                    label="Ссылка на профиль"
                    variant="outlined"
                    placeholder="instagram.com/skdesign"
                    required
                    value={state.profile}
                    onChange={(e) => profileInput(e)}
                />
            </div>
            <FormControl variant="outlined" className={classes.formControl} required>
                <InputLabel id="city-select-label">Выберите город</InputLabel>
                <Select
                    labelId="city-select-label"
                    id="city-select"
                    value={city}
                    onChange={(e) => cityChange(e)}
                    label="Откуда узнали про нас?"
                >
                    {cities.map(city =>
                        <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <TextField
                className={classes.LongTextField}
                label="Наименование организации"
                variant="outlined"
                placeholder="SK Design"
                required
                value={state.organisationName}
                onChange={(e) => organisationNameInput(e)}
            />
            <ListItem button onClick={handleClick}>
                <ListItemText primary={open ? "Скрыть дополнительные поля" : "Показать дополнительные поля"} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <TextField
                        className={classes.LongTextField}
                        label="Получатель"
                        variant="outlined"
                        placeholder="ФИО"
                        required
                        value={state.recipient}
                        onChange={(e) => recipientInput(e)}
                    />                   
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="where-know-label">Откуда узнали про нас?</InputLabel>
                        <Select
                            labelId="where-know-label"
                            id="where-know"
                            value={howDidKnow}
                            onChange={(e) => howKnowChange(e)}
                            label="Откуда узнали про нас?"
                        >
                            {sources.map((source, index) =>
                                <MenuItem key={index} value={source}>{source}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </List>
            </Collapse>
            <Button
                className={classes.button}
                onClick={() => submit()}
                disabled={state.name 
                    && state.phone 
                    && state.email
                    && state.profile
                    && state.city
                    && state.organisationName 
                        ? false
                        : true
                }
            >
               {submitStatus ? <CircularProgress size={30}/> : "Отправить заявку"}
            </Button>
        </Div>
    );
}