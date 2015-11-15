import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import ImageCardComponent from '../components/ImageCardComponent';
import ImageStore from '../stores/ImageStore';
import loadUploadedImagesAction from '../actions/loadUploadedImagesAction';

class UploadedImagesComponent extends React.Component {
  static contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
  };

  static PropTypes = {
    images: React.PropTypes.array.isRequired
  }

  componentDidMount() {
    this.context.executeAction(loadUploadedImagesAction);
  }

  render() {
    return (
      <div className='UploadedImagesComponent'>
        <div className='row'>
          {this.props.images.map((image) => (
            <div className='col-sm-4' key={image._id}>
              <ImageCardComponent uploadedAt={image.uploadedAt} uri={image.uri}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

UploadedImagesComponent = connectToStores(UploadedImagesComponent, [ImageStore], (context) => ({
  images: context.getStore(ImageStore).getImages()
}));
export default UploadedImagesComponent;