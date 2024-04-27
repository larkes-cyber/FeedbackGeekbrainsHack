import './main_view.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';



const MainView = (props) => {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

    return(
        <div className='main_view'>
             <Typography
                    sx={{ display: 'inline', mb:"24px"}}
                    component="span"
                    variant="h5"
                    color="text.primary"
                    align="center"
                >
            {props.lection.name}
            </Typography>

            <Typography
                    sx={{ display: 'inline', mb:"18px"}}
                    component="div"
                    variant="body"
                    color="text.primary"
                >
               {props.lection.description}
            </Typography>
            
            <RecomendField label={" Преподователь: "} content={props.lection.tutor} />
            <RecomendField label={"Колличество ответов: "} content={props.lection.answCount} />

            <Typography
                    sx={{ display: 'inline', mb:"10px"}}
                    component="div"
                    variant="body"
                    color="text.primary"
                >
            </Typography>

            {props.lection.tutorRec != null ?  <RecomendField label={"Рекомендации преподователю: "} content={props.lection.tutorRec} /> : null }
            {props.lection.mentorRec != null ?  <RecomendField label={"Рекомендации ментору: "} content={props.lection.mentorRec} /> : null }
            {props.lection.orgRec != null ?  <RecomendField label={"Рекомендации орг: "} content={props.lection.orgRec} /> : null }

            <Button
                component="label"
                sx={{width:"26%", height:"56px", mt:"50px"}}
                role={undefined}
                variant="contained"
                color='secondary'
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                >
                  Скачать EXCEL
            </Button>

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