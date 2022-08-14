import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { handleSubmit, UploadBtn }from './components/UploadBtn';
import CustomBtn from './components/CustomBtn';
import Grid from './components/Grid';
import React from 'react';
import './App.css';
//changes to imports 
import { useReactMediaRecorder } from "react-media-recorder";
import configData from "./components/config_data.json";

const mediaRecorderOptions = {
  mimeType: "video/webm;codecs=h264"
};


// const theme = createTheme({
//   palette: {
//     primary: {
//       main:"#2e1667",
//     },
//     secondary: {
//       main:"#c7d8ed",
//     },
//   },
//   typography: {
//     fontFamily: [
//       'Roboto'
//     ],
//     h4: {
//       fontWeight: 600,
//       fontSize: 28,
//       lineHeight: '2rem',
//       },
//     h5: {
//       fontWeight: 100,
//       lineHeight: '2rem',
//     },
//   },
// });

// function App() {
//   return (
//     <div className="App">
//       <ThemeProvider theme={theme}>
//         <Grid btnTitle="Start Recording"/>
//         <Grid btnTitle="Upload"/>
//         <Grid btnTitle="Stop Recording"/>
//       </ThemeProvider>
//     </div>
//   );
// }


const RecordView = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });
  const [videoON, setvideoON] = React.useState(false);
  const [videoRecorded, setvideoRecorded] = React.useState(false);
  const [FileNamelog, setFileNamelog] = React.useState('');
  const [fileUpload, setUpload] = React.useState(false);
  const [fileError, setfileError] = React.useState(false);

    const submitVideo = async (Fileurl) => {
      console.log(Fileurl);
      if (Fileurl === null){
          console.log(Fileurl);
      }else{
          const urlItems = Fileurl.split('/');
          var fileName = urlItems[urlItems.length -1];
          console.log(urlItems);
          console.log(urlItems[urlItems.length -1]);
          setFileNamelog(fileName)
          const res = await fetch(configData.REST_API+'?file='+ fileName +'.mp4')
          .then(response => response.json())
          .catch((error) => {
              console.error(error);
          });
          const body = await res;
          const res1 = await fetch(Fileurl)
          .then(response => response.blob())
          .catch((error) => {
              console.error(error);
          });
          const videoFile = await res1;
          // console.log(videoFile);
          body['fields']['file'] = videoFile;
          console.log("coursesbody is:", body);
          let formData = new FormData();
          for(const name in body['fields']) {
              formData.append(name, body['fields'][name]);
          }
          const requestOptions = {
              method: 'POST',
              body: formData
          };
          const rawResponse = await fetch(body['url'], requestOptions)
          .catch((error) => {
              console.error(error);
          });
          console.log(rawResponse.status);
          if (rawResponse.status === 204){
              setvideoRecorded(false);
              setUpload(true);
              alert('Upload Successfully!')
          }else{
              setfileError(true);
              console.log(rawResponse.status);
          }
    }
}

  return (
    <div>
        <p>{status}</p>
        <CustomBtn className='CustomBtn1' onClick={startRecording} txt='Start Recording'/>
        <CustomBtn className='CustomBtn2' onClick={stopRecording} txt='Stop Recording'/>
        <CustomBtn className="button-style" onClick={() => {submitVideo(mediaBlobUrl);}} txt='Upload Recording'/> 
        <video src={mediaBlobUrl} controls autoPlay loop />      
    </div>
  );
};

function App() {
  return (
    <RecordView/>
  );
}

export default App;
