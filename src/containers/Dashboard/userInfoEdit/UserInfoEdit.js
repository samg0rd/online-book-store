import React,{Component} from 'react';
import classes from './UserInfoEdit.module.scss';
import * as firebase from 'firebase';

class UserInfoEdit extends Component{
    constructor(props){
        super(props);
        this.state = {
            file: null,
            fileUrl: null
        }
    }

    onImgChange = (event) => {
        this.setState({
            file: event.target.files[0],
            fileUrl: URL.createObjectURL(event.target.files[0])
        });
    }

    uploadImageHandler = () => {
        console.log('uploading . . .');     
        
        // Create a root reference
        var storageRef = firebase.storage().ref();

        console.log('storageRef === > ', storageRef);
        console.log('this.state.file (not URL) ===> ', this.state.file);
        // Create a reference to 'mountains.jpg'
        var imgFileRef = storageRef.child(this.state.fileUrl);
        console.log('imgFileRef ===> ', imgFileRef);
        // Create a reference to 'images/mountains.jpg'
        var desiredImagesRef = storageRef.child(`images/${this.state.fileUrl}`);
        console.log('desiredImagesRef ===> ', desiredImagesRef);

        // While the file names are the same, the references point to different files
        // mountainsRef.name === mountainImagesRef.name            // true
        // mountainsRef.fullPath === mountainImagesRef.fullPath    // false


        var file = this.state.file // use the Blob or File API
        storageRef.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file! and the SNAPSHOW is === > ', snapshot);
        });
    }
    
    render(){
        return (
            <div>
                <div className={classes.imagePreview}>
                    <div className={classes.previewImgWrap}>
                        <img style={{ width: "100%" }} src={this.state.fileUrl} />
                    </div>
                    <label className={classes.imageFileInput}>
                        add an image
                        <input type="file" className={classes.hiddenFileInpu} onChange={this.onImgChange}/>
                    </label>                
                    <button className={classes.uploadImgBtn} onClick={this.uploadImageHandler} >upload image</button>
                </div>
            </div>
        );
    }    
};

export default UserInfoEdit;