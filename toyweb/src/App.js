import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CustomBtn from './components/CustomBtn';
import Grid from './components/Grid';
import './App.css';
//changes to imports 
import { useReactMediaRecorder } from "react-media-recorder";

const mediaRecorderOptions = {
  mimeType: "video/webm;codecs=h264"
};


const theme = createTheme({
  palette: {
    primary: {
      main:"#2e1667",
    },
    secondary: {
      main:"#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
});

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

  return (
    <div>
        <p>{status}</p>
        <CustomBtn className='CustomBtn' onClick={startRecording} txt='Start Recording'/>
        <CustomBtn className='CustomBtn' onClick={stopRecording} txt='Stop Recording'/>
        <CustomBtn className='CustomBtn' onClick={stopRecording} txt='Upload'/>
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
