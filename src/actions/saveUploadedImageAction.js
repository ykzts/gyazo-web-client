import Image from '../models/Image';

async function saveUploadedImageAction(context, payload) {
  let { fileName, uri } = payload;
  let uploadedAt = (payload.uploadedAt instanceof Date ? payload.uploadedAt : new Date()).toJSON();
  let image = new Image();
  await image.ready;
  let images = [await image.save({ fileName, uri, uploadedAt })];
  context.dispatch('PREPEND_UPLOADED_IMAGES', { images });
}

export default saveUploadedImageAction;
