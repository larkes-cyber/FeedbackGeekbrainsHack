import Button from '@mui/material/Button';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Link,NavLink } from 'react-router-dom';



const RolePage = () => {


    return(
    <div style={{minWidth:"100%",minHeight:"100vh",display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", alignContent:"center"}}>
      
      <Typography
                sx={{ display: 'inline', mb:"3%"}}
                component="span"
                variant="h3"
                color="text.primary"
            >
        Выберете вашу роль
    </Typography>

    <NavLink style={{width:"50%"}} to="/student">
        <Button
                component="label"
                sx={{width:"100%", height:"65px", mb:"1%"}}
                role={undefined}
                variant="contained"
                color='secondary'
                tabIndex={-1}
                onClick={() => {
                    localStorage.setItem("role", "student");
                }}
                >
            Студент
        </Button>
    </NavLink>
    <NavLink style={{width:"50%"}} to="/tutor">
        <Button
                component="label"
                sx={{width:"100%", height:"65px", mb:"1%"}}
                role={undefined}
                variant="contained"
                color='secondary'
                tabIndex={-1}
                onClick={() => {
                    localStorage.setItem("role", "tutor");
                }}
                >
            Преподователь
        </Button>
    </NavLink>
    <NavLink style={{width:"50%"}} to="/tutor">
        <Button
                component="label"
                sx={{width:"100%", height:"65px", mb:"1%"}}
                role={undefined}
                variant="contained"
                color='secondary'
                tabIndex={-1}
                onClick={() => {
                    localStorage.setItem("role", "meth");
                }}
                >
            Методолог
        </Button>
    </NavLink>
    <NavLink style={{width:"50%"}} to="/tutor">
        <Button
                component="label"
                sx={{width:"100%", height:"65px", mb:"1%"}}
                role={undefined}
                variant="contained"
                color='secondary'
                tabIndex={-1}
                onClick={() => {
                    localStorage.setItem("role", "org");
                }}
                >
            Организатор
        </Button>
    </NavLink>
    </div>);
}

export default RolePage;