import { useMutation } from "@apollo/client";
import {S3_POST_URL} from 'logged_in/Mutations'
import { futureDate } from "shared/components/Utils";

const [mutate] = useMutation(S3_POST_URL)

const getSignedUrl = async (file) => {

    setFetching(true)
    try {
        const get = await mutate({variables: {email: currentUser.email, fileName: file[0].name,}})
        if(get.data?.s3PostUrl.success){
            const { payload } = get.data.s3PostUrl
            payload.fields.file = file[0]
            uploadToS3(payload)
        }
    } catch (error) {
        setError(error)
    }
};

const uploadToS3 = async (payload)=>{
    const {url, fields, getUrl} = payload
    const formData = new FormData();
    Object.keys(fields).forEach(key => {
        formData.append(key, fields[key]);
    }); 

    await fetch(url, {method: "POST", body: formData})
    .then((res) => {
        if(res.ok){
            setFetching(false)
            setImagePreview(String(payload.getUrl))
            localStorage.setItem('s3Url', JSON.stringify({
              'url': getUrl,
              'expiry': futureDate(6)
            }))
        }
    })
    .catch((error) => {
        setError(error)
    })          
}