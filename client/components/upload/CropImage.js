/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import React, {useRef, useState} from 'react';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {Modal, Box, Button} from "@mui/material";

const CropImage = (props) => {
  const {setOpen, open, file, avatar, setUrl, setFieldValue} = props
  const [crop, setCrop] = useState({
    height: 200,
    unit: "px",
    width: 200,
    x: 50,
    y: 50,
  });
  const [croped, setCroped] = useState(null);
  const [blob, setBlob] = useState(null);
  const imageRef = useRef(null);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3
  };

  const setCropper = () => {
    if(imageRef.current) {
      setCrop({
        height: 200,
        unit: "px",
        width: 200,
        x: (imageRef.current.width - 200) /2,
        y: (imageRef.current.height - 200) /2,
      });

      dragEndHandler()
    }
  }

  const getCroppedImg = (image, cropInfo, fileName) => {
    const canvas = document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = cropInfo.width * pixelRatio * scaleX;
    canvas.height = cropInfo.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'low';

    ctx.drawImage(
      image,
      cropInfo.x * scaleX,
      cropInfo.y * scaleY,
      cropInfo.width * scaleX,
      cropInfo.height * scaleY,
      0,
      0,
      cropInfo.width * scaleX,
      cropInfo.height * scaleY
    );

    return new Promise(() => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error('Canvas is empty');
            return;
          }
          blob.name = fileName;
          setCroped(URL.createObjectURL(blob))
          setBlob(blob)
        },
        file.type,
        1
      );
    });
  }

  const dragEndHandler = () => {
    getCroppedImg(imageRef.current, crop, file.name)
      .then((res) => {
        setCroped(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const cropHandler = () => {
    if(blob) {
      setFieldValue('logo', new File([blob], file.name, {type: file.type}))
    }
    setUrl((croped !== null) ? croped : avatar);
    setOpen(false);
  }


  return  (
    <Modal
      open={open}
      onClose={() => {setOpen(false)}}
    >
      <Box sx={{ ...style}}>
        <ReactCrop
          onDragEnd={dragEndHandler}
          crop={crop}
          onChange={c => setCrop(c)}
          aspect={1}
          minWidth={50}
          minHeight={50}
          ruleOfThirds={true}
          keepSelection={false}
        >
          <img onLoad={setCropper} ref={imageRef} src={avatar} alt='IMAGE'/>
        </ReactCrop>
        <div
          style={{
            textAlign: 'center',
            marginTop: 20
          }}
        >
          <Button
            variant='contained'
            color='secondary'
            onClick={cropHandler}
          >
            Crop Image
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CropImage;