import React from 'react';
import CustomBtn from './CustomBtn';
import axios from 'axios';

// Style the Button component
const UploadBtn = props => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
//   const axios = require("axios:").default;
  const API_ENDPOINT = 'https://xr9zs93ing.execute-api.us-east-1.amazonaws.com/default/ets-mmai-toy-project-lambda?file=filename.mp4';
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };

  const handleSubmit = async (files) => {
      const f = files[0];
      console.log(f["files"]);
    //   GET request: presigned URL
      const response = await axios({
          method: "GET",
          url: API_ENDPOINT,
      });

      console.log("Response: ", response);

      // PUT request: upload file to s3
      const result = await fetch(response.data.uploadURL, {
          method: 'PUT',
          body: f['file']
      });
      console.log('Result: ', result);
  };

  return (
    <>
      <CustomBtn onClick={handleClick}>{props.txt}
      
      </CustomBtn>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        onSubmit={handleSubmit}
        style={{display: 'none'}}
      />
    </>
  )};
export default UploadBtn;
