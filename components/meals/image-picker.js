"use client";

import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {

    const ref = useRef();
    const [pickedImage, setPickedImage] = useState();

    function handlePickClick() {
        ref.current.click();
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file); 
    }

    return (
        <>
            <div className={classes.picker}>
                <label htmlFor={name}>{label}</label>
                <div className={classes.controls}>
                    <div className={classes.preview}>
                        {!pickedImage && <p>No image picket yet!</p>}
                        {pickedImage && (
                            <Image src={pickedImage} fill alt="picked image" />
                        )}
                    </div>
                    <input onChange={handleImageChange} ref={ref} className={classes.input} type='file' id={name} accept='image/png, image/jpeg' name={name} />
                    <button className={classes.button} type='button' onClick={handlePickClick} >Pick an Image</button>
                </div>
            </div>
        </>
    )
}