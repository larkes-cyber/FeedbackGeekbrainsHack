import './main_view.scss';
import Typography from '@mui/material/Typography';


const MainView = (props) => {
    return(
        <div className='main_view'>
             <Typography
                    sx={{ display: 'inline', mb:"18px"}}
                    component="span"
                    variant="h5"
                    color="text.primary"
                    align="center"
                >
            {props.lection.name}
            </Typography>


            <RecomendField label={" Преподователь: "} content={props.lection.tutor} />
            <div sx={{mb:"81px"}}><RecomendField label={"Колличество ответов: "} content={props.lection.answCount} /></div>
            <div sx={{mb:"15px"}}></div>
            <Typography
                    sx={{ display: 'inline'}}
                    component="div"
                    variant="body"
                    color="text.primary"
                >
               {props.lection.description}
            </Typography>
            <div sx={{mb:"18px"}}></div>

            {props.lection.tutorRec != null ?  <RecomendField label={"Рекомендации преподователю: "} content={props.lection.tutorRec} /> : null }
            <div sx={{mb:"8px"}}></div>
            {props.lection.mentorRec != null ?  <RecomendField label={"Рекомендации ментору: "} content={props.lection.mentorRec} /> : null }
            <div sx={{mb:"8px"}}></div>
            {props.lection.orgRec != null ?  <RecomendField label={"Рекомендации орг: "} content={props.lection.orgRec} /> : null }


        </div>
    )
}

export default MainView;

const RecomendField = (props) => {
    return(
        <div sx={
            {
                display: 'inline-flex'
            }
        }>
            <Typography
                    sx={{ display: 'inline'}}
                    component="div"
                    variant="body"
                
                    color="text.primary"
                >
             {props.label}
            </Typography>
            <Typography
                    sx={{ display: 'inline', mb:"15px", fontWeight: 'bold'}}
                    component="span"
                    variant="body"
                    color="text.primary"
                >
             {props.content}
            </Typography>
        </div>
    )
}