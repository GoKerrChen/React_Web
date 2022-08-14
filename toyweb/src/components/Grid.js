import React from 'react'
import {Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import CustomBtn from './CustomBtn'
import UploadBtn from './UploadBtn'
import { useReactMediaRecorder } from "react-media-recorder";

const styles = makeStyles({
    wrapper: {
       display: "flex",
       flexDirection: "column", 
       alignItems: "center", 
       padding: "0 5rem 0 5rem"
    }, 
    item: {
       paddingTop: "1rem"
    }
})
export default function Grid(props) {
    const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });
    const {btnTitle} = props;
    const classes = styles(); 
    return (
        <div className={classes.wrapper}>
            <div className={classes.item}>
                <CustomBtn  txt={btnTitle}/>
            </div>
        </div>
    )
}
