import React from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

// const images = [{
//     // Simplest usage.
//     url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

//     // width: number
//     // height: number
//     // Optional, if you know the image size, you can set the optimization performance

//     // You can pass props to <Image />.
//     props: {
//         // headers: ...
//         // source: require('../background.png')
//     }
// }]

const ImagePreview = (props) => {
    return (
        <Modal visible={props.show} transparent={true} onRequestClose={props.setShowFalse}>
            <ImageViewer onShowModal={props.show} imageUrls={props.images} onCancel={props.setShowFalse} enableSwipeDown onSwipeDown={props.setShowFalse} />
        </Modal>
    )

}

export default ImagePreview;